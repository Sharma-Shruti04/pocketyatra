import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { FaMapMarkerAlt, FaCompass, FaCheck, FaUserCircle, FaPaperPlane } from "react-icons/fa";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [homeCity, setHomeCity] = useState("");
  const [travelStyle, setTravelStyle] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);

  const interestsList = [
    "adventure",
    "culture",
    "food",
    "history",
    "nature",
    "nightlife",
    "shopping",
    "relaxation",
  ];

  // ✅ Fetch user data securely
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found — please log in again.");
        setLoading(false);
        return;
      }

      try {
        const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        const response = await fetch(`${apiBase}/user/profile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();

        // ✅ Save fetched user data
        setUser(data);
        setHomeCity(data.homeCity || "");
        setTravelStyle(data.travelStyle || "Mid-range");
        setSelectedInterests(data.interests || []);

        // ✅ Also store in localStorage for future use
        localStorage.setItem("user", JSON.stringify(data));
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Error loading profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ Toggle interests
  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  // ✅ Save updated preferences
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    setSaving(true);

    try {
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiBase}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          homeCity,
          travelStyle,
          interests: selectedInterests,
        }),
      });

      if (!response.ok) throw new Error("Failed to save profile");

      const updatedUser = await response.json();
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error("Save error:", err);
      setError("Failed to save preferences");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-500 font-semibold">Loading profile...</p>
        </div>
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-96 text-red-600">
          <svg className="w-12 h-12 mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-bold text-lg">{error}</p>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-8 pb-0 animate-fadeIn flex-1 flex flex-col transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full flex-1">
            
            {/* Left Column: Profile & Vibe Card */}
            <div className="md:col-span-1 space-y-6">
              {/* Profile Header Card */}
              <div className="bg-white/85 dark:bg-slate-900/40 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 dark:border-slate-800/50 text-center relative overflow-hidden flex flex-col items-center transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-100/30 dark:bg-indigo-950/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-purple-100/30 dark:bg-purple-950/20 rounded-full blur-xl"></div>
                
                <div className="relative z-10 w-full">
                  {user?.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt={user.name} 
                      className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white dark:border-slate-800 mx-auto transition-transform duration-300 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-extrabold mx-auto shadow-lg border-4 border-white dark:border-slate-800 transition-transform duration-300 hover:scale-105">
                      {user?.name?.charAt(0).toUpperCase() || <FaUserCircle />}
                    </div>
                  )}
                  
                  <h1 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 mt-4 leading-tight">
                    {user?.name || "Traveler"}
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-1.5 flex items-center justify-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    {user?.email || "No email available"}
                  </p>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-800 w-full space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Account:</span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-950/50 text-indigo-800 dark:text-indigo-300">
                        {user?.googleId ? "Google Sign-in" : "Email & Password"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Home City:</span>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">{homeCity || "Not set"}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Travel Style:</span>
                      <span className="font-semibold text-purple-600 dark:text-purple-400">{travelStyle}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Interests Selected:</span>
                      <span className="font-semibold text-indigo-600 dark:text-indigo-450">{selectedInterests.length}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Travel Vibe Card */}
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="relative z-10 space-y-3">
                  <h3 className="text-lg font-bold">Your Travel Vibe</h3>
                  <div className="text-4xl">
                    {travelStyle === "Luxury" ? "💎" : travelStyle === "Budget" ? "🎒" : "✨"}
                  </div>
                  <p className="text-sm font-semibold opacity-90 capitalize">
                    {travelStyle} Explorer
                  </p>
                  <p className="text-xs opacity-80 leading-relaxed">
                    {travelStyle === "Luxury" 
                      ? "You prioritize premium services, first-class comfort, elite lodging, and exquisite curated itineraries."
                      : travelStyle === "Budget" 
                      ? "You are a pathfinder searching for genuine local culture, street food, and rustic off-beat journeys."
                      : "You strike the perfect balance between smart comfort, local experiences, and cost-effective plans."}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right Column: Preferences Settings */}
            <div className="md:col-span-2">
              <div className="bg-white/85 dark:bg-slate-900/40 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 dark:border-slate-800/50 h-full flex flex-col justify-between transition-all duration-300">
                <div>
                  <div className="flex items-center mb-6 pb-4 border-b border-gray-100 dark:border-slate-850/50">
                    <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center mr-4 text-white shadow-md">
                      <FaCompass className="text-lg" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Customize Travel Preferences</h2>
                      <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">These preferences tailor your destination search, flights, and itineraries</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Home City */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        <FaMapMarkerAlt className="text-indigo-500 mr-2" />
                        Home City (Default Origin)
                      </label>
                      <input
                        type="text"
                        value={homeCity}
                        onChange={(e) => setHomeCity(e.target.value)}
                        className="w-full border-2 border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white dark:bg-slate-800 dark:text-gray-100 dark:focus:bg-slate-700"
                        placeholder="e.g., Delhi, Mumbai"
                      />
                    </div>
                    
                    {/* Travel Style */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        <FaCompass className="text-purple-500 mr-2" />
                        Preferred Travel Budget Tier
                      </label>
                      <div className="relative">
                        <select
                          value={travelStyle}
                          onChange={(e) => setTravelStyle(e.target.value)}
                          className="w-full border-2 border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white dark:bg-slate-800 dark:text-gray-100 dark:focus:bg-slate-700 appearance-none cursor-pointer"
                        >
                          <option>Budget</option>
                          <option>Mid-range</option>
                          <option>Luxury</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400 dark:text-gray-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Interests */}
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Select Interests & Hobbies
                      </label>
                      <div className="flex flex-wrap gap-2.5">
                        {interestsList.map((interest) => {
                          const isSelected = selectedInterests.includes(interest);
                          return (
                            <button
                              key={interest}
                              onClick={() => toggleInterest(interest)}
                              className={`px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 select-none cursor-pointer ${
                                isSelected
                                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md transform scale-[1.03] border-transparent"
                                  : "bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300 border-2 border-transparent"
                              }`}
                            >
                              {isSelected && <FaCheck className="text-[10px]" />}
                              {interest}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Save Button */}
                <div className="mt-8">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-bold hover:from-blue-650 hover:to-purple-700 hover:scale-[1.02] transform transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {saving ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Saving Changes...
                      </div>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2 text-sm" /> Save Preferences
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </Layout>
  );
}
