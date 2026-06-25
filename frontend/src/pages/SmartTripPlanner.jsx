import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import InputField from "../components/InputField";
import API from "../api/axiosConfig";

export default function SmartTripPlanner() {
  const [searchParams] = useSearchParams();
  const destParam = searchParams.get("destination") || "";

  const [form, setForm] = useState({
    source: "",
    destination: destParam,
    startDate: "",
    endDate: "",
    budget: "",
  });

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const today = new Date().toLocaleDateString('en-CA');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.source || !form.destination || !form.startDate || !form.endDate || !form.budget) {
      alert("Please fill in all fields.");
      return;
    }

    if (form.startDate < today) {
      alert("Start date cannot be before today.");
      return;
    }

    if (form.endDate < form.startDate) {
      alert("End date must be on or after start date.");
      return;
    }

    if (Number(form.budget) <= 0) {
      alert("Budget must be greater than 0.");
      return;
    }

    setLoading(true);
    setPlan(null);

    try {
      const { data } = await API.post("/plan-trip", form);
      setPlan(data.plan || data);
    } catch (err) {
      console.error("Trip planning error:", err);
      alert(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-8 pb-0 flex-1 flex flex-col transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col">
          <div className="space-y-8">
        {/* 🧭 Header */}
            <div className="text-center bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 dark:border-slate-800/50 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Smart Trip Planner
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                Plan your perfect trip with AI-powered suggestions. Get personalized recommendations for your dream destination.
          </p>
        </div>
 
        {/* ✏️ Trip Form */}
            <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 dark:border-slate-800/50 transition-all duration-300">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Source (Origin City)
                    </label>
                    <input
                      name="source"
                      value={form.source}
                      onChange={handleChange}
                      placeholder="e.g., Delhi, Bangalore"
                      required
                      className="w-full border-2 border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white dark:bg-slate-800 dark:text-gray-100 dark:focus:bg-slate-700"
                    />
                  </div>
 
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Destination
                    </label>
                    <input
                      name="destination"
                      value={form.destination}
                      onChange={handleChange}
                      placeholder="e.g., Manali, Paris, Bali"
                      required
                      className="w-full border-2 border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white dark:bg-slate-800 dark:text-gray-100 dark:focus:bg-slate-700"
                    />
                  </div>
                </div>
 
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={form.startDate}
                      onChange={handleChange}
                      min={today}
                      required
                      className="w-full border-2 border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white dark:bg-slate-800 dark:text-gray-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={form.endDate}
                      onChange={handleChange}
                      min={form.startDate || today}
                      required
                      className="w-full border-2 border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white dark:bg-slate-800 dark:text-gray-100"
                    />
                  </div>
          </div>
 
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    Budget (in ₹)
                  </label>
                  <input
                     type="number"
                     name="budget"
                     value={form.budget}
                     onChange={handleChange}
                     min="1"
                     required
                     placeholder="Enter total budget (greater than 0)"
                     className="w-full border-2 border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white dark:bg-slate-800 dark:text-gray-100 dark:focus:bg-slate-700"
                   />
                </div>

          <button
            type="submit"
            disabled={loading}
                  className={`w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Planning your trip...
                    </div>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Generate Trip Plan
                    </>
                  )}
                </button>
              </form>
            </div>
 
            {/* ✈️ Trip Plan Results */}
            {plan && (
              <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 dark:border-slate-800/50 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Your Smart Trip Plan
                  </h2>
                </div>
 
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20 rounded-2xl p-4 border border-blue-200 dark:border-blue-900/50">
                    <div className="flex items-center mb-2">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">Route</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{form.source} → {form.destination}</p>
                  </div>
 
                  <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-emerald-950/40 dark:to-emerald-900/20 rounded-2xl p-4 border border-green-200 dark:border-emerald-900/50">
                    <div className="flex items-center mb-2">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">Duration</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{form.startDate} → {form.endDate}</p>
                  </div>
 
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-amber-950/40 dark:to-amber-900/20 rounded-2xl p-4 border border-orange-200 dark:border-amber-900/50">
                    <div className="flex items-center mb-2">
                      <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1" />
                      </svg>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">Budget</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">₹{form.budget}</p>
                  </div>
                </div>
 
                {/* If API returns insufficient budget message */}
                {plan.insufficientBudget ? (
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/40 dark:to-orange-950/20 border border-red-200 dark:border-red-900/50 rounded-2xl p-6 shadow-md">
                    <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-4 flex items-center">
                      <svg className="w-6 h-6 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Insufficient Budget Warning
                    </h3>
                    <p className="text-gray-705 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                      {plan.message}
                    </p>
                  </div>
                ) : plan.text_blocks && plan.text_blocks.length > 0 ? (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-900/50">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                        <svg className="w-6 h-6 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Recommended Plan
                      </h3>
                      <ul className="space-y-2">
                        {plan.text_blocks.map((t, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                              {idx + 1}
                            </div>
                            <span className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {Array.isArray(plan.places) && plan.places.length > 0 && (
                      <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-900/50">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                          <svg className="w-6 h-6 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Top Places to Visit
                        </h3>
                        <ul className="space-y-2">
                          {plan.places.map((p, i) => (
                            <li key={i} className="flex items-start">
                              <div className="w-6 h-6 bg-gradient-to-r from-emerald-505 to-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                                {i + 1}
                              </div>
                              <span className="text-gray-750 dark:text-gray-300">{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : plan.itinerary ? (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-900/50">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                        <svg className="w-6 h-6 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Recommended Itinerary
                      </h3>
                      <ul className="space-y-2">
                        {plan.itinerary.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                              {index + 1}
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
 
                    {Array.isArray(plan.places) && plan.places.length > 0 && (
                      <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-900/50">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                          <svg className="w-6 h-6 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Top Places to Visit
                        </h3>
                        <ul className="space-y-2">
                          {plan.places.map((p, i) => (
                            <li key={i} className="flex items-start">
                              <div className="w-6 h-6 bg-gradient-to-r from-emerald-505 to-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                                {i + 1}
                              </div>
                              <span className="text-gray-700 dark:text-gray-300">{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
 
                    {plan.flights && (
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-900/50">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                          <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          Flight Suggestions
                        </h3>
                        <ul className="space-y-2">
                          {plan.flights.map((f, i) => (
                            <li key={i} className="flex items-start">
                              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                                ✈
                              </div>
                              <span className="text-gray-700 dark:text-gray-300">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
 
                    {plan.hotels && (
                      <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-emerald-950/40 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-emerald-900/50">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                          <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          Hotel Suggestions
                        </h3>
                        <ul className="space-y-2">
                          {plan.hotels.map((h, i) => (
                            <li key={i} className="flex items-start">
                              <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                                🏨
                              </div>
                              <span className="text-gray-700 dark:text-gray-300">{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm border border-white/20 dark:border-slate-800/50 rounded-3xl p-6 transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-slate-850 dark:to-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709" />
                      </svg>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                      No detailed itinerary found. Try again with different dates.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
