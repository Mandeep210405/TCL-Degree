import React from 'react';
import Navbar1 from '../components/Navbar1';
import Footer from '../components/Footer';
import { Globe, Shield, AlertCircle } from 'lucide-react';

const TravelVaccine = () => {
  const destinations = [
    {
      region: "Africa",
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
      vaccines: [
        { name: "Yellow Fever", required: true, description: "Required for most African countries. Must be taken at least 10 days before travel." },
        { name: "Malaria Prevention", required: true, description: "Antimalarial medication recommended for most regions." },
        { name: "Meningitis", required: false, description: "Recommended for the 'meningitis belt' of sub-Saharan Africa." },
        { name: "Hepatitis A", required: false, description: "Recommended for most travelers." }
      ]
    },
    {
      region: "South America",
      image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80",
      vaccines: [
        { name: "Yellow Fever", required: true, description: "Required for many South American countries, especially Amazon regions." },
        { name: "Typhoid", required: false, description: "Recommended for most travelers." },
        { name: "Hepatitis A", required: false, description: "Recommended for all travelers." },
        { name: "Malaria Prevention", required: false, description: "Recommended for certain regions." }
      ]
    },
    {
      region: "South Asia",
      image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=800&q=80",
      vaccines: [
        { name: "Hepatitis A", required: true, description: "Strongly recommended for all travelers." },
        { name: "Typhoid", required: true, description: "Recommended for most travelers." },
        { name: "Japanese Encephalitis", required: false, description: "Recommended for rural areas." },
        { name: "Malaria Prevention", required: false, description: "Recommended for certain regions." }
      ]
    },
    {
      region: "Southeast Asia",
      image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80",
      vaccines: [
        { name: "Hepatitis A", required: true, description: "Recommended for all travelers." },
        { name: "Typhoid", required: false, description: "Recommended for most travelers." },
        { name: "Japanese Encephalitis", required: false, description: "Recommended for rural areas." },
        { name: "Malaria Prevention", required: false, description: "Required for certain regions." }
      ]
    }
  ];

  return (
    <div>
      <Navbar1 />
      
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#495057] mb-4">Travel Vaccination Guide</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay protected while exploring the world. Learn about required and recommended vaccinations for different destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {destinations.map((destination, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div 
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${destination.image})` }}
              />
              
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Globe className="w-6 h-6 text-[#0077B6]" />
                  <h2 className="text-2xl font-semibold text-[#495057]">{destination.region}</h2>
                </div>
                
                <div className="space-y-4">
                  {destination.vaccines.map((vaccine, vIndex) => (
                    <div key={vIndex} className="flex items-start space-x-3">
                      {vaccine.required ? (
                        <Shield className="w-5 h-5 text-[#E63946] mt-1" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-[#FFB703] mt-1" />
                      )}
                      <div>
                        <h3 className="font-semibold text-[#495057]">{vaccine.name}</h3>
                        <p className="text-gray-600 text-sm">{vaccine.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-[#CAF0F8] rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-[#495057] mb-4">Important Notes</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Vaccination requirements may vary based on specific regions within countries.</li>
            <li>• Some vaccines need to be administered several weeks before travel.</li>
            <li>• Consult with healthcare providers for personalized recommendations.</li>
            <li>• Keep vaccination certificates handy during travel.</li>
          </ul>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TravelVaccine;