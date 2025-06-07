import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../utils/axios';
import { setUserLoggedIn, setBoothLoggedIn, user_logged, booth_logged, loadAuthState } from '../utils/globalAuth';
import Navbar1 from '../components/Navbar1';
import Footer from '../components/Footer';
import { Mail, Lock, User, Phone, CreditCard, Building2, MapPin } from 'lucide-react';

interface LocationState {
  from?: {
    pathname: string;
  };
}

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [isBooth, setIsBooth] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    boothNumber: ''
  });

  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    adharNumber: '',
    contactNumber: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    boothName: '',
    boothAddress: '',
    boothContactNumber: ''
  });

  // Log login page mounted with location
  useEffect(() => {
    console.log("Login page mounted with location:", {
      pathname: location.pathname,
      state: location.state
    });
  }, [location]);

  // Check if already logged in on component mount
  useEffect(() => {
    // Reload auth state first
    loadAuthState();
    
    // Then check if already logged in
    if (user_logged) {
      navigate('/dashboard');
    } else if (booth_logged) {
      navigate('/booth/dashboard');
    }
  }, [navigate]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = isBooth ? '/booth/login' : '/user/login';
      const response = await api.post(endpoint, {
        ...(isBooth ? { boothNumber: loginData.boothNumber } : { email: loginData.email }),
        password: loginData.password
      });
      
      if (response.data.success) {
        if (isBooth) {
          // Set booth logged in
          setBoothLoggedIn(true);
          navigate('/booth/dashboard');
        } else {
          // Set user logged in
          setUserLoggedIn(true);
          navigate('/dashboard');
        }
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const endpoint = isBooth ? '/booth/register' : '/user/register';
      const response = await api.post(endpoint, {
        ...(isBooth ? {
          boothName: registerData.boothName,
          boothAddress: registerData.boothAddress,
          boothContactNumber: registerData.boothContactNumber,
          password: registerData.password
        } : {
          fullName: registerData.fullName,
          email: registerData.email,
          adharNumber: registerData.adharNumber,
          contactNumber: registerData.contactNumber,
          password: registerData.password,
          dateOfBirth: registerData.dateOfBirth
        })
      });
      
      if (response.data.success) {
        if (isBooth) {
          alert('Registration successful! Please check your email for login credentials.');
          setIsLogin(true);
        } else {
          // Set user logged in after successful registration
          setUserLoggedIn(true);
          navigate('/dashboard');
        }
      }
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E3F2FD] via-white to-[#E8F5E9]">
      <Navbar1 />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Side - Image and Text */}
            <div className="hidden md:flex flex-col justify-center items-center p-8 bg-gradient-to-br from-[#1976D2] to-[#2196F3] rounded-l-2xl text-white">
              <img 
                src="https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=800&q=80" 
                alt="Healthcare" 
                className="w-64 h-64 object-cover rounded-full mb-8 border-4 border-white shadow-lg"
              />
              <h2 className="text-2xl font-bold mb-4 text-center">Welcome to AllVaxConnect</h2>
              <p className="text-center text-white/90">
                Join our community of healthcare providers and patients working together for a healthier future.
              </p>
            </div>

            {/* Right Side - Form */}
            <div className="bg-white p-8 rounded-2xl shadow-2xl">
              {/* Toggle between User and Booth */}
              <div className="flex justify-center mb-6">
                <div className="bg-gray-100 p-1 rounded-lg">
                  <button
                    className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                      !isBooth 
                        ? 'bg-[#1976D2] text-white shadow-md' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    onClick={() => setIsBooth(false)}
                  >
                    User
                  </button>
                  <button
                    className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                      isBooth 
                        ? 'bg-[#1976D2] text-white shadow-md' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    onClick={() => setIsBooth(true)}
                  >
                    Booth Admin
                  </button>
                </div>
              </div>

              {/* Toggle between Login and Register */}
              <div className="flex justify-center mb-8">
                <button
                  className={`px-6 py-2 transition-all duration-300 ${
                    isLogin 
                      ? 'text-[#1976D2] border-b-2 border-[#1976D2] font-semibold' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
                <button
                  className={`px-6 py-2 transition-all duration-300 ${
                    !isLogin 
                      ? 'text-[#1976D2] border-b-2 border-[#1976D2] font-semibold' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setIsLogin(false)}
                >
                  Register
                </button>
              </div>

              {isLogin ? (
                // Login Form
                <form onSubmit={handleLoginSubmit} className="space-y-6">
                  {isBooth ? (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Booth Number</label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          value={loginData.boothNumber}
                          onChange={(e) => setLoginData({ ...loginData, boothNumber: e.target.value })}
                          className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1976D2] focus:border-[#1976D2] transition-all duration-300"
                          placeholder="Enter booth number"
                          required
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="email"
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1976D2] focus:border-[#1976D2] transition-all duration-300"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1976D2] focus:border-[#1976D2] transition-all duration-300"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#1976D2] to-[#2196F3] text-white py-3 rounded-lg hover:from-[#1565C0] hover:to-[#1976D2] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Login
                  </button>
                </form>
              ) : (
                // Registration Form
                <form onSubmit={handleRegisterSubmit} className="space-y-6">
                  {isBooth ? (
                    // Booth Registration
                    <>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Booth Name</label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="text"
                            value={registerData.boothName}
                            onChange={(e) => setRegisterData({ ...registerData, boothName: e.target.value })}
                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1976D2] focus:border-[#1976D2] transition-all duration-300"
                            placeholder="Enter booth name"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Booth Address</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="text"
                            value={registerData.boothAddress}
                            onChange={(e) => setRegisterData({ ...registerData, boothAddress: e.target.value })}
                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1976D2] focus:border-[#1976D2] transition-all duration-300"
                            placeholder="Enter booth address"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="tel"
                            value={registerData.boothContactNumber}
                            onChange={(e) => setRegisterData({ ...registerData, boothContactNumber: e.target.value })}
                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1976D2] focus:border-[#1976D2] transition-all duration-300"
                            placeholder="Enter contact number"
                            required
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    // User Registration
                    <>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="text"
                            value={registerData.fullName}
                            onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1976D2] focus:border-[#1976D2] transition-all duration-300"
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="email"
                            value={registerData.email}
                            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1976D2] focus:border-[#1976D2] transition-all duration-300"
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Aadhar Number</label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="text"
                            value={registerData.adharNumber}
                            onChange={(e) => setRegisterData({ ...registerData, adharNumber: e.target.value })}
                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1976D2] focus:border-[#1976D2] transition-all duration-300"
                            placeholder="Enter your Aadhar number"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="tel"
                            value={registerData.contactNumber}
                            onChange={(e) => setRegisterData({ ...registerData, contactNumber: e.target.value })}
                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1976D2] focus:border-[#1976D2] transition-all duration-300"
                            placeholder="Enter your contact number"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input
                          type="date"
                          value={registerData.dateOfBirth}
                          onChange={(e) => setRegisterData({ ...registerData, dateOfBirth: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1976D2] focus:border-[#1976D2] transition-all duration-300"
                          required
                        />
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1976D2] focus:border-[#1976D2] transition-all duration-300"
                        placeholder="Create a password"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="password"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1976D2] focus:border-[#1976D2] transition-all duration-300"
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#1976D2] to-[#2196F3] text-white py-3 rounded-lg hover:from-[#1565C0] hover:to-[#1976D2] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Register
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;