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
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSuccessStoriesOpen, setIsSuccessStoriesOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  const userMenuRef = useRef<HTMLDivElement>(null);
  const successStoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on navigation
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (successStoriesRef.current && !successStoriesRef.current.contains(event.target as Node)) {
        setIsSuccessStoriesOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/success-stories?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
      setIsMobileSearchOpen(false);
    }
  };

  const handleCategorySelect = (category: string) => {
    navigate(`/success-stories?category=${category}`);
    setIsSuccessStoriesOpen(false);
    window.dispatchEvent(new CustomEvent('categorySelect', { detail: category }));
  };

  const handleSuccessStoriesClick = () => {
    // If not on home page, navigate to home first
    if (window.location.pathname !== '/') {
      navigate('/', { state: { scrollTo: 'success-stories' } });
    } else {
      // If on home page, scroll to section
      const element = document.getElementById('success-stories');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsSuccessStoriesOpen(false);
  };

  const successStoriesCategories = [
    { value: 'EdTech', label: 'EdTech' },
    { value: 'FinTech', label: 'FinTech' },
    { value: 'AgriTech', label: 'AgriTech' },
    { value: 'DeepTech', label: 'DeepTech' },
    { value: 'Robotics', label: 'Robotics' },
    { value: 'Waste Management', label: 'Waste Management' },
    { value: 'pink-zone', label: 'Pink Zone' },
    { value: 'campus-startups', label: 'Campus Startups' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    // If not on home page, navigate to home first
    if (window.location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      // If on home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolled 
          ? 'bg-transparent' 
          : 'bg-white/95 backdrop-blur-md border-b border-gray-100'
      }`}>
        <div className={`w-full transition-all duration-300 ease-out ${
          isScrolled 
            ? 'max-w-4xl mx-auto my-2 sm:my-3 rounded-full bg-white/95 backdrop-blur-xl shadow-xl border border-white/20' 
            : 'max-w-7xl mx-auto'
        } px-3 sm:px-4 lg:px-6 xl:px-8`}>
          <div className={`flex items-center justify-between w-full transition-all duration-300 min-w-0 ${
            isScrolled ? 'h-12 sm:h-14' : 'h-14 sm:h-16'
          }`}>
            
            {/* Logo - Fixed width to prevent flex issues */}
            <div className="flex-shrink-0">
              <Link 
                to="/" 
                className="flex items-center space-x-2 cursor-pointer group min-w-0"
                onClick={(e) => {
                  setIsMenuOpen(false);
                  // If already on home page, scroll to top instead of navigating
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                <div className={`bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-200 flex-shrink-0 ${
                  isScrolled ? 'w-6 h-6 sm:w-7 sm:h-7' : 'w-7 h-7 sm:w-8 sm:h-8'
                }`}>
                  <Sparkles className={`text-white ${
                    isScrolled ? 'w-3 h-3 sm:w-4 sm:h-4' : 'w-4 h-4'
                  }`} />
                </div>
                <span className={`font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent transition-all duration-300 whitespace-nowrap ${
                  isScrolled ? 'text-sm sm:text-base' : 'text-base sm:text-lg lg:text-xl'
                }`}>
                  Catalyseed
                </span>
              </Link>
            </div>

            {/* Desktop Navigation - Only show when not scrolled and on larger screens */}
            {!isScrolled && (
              <nav className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-4">
                <div className="flex items-center space-x-2 xl:space-x-4 overflow-hidden">
                  <div className="relative flex-shrink-0" ref={successStoriesRef}>
                    <button
                      onClick={() => setIsSuccessStoriesOpen(!isSuccessStoriesOpen)}
                      className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium text-sm whitespace-nowrap px-2 py-1"
                    >
                      <span>Success Stories</span>
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isSuccessStoriesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Success Stories Dropdown */}
                    {isSuccessStoriesOpen && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        <button
                          onClick={handleSuccessStoriesClick}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                        >
                          View Success Stories Section
                        </button>
                        <Link
                          to="/success-stories"
                          className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                          onClick={() => setIsSuccessStoriesOpen(false)}
                        >
                          All Success Stories
                        </Link>
                        <div className="border-t border-gray-100 my-2"></div>
                        <div className="px-4 py-1">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Categories</p>
                        </div>
                        {successStoriesCategories.map((category) => (
                          <button
                            key={category.value}
                            onClick={() => handleCategorySelect(category.value)}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                          >
                            {category.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => scrollToSection('internships')}
                    className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium text-sm whitespace-nowrap px-2 py-1 flex-shrink-0"
                  >
                   Internships
                  </button>
                   <button 
                    onClick={() => scrollToSection('placements')}
                    className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium text-sm whitespace-nowrap px-2 py-1 flex-shrink-0"
                  >
                   Placements
                  </button>
                   <button 
                    onClick={() => scrollToSection('hackathons')}
                    className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium text-sm whitespace-nowrap px-2 py-1 flex-shrink-0"
                  >
                   Events
                  </button>
                  <button 
                    onClick={() => scrollToSection('community')}
                    className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium text-sm whitespace-nowrap px-2 py-1 flex-shrink-0"
                  >
                    Community
                  </button>
                  <button 
                    onClick={() => scrollToSection('testimonials')}
                    className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium text-sm whitespace-nowrap px-2 py-1 flex-shrink-0"
                  >
                    Testimonials
                  </button>
                </div>
              </nav>
            )}

            {/* Right Side Actions - Fixed width container */}
            <div className="flex items-center justify-end flex-shrink-0 min-w-0" style={{ minWidth: isScrolled ? '120px' : '200px' }}>
              <div className="flex items-center space-x-1 sm:space-x-2 min-w-0">
                
                {/* Search Bar - Hidden on mobile, adaptive on larger screens */}
                <div className={`relative transition-all duration-300 hidden md:block flex-shrink-0 ${
                  isSearchFocused 
                    ? 'w-40 lg:w-48' 
                    : isScrolled 
                      ? 'w-16 lg:w-20' 
                      : 'w-28 lg:w-36'
                }`}>
                  <form onSubmit={handleSearch}>
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                      <Search className={`text-gray-400 ${isScrolled ? 'h-3 w-3' : 'h-4 w-4'}`} />
                    </div>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder={isScrolled ? "Search..." : "Search..."}
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
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className={`flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 hover:scale-105 ${
                        isScrolled 
                          ? 'px-2 py-1 space-x-1' 
                          : 'px-2 sm:px-3 py-1.5 space-x-1 sm:space-x-2'
                      }`}
                    >
                      <img
                        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=7c3aed&color=fff`}
                        alt={user.name}
                        className={`rounded-full object-cover flex-shrink-0 ${
                          isScrolled ? 'w-5 h-5' : 'w-6 h-6'
                        }`}
                      />
                      {!isScrolled && (
                        <span className="font-medium hidden sm:block text-xs max-w-16 truncate">
                          {user.name.split(' ')[0]}
                        </span>
                      )}
                    </button>
                    
                    {/* User Dropdown */}
                    {isUserMenuOpen && (
                      <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        <Link
                          to="/profile"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                        </Link>
                        <Link
                          to="/dashboard"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>Dashboard</span>
                        </Link>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={`hidden sm:flex items-center space-x-2 flex-shrink-0 ${isScrolled ? 'text-xs' : 'text-sm'}`}>
                    <button
                      onClick={onLoginClick}
                      className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 whitespace-nowrap px-2 py-1"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={onSignupClick}
                      className={`bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 hover:scale-105 font-medium whitespace-nowrap ${
                        isScrolled 
                          ? 'px-2 py-1' 
                          : 'px-3 py-1.5'
                      }`}
                    >
                      Sign Up
                    </button>
                  </div>
                )}

                {/* Mobile Menu Button */}
                <button
                  className={`lg:hidden p-1.5 rounded-lg transition-colors duration-200 hover:bg-gray-100 text-gray-700 mobile-menu-container flex-shrink-0 ${
                    isScrolled ? '' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(!isMenuOpen);
                  }}
                >
                  {isMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          
          {/* Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl mobile-menu-container overflow-hidden">
            <div className="flex flex-col h-full">
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0 min-w-0">
                <div className="flex items-center space-x-2 min-w-0 flex-1">
                  <div className="w-7 h-7 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent truncate">
                    Catalyseed
                  </span>
                </div>
                <button
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
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSearch(e);
                        }
                      }}
                      placeholder="Search success stories..."
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-sm"
                    />
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                      Navigation
                    </h3>
                    
                    <button 
                      onClick={() => handleNavigation('/success-stories')}
                      className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left"
                    >
                      <span className="text-lg flex-shrink-0">📚</span>
                      <span className="truncate">Success Stories</span>
                    </button>
                    
                    <button 
                      onClick={() => scrollToSection('internships')}
                      className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left"
                    >
                      <span className="text-lg flex-shrink-0">💼</span>
                      <span className="truncate">Internships</span>
                    </button>
                    
                    <button 
                      onClick={() => scrollToSection('placements')}
                      className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left"
                    >
                      <span className="text-lg flex-shrink-0">🎯</span>
                      <span className="truncate">Placements</span>
                    </button>
                    
                    <button 
                      onClick={() => scrollToSection('hackathons')}
                      className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left"
                    >
                      <span className="text-lg flex-shrink-0">📅</span>
                      <span className="truncate">Events</span>
                    </button>
                    
                    <button 
                      onClick={() => scrollToSection('community')}
                      className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left"
                    >
                      <span className="text-lg flex-shrink-0">👥</span>
                      <span className="truncate">Community</span>
                    </button>
                    
                    <button 
                      onClick={() => scrollToSection('testimonials')}
                      className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left"
                    >
                      <span className="text-lg flex-shrink-0">💬</span>
                      <span className="truncate">Testimonials</span>
                    </button>

                    {/* Categories Section */}
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                        Categories
                      </h3>
                      {successStoriesCategories.map((category) => (
                        <button
                          key={category.value}
                          onClick={() => {
                            handleCategorySelect(category.value);
                            setIsMenuOpen(false);
                          }}
                          className="w-full flex items-center px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left"
                        >
                          <span className="truncate">{category.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Auth Section */}
                    {!user && (
                      <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
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
                      </div>
                    )}

                    {/* User Actions */}
                    {user && (
                      <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
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
                        
                        <button 
                          onClick={() => {
                            handleNavigation('/profile');
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left"
                        >
                          <User className="w-5 h-5 flex-shrink-0" />
                          <span className="truncate">Profile</span>
                        </button>
                        
                        <button 
                          onClick={() => {
                            handleNavigation('/dashboard');
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left"
                        >
                          <Sparkles className="w-5 h-5 flex-shrink-0" />
                          <span className="truncate">Dashboard</span>
                        </button>
                        
                        <button 
                          onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium text-left"
                        >
                          <LogOut className="w-5 h-5 flex-shrink-0" />
                          <span className="truncate">Sign Out</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 truncate">Search</h2>
            <button
              onClick={() => setIsMobileSearchOpen(false)}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-lg flex-shrink-0"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search success stories..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;