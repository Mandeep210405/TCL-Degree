import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Syringe, Phone, HelpCircle, Plane, LogIn, Menu, X } from 'lucide-react';

const Navbar1 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-[#0077B6] text-white py-4 px-6 shadow-lg relative">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
            <Syringe size={32} />
            <span>AllVaxConnect</span>
          </Link>
          
          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/travel-vaccine" className="flex items-center space-x-1 hover:text-[#CAF0F8] transition-colors">
              <Plane size={20} />
              <span>Travel Vaccines</span>
            </Link>
            
            <Link to="/faq" className="flex items-center space-x-1 hover:text-[#CAF0F8] transition-colors">
              <HelpCircle size={20} />
              <span>FAQ</span>
            </Link>
            
            <Link to="/contact" className="flex items-center space-x-1 hover:text-[#CAF0F8] transition-colors">
              <Phone size={20} />
              <span>Contact Us</span>
            </Link>
            
            <Link 
              to="/login" 
              className="bg-[#00A86B] hover:bg-[#008f5d] px-4 py-2 rounded-lg flex items-center space-x-1 transition-colors"
            >
              <LogIn size={20} />
              <span>Login</span>
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } md:hidden absolute left-0 right-0 top-full bg-[#0077B6] shadow-lg z-50`}
        >
          <div className="flex flex-col py-4 px-6 space-y-4">
            <Link
              to="/travel-vaccine"
              className="flex items-center space-x-2 hover:text-[#CAF0F8] transition-colors"
              onClick={closeMenu}
            >
              <Plane size={20} />
              <span>Travel Vaccines</span>
            </Link>
            
            <Link
              to="/faq"
              className="flex items-center space-x-2 hover:text-[#CAF0F8] transition-colors"
              onClick={closeMenu}
            >
              <HelpCircle size={20} />
              <span>FAQ</span>
            </Link>
            
            <Link
              to="/contact"
              className="flex items-center space-x-2 hover:text-[#CAF0F8] transition-colors"
              onClick={closeMenu}
            >
              <Phone size={20} />
              <span>Contact Us</span>
            </Link>
            
            <Link
              to="/login"
              className="flex items-center space-x-2 bg-[#00A86B] hover:bg-[#008f5d] px-4 py-2 rounded-lg transition-colors"
              onClick={closeMenu}
            >
              <LogIn size={20} />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;