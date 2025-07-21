import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Search, Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick, onSignupClick }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSuccessStoriesOpen, setIsSuccessStoriesOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const successStoriesRef = useRef<HTMLDivElement>(null);

  const successStoriesCategories = [
    'EdTech', 'FinTech', 'AgriTech', 'DeepTech', 'Robotics',
    'Waste Management', 'Pink Zone', 'Campus Startups'
  ];

  const navItems = [
    { id: 'success-stories', label: 'Success Stories', hasDropdown: true },
    { id: 'internships', label: 'Internships' },
    { id: 'placements', label: 'Placements' },
    { id: 'hackathons', label: 'Events' },
    { id: 'community', label: 'Community' },
    { id: 'testimonials', label: 'Testimonials' }
  ];

  const mobileNavItems = [
    { icon: '📚', label: 'Success Stories', action: () => navigate('/success-stories') },
    { icon: '💼', label: 'Internships', action: () => scrollToSection('internships') },
    { icon: '🎯', label: 'Placements', action: () => scrollToSection('placements') },
    { icon: '📅', label: 'Events', action: () => scrollToSection('hackathons') },
    { icon: '👥', label: 'Community', action: () => scrollToSection('community') },
    { icon: '💬', label: 'Testimonials', action: () => scrollToSection('testimonials') }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setIsUserMenuOpen(false);
      }

      if (successStoriesRef.current && !successStoriesRef.current.contains(target)) {
        setIsSuccessStoriesOpen(false);
      }

      if (
        isMenuOpen &&
        !target.closest('.mobile-menu-container') &&
        !target.closest('[data-mobile-menu-trigger]')
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isUserMenuOpen || isMenuOpen || isSuccessStoriesOpen) {
      document.addEventListener('click', handleClickOutside, true);
      return () => document.removeEventListener('click', handleClickOutside, true);
    }
  }, [isMenuOpen, isUserMenuOpen, isSuccessStoriesOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    if (window.location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
    closeAllMenus();
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsSuccessStoriesOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/success-stories?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  const handleCategorySelect = (category: string) => {
    navigate(`/success-stories?category=${category}`);
    setIsSuccessStoriesOpen(false);
    closeAllMenus();
  };

  const handleSuccessStoriesNavigation = () => {
    if (window.location.pathname !== '/') {
      navigate('/', { state: { scrollTo: 'success-stories' } });
    } else {
      document.getElementById('success-stories')?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsSuccessStoriesOpen(false);
    closeAllMenus();
  };

  const handleSuccessStoriesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSuccessStoriesOpen(!isSuccessStoriesOpen);
    setIsUserMenuOpen(false);
  };

  const handleUserMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsSuccessStoriesOpen(false);
  };

  const handleMobileMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSuccessStoriesOpen(false);
    setIsUserMenuOpen(false);
  };

  const headerClass = `fixed top-0 left-0 right-0 transition-all duration-300 ${
    isScrolled ? 'bg-transparent z-[100]' : 'bg-white/95 backdrop-blur-md border-b border-gray-100 z-50'
  }`;

  const containerClass = `w-full transition-all duration-300 ${
    isScrolled
      ? 'max-w-4xl mx-auto my-2 sm:my-3 rounded-full bg-white/95 backdrop-blur-xl shadow-xl border border-white/20'
      : 'max-w-7xl mx-auto'
  } px-3 sm:px-4 lg:px-6 xl:px-8`;

  const heightClass = `flex items-center justify-between w-full transition-all duration-300 min-w-0 ${
    isScrolled ? 'h-12 sm:h-14' : 'h-14 sm:h-16'
  }`;

  const logoSizeClass = isScrolled ? 'w-6 h-6 sm:w-7 sm:h-7' : 'w-7 h-7 sm:w-8 sm:h-8';
  const logoIconSizeClass = isScrolled ? 'w-3 h-3 sm:w-4 sm:h-4' : 'w-4 h-4';
  const logoTextSizeClass = isScrolled ? 'text-sm sm:text-base' : 'text-base sm:text-lg lg:text-xl';

  return (
    <>
      <header className={headerClass}>
        <div className={containerClass}>
          <div className={heightClass}>
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="flex items-center space-x-2 cursor-pointer group min-w-0"
                onClick={(e) => {
                  closeAllMenus();
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                <div
                  className={`bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-200 flex-shrink-0 ${logoSizeClass}`}
                >
                  <Sparkles className={`text-white ${logoIconSizeClass}`} />
                </div>
                <span
                  className={`font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent transition-all duration-300 whitespace-nowrap ${logoTextSizeClass}`}
                >
                  Catalyseed
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            {!isScrolled && (
              <nav className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-4">
                <div className="flex items-center space-x-2 xl:space-x-4 overflow-visible">
                  {/* Success Stories Dropdown - Click Only */}
                  <div className="relative flex-shrink-0" ref={successStoriesRef}>
                    <button
                      type="button"
                      onClick={handleSuccessStoriesClick}
                      className={`flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium text-sm whitespace-nowrap px-3 py-2 rounded-lg hover:bg-gray-50 ${
                        isSuccessStoriesOpen ? 'text-purple-600 bg-purple-50' : ''
                      }`}
                    >
                      <span>Success Stories</span>
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${
                          isSuccessStoriesOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu with Portal-like behavior */}
                    {isSuccessStoriesOpen && (
                      <>
                        {/* Backdrop */}
                        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[998]" onClick={() => setIsSuccessStoriesOpen(false)} />
                        
                        {/* Dropdown Content */}
                        <div
                          className="absolute top-full left-0 mt-1 w-72 bg-white rounded-lg shadow-2xl border border-gray-200 z-[999] overflow-hidden"
                          style={{
                            animation: 'fadeInDown 0.2s ease-out forwards',
                            transform: 'translateY(-10px)',
                            opacity: 0
                          }}
                        >
                          {/* Main Options */}
                          <div className="p-2">
                            <button
                              type="button"
                              onClick={handleSuccessStoriesNavigation}
                              className="w-full text-left px-4 py-3 text-gray-800 hover:bg-purple-50 hover:text-purple-600 transition-colors font-semibold rounded-lg border-b border-gray-100 mb-2 flex items-center space-x-2"
                            >
                              <span>📊</span>
                              <span>View Success Stories Section</span>
                            </button>

                            <Link
                              to="/success-stories"
                              className="flex items-center space-x-2 px-4 py-3 text-gray-800 hover:bg-purple-50 hover:text-purple-600 transition-colors font-semibold rounded-lg border-b border-gray-100 mb-2"
                              onClick={closeAllMenus}
                            >
                              <span>📚</span>
                              <span>All Success Stories</span>
                            </Link>
                          </div>

                          {/* Categories Header */}
                          <div className="px-6 py-2 bg-gradient-to-r from-purple-50 to-pink-50 border-y border-gray-100">
                            <p className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                              Browse by Category
                            </p>
                          </div>

                          {/* Categories Grid */}
                          <div className="p-2 max-h-60 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-1">
                              {successStoriesCategories.map((category) => (
                                <button
                                  key={category}
                                  type="button"
                                  onClick={() => handleCategorySelect(category)}
                                  className="text-left px-3 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-200 rounded-lg font-medium flex items-center space-x-2"
                                >
                                  <span>
                                    {category === 'EdTech' && '🎓'}
                                    {category === 'FinTech' && '💰'}
                                    {category === 'AgriTech' && '🌱'}
                                    {category === 'DeepTech' && '🔬'}
                                    {category === 'Robotics' && '🤖'}
                                    {category === 'Waste Management' && '♻️'}
                                    {category === 'Pink Zone' && '💗'}
                                    {category === 'Campus Startups' && '🏫'}
                                  </span>
                                  <span>{category}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Other Navigation Items */}
                  {navItems.slice(1).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium text-sm whitespace-nowrap px-3 py-2 flex-shrink-0 rounded-lg hover:bg-gray-50"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </nav>
            )}

            {/* Right Side Actions */}
            <div className="flex items-center justify-end flex-shrink-0 min-w-0" style={{ minWidth: isScrolled ? '120px' : '200px' }}>
              <div className="flex items-center space-x-1 sm:space-x-2 min-w-0">
                
                {/* Search Bar */}
                <div className={`relative transition-all duration-300 hidden md:block flex-shrink-0 ${
                  isSearchFocused ? 'w-40 lg:w-48' : isScrolled ? 'w-16 lg:w-20' : 'w-28 lg:w-36'
                }`}>
                  <form onSubmit={handleSearch}>
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                      <Search className={`text-gray-400 ${isScrolled ? 'h-3 w-3' : 'h-4 w-4'}`} />
                    </div>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search..."
                      className={`block w-full border rounded-lg transition-all duration-200 ${
                        isScrolled 
                          ? 'pl-6 pr-2 py-1 text-xs border-gray-200 focus:ring-1 focus:ring-purple-500 focus:border-transparent bg-white' 
                          : 'pl-7 pr-2 py-1.5 text-xs border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white'
                      }`}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                    />
                  </form>
                </div>

                {/* User Profile/Auth Buttons */}
                {user ? (
                  <div className="relative flex-shrink-0" ref={userMenuRef}>
                    <button
                      type="button"
                      onClick={handleUserMenuClick}
                      className={`flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 hover:scale-105 ${
                        isScrolled ? 'px-2 py-1 space-x-1' : 'px-2 sm:px-3 py-1.5 space-x-1 sm:space-x-2'
                      } ${isUserMenuOpen ? 'ring-2 ring-purple-300' : ''}`}
                    >
                      <img
                        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=7c3aed&color=fff`}
                        alt={user.name}
                        className={`rounded-full object-cover flex-shrink-0 ${isScrolled ? 'w-5 h-5' : 'w-6 h-6'}`}
                      />
                      {!isScrolled && (
                        <span className="font-medium hidden sm:block text-xs max-w-16 truncate">
                          {user.name.split(' ')[0]}
                        </span>
                      )}
                    </button>
                    
                    {/* User Dropdown with higher z-index */}
                    {isUserMenuOpen && (
                      <>
                        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[998]" onClick={() => setIsUserMenuOpen(false)} />
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-[999]">
                          {[
                            { to: '/profile', icon: User, label: 'Profile' },
                            { to: '/dashboard', icon: Sparkles, label: 'Dashboard' }
                          ].map(({ to, icon: Icon, label }) => (
                            <Link
                              key={to}
                              to={to}
                              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                              onClick={closeAllMenus}
                            >
                              <Icon className="w-4 h-4" />
                              <span>{label}</span>
                            </Link>
                          ))}
                          <div className="border-t border-gray-100 my-1"></div>
                          <button
                            type="button"
                            onClick={() => {
                              logout();
                              closeAllMenus();
                              navigate('/');
                            }}
                            className="flex items-center space-x-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className={`hidden sm:flex items-center space-x-2 flex-shrink-0 ${isScrolled ? 'text-xs' : 'text-sm'}`}>
                    <button
                      type="button"
                      onClick={onLoginClick}
                      className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 whitespace-nowrap px-2 py-1"
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={onSignupClick}
                      className={`bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 hover:scale-105 font-medium whitespace-nowrap ${
                        isScrolled ? 'px-2 py-1' : 'px-3 py-1.5'
                      }`}
                    >
                      Sign Up
                    </button>
                  </div>
                )}

                {/* Mobile Menu Button */}
                <button
                  type="button"
                  data-mobile-menu-trigger
                  className="lg:hidden p-1.5 rounded-lg transition-colors duration-200 hover:bg-gray-100 text-gray-700 flex-shrink-0"
                  onClick={handleMobileMenuClick}
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[101] lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          
          <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl mobile-menu-container overflow-hidden animate-in slide-in-from-right duration-300">
            <div className="flex flex-col h-full">
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
                <div className="flex items-center space-x-2 min-w-0 flex-1">
                  <div className="w-7 h-7 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent truncate">
                    Catalyseed
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                      placeholder="Search success stories..."
                      className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-sm"
                    />
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                      Navigation
                    </h3>
                    
                    {mobileNavItems.map((item, index) => (
                      <button 
                        key={index}
                        onClick={item.action}
                        className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left"
                      >
                        <span className="text-lg flex-shrink-0">{item.icon}</span>
                        <span className="truncate">{item.label}</span>
                      </button>
                    ))}

                    {/* Categories Section */}
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                        Categories
                      </h3>
                      {successStoriesCategories.map((category) => (
                        <button
                          key={category}
                          onClick={() => handleCategorySelect(category)}
                          className="w-full flex items-center px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left"
                        >
                          <span className="truncate">{category}</span>
                        </button>
                      ))}
                    </div>

                    {/* Auth/User Section */}
                    <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                      {user ? (
                        <>
                          <div className="px-3 py-2">
                            <div className="flex items-center space-x-3 min-w-0">
                              <img
                                src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=7c3aed&color=fff`}
                                alt={user.name}
                                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="font-medium text-gray-900 truncate">{user.name}</p>
                                <p className="text-sm text-gray-500 capitalize truncate">{user.role || 'User'}</p>
                              </div>
                            </div>
                          </div>
                          {[
                            { to: '/profile', icon: User, label: 'Profile' },
                            { to: '/dashboard', icon: Sparkles, label: 'Dashboard' }
                          ].map(({ to, icon: Icon, label }) => (
                            <button
                              key={to}
                              onClick={() => {
                                navigate(to);
                                setIsMenuOpen(false);
                              }}
                              className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left"
                            >
                              <Icon className="w-5 h-5 flex-shrink-0" />
                              <span className="truncate">{label}</span>
                            </button>
                          ))}
                          <button
                            onClick={() => {
                              logout();
                              setIsMenuOpen(false);
                              navigate('/');
                            }}
                            className="w-full flex items-center space-x-3 px-3 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium text-left"
                          >
                            <LogOut className="w-5 h-5 flex-shrink-0" />
                            <span className="truncate">Sign Out</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                            Account
                          </h3>
                          <button
                            onClick={() => {
                              onLoginClick();
                              setIsMenuOpen(false);
                            }}
                            className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left"
                          >
                            <User className="w-5 h-5 flex-shrink-0" />
                            <span className="truncate">Sign In</span>
                          </button>
                          <button
                            onClick={() => {
                              onSignupClick();
                              setIsMenuOpen(false);
                            }}
                            className="w-full flex items-center space-x-3 px-3 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium text-left"
                          >
                            <Sparkles className="w-5 h-5 flex-shrink-0" />
                            <span className="truncate">Sign Up</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add custom CSS for dropdown animation */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Header;