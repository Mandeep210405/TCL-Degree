import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import TravelVaccine from './pages/TravelVaccine';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FamilyList from './pages/FamilyList';
import Schedule from './pages/Schedule';
import Suggestions from './pages/Suggestions';
import Profile from './pages/Profile';
import BoothDashboard from './pages/BoothDashboard';
import BookingApproval from './pages/BookingApproval';
import { loadAuthState } from './utils/globalAuth';
import Preloader from './components/Preloader';
import './styles/animations.css';

// Initialize auth state when app starts
loadAuthState();

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Reduced from 2000ms to 1000ms for faster loading

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-[#F5F5F5]">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/travel-vaccine" element={<TravelVaccine />} />
          <Route path="/login" element={<Login />} />
          
          {/* User protected routes */}
          <Route path="/dashboard" element={<UserProtectedRoute><Dashboard /></UserProtectedRoute>} />
          <Route path="/family" element={<UserProtectedRoute><FamilyList /></UserProtectedRoute>} />
          <Route path="/schedule" element={<UserProtectedRoute><Schedule /></UserProtectedRoute>} />
          <Route path="/suggestions" element={<UserProtectedRoute><Suggestions /></UserProtectedRoute>} />
          <Route path="/profile" element={<UserProtectedRoute><Profile /></UserProtectedRoute>} />
          
          {/* Booth protected routes */}
          <Route path="/booth/dashboard" element={<BoothProtectedRoute><BoothDashboard /></BoothProtectedRoute>} />
          <Route path="/booth/approvals" element={<BoothProtectedRoute><BookingApproval /></BoothProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

// Simple inline protected route components
const UserProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Load auth state on each route access
  const { user_logged } = loadAuthState();
  
  if (!user_logged) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const BoothProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Load auth state on each route access
  const { booth_logged } = loadAuthState();
  
  if (!booth_logged) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default App;