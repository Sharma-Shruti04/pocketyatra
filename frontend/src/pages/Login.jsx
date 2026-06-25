import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { GoogleLogin } from "@react-oauth/google";
import API from "../api/axiosConfig";
import logo from "../assets/logo.png";

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
    console.log("Google login response:", response);
    
    if (!response.credential) {
      alert("Google login failed — missing credential.");
      return;
    }

    try {
      console.log("Sending Google login request to backend...");
      const res = await API.post("/auth/google-login", {
        credential: response.credential,
      });

      console.log("Google login response from backend:", res.data);
      
      localStorage.setItem("token", res.data.token);
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      alert("Google login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Google login error:", err);
      const errMsg = err.response?.data?.message || "Google login failed";
      const errDetails = err.response?.data?.error ? "\nDetails: " + err.response.data.error : "";
      alert(errMsg + errDetails);
    }
  };

  const handleGoogleError = () => {
    alert("Google Sign-in failed. Please try again.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      {/* 🔹 Header Section */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-lg border-b border-white/20 dark:border-slate-800/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <img src={logo} alt="PocketYatra Logo" className="h-12 w-12 rounded-full shadow-md mr-3" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                PocketYatra
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-450">Your Travel Companion</p>
            </div>
          </div>
        </div>
      </header>

      {/* 🔹 Login Form */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-12">
        <div className="w-full max-w-md">
          <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm shadow-2xl rounded-3xl p-8 border border-white/20 dark:border-slate-800/50 transition-all duration-300">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600 dark:text-gray-400">Sign in to continue your journey</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
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
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Sign In
              </button>
            </form>

            {/* 🔹 Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-900 text-gray-500 dark:text-gray-400 rounded-md">Or continue with</span>
              </div>
            </div>

            {/* 🔹 Google Login */}
            <div className="flex flex-col items-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            </div>

            {/* 🔹 Signup Redirect */}
            <div className="text-center mt-8">
              <p className="text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200">
                  Create one now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
