// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   FaHome,
//   FaMapMarkerAlt,
//   FaPlane,
//   FaBuilding,
//   FaCompass,
//   FaUserCircle,
//   FaDollarSign,
//   FaTree
// } from "react-icons/fa";

// const navigationItems = [
//   { title: "Home", url: "/", icon: FaHome },
//  { title: "Trip Planner", url: "/tripplanner", icon: FaMapMarkerAlt },
//   { title: "Flights", url: "/flights", icon: FaPlane },
//   { title: "Accommodation", url: "/accommodation", icon: FaBuilding },
//   { title: "Destinations", url: "/destinations", icon: FaCompass },
//   { title: "Profile", url: "/profile", icon: FaUserCircle },
// ];

// export default function Layout({ children, user }) {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-50">
//         {/* Logo Section */}
//         <Link to="/" className="flex items-center gap-2">
//           <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white">
//             <FaTree />
//           </div>
//           <span className="font-bold text-lg">PocketYatra</span>
//         </Link>

//         {/* Navigation Links */}
//         <nav className="hidden md:flex items-center gap-4">
//           {navigationItems.map((item) => (
//             <Link
//               key={item.title}
//               to={item.url}
//               className="flex items-center gap-1 px-3 py-2 rounded hover:bg-gray-100"
//             >
//               <item.icon />
//               {item.title}
//             </Link>
//           ))}
//         </nav>

//         {/* Right Section */}
//         <div className="flex items-center gap-4">
//           <button className="px-3 py-1 rounded border hover:bg-gray-100 flex items-center gap-1">
//             <FaDollarSign /> Currency
//           </button>

//           {user && (
//             <div className="flex items-center gap-2">
//               <FaUserCircle />
//               <span>{user.full_name?.split(" ")[0]}</span>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto p-4 flex gap-6">
//         {/* Left/Main Section */}
//         <div className="flex-1">{children}</div>

//         {/* Right Sidebar */}
//         <aside className="w-80 hidden lg:block space-y-4">
//           {/* Smart Tips */}
//           <div className="bg-white p-4 rounded shadow">
//             <h3 className="font-semibold mb-2">Smart Tips</h3>
//             <div className="text-sm space-y-2">
//               <div className="bg-blue-50 p-2 rounded">
//                 <strong>💡 Pro Tip</strong>
//                 <p>
//                   Book flights 2–8 weeks in advance for domestic trips and 1–3 months for international travel.
//                 </p>
//               </div>
//               <div className="bg-green-50 p-2 rounded">
//                 <strong>🌎 Did you know?</strong>
//                 <p>
//                   Tuesday and Wednesday are typically the cheapest days to fly, while Friday and Sunday are the most expensive.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Trending Section */}
//           <div className="bg-white p-4 rounded shadow">
//             <h3 className="font-semibold mb-2">Trending Now</h3>
//             <ul className="space-y-2 text-sm">
//               <li className="flex justify-between">
//                 <span>Goa</span> <span>₹15,000</span>
//               </li>
//               <li className="flex justify-between">
//                 <span>Manali</span> <span>₹12,000</span>
//               </li>
//               <li className="flex justify-between">
//                 <span>Kerala</span> <span>₹18,000</span>
//               </li>
//             </ul>
//             <button className="mt-2 w-full py-1 bg-blue-600 text-white rounded">
//               View All Destinations
//             </button>
//           </div>
//         </aside>
//       </main>

//       {/* Footer */}
//       <footer className="bg-white text-gray-500 text-sm p-4 mt-8 text-center">
//         Crafted with ❤️ for travelers worldwide | Powered by AI • Real-time data • Smart recommendations
//       </footer>
//     </div>
//   );
// }
import React from "react";
import Navbar from "./Navbar";
import Footer from "./footer";

export default function Layout({ children, user }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar user={user} />
      <main className="flex-1 max-w-7xl mx-auto p-4">{children}</main>
      <Footer />
    </div>
  );
}
