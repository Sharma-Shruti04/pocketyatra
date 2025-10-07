import { useState } from "react";
import InputField from "../components/InputField";
import GoogleButton from "../components/GoogleButton";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email: ${email}\nPassword: ${password}`);
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
        <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Login
        </button>
      </form>
      <div className="mt-4">
        <GoogleButton onClick={() => alert("Google Login Clicked")} />
      </div>
      <p className="text-center text-sm mt-4">
        Don’t have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
      </p>
    </div>
  );
}
