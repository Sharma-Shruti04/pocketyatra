import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  FaHome,
  FaMapMarkerAlt,
  FaPlane,
  FaBuilding,
  FaCompass,
  FaUserCircle,
  FaDollarSign,
  FaTree,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaSun,
  FaMoon
} from "react-icons/fa";

// Navigation items (excluding Profile, which is now in the corner dropdown)
const navigationItems = [
  { title: "Home", url: "/dashboard", icon: FaHome },
  { title: "Trip Planner", url: "/tripplanner", icon: FaMapMarkerAlt },
  { title: "Flights", url: "/flights", icon: FaPlane },
  { title: "Accommodation", url: "/accommodation", icon: FaBuilding },
  { title: "Destinations", url: "/destinations", icon: FaCompass },
];

export default function Navbar({ user }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState(() => {
    if (user) return user;
    const storedUser = localStorage.getItem("user");
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-lg p-4 sticky top-0 z-50 border-b border-transparent dark:border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 overflow-hidden border border-gray-100 p-0.5">
            <img src={logo} alt="PocketYatra Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">PocketYatra</span>
            <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Your Travel Companion</p>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <Link
                key={item.title}
                to={item.url}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg mx-1 transition-all duration-300 ${
                  isActive 
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-md" 
                    : "hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                <item.icon className={isActive ? "text-white" : "text-blue-500 dark:text-blue-400"} />
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-lg border border-gray-200 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 transition-all duration-300 shadow-sm cursor-pointer"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <FaSun className="text-amber-500 text-lg animate-pulse" /> : <FaMoon className="text-indigo-500 text-lg" />}
          </button>

          <Link to="/currency" className="px-4 py-2 rounded-lg border border-blue-200 dark:border-blue-900/50 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 flex items-center gap-2 transition-all duration-300 text-blue-600 dark:text-blue-400">
            <FaDollarSign /> Currency
          </Link>

          {currentUser ? (
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-800 px-4 py-2 rounded-lg border border-purple-100 dark:border-slate-700 hover:border-purple-300 transition-all duration-200 cursor-pointer"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {currentUser.full_name?.charAt(0).toUpperCase() || <FaUserCircle />}
                </div>
                <span className="font-medium text-gray-800 dark:text-gray-200">{currentUser.full_name?.split(" ")[0]}</span>
                <svg className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <>
                  {/* Backdrop to close dropdown when clicking outside */}
                  <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)}></div>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl py-2 border border-gray-100 dark:border-slate-700 z-20 animate-fadeIn">
                    <Link 
                      to="/profile" 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-all duration-150"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FaUserCircle className="text-blue-500 text-lg" />
                      View Profile
                    </Link>
                    <div className="border-t border-gray-100 dark:border-slate-700 my-1"></div>
                    <button 
                      onClick={() => {
                        setDropdownOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-150 font-medium cursor-pointer"
                    >
                      <FaSignOutAlt className="text-lg" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 border border-gray-100 dark:border-slate-700 animate-fadeIn">
          <nav className="flex flex-col space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.url;
              return (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg ${
                    isActive 
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium" 
                      : "hover:bg-gray-100 dark:hover:bg-slate-700/50 text-gray-700 dark:text-gray-300"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className={isActive ? "text-white" : "text-blue-500 dark:text-blue-400"} />
                  {item.title}
                </Link>
              );
            })}
            
            {/* Dark Mode toggle for mobile */}
            <button 
              onClick={() => {
                setDarkMode(!darkMode);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700/50 text-gray-700 dark:text-gray-300 w-full text-left cursor-pointer font-medium"
            >
              {darkMode ? (
                <>
                  <FaSun className="text-amber-500 text-lg" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <FaMoon className="text-indigo-500 text-lg" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>

            <Link 
              to="/currency" 
              className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700/50 text-gray-700 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaDollarSign className="text-blue-500 dark:text-blue-400" />
              Currency
            </Link>
            {currentUser && (
              <>
                <div className="border-t border-gray-100 dark:border-slate-700 my-2"></div>
                <Link 
                  to="/profile" 
                  className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700/50 text-gray-700 dark:text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaUserCircle className="text-blue-500 dark:text-blue-400" />
                  My Profile
                </Link>
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 w-full text-left font-medium cursor-pointer"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
