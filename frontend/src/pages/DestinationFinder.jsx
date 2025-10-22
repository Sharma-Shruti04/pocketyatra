
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

    setLoading(true);
    setDestinations([]);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/destinations", {
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
        <Layout>
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600">Destination Finder</h1>
          <p className="text-gray-500 mt-2">
            Discover your next dream destination based on your preferences.
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="bg-white shadow-md rounded-xl p-6 space-y-4"
        >
          <InputField
            label="Budget (in ₹)"
            name="budget"
            type="number"
            value={form.budget}
            onChange={handleChange}
            placeholder="Enter your budget (e.g., 20000)"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700 font-medium">Season</label>
              <select
                name="season"
                value={form.season}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Season</option>
                <option value="summer">Summer</option>
                <option value="winter">Winter</option>
                <option value="monsoon">Monsoon</option>
                <option value="autumn">Autumn</option>
                <option value="spring">Spring</option>
              </select>
            </div>

            <div>
              <label className="text-gray-700 font-medium">Travel Type</label>
              <select
                name="travelType"
                value={form.travelType}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Type</option>
                <option value="adventure">Adventure</option>
                <option value="relaxation">Relaxation</option>
                <option value="cultural">Cultural</option>
                <option value="romantic">Romantic</option>
                <option value="wildlife">Wildlife</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Finding..." : "Find Destinations"}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 rounded-lg p-4 text-center">
            {error}
          </div>
        )}

        {/* Results Section */}
        {!loading && !error && (
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              {destinations.length > 0
                ? "Recommended Destinations"
                : "No destinations found"}
            </h2>

            {destinations.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {destinations.map((dest, index) => (
                  <div
                    key={index}
                    className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-gray-50"
                  >
                    <p className="font-semibold text-gray-800">
                      📍 {dest.name || "Unknown Destination"}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {dest.state || "India"}
                    </p>
                    <p className="text-blue-600 mt-1 text-sm font-medium">
                      Avg. Budget: ₹{dest.averageBudget || "N/A"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Best Season: {dest.bestSeason || "All Year"}
                    </p>
                    <button className="mt-3 w-full bg-green-500 text-white text-sm py-1 rounded-md hover:bg-green-600 transition">
                      Explore
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                Try different preferences to see more destinations.
              </p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
