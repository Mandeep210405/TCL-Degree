import React, { useState, useEffect } from 'react';
import api from '../utils/axios';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import { AlertCircle } from 'lucide-react';

interface SuggestedVaccine {
  id: string;
  vaccineName: string;
  familyMember: string;
  recommendedDate: string;
  
}

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState<SuggestedVaccine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const response = await api.get('/user/vaccine-suggestions');
      console.log('Suggestions response:', response.data);
      setSuggestions(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar2 />
      
      <div className="flex-grow container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-[#495057] mb-8">Vaccine Suggestions</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <AlertCircle className="w-6 h-6 text-[#0077B6]" />
            <h2 className="text-2xl font-semibold text-[#495057]">Recommended Vaccinations</h2>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0077B6] mx-auto"></div>
            </div>
          ) : suggestions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No vaccine suggestions available at the moment.
            </div>
          ) : (
            <div className="space-y-6">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-[#495057] mb-2">
                        {suggestion.vaccineName}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        Recommended for: <span className="font-medium">{suggestion.familyMember}</span>
                      </p>
                      <p className="text-gray-600 mb-2">
                        Recommended Date: <span className="font-medium">
                          {new Date(suggestion.recommendedDate).toLocaleDateString()}
                        </span>
                      </p>
                      
                    </div>
                    <button
                      onClick={() => window.location.href = '/schedule'}
                      className="bg-[#0077B6] text-white px-4 py-2 rounded-lg hover:bg-[#005f92] transition-colors"
                    >
                      Schedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Suggestions;