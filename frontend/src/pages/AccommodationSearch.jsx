import React, { useState } from "react";
import Layout from "../components/Layout";
import InputField from "../components/InputField";

export default function AccommodationSearch() {
  const [form, setForm] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!form.location || !form.checkIn || !form.checkOut) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setHotels([]);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/search-hotels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setHotels(data.hotels || []);
      } else {
        alert(data.message || "Failed to fetch hotels.");
      }
    } catch (err) {
      console.error("Hotel search error:", err);
      alert("Something went wrong while fetching hotels!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600">Find Accommodation</h1>
          <p className="text-gray-500 mt-2">
            Discover hotels and stays that match your travel plans.
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="bg-white shadow-md rounded-xl p-6 space-y-4"
        >
          <InputField
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g., Goa, Shimla, Manali"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Check-In Date"
              type="date"
              name="checkIn"
              value={form.checkIn}
              onChange={handleChange}
            />
            <InputField
              label="Check-Out Date"
              type="date"
              name="checkOut"
              value={form.checkOut}
              onChange={handleChange}
            />
          </div>

          <InputField
            label="Guests"
            type="number"
            name="guests"
            min="1"
            value={form.guests}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Searching..." : "Search Hotels"}
          </button>
        </form>

        {/* Results Section */}
        {hotels.length > 0 ? (
          <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">
              Available Hotels
            </h2>

            <div className="divide-y divide-gray-200">
              {hotels.map((hotel, index) => (
                <div
                  key={index}
                  className="py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      🏨 {hotel.name || "Hotel"}
                    </p>
                    <p className="text-gray-600">{hotel.location}</p>
                    <p className="text-sm text-gray-500">
                      ⭐ {hotel.rating || "N/A"} | {hotel.rooms || "N/A"} rooms
                      available
                    </p>
                  </div>

                  <div className="mt-2 sm:mt-0 text-right">
                    <p className="text-blue-600 font-semibold">
                      ₹{hotel.pricePerNight}/night
                    </p>
                    <button className="bg-green-500 text-white text-sm px-3 py-1 rounded-md mt-2 hover:bg-green-600 transition">
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          !loading && (
            <p className="text-center text-gray-500">
              No hotels found. Try searching a different location.
            </p>
          )
        )}
      </div>
    </Layout>
  );
}
