import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Calendar, Settings, LogOut, 
  BarChart3, UserCheck, Building, Award, DollarSign,
  Briefcase, Mic, Target, MessageSquare, Bell, HelpCircle,
  Sparkles, TrendingUp, Eye, Lightbulb
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getRoleIcon = (role: string) => {
    const icons = {
      admin: UserCheck,
      startup: TrendingUp,
      institute: Building,
      investor: Target,
      general: Users
    };
    return icons[role as keyof typeof icons] || UserCheck;
  };

  const getRoleColor = (role: string) => {
    const colors = {
      admin: 'from-red-500 to-red-600',
      startup: 'from-purple-500 to-purple-600',
      institute: 'from-blue-500 to-blue-600',
      investor: 'from-green-500 to-green-600',
      general: 'from-gray-500 to-gray-600'
    };
    return colors[role as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getMenuItems = () => {
    const commonItems = [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
      { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
      { icon: MessageSquare, label: 'Forum', path: '/dashboard/forum' },
      { icon: Bell, label: 'Notifications', path: '/dashboard/notifications' },
    ];

    const roleSpecificItems = {
      admin: [
        { icon: Users, label: 'User Management', path: '/dashboard/users' },
        { icon: Calendar, label: 'All Events', path: '/dashboard/events' },
        { icon: Settings, label: 'Platform Settings', path: '/dashboard/platform-settings' },
      ],
      startup: [
        { icon: Eye, label: 'My Profile', path: '/dashboard/profile' },
        { icon: Calendar, label: 'My Events', path: '/dashboard/events' },
        { icon: Users, label: 'Network', path: '/dashboard/network' },
      ],
      institute: [
        { icon: Lightbulb, label: 'Student Startups', path: '/dashboard/startups' },
        { icon: Calendar, label: 'My Events', path: '/dashboard/events' },
        { icon: Users, label: 'Partnerships', path: '/dashboard/partnerships' },
      ],
      investor: [
        { icon: Briefcase, label: 'Portfolio', path: '/dashboard/portfolio' },
        { icon: Target, label: 'Opportunities', path: '/dashboard/opportunities' },
        { icon: DollarSign, label: 'Investments', path: '/dashboard/investments' },
      ],
      general: [
        { icon: Eye, label: 'My Profile', path: '/dashboard/profile' },
        { icon: Users, label: 'Network', path: '/dashboard/network' },
      ]
    };

    return [
      ...commonItems,
      ...roleSpecificItems[user?.role as keyof typeof roleSpecificItems] || []
    ];
  };

  const menuItems = getMenuItems();
  const RoleIcon = getRoleIcon(user?.role || 'general');

  if (!user) return null;

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col shadow-lg">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 flex justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Catalyseed
          </span>
        </div>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className={`bg-gradient-to-r ${getRoleColor(user.role)} w-12 h-12 rounded-xl flex items-center justify-center`}>
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-xl object-cover" />
            ) : (
              <RoleIcon className="w-6 h-6 text-white" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
            <p className="text-sm text-gray-500 capitalize">{user.role}</p>
            <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${
              user.role === 'admin' ? 'bg-red-100 text-red-800' :
              user.role === 'startup' ? 'bg-purple-100 text-purple-800' :
              user.role === 'investor' ? 'bg-green-100 text-green-800' :
              user.role === 'institute' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {user.status}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <button
          onClick={() => navigate('/dashboard/settings')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            location.pathname === '/dashboard/settings'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Settings className={`w-5 h-5 ${location.pathname === '/dashboard/settings' ? 'text-white' : 'text-gray-500'}`} />
          <span className="font-medium">Settings</span>
        </button>
        
        <button
          onClick={() => navigate('/dashboard/help')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            location.pathname === '/dashboard/help'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <HelpCircle className={`w-5 h-5 ${location.pathname === '/dashboard/help' ? 'text-white' : 'text-gray-500'}`} />
          <span className="font-medium">Help & Support</span>
        </button>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;