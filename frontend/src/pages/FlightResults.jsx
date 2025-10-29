import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../api/axiosConfig";

export default function FlightResults() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Extract query params
  const queryParams = new URLSearchParams(location.search);
  const from = queryParams.get("from");
  const to = queryParams.get("to");
  const depart = queryParams.get("depart");
  const returnDate = queryParams.get("returnDate");

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      setError("");
      
      try {
        if (!from || !to || !depart) {
          setError("Invalid search parameters");
          setLoading(false);
          return;
        }

        const response = await API.post("/flights/search", {
          from,
          to,
          depart,
          returnDate,
        });

        if (response.data.success && response.data.data) {
          setFlights(response.data.data);
        } else {
          setError("No flights available for your search criteria.");
        }
      } catch (err) {
        console.error("Flight fetch error:", err);
        setError(err.response?.data?.message || "Failed to fetch flights. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [from, to, depart, returnDate]);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <button
                onClick={() => navigate("/flights")}
                className="mb-4 text-blue-600 hover:text-blue-700 font-semibold flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Search
              </button>
              
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                    Flight Results
                  </h1>
                    <p className="text-gray-600">    
                      {from} → {to} {returnDate ? "(Round Trip)" : "(One Way)"}
                    </p>
                  </div>
                <div className="hidden md:flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-lg text-gray-700">Loading flights...</p>
              </div>
            )}

            {/* Error State */}
            {!loading && error && (
              <div className="bg-gradient-to-r from-red-50 to-red-100 text-red-700 border border-red-300 rounded-3xl p-8 text-center shadow-xl">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-xl font-semibold">Error</p>
                <p className="text-gray-600 mt-2">{error}</p>
              </div>
            )}

            {/* No Results */}
            {!loading && !error && flights.length === 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <p className="text-xl font-semibold text-gray-700">No flights available.</p>
                <button
                  onClick={() => navigate("/flights")}
                  className="mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-200"
                >
                  Search Again
                </button>
              </div>
            )}

            {/* Results */}
            {!loading && !error && flights.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Available Flights
                  </h2>
                </div>

                <div className="space-y-6">
                  {flights.map((flight, idx) => (
                    <div
                      key={flight.id || idx}
                      className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                    >
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                        <div className="flex-1 mb-4 lg:mb-0">
                          <div className="flex items-center mb-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold text-gray-800">{flight.airline || "Unknown Airline"}</h3>
                              <p className="text-sm text-gray-600">Economy Class</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 mt-4">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Departure</p>
                              <p className="text-lg font-bold text-gray-800">{flight.departure_time || flight.depart || "N/A"}</p>
                              <p className="text-xs text-gray-500">{from}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-500 mb-1">Duration</p>
                              <p className="text-sm font-semibold text-gray-800">{flight.duration || "N/A"}</p>
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full font-medium inline-block mt-2 ${
                                  flight.details?.includes("Non-stop")
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {flight.details || "N/A"}
                              </span>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Arrival</p>
                              <p className="text-lg font-bold text-gray-800">{flight.arrival_time || flight.arrival || "N/A"}</p>
                              <p className="text-xs text-gray-500">{to}</p>
                            </div>
                          </div>
                        </div>

                        <div className="lg:text-right lg:border-l lg:pl-6 lg:ml-6 pt-4 lg:pt-0">
                          <div className="text-3xl font-bold text-green-600 mb-2">
                            ${flight.price_usd?.toLocaleString() || flight.price_in_inr?.toLocaleString() || flight.price || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500 mb-4">Total Price</div>
                          <button className="w-full lg:w-auto bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}