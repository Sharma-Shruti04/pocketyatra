import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { GoogleLogin } from "@react-oauth/google";
import logo from "../assets/logo.png";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔹 Regular Signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${apiBase}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });


      const data = await res.json();
      console.log("Google signup response from backend:", data);

      if (res.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong during signup!");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Google Signup
  const handleGoogleSuccess = async (response) => {
    console.log("Google signup response:", response);
    try {
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${apiBase}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });


      const data = await res.json();
      console.log("Google signup response from backend:", data);

      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Google Signup successful!");
        navigate("/dashboard");
      } else {
        const errMsg = data.message || "Google signup failed";
        const errDetails = data.error ? "\nDetails: " + data.error : "";
        alert(errMsg + errDetails);
      }
    } catch (err) {
      console.error("Google signup error:", err);
      alert("Something went wrong with Google signup!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      {/* 🔹 Header */}
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

      {/* 🔹 Centered Signup Card */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-12">
        <div className="w-full max-w-md">
          <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm shadow-2xl rounded-3xl p-8 border border-white/20 dark:border-slate-800/50 transition-all duration-300">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-2">
                Join PocketYatra
              </h2>
              <p className="text-gray-600 dark:text-gray-450">Start your travel journey today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <InputField
                  label="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your full name"
                />
                <InputField
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter your email"
                />
                <InputField
                  label="Password"
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Create a strong password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
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

            {/* 🔹 Google Signup */}
            <div className="flex flex-col items-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.log("❌ Google Signup Failed")}
              />
            </div>

            {/* 🔹 Login Redirect */}
            <div className="text-center mt-8">
              <p className="text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
