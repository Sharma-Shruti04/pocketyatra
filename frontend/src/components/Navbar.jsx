import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaMapMarkerAlt,
  FaPlane,
  FaBuilding,
  FaCompass,
  FaUserCircle,
  FaDollarSign,
  FaTree
} from "react-icons/fa";

// Navigation items
const navigationItems = [
  { title: "Home", url: "/", icon: FaHome },
  { title: "Trip Planner", url: "/tripplanner", icon: FaMapMarkerAlt },

  { title: "Flights", url: "/flights", icon: FaPlane },
  { title: "Accommodation", url: "/accommodation", icon: FaBuilding },
  { title: "Destinations", url: "/destinations", icon: FaCompass },
  { title: "Profile", url: "/profile", icon: FaUserCircle },
];

export default function Navbar({ user }) {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo Section */}
      <Link to="/" className="flex items-center gap-2">
        <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white">
          <FaTree />
        </div>
        <span className="font-bold text-lg">PocketYatra</span>
      </Link>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-4">
        {navigationItems.map((item) => (
          <Link
            key={item.title}
            to={item.url}
            className="flex items-center gap-1 px-3 py-2 rounded hover:bg-gray-100"
          >
            <item.icon />
            {item.title}
          </Link>
        ))}
      </nav>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button className="px-3 py-1 rounded border hover:bg-gray-100 flex items-center gap-1">
          <FaDollarSign /> Currency
        </button>

        {user && (
          <div className="flex items-center gap-2">
            <FaUserCircle />
            <span>{user.full_name?.split(" ")[0]}</span>
          </div>
        )}
      </div>
    </header>
  );
}
