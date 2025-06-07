import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Syringe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#495057] text-white pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <Syringe size={32} />
              <span className="text-2xl font-bold">AllVaxConnect</span>
            </div>
            <p className="text-gray-300">
              Protecting lives through comprehensive vaccination management and family healthcare solutions.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-[#CAF0F8]">Home</Link></li>
              <li><Link to="/travel-vaccine" className="hover:text-[#CAF0F8]">Travel Vaccines</Link></li>
              <li><Link to="/faq" className="hover:text-[#CAF0F8]">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-[#CAF0F8]">Contact Us</Link></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-center md:justify-start space-x-2">
                <Phone size={16} />
                <span>+1 (800) VAX-HELP</span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-2">
                <Mail size={16} />
                <span>support@allvaxconnect.com</span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-2">
                <MapPin size={16} />
                <span>123 Healthcare Ave, Medical District</span>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="hover:text-[#CAF0F8]"><Facebook size={24} /></a>
              <a href="#" className="hover:text-[#CAF0F8]"><Twitter size={24} /></a>
              <a href="#" className="hover:text-[#CAF0F8]"><Instagram size={24} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} AllVaxConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;