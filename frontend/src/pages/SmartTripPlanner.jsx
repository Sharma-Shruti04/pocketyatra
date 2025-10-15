import React, { useState } from "react";
import Navbar from "../components/Navbar"; // ✅ import your navbar component

export default function SmartTripPlanner() {
  const [trip, setTrip] = useState({
    name: "",
    from: "",
    to: "",
    departure: "",
    returnDate: "",
    travelers: "2 people",
    budget: "50000",
    type: "Leisure",
    preferences: [],
  });

  const preferences = [
    "budget friendly",
    "luxury",
    "cultural",
    "nature",
    "nightlife",
    "food",
    "shopping",
    "history",
  ];

  const togglePreference = (pref) => {
    setTrip((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(pref)
        ? prev.preferences.filter((p) => p !== pref)
        : [...prev.preferences, pref],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Smart Itinerary Generated!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Header Section */}
      <section className="text-center mt-12">
        <h2 className="text-3xl font-semibold text-gray-800">
          Smart Trip Planner
        </h2>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
          Let AI create the perfect itinerary for your next adventure. Just tell
          us your preferences and we’ll handle the rest.
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <button className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
            Create Trip
          </button>
          <button className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg shadow hover:bg-gray-200">
            My Trips (4)
          </button>
        </div>
      </section>

      {/* Trip Planner Form */}
      <div className="max-w-3xl mx-auto bg-white mt-10 p-8 rounded-2xl shadow">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          ✨ Plan Your Dream Trip
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Trip Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-600 text-sm">Trip Name</label>
              <input
                type="text"
                placeholder="e.g., Goa Beach Getaway, Kerala Backwaters..."
                value={trip.name}
                onChange={(e) => setTrip({ ...trip, name: e.target.value })}
                className="w-full mt-1 border rounded-lg p-2 focus:outline-blue-500"
              />
            </div>

            <div>
              <label className="text-gray-600 text-sm">Trip Type</label>
              <select
                value={trip.type}
                onChange={(e) => setTrip({ ...trip, type: e.target.value })}
                className="w-full mt-1 border rounded-lg p-2 focus:outline-blue-500"
              >
                <option>Leisure</option>
                <option>Adventure</option>
                <option>Business</option>
                <option>Romantic</option>
              </select>
            </div>
          </div>

          {/* Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-600 text-sm">From</label>
              <input
                type="text"
                placeholder="Mumbai, Delhi, Bangalore..."
                value={trip.from}
                onChange={(e) => setTrip({ ...trip, from: e.target.value })}
                className="w-full mt-1 border rounded-lg p-2 focus:outline-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm">To</label>
              <input
                type="text"
                placeholder="Goa, Kerala, Dubai..."
                value={trip.to}
                onChange={(e) => setTrip({ ...trip, to: e.target.value })}
                className="w-full mt-1 border rounded-lg p-2 focus:outline-blue-500"
              />
            </div>
          </div>

          {/* Dates and Travelers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-gray-600 text-sm">Departure Date</label>
              <input
                type="date"
                value={trip.departure}
                onChange={(e) => setTrip({ ...trip, departure: e.target.value })}
                className="w-full mt-1 border rounded-lg p-2 focus:outline-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm">Return Date</label>
              <input
                type="date"
                value={trip.returnDate}
                onChange={(e) =>
                  setTrip({ ...trip, returnDate: e.target.value })
                }
                className="w-full mt-1 border rounded-lg p-2 focus:outline-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm">Travelers</label>
              <input
                type="text"
                value={trip.travelers}
                onChange={(e) =>
                  setTrip({ ...trip, travelers: e.target.value })
                }
                className="w-full mt-1 border rounded-lg p-2 focus:outline-blue-500"
              />
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="text-gray-600 text-sm">Total Budget</label>
            <input
              type="number"
              placeholder="Enter amount in Indian Rupees (INR)"
              value={trip.budget}
              onChange={(e) => setTrip({ ...trip, budget: e.target.value })}
              className="w-full mt-1 border rounded-lg p-2 focus:outline-blue-500"
            />
          </div>

          {/* Travel Preferences */}
          <div>
            <label className="text-gray-600 text-sm">Travel Preferences</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {preferences.map((pref) => (
                <button
                  key={pref}
                  type="button"
                  onClick={() => togglePreference(pref)}
                  className={`px-3 py-1 rounded-full border transition text-sm ${
                    trip.preferences.includes(pref)
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  + {pref}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl shadow-lg font-semibold hover:opacity-90"
          >
            Generate Smart Itinerary
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500 text-sm pb-6">
        <p>
          Crafted with ❤️ for travelers worldwide <br />
          Powered by AI • Real-time data • Smart recommendations
        </p>
        <div className="mt-2 font-semibold text-gray-700">
          PocketYatra — Your smart travel companion
        </div>
      </footer>
    </div>
  );
}
