import React, { useState, useEffect } from 'react';
import api from '../utils/axios';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import { FamilyMember, HealthcareCenter, UpcomingVaccination } from '../types';
import { Calendar, Clock } from 'lucide-react';

const Schedule = () => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [healthcareCenters, setHealthcareCenters] = useState<HealthcareCenter[]>([]);
  const [vaccines, setVaccines] = useState<string[]>([]);
  const [upcomingVaccinations, setUpcomingVaccinations] = useState<UpcomingVaccination[]>([]);
  const [formData, setFormData] = useState({
    vaccineName: '',
    familyMember: '',
    healthcareCenter: '',
    date: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [familyRes, centersRes, vaccinesRes, upcomingRes] = await Promise.all([
        api.get('/user/family-members'),
        api.get('/healthcare-centers'),
        api.get('/vaccines'),
        api.get('/user/upcoming-vaccinations')
      ]);

      

      setFamilyMembers(familyRes.data.data || []);
      setHealthcareCenters(centersRes.data.data || []);
      setVaccines(vaccinesRes.data.data || []);
      setUpcomingVaccinations(upcomingRes.data || []);
      
    } catch (error) {
      console.error('Failed to fetch data:', error);
      // Set empty arrays on error
      setFamilyMembers([]);
      setHealthcareCenters([]);
      setVaccines([]);
      setUpcomingVaccinations([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/user/schedule-vaccination', formData);
      setFormData({
        vaccineName: '',
        familyMember: '',
        healthcareCenter: '',
        date: ''
      });
      
      fetchData();
    } catch (error) {
      console.error('Failed to schedule vaccination:', error);
      alert('Failed to schedule vaccination. Please try again.');
    }
  };

  // Add this function to get tomorrow's date in YYYY-MM-DD format
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Add this function to get date 30 days from now in YYYY-MM-DD format
  const getMaxDate = () => {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return thirtyDaysFromNow.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar2 />
      
      <div className="flex-grow container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-[#495057] mb-8">Schedule Vaccination</h1>
        
        {/* Schedule Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <Calendar className="w-6 h-6 text-[#0077B6]" />
            <h2 className="text-2xl font-semibold text-[#495057]">Schedule New Vaccination</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vaccine
              </label>
              <select
                value={formData.vaccineName}
                onChange={(e) => setFormData({ ...formData, vaccineName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                required
              >
                <option value="">Select Vaccine</option>
                {vaccines.map((vaccine, index) => (
                  <option key={index} value={vaccine}>
                    {vaccine}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Family Member
              </label>
              <select
                value={formData.familyMember}
                onChange={(e) => setFormData({ ...formData, familyMember: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                required
              >
                <option value="">Select Family Member</option>
                {familyMembers.map((member) => (
                  <option key={member.id} value={member.name}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Healthcare Center
              </label>
              <select
                value={formData.healthcareCenter}
                onChange={(e) => setFormData({ ...formData, healthcareCenter: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                required
              >
                <option value="">Select Healthcare Center</option>
                {healthcareCenters.map((centers) => (
                  <option key={centers.id} value={centers.name}>
                    {centers.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                min={getMinDate()}
                max={getMaxDate()}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Select a date between tomorrow and 30 days from now
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0077B6] text-white py-2 rounded-lg hover:bg-[#005f92] transition-colors"
            >
              Schedule Vaccination
            </button>
          </form>
        </div>

        {/* Upcoming Vaccinations */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Clock className="w-6 h-6 text-[#0077B6]" />
            <h2 className="text-2xl font-semibold text-[#495057]">Upcoming Vaccinations</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vaccine
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Family Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Healthcare Center
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {upcomingVaccinations.map((vaccination) => (
                  <tr key={vaccination.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{vaccination.vaccine_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{vaccination.family_member}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{vaccination.healthcareCenter}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(vaccination.due_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        vaccination.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : vaccination.status === 'approved'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {vaccination.status.charAt(0).toUpperCase() + vaccination.status.slice(1)}
                      </span>
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

export default Schedule;