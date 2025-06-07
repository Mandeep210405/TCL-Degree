import React, { useState, useEffect } from 'react';
import api from '../utils/axios';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import { User } from '../types';
import { UserCircle, Save } from 'lucide-react';

const Profile = () => {
  const [userData, setUserData] = useState<User>({
    fullName: '',
    email: '',
    adharNumber: '',
    contactNumber: '',
    dateOfBirth: ''
  });
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await api.get('/user/profile');
      console.log('Profile data response:', response.data);
      setUserData(response.data.data || {
        fullName: '',
        email: '',
        adharNumber: '',
        contactNumber: '',
        dateOfBirth: ''
      });
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      alert('Failed to fetch user data. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setIsModified(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put('/user/profile', userData);
      setIsModified(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar2 />
      
      <div className="flex-grow container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-[#495057] mb-8">Profile</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <UserCircle className="w-6 h-6 text-[#0077B6]" />
            <h2 className="text-2xl font-semibold text-[#495057]">Personal Information</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={userData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                required
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Aadhar Number
              </label>
              <input
                type="text"
                name="adharNumber"
                value={userData.adharNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                required
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={userData.contactNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={userData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                required
              />
            </div>

            {isModified && (
              <button
                type="submit"
                className="w-full bg-[#0077B6] text-white py-2 rounded-lg hover:bg-[#005f92] transition-colors flex items-center justify-center space-x-2"
              >
                <Save size={20} />
                <span>Save Changes</span>
              </button>
            )}
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;