import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import SuccessStories from './components/SuccessStories';
import Internships from './components/Internships';
import Placements from './components/Placements';
import Hackathons from './components/Hackathons';
import Community from './components/Community';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AllSuccessStories from './components/AllSuccessStories';
import StoryDetailPage from './components/StoryDetailPage';
import AllInternships from './components/AllInternships';
import AllPlacements from './components/AllPlacements';
import AllHackathons from './components/AllHackathons';
import UserProfile from './components/UserProfile';
import DashboardLayout from './components/dashboard/DashboardLayout';
import LoginModal from './components/auth/LoginModal';
import SignupModal from './components/auth/SignupModal';
import ProfileCompletionModal from './components/auth/ProfileCompletionModal';
import { useAuth } from './context/AuthContext';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Hero />
      <SuccessStories />
      <Internships />
      <Placements />
      <Hackathons />
      <Community />
      <Testimonials />
    </div>
  );
};

const AppContent = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const location = useLocation();
  
  // Check if current route is dashboard
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Conditionally render header - exclude from dashboard */}
      {!isDashboardRoute && (
        <Header 
          onLoginClick={() => setShowLoginModal(true)}
          onSignupClick={() => setShowSignupModal(true)}
        />
      )}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/success-stories" element={<AllSuccessStories />} />
        <Route path="/success-stories/:id" element={<StoryDetailPage />} />
        <Route path="/internships" element={<AllInternships />} />
        <Route path="/placements" element={<AllPlacements />} />
        <Route path="/events" element={<AllHackathons />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/dashboard/*" element={<DashboardLayout />} />
      </Routes>
      
      {/* Conditionally render footer - exclude from dashboard */}
      {!isDashboardRoute && <Footer />}
      
      
      {/* Auth Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignup={() => {
          setShowLoginModal(false);
          setShowSignupModal(true);
        }}
      />
      
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSwitchToLogin={() => {
          setShowSignupModal(false);
          setShowLoginModal(true);
        }}
      />
      
      <ProfileCompletionModal />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="overflow-x-hidden">
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;