import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
// import TripPlanner from "./pages/TripPlanner"; // <-- Import the new page
import SmartTripPlanner from "./pages/SmartTripPlanner";
import FlightSearch from "./pages/Flightsearch";
import AccommodationSearch from "./pages/AccommodationSearch";
import DestinationFinder from "./pages/DestinationFinder";
function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tripplanner" element={<SmartTripPlanner />} /> {/* <-- New Route */}  
        <Route path="/flights" element={<FlightSearch />} />
        <Route path="/accommodation" element={<AccommodationSearch />} />
        <Route path="/destinations" element={<DestinationFinder />} />
      </Routes>
    
  );
}

export default App;
