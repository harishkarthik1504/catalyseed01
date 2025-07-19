import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import DashboardSidebar from './DashboardSidebar';
import AdminDashboard from './AdminDashboard';
import StartupDashboard from './StartupDashboard';
import InvestorDashboard from './InvestorDashboard';
import InstituteDashboard from './InstituteDashboard';
import GeneralDashboard from './GeneralDashboard';
import AnalyticsDashboard from './AnalyticsDashboard';
import ForumDashboard from './ForumDashboard';
import NotificationsDashboard from './NotificationsDashboard';
import SettingsDashboard from './SettingsDashboard';
import HelpDashboard from './HelpDashboard';

const DashboardLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please sign in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  const renderMainDashboard = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'startup':
        return <StartupDashboard />;
      case 'investor':
        return <InvestorDashboard />;
      case 'institute':
        return <InstituteDashboard />;
      default:
        return <GeneralDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-full z-30">
        <DashboardSidebar />
      </div>
      
      {/* Main Content Area with left margin to account for fixed sidebar */}
      <div className="flex-1 ml-64">
        <div className="min-h-screen">
          <div className="p-8">
            <Routes>
              <Route path="/" element={renderMainDashboard()} />
              <Route path="/analytics" element={<AnalyticsDashboard />} />
              <Route path="/forum" element={<ForumDashboard />} />
              <Route path="/notifications" element={<NotificationsDashboard />} />
              <Route path="/settings" element={<SettingsDashboard />} />
              <Route path="/help" element={<HelpDashboard />} />
              {/* Role-specific routes */}
              {user.role === 'admin' && (
                <>
                  <Route path="/users" element={<AdminUserManagement />} />
                  <Route path="/events" element={<AdminEventManagement />} />
                  <Route path="/platform-settings" element={<AdminPlatformSettings />} />
                </>
              )}
              {user.role === 'startup' && (
                <>
                  <Route path="/profile" element={<StartupProfile />} />
                  <Route path="/events" element={<StartupEvents />} />
                  <Route path="/network" element={<StartupNetwork />} />
                </>
              )}
              {user.role === 'institute' && (
                <>
                  <Route path="/startups" element={<InstituteStartups />} />
                  <Route path="/events" element={<InstituteEvents />} />
                  <Route path="/partnerships" element={<InstitutePartnerships />} />
                </>
              )}
              {user.role === 'investor' && (
                <>
                  <Route path="/portfolio" element={<InvestorPortfolio />} />
                  <Route path="/opportunities" element={<InvestorOpportunities />} />
                  <Route path="/investments" element={<InvestorInvestments />} />
                </>
              )}
              {user.role === 'general' && (
                <>
                  <Route path="/profile" element={<GeneralProfile />} />
                  <Route path="/network" element={<GeneralNetwork />} />
                </>
              )}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

// Role-specific components (placeholders for now)
const AdminUserManagement = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <p className="text-gray-600">Manage platform users, verify accounts, and handle user permissions.</p>
    </div>
  </div>
);

const AdminEventManagement = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <p className="text-gray-600">Oversee all platform events, approve submissions, and manage event content.</p>
    </div>
  </div>
);

const AdminPlatformSettings = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <p className="text-gray-600">Configure platform-wide settings, features, and system preferences.</p>
    </div>
  </div>
);

const StartupProfile = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Startup Profile</h1>
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <p className="text-gray-600">Manage your startup profile, showcase your products, and update company information.</p>
    </div>
  </div>
);

const StartupEvents = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <p className="text-gray-600">View registered events, manage submissions, and track your event participation.</p>
    </div>
  </div>
);

const StartupNetwork = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Network</h1>
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <p className="text-gray-600">Connect with investors, mentors, and other startups in the ecosystem.</p>
    </div>
  </div>
);

const InstituteStartups = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Student Startups</h1>
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <p className="text-gray-600">Manage and showcase student startups from your institution.</p>
    </div>
  </div>
);

const InstituteEvents = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Institute Events</h1>
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <p className="text-gray-600">Create and manage hackathons, workshops, and innovation events.</p>
    </div>
  </div>
);

const InstitutePartnerships = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Partnerships</h1>
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <p className="text-gray-600">Manage industry partnerships and collaboration opportunities.</p>
    </div>
  </div>
);

const InvestorPortfolio = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <p className="text-gray-600">Track your investment portfolio and monitor startup performance.</p>
    </div>
  </div>
);

const InvestorOpportunities = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Investment Opportunities</h1>
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <p className="text-gray-600">Discover new investment opportunities and evaluate startups.</p>
    </div>
  </div>
);

const InvestorInvestments = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Investments</h1>
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <p className="text-gray-600">Manage your investment activities and track deal flow.</p>
    </div>
  </div>
);

const GeneralProfile = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <p className="text-gray-600">Manage your personal profile and account settings.</p>
    </div>
  </div>
);

const GeneralNetwork = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">My Network</h1>
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <p className="text-gray-600">Connect with other community members and build your network.</p>
    </div>
  </div>
);

export default DashboardLayout;