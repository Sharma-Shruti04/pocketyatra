import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-sm p-4 flex justify-between">
        <h1 className="text-2xl font-bold text-blue-600">PocketYatra</h1>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
          <Link to="/signup" className="text-gray-700 hover:text-blue-600">Signup</Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}
