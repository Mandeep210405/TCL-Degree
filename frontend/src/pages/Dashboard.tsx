import React, { useState, useEffect } from 'react';
import api from '../utils/axios';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import { VaccineRecord, UpcomingVaccination, FamilyMember } from '../types';
import { Calendar, FileCheck, Clock } from 'lucide-react';

interface HealthcareCenter {
  id: string;
  name: string;
}

const Dashboard = () => {
  const [vaccineRecords, setVaccineRecords] = useState<VaccineRecord[]>([]);
  const [upcomingVaccinations, setUpcomingVaccinations] = useState<UpcomingVaccination[]>([]);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [vaccines, setVaccines] = useState<string[]>([]);
  const [newRecord, setNewRecord] = useState({
    vaccineName: '',
    date: '',
    familyMember: '',
    proofDocument: null as File | null
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [healthcareCenters, setHealthcareCenters] = useState<HealthcareCenter[]>([]);

  useEffect(() => {
    fetchDashboardData();
    fetchHealthcareCenters();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [recordsRes, upcomingRes, familyRes, vaccinesRes] = await Promise.all([
        api.get('/user/vaccine-records'),
        api.get('/user/upcoming-vaccinations'),
        api.get('/user/family-members'),
        api.get('/vaccines')
      ]);
      
      // Handle the nested data structure
      setVaccines(vaccinesRes.data.data || []);
      setVaccineRecords(recordsRes.data || []);
      setUpcomingVaccinations(upcomingRes.data || []);
      setFamilyMembers(familyRes.data.data || []); 
      console.log(vaccineRecords);// Access the nested data property
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      // Set empty arrays on error
      setVaccines([]);
      setVaccineRecords([]);
      setUpcomingVaccinations([]);
      setFamilyMembers([]);
    }
  };

  const fetchHealthcareCenters = async () => {
    try {
      const response = await api.get('/healthcare-centers');
      setHealthcareCenters(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error('Failed to fetch healthcare centers:', error);
      setHealthcareCenters([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const formData = new FormData();
      formData.append('vaccineName', newRecord.vaccineName);
      formData.append('date', newRecord.date);
      formData.append('familyMember', newRecord.familyMember);
      formData.append('healthcareCenter', newRecord.healthcareCenter);
      
      // Add file validation
      if (newRecord.proofDocument) {
        const file = newRecord.proofDocument as File;
        if (file.type !== 'application/pdf') {
          setError('Please upload a PDF file only');
          return;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          setError('File size should be less than 5MB');
          return;
        }
        formData.append('proofDocument', file);
      }

      const response = await api.post('/user/vaccine-records', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setSuccess('Vaccination record added successfully!');
        setNewRecord({
          vaccineName: '',
          date: '',
          familyMember: '',
          proofDocument: null,
          healthcareCenter: ''
        });
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Failed to add vaccination record:', error);
      setError('Failed to add vaccination record. Please try again.');
    }
  };

  const handleDownload = async (recordId: string) => {
    try {
      // Assuming the API endpoint is /filename/:recordId
      // Adjust if the endpoint requires a different parameter or structure
      const response = await api.get(`/filename/${recordId}`, {
        responseType: 'blob', // Important for handling file downloads
      });

      // Extract filename from content-disposition header if available
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'vaccine_proof.pdf'; // Default filename
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i);
        if (filenameMatch && filenameMatch.length > 1) {
          filename = filenameMatch[1];
        }
      }

      // Create a Blob from the PDF Stream
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename); // Set the download attribute

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Failed to download file:', error);
      // Optionally, display an error message to the user
      setError('Failed to download the proof document. Please try again.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewRecord({ ...newRecord, proofDocument: e.target.files[0] });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar2 />
      
      <div className="flex-grow container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-[#495057] mb-8">Dashboard</h1>
        
        {/* Past Vaccinations */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <FileCheck className="w-6 h-6 text-[#0077B6]" />
            <h2 className="text-2xl font-semibold text-[#495057]">Past Vaccinations</h2>
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
                    Family Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Proof
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vaccineRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{record.vaccine_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{record.family_member}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDownload(record.proof_document)}
                        className="text-[#0077B6] hover:text-[#005f92] underline cursor-pointer"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Vaccinations */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <Clock className="w-6 h-6 text-[#0077B6]" />
            <h2 className="text-2xl font-semibold text-[#495057]">Upcoming Vaccinations</h2>
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
                    Family Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Healthcare Center
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(vaccination.due_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{vaccination.family_member}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{vaccination.healthcareCenter}</td>
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

        {/* Add Past Vaccination Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Calendar className="w-6 h-6 text-[#0077B6]" />
            <h2 className="text-2xl font-semibold text-[#495057]">Add Past Vaccination</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vaccine Name
              </label>
              <select
                value={newRecord.vaccineName}
                onChange={(e) => setNewRecord({ ...newRecord, vaccineName: e.target.value })}
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
                Date Received
              </label>
              <input
                type="date"
                value={newRecord.date}
                onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Family Member
              </label>
              <select
                value={newRecord.familyMember}
                onChange={(e) => setNewRecord({ ...newRecord, familyMember: e.target.value })}
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
                value={newRecord.healthcareCenter}
                onChange={(e) => setNewRecord({ ...newRecord, healthcareCenter: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                required
              >
                <option value="">Select a healthcare center</option>
                {Array.isArray(healthcareCenters) && healthcareCenters.map((center) => (
                  <option key={center.id} value={center.name}>
                    {center.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Proof Document (PDF only)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setNewRecord({ ...newRecord, proofDocument: e.target.files?.[0] || null })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Please upload a PDF file (max 5MB)
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0077B6] text-white py-2 rounded-lg hover:bg-[#005f92] transition-colors"
            >
              Add Vaccination Record
            </button>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;