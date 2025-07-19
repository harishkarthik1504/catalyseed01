import React, { useState } from 'react';
import { 
  TrendingUp, Users, Calendar, Eye, BarChart3, 
  PieChart, Activity, Target, DollarSign
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AnalyticsDashboard = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('7d');

  // Mock data for charts
  const lineChartData = [
    { name: 'Jan', value: 120 },
    { name: 'Feb', value: 180 },
    { name: 'Mar', value: 240 },
    { name: 'Apr', value: 320 },
    { name: 'May', value: 450 },
    { name: 'Jun', value: 580 },
  ];

  const barChartData = [
    { name: 'Events', value: 45 },
    { name: 'Posts', value: 32 },
    { name: 'Connections', value: 28 },
    { name: 'Views', value: 67 },
  ];

  const pieChartData = [
    { name: 'EdTech', value: 35, color: '#3b82f6' },
    { name: 'FinTech', value: 25, color: '#10b981' },
    { name: 'HealthTech', value: 20, color: '#8b5cf6' },
    { name: 'AgriTech', value: 20, color: '#f59e0b' },
  ];

  const areaChartData = [
    { name: 'Week 1', value: 1200 },
    { name: 'Week 2', value: 1800 },
    { name: 'Week 3', value: 2400 },
    { name: 'Week 4', value: 3200 },
  ];

  const stats = [
    {
      title: 'Total Engagement',
      value: '2,847',
      change: '+12.5%',
      icon: Activity,
      color: 'bg-blue-500'
    },
    {
      title: 'Profile Views',
      value: '1,234',
      change: '+8.2%',
      icon: Eye,
      color: 'bg-green-500'
    },
    {
      title: 'Network Growth',
      value: '456',
      change: '+15.3%',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      title: 'Event Participation',
      value: '89',
      change: '+23.1%',
      icon: Calendar,
      color: 'bg-orange-500'
    }
  ];

  const SimpleLineChart = ({ data }: { data: any[] }) => (
    <div className="h-64 flex items-end space-x-2">
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div 
            className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t"
            style={{ height: `${(item.value / Math.max(...data.map(d => d.value))) * 200}px` }}
          />
          <span className="text-xs text-gray-600 mt-2">{item.name}</span>
        </div>
      ))}
    </div>
  );

  const SimpleBarChart = ({ data }: { data: any[] }) => (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index} className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-700 w-20">{item.name}</span>
          <div className="flex-1 bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
              style={{ width: `${(item.value / Math.max(...data.map(d => d.value))) * 100}%` }}
            />
          </div>
          <span className="text-sm text-gray-600 w-8">{item.value}</span>
        </div>
      ))}
    </div>
  );

  const SimplePieChart = ({ data }: { data: any[] }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    return (
      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const strokeDasharray = `${percentage} ${100 - percentage}`;
              const strokeDashoffset = data.slice(0, index).reduce((sum, prev) => sum + (prev.value / total) * 100, 0);
              
              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="15.915"
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth="8"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={-strokeDashoffset}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{total}</div>
              <div className="text-xs text-gray-600">Total</div>
            </div>
          </div>
        </div>
        <div className="ml-6 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-gray-700">{item.name}</span>
              <span className="text-sm font-medium text-gray-900">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const SimpleAreaChart = ({ data }: { data: any[] }) => (
    <div className="h-64 relative">
      <svg className="w-full h-full" viewBox="0 0 400 200">
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * 350 + 25;
          const y = 180 - (item.value / Math.max(...data.map(d => d.value))) * 150;
          const nextX = index < data.length - 1 ? ((index + 1) / (data.length - 1)) * 350 + 25 : x;
          const nextY = index < data.length - 1 ? 180 - (data[index + 1].value / Math.max(...data.map(d => d.value))) * 150 : y;
          
          return (
            <g key={index}>
              {index < data.length - 1 && (
                <line x1={x} y1={y} x2={nextX} y2={nextY} stroke="#8b5cf6" strokeWidth="2" />
              )}
              <circle cx={x} cy={y} r="4" fill="#8b5cf6" />
              <text x={x} y="195" textAnchor="middle" className="text-xs fill-gray-600">
                {item.name}
              </text>
            </g>
          );
        })}
        <polygon
          points={`25,180 ${data.map((item, index) => {
            const x = (index / (data.length - 1)) * 350 + 25;
            const y = 180 - (item.value / Math.max(...data.map(d => d.value))) * 150;
            return `${x},${y}`;
          }).join(' ')} 375,180`}
          fill="url(#areaGradient)"
        />
      </svg>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your performance and engagement metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200">
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-1 text-sm font-medium text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Growth Trend</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <SimpleLineChart data={lineChartData} />
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Activity Breakdown</h3>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <SimpleBarChart data={barChartData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Interest Distribution</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <SimplePieChart data={pieChartData} />
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Engagement Over Time</h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <SimpleAreaChart data={areaChartData} />
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-xl">
            <h4 className="font-semibold text-blue-900 mb-2">Peak Engagement</h4>
            <p className="text-blue-700 text-sm">Your posts perform best on Tuesday evenings</p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <h4 className="font-semibold text-green-900 mb-2">Growing Network</h4>
            <p className="text-green-700 text-sm">15% increase in connections this month</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl">
            <h4 className="font-semibold text-purple-900 mb-2">Popular Content</h4>
            <p className="text-purple-700 text-sm">EdTech topics generate the most engagement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;