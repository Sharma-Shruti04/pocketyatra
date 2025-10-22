import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { GoogleLogin } from "@react-oauth/google";
import API from "../api/axiosConfig";
import logo from "../assets/logo.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔹 Normal Email-Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  // 🔹 Google Login Handler
  const handleGoogleSuccess = async (response) => {
    if (!response.credential) {
      alert("Google login failed — missing credential.");
      return;
    }

    try {
      const res = await API.post("/google-login", {
        credential: response.credential,
      });

      localStorage.setItem("token", res.data.token);
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      alert("Google login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Google login error:", err);
      alert(err.response?.data?.message || "Google login failed. Try again.");
    }
  };

  const handleGoogleError = () => {
    alert("Google Sign-in failed. Please try again.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 🔹 Header Section */}
      <header className="flex items-center bg-white shadow-md px-6 py-4">
        <img src={logo} alt="Pocket Yatra Logo" className="h-10 w-10 mr-3" />
        <h1 className="text-2xl font-bold text-blue-600">Pocket Yatra</h1>
      </header>

      {/* 🔹 Login Form */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 mx-auto mt-10">
          <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />

            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          {/* 🔹 Google Login */}
          <div className="mt-6 flex flex-col items-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
            <p className="text-xs text-gray-500 mt-2">Continue with Google</p>
          </div>

          {/* 🔹 Signup Redirect */}
          <p className="text-center text-sm mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
