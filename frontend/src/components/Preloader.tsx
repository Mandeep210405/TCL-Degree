import React from 'react';
import { Syringe, Shield, Users, Heart } from 'lucide-react';

const Preloader = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      {/* Logo and Icons */}
      <div className="flex items-center space-x-4 mb-8">
        <Syringe className="w-8 h-8 text-[#0077B6] animate-bounce" />
        <Shield className="w-8 h-8 text-[#00A86B] animate-bounce" style={{ animationDelay: '0.2s' }} />
        <Users className="w-8 h-8 text-[#0077B6] animate-bounce" style={{ animationDelay: '0.4s' }} />
        <Heart className="w-8 h-8 text-[#00A86B] animate-bounce" style={{ animationDelay: '0.6s' }} />
      </div>

      {/* AllVaxConnect Text */}
      <h1 className="text-2xl font-bold text-[#0077B6] mb-6">AllVaxConnect</h1>

      {/* Loading Line Container */}
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#0077B6] to-[#00A86B] animate-loading-line"></div>
      </div>

      {/* Loading Text */}
      <div className="mt-4">
        <span className="text-[#495057] font-medium animate-pulse">Loading...</span>
      </div>
    </div>
  );
};

export default Preloader;