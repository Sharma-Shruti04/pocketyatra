import { useState } from "react";
import InputField from "../components/InputField";
import GoogleButton from "../components/GoogleButton";
import { Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${form.name}\nEmail: ${form.email}`);
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter your name" />
        <InputField label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Enter your email" />
        <InputField label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Enter your password" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Create Account
        </button>
      </form>
      <div className="mt-4">
        <GoogleButton onClick={() => alert("Google Signup Clicked")} />
      </div>
      <p className="text-center text-sm mt-4">
        Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
      </p>
    </div>
  );
}
