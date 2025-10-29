import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";

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
        const response = await fetch("http://localhost:5000/api/user/profile", {
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
      const response = await fetch("http://localhost:5000/api/user/profile", {
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
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading profile...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        <p>{error}</p>
      </div>
    );

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
            Welcome, {user?.name || "Traveler"} ✈️
          </h1>

          <div className="space-y-6">
            <div>
              <label className="block font-semibold mb-2">Home City</label>
              <input
                type="text"
                value={homeCity}
                onChange={(e) => setHomeCity(e.target.value)}
                className="w-full border px-4 py-2 rounded"
                placeholder="Enter your city"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Travel Style</label>
              <select
                value={travelStyle}
                onChange={(e) => setTravelStyle(e.target.value)}
                className="w-full border px-4 py-2 rounded"
              >
                <option>Budget</option>
                <option>Mid-range</option>
                <option>Luxury</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">Interests</label>
              <div className="flex flex-wrap gap-3">
                {interestsList.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-full transition ${
                      selectedInterests.includes(interest)
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg mt-6 hover:bg-indigo-700 transition"
            >
              {saving ? "Saving..." : "Save Preferences"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
