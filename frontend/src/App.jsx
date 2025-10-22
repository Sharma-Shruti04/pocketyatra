import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SmartTripPlanner from "./pages/SmartTripPlanner";
import FlightSearch from "./pages/FlightSearch";
import DestinationFinder from "./pages/DestinationFinder";
import AccommodationSearch from "./pages/AccommodationSearch";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export default function App() {
  return (

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/flights"
          element={
            <ProtectedRoute>
              <FlightSearch />
            </ProtectedRoute>
          }
        />
        <Route
          path="/destinations"
          element={
            <ProtectedRoute>
              <DestinationFinder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/accommodation"
          element={
            <ProtectedRoute>
              <AccommodationSearch />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tripplanner"
          element={
            <ProtectedRoute>
              <SmartTripPlanner />
            </ProtectedRoute>
          }
        />
      </Routes>

  );
}











// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// // import TripPlanner from "./pages/TripPlanner"; // <-- Import the new page
// import SmartTripPlanner from "./pages/SmartTripPlanner";
// import FlightSearch from "./pages/Flightsearch";
// import AccommodationSearch from "./pages/AccommodationSearch";
// import DestinationFinder from "./pages/DestinationFinder";
// function App() {
//   return (
    
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/tripplanner" element={<SmartTripPlanner />} /> {/* <-- New Route */}  
//         <Route path="/flights" element={<FlightSearch />} />
//         <Route path="/accommodation" element={<AccommodationSearch />} />
//         <Route path="/destinations" element={<DestinationFinder />} />
//       </Routes>
    
//   );
// }

// export default App;
