import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { GoogleLogin } from "@react-oauth/google"; // ✅ Import this
import logo from "../assets/logo.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Normal email-password login (optional)
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong!");
    }
  };

  // 🔹 Google login handler
  const handleGoogleSuccess = async (response) => {
    try {
      const res = await fetch("http://localhost:5000/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Google Login successful!");
        navigate("/dashboard");
      } else {
        alert(data.message || "Google login failed");
      }
    } catch (err) {
      console.error("Google login error:", err);
      alert("Something went wrong with Google login!");
    }
  };
  //   const handleLogin = (e) => {
  //   e.preventDefault();

  //   // Dummy admin credentials
  //   const dummyAdmin = {
  //     email: "admin@example.com",
  //     password: "admin123",
  //     token: "dummy-admin-token-123",
  //     name: "Admin User",
  //   };

  //   if (email === dummyAdmin.email && password === dummyAdmin.password) {
  //     // Save dummy token & admin data
  //     localStorage.setItem("token", dummyAdmin.token);
  //     localStorage.setItem("user", JSON.stringify({ name: dummyAdmin.name, email: dummyAdmin.email }));
  //     alert("Login successful! Welcome " + dummyAdmin.name);
  //     navigate("/dashboard"); // Navigate to dashboard
  //   } else {
  //     alert("Invalid email or password");
  //   }
  // };

  // // 🔹 Google login handler with dummy token
  // const handleGoogleSuccess = (response) => {
  //   const dummyGoogleUser = {
  //     token: "google-dummy-token-456",
  //     name: "Google User",
  //     email: "googleuser@example.com",
  //   };

  //   localStorage.setItem("token", dummyGoogleUser.token);
  //   localStorage.setItem("user", JSON.stringify({ name: dummyGoogleUser.name, email: dummyGoogleUser.email }));
  //   alert("Google login successful! Welcome " + dummyGoogleUser.name);
  //   navigate("/dashboard"); // Navigate to dashboard
  // };

  return (
     <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 🔹 Header Section */}
      <header className="flex items-center bg-white shadow-md px-6 py-4">
        <img src={logo} alt="Pocket Yatra Logo" className="h-10 w-10 mr-3" />
        <h1 className="text-2xl font-bold text-blue-600">Pocket Yatra</h1>
      </header>
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

      <div className="mt-4 flex justify-center">
        {/* ✅ Real Google Login Button */}
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => console.log("❌ Google Login Failed")}
        />
      </div>

      <p className="text-center text-sm mt-4">
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
