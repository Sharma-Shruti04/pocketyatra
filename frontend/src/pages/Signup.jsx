import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { GoogleLogin } from "@react-oauth/google";
import logo from "../assets/logo.jpg";

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
     const res = await fetch("http://localhost:5000/api/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});


      const data = await res.json();

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
    try {
      const res = await fetch("http://localhost:5000/api/auth/google", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ tokenId: response.credential }),
});


      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Google Signup successful!");
        navigate("/dashboard");
      } else {
        alert(data.message || "Google signup failed");
      }
    } catch (err) {
      console.error("Google signup error:", err);
      alert("Something went wrong with Google signup!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 🔹 Header */}
      <header className="flex items-center bg-white shadow-md px-6 py-4">
        <img src={logo} alt="Pocket Yatra Logo" className="h-10 w-10 mr-3" />
        <h1 className="text-2xl font-bold text-blue-600">Pocket Yatra</h1>
      </header>

      {/* 🔹 Centered Signup Card */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter your name"
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
              placeholder="Enter your password"
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Signing up..." : "Create Account"}
            </button>
          </form>

          {/* 🔹 Google Signup */}
          <div className="mt-4 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("❌ Google Signup Failed")}
            />
          </div>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
