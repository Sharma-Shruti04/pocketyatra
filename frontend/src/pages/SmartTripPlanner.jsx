import React, { useState } from "react";
import Layout from "../components/Layout";
import InputField from "../components/InputField";

export default function SmartTripPlanner() {
  const [form, setForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
  });

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.destination || !form.startDate || !form.endDate || !form.budget) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setPlan(null);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/plan-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setPlan(data);
      } else {
        alert(data.message || "Failed to generate trip plan");
      }
    } catch (err) {
      console.error("Trip planning error:", err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-8">
        {/* 🧭 Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600">Smart Trip Planner</h1>
          <p className="text-gray-500 mt-2">
            Plan your trip effortlessly with AI-powered suggestions.
          </p>
        </div>

        {/* ✏️ Trip Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 space-y-4"
        >
          <InputField
            label="Destination"
            name="destination"
            value={form.destination}
            onChange={handleChange}
            placeholder="e.g., Manali, Paris, Bali"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Start Date"
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
            />
            <InputField
              label="End Date"
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
            />
          </div>

          <InputField
            label="Budget (in ₹)"
            type="number"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            placeholder="Enter total budget"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Planning your trip..." : "Generate Trip Plan"}
          </button>
        </form>

        {/* ✈️ Trip Plan Results */}
        {plan && (
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              Your Smart Trip Plan
            </h2>

            <p className="text-gray-700 mb-2">
              <strong>Destination:</strong> {form.destination}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Duration:</strong> {form.startDate} → {form.endDate}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Budget:</strong> ₹{form.budget}
            </p>

            {/* If API returns AI-based plan details */}
            {plan.itinerary ? (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800">Recommended Itinerary:</h3>
                <ul className="list-disc pl-6 text-gray-600">
                  {plan.itinerary.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                {plan.flights && (
                  <>
                    <h3 className="font-semibold text-gray-800 mt-4">Flight Suggestions:</h3>
                    <ul className="list-disc pl-6 text-gray-600">
                      {plan.flights.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </>
                )}

                {plan.hotels && (
                  <>
                    <h3 className="font-semibold text-gray-800 mt-4">Hotel Suggestions:</h3>
                    <ul className="list-disc pl-6 text-gray-600">
                      {plan.hotels.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ) : (
              <p className="text-gray-500">
                No detailed itinerary found. Try again with different dates.
              </p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
