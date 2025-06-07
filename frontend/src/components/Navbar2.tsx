import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, AlertCircle, LogOut, Syringe, UserCircle, Menu, X } from 'lucide-react';
import api from '../utils/axios';
import { setUserLoggedIn } from '../utils/globalAuth';

const Navbar2 = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    // Call logout API (optional)
    api.post('/user/logout').catch(error => {
      console.error('Logout failed:', error);
    });
    
    // Set user as logged out
    setUserLoggedIn(false);
    
    // Navigate to login page
    navigate('/login');
  };

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
          <Link to="/dashboard" className="flex items-center space-x-2 text-2xl font-bold">
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
            <Link to="/dashboard" className="flex items-center space-x-1 hover:text-[#CAF0F8] transition-colors">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            
            <Link to="/family" className="flex items-center space-x-1 hover:text-[#CAF0F8] transition-colors">
              <Users size={20} />
              <span>Family</span>
            </Link>
            
            <Link to="/schedule" className="flex items-center space-x-1 hover:text-[#CAF0F8] transition-colors">
              <Calendar size={20} />
              <span>Schedule</span>
            </Link>
            
            <Link to="/suggestions" className="flex items-center space-x-1 hover:text-[#CAF0F8] transition-colors">
              <AlertCircle size={20} />
              <span>Suggestions</span>
            </Link>
            
            <Link to="/profile" className="flex items-center space-x-1 hover:text-[#CAF0F8] transition-colors">
              <UserCircle size={20} />
              <span>Profile</span>
            </Link>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 hover:text-[#CAF0F8] transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
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
              to="/dashboard"
              className="flex items-center space-x-2 hover:text-[#CAF0F8] transition-colors"
              onClick={closeMenu}
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            
            <Link
              to="/family"
              className="flex items-center space-x-2 hover:text-[#CAF0F8] transition-colors"
              onClick={closeMenu}
            >
              <Users size={20} />
              <span>Family</span>
            </Link>
            
            <Link
              to="/schedule"
              className="flex items-center space-x-2 hover:text-[#CAF0F8] transition-colors"
              onClick={closeMenu}
            >
              <Calendar size={20} />
              <span>Schedule</span>
            </Link>
            
            <Link
              to="/suggestions"
              className="flex items-center space-x-2 hover:text-[#CAF0F8] transition-colors"
              onClick={closeMenu}
            >
              <AlertCircle size={20} />
              <span>Suggestions</span>
            </Link>
            
            <Link
              to="/profile"
              className="flex items-center space-x-2 hover:text-[#CAF0F8] transition-colors"
              onClick={closeMenu}
            >
              <UserCircle size={20} />
              <span>Profile</span>
            </Link>
            
            <button
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
              className="flex items-center space-x-2 hover:text-[#CAF0F8] transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;