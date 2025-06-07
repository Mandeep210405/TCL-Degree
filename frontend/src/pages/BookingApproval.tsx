import React, { useState, useEffect } from 'react';
import api from '../utils/axios';
import Navbar3 from '../components/Navbar3';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';
import { BookingRequest } from '../types';
import { CheckCircle, XCircle, Award, Search } from 'lucide-react';

const BookingApproval = () => {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'completed'>('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/booth/bookings');
      setBookings(Array.isArray(response.data.data) ? response.data.data : []);
      console.log('API Response:', response.data.data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      setError('Failed to fetch bookings. Please try again later.');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      setError(null);
      const response = await api.get(`/booth/bookings/${id}/approve`);
      if (response.status === 200) {
        setBookings(bookings.map(booking => 
          booking.id === id ? { ...booking, status: 'approved' } : booking
        ));
      } else {
        throw new Error('Failed to approve booking');
      }
    } catch (error) {
      console.error('Failed to approve booking:', error);
      setError('Failed to approve booking. Please try again.');
    }
  };

  const handleGrantCertificate = async (id: string) => {
    try {
      setError(null);
      const response = await api.get(`/booth/bookings/${id}/complete`);
      if (response.status === 200) {
        setBookings(bookings.map(booking => 
          booking.id === id ? { ...booking, status: 'completed' } : booking
        ));
      } else {
        throw new Error('Failed to grant certificate');
      }
    } catch (error) {
      console.error('Failed to grant certificate:', error);
      setError('Failed to grant certificate. Please try again.');
    }
  };

  const filteredBookings = Array.isArray(bookings) ? bookings.filter(booking => {
    const patientName = booking?.patientName || '';
    const vaccineName = booking?.vaccineName || '';
    const status = booking?.status || 'pending';

    const matchesSearch = patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vaccineName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || status === filter;
    return matchesSearch && matchesFilter;
  }) : [];

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar3 />
      
      <div className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
          <h1 className="text-2xl font-bold text-[#495057] mb-8">Booking Approvals</h1>
          
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
              />
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-[#0077B6] text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg ${filter === 'pending' ? 'bg-[#FFB703] text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('approved')}
                className={`px-4 py-2 rounded-lg ${filter === 'approved' ? 'bg-[#00A86B] text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                Approved
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vaccine Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.vax_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(booking.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.familyMember}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : booking.status === 'approved'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.status === 'pending' ? (
                        <button
                          onClick={() => handleApprove(booking.id)}
                          className="flex items-center space-x-1 text-[#0077B6] hover:text-[#005f92]"
                        >
                          <CheckCircle size={16} />
                          <span>Approve</span>
                        </button>
                      ) : booking.status === 'approved' ? (
                        <button
                          onClick={() => handleGrantCertificate(booking.id)}
                          className="flex items-center space-x-1 text-[#00A86B] hover:text-[#008f5d]"
                        >
                          <Award size={16} />
                          <span>Grant Certificate</span>
                        </button>
                      ) : (
                        <span className="flex items-center space-x-1 text-gray-400">
                          <CheckCircle size={16} />
                          <span>Completed</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookingApproval;