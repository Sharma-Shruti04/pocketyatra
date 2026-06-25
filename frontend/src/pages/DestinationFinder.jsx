
import React, { useState } from "react";
import Layout from "../components/Layout";
import InputField from "../components/InputField";

export default function DestinationFinder() {
  const [form, setForm] = useState({
    budget: "",
    season: "",
    travelType: "",
  });

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!form.budget || !form.season || !form.travelType) {
      alert("Please fill in all the fields!");
      return;
    }

    if (Number(form.budget) < 0) {
      alert("Budget cannot be negative.");
      return;
    }

    if (Number(form.budget) < 1000) {
      alert("Please enter a budget of at least ₹1,000.");
      return;
    }

    setLoading(true);
    setDestinations([]);

    try {
      const token = localStorage.getItem("token");
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${apiBase}/destinations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const text = await res.text();
      let parsedData;
      try {
        parsedData = JSON.parse(text);
      } catch {
        throw new Error("Invalid JSON response from server (check backend route)");
      }
      //const data = await res.json();
      if (!res.ok) {
        throw new Error(parsedData.message || "Failed to fetch destinations");
      }

      setDestinations(parsedData.destinations || []);
      setError(""); // Clear error if successful
    } catch (error) {
      console.error("Destination search error:", error);
      setError(error.message || "Something went wrong while fetching destinations!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>      <div className="w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-8 pb-0 flex-1 flex flex-col transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 dark:border-slate-800/50 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Destination Finder
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                Discover your next dream destination based on your preferences. Let us help you find the perfect place for your next adventure.
              </p>
            </div>
 
            {/* Search Form */}
            <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 dark:border-slate-800/50 transition-all duration-300">
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    Budget (in ₹)
                  </label>
                  <input
                    name="budget"
                    type="number"
                    value={form.budget}
                    onChange={handleChange}
                    min="0"
                    placeholder="Enter your budget (e.g., 20000)"
                    className="w-full border-2 border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white dark:bg-slate-800 dark:text-gray-100 dark:focus:bg-slate-700"
                  />
                </div>
 
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Season
                    </label>
                    <div className="relative">
                      <select
                        name="season"
                        value={form.season}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white dark:bg-slate-800 dark:text-gray-100 dark:focus:bg-slate-700 appearance-none cursor-pointer"
                      >
                        <option value="">Select Season</option>
                        <option value="summer">Summer</option>
                        <option value="winter">Winter</option>
                        <option value="monsoon">Monsoon</option>
                        <option value="autumn">Autumn</option>
                        <option value="spring">Spring</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
 
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Travel Type
                    </label>
                    <div className="relative">
                      <select
                        name="travelType"
                        value={form.travelType}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white dark:bg-slate-800 dark:text-gray-100 dark:focus:bg-slate-700 appearance-none cursor-pointer"
                      >
                        <option value="">Select Type</option>
                        <option value="adventure">Adventure</option>
                        <option value="relaxation">Relaxation</option>
                        <option value="cultural">Cultural</option>
                        <option value="romantic">Romantic</option>
                        <option value="wildlife">Wildlife</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
 
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-4 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Finding...
                    </div>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Find Destinations
                    </>
                  )}
                </button>
              </form>
            </div>
 
            {/* Error Message */}
            {error && (
              <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/20 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-900/50 rounded-2xl p-6 text-center shadow-lg transition-colors duration-300">
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold">Error</span>
                </div>
                <p>{error}</p>
              </div>
            )}
 
            {/* Results Section */}
            {!loading && !error && (
              <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 dark:border-slate-800/50 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-800/60 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {destinations.length > 0
                      ? "Recommended Destinations"
                      : "No destinations found"}
                  </h2>
                </div>
 
                {destinations.length > 0 && !destinations[0].note ? (
                  <>
                    {/* AI Overview Section */}
                    {destinations.some(dest => dest.isAiOverview) && (
                      <div className="mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-900/20 rounded-2xl p-6 shadow-lg border border-indigo-100 dark:border-indigo-900/50 transition-all duration-300">
                        {destinations.filter(dest => dest.isAiOverview).map((aiDest, idx) => (
                          <div key={`ai-overview-${idx}`}>
                            <div className="flex items-center mb-4">
                              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                              </div>
                              <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300">AI Travel Insights</h3>
                            </div>
                            
                            <div className="prose prose-indigo max-w-none mb-4">
                              <p className="text-gray-700 dark:text-gray-250">{aiDest.description}</p>
                            </div>
                            
                            {aiDest.aiChips && aiDest.aiChips.length > 0 && (
                              <div className="mt-4">
                                <div className="flex flex-wrap gap-2">
                                  {aiDest.aiChips.map((chip, chipIdx) => (
                                    <span 
                                      key={`chip-${chipIdx}`}
                                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300"
                                    >
                                      {chip}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Regular Destinations Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {destinations.filter(dest => !dest.isAiOverview).map((dest, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-800/60 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-slate-700"
                        >
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-50 rounded-xl flex items-center justify-center mr-4">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                {dest.name || "Unknown Destination"}
                              </h3>
                              <p className="text-gray-650 dark:text-gray-400 text-sm">
                                {dest.state || "India"}
                              </p>
                            </div>
                          </div>
                          
                          {dest.description && (
                            <p className="text-gray-600 dark:text-gray-450 text-sm mb-4 line-clamp-3">
                              {dest.description}
                            </p>
                          )}
                          
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500 dark:text-gray-450">Best Season</span>
                              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                {dest.bestSeason || "All Year"}
                              </span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500 dark:text-gray-450">Travel Type</span>
                              <span className="text-sm font-medium text-purple-600 dark:text-purple-400 capitalize">
                                {dest.type || "Mixed"}
                              </span>
                            </div>
                          </div>
                          
                          {dest.link ? (
                            <a 
                              href={dest.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl inline-block text-center"
                            >
                              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                              Explore
                            </a>
                          ) : (
                            <button className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                              Explore
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-10 max-w-md mx-auto bg-amber-50/50 dark:bg-amber-950/20 rounded-2xl border border-amber-200/30 dark:border-amber-900/30 p-8 shadow-md">
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600 dark:text-amber-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-150 mb-2">
                      No matching destinations
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {destinations[0]?.note && destinations[0].note !== "No destinations match your criteria"
                        ? destinations[0].note
                        : "Try increasing your budget or selecting different categories to discover recommended places!"}
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
