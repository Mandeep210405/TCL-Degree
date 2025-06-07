import React, { useState, useEffect } from 'react';
import api from '../utils/axios';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import { FamilyMember } from '../types';
import { Users, Edit2, Trash2, X } from 'lucide-react';

const FamilyList = () => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    birthday: '',
    adharNumber: ''
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchFamilyMembers();
  }, []);

  const fetchFamilyMembers = async () => {
    try {
      const response = await api.get('/user/family-members');
      setFamilyMembers(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch family members:', error);
      setFamilyMembers([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/user/family-members/${editingId}`, formData);
      } else {
        await api.post('/user/family-members', formData);
      }
      
      setFormData({ name: '', birthday: '', adharNumber: '' });
      setEditingId(null);
      fetchFamilyMembers();
    } catch (error) {
      console.error('Failed to save family member:', error);
      alert('Failed to save family member. Please try again.');
    }
  };

  const handleEdit = (member: FamilyMember) => {
    setFormData({
      name: member.name,
      birthday: member.birthday,
      adharNumber: member.adharNumber
    });
    setEditingId(member.id);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this family member?')) {
      try {
        await api.delete(`/user/family-members/${id}`);
        fetchFamilyMembers();
      } catch (error) {
        console.error('Failed to delete family member:', error);
        alert('Failed to delete family member. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', birthday: '', adharNumber: '' });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar2 />
      
      <div className="flex-grow container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-[#495057] mb-8">Family Members</h1>
        
        {/* Add/Edit Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <Users className="w-6 h-6 text-[#0077B6]" />
            <h2 className="text-2xl font-semibold text-[#495057]">
              {editingId ? 'Edit Family Member' : 'Add Family Member'}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                value={formData.birthday}
                onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Aadhar Number
              </label>
              <input
                type="text"
                value={formData.adharNumber}
                onChange={(e) => setFormData({ ...formData, adharNumber: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                required
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-[#0077B6] text-white py-2 rounded-lg hover:bg-[#005f92] transition-colors"
              >
                {editingId ? 'Update' : 'Add'} Family Member
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Family Members List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Users className="w-6 h-6 text-[#0077B6]" />
            <h2 className="text-2xl font-semibold text-[#495057]">Family Members List</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date of Birth
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aadhar Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {familyMembers.map((member) => (
                  <tr key={member.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(member.dob).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{member.adhar}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleEdit(member)}
                          className="text-[#0077B6] hover:text-[#005f92]"
                        >
                          <Edit2 size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(member.id)}
                          className="text-[#E63946] hover:text-red-700"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
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

export default FamilyList;