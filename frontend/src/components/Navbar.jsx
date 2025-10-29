import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  FaTimes
} from "react-icons/fa";

// Navigation items
const navigationItems = [
  { title: "Home", url: "/dashboard", icon: FaHome },
  { title: "Trip Planner", url: "/tripplanner", icon: FaMapMarkerAlt },
  { title: "Flights", url: "/flights", icon: FaPlane },
  { title: "Accommodation", url: "/accommodation", icon: FaBuilding },
  { title: "Destinations", url: "/destinations", icon: FaCompass },
  { title: "Profile", url: "/profile", icon: FaUserCircle },
];

export default function Navbar({ user }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-lg p-4 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-md transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
            <FaTree className="text-xl" />
          </div>
          <div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">PocketYatra</span>
            <p className="text-xs text-gray-500 -mt-1">Your Travel Companion</p>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
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
                    : "hover:bg-gray-100 text-gray-700 hover:text-blue-600"
                }`}
              >
                <item.icon className={isActive ? "text-white" : "text-blue-500"} />
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/currency" className="px-4 py-2 rounded-lg border border-blue-200 hover:border-blue-400 hover:bg-blue-50 flex items-center gap-2 transition-all duration-300 text-blue-600">
            <FaDollarSign /> Currency
          </Link>

          {user ? (
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-lg border border-purple-100">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                {user.full_name?.charAt(0) || <FaUserCircle />}
              </div>
              <span className="font-medium text-gray-800">{user.full_name?.split(" ")[0]}</span>
            </div>
          ) : (
            <Link to="/login" className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4 border border-gray-100 animate-fadeIn">
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
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className={isActive ? "text-white" : "text-blue-500"} />
                  {item.title}
                </Link>
              );
            })}
            <Link 
              to="/currency" 
              className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaDollarSign className="text-blue-500" />
              Currency
            </Link>
            {!user && (
              <Link 
                to="/login" 
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaUserCircle />
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
