import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import API from "../api/axiosConfig";

export default function FlightSearch() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [depart, setDepart] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [tripType, setTripType] = useState("one-way");

  const [flightData, setFlightData] = useState([]);
  const [searchParams, setSearchParams] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(94.4);
  const today = new Date().toLocaleDateString('en-CA');

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        if (data?.rates?.INR) {
          setExchangeRate(data.rates.INR);
        }
      })
      .catch((err) => console.error("Error fetching exchange rate on frontend:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFlightData([]);

    // Enhanced validation
    if (!from || !to || !depart) {
      setError("Please provide origin (IATA), destination (IATA), and departure date.");
      return;
    }

    // Validate IATA codes (should be 3 letters)
    const iataRegex = /^[A-Z]{3}$/;
    if (!iataRegex.test(from.toUpperCase()) || !iataRegex.test(to.toUpperCase())) {
      setError("Please enter valid 3-letter IATA airport codes (e.g., DEL, BOM, JFK, PEK, AUS)");
      return;
    }

    // Validate dates
    if (depart < today) {
      setError("Departure date cannot be in the past");
      return;
    }

    // For round-trip, validate return date
    if (tripType === "round-trip") {
      if (!returnDate) {
        setError("Please provide a return date for round-trip flights.");
        return;
      }

      if (returnDate < depart) {
        setError("Return date must be after departure date");
        return;
      }
    }

    setLoading(true);

    // Construct parameters based on trip type
    const currentParams = {
      from: from.toUpperCase(),
      to: to.toUpperCase(),
      depart,
      returnDate: tripType === "round-trip" ? returnDate : undefined,
    };
    setSearchParams(currentParams);

    try {
      // Call the backend API endpoint
      const response = await API.post("/flights", currentParams);
      setFlightData(response.data.data || []);
    } catch (err) {
      console.error("Flight Search Failed:", err);
      setError(err.response?.data?.message || "Failed to fetch flight data. Check backend logs.");
      setFlightData([]);
    } finally {
      setLoading(false);
      setHasSearched(true);
    }
  };

  const handleBookFlight = async (flight) => {
    if (flight.booking_token) {
      try {
        const response = await API.post("/flights/booking", {
          booking_token: flight.booking_token
        });
        if (response.data?.success && response.data?.url) {
          window.open(response.data.url, "_blank", "noopener,noreferrer");
          return;
        }
      } catch (err) {
        console.warn("Failed to get direct booking option, falling back to query redirect:", err);
      }
    }

    const fromCode = (searchParams.from || from || "DEL").toUpperCase();
    const toCode = (searchParams.to || to || "BOM").toUpperCase();
    const departDate = searchParams.depart || depart || "";
    const returnDateParam = searchParams.returnDate ? `&return_date=${searchParams.returnDate}` : "";
    const googleFlightsUrl = `https://www.google.com/travel/flights?q=Flights%20from%20${fromCode}%20to%20${toCode}%20on%20${departDate}${returnDateParam}`;
    window.open(googleFlightsUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Layout>
      <div className="w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-8 pb-0 flex-1 flex flex-col transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 dark:border-slate-800/50 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                Flight Finder
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                Search for the best flight deals. Compare prices for one-way and round-trip flights to your destination.
              </p>
            </div>
 
            {/* Search Form */}
            <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 dark:border-slate-800/50 transition-all duration-300">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Trip Type Selection */}
                <div className="flex gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => {
                      setTripType("one-way");
                      setReturnDate("");
                    }}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                      tripType === "one-way"
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                        : "bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-700"
                    }`}
                  >
                    One-Way
                  </button>
                  <button
                    type="button"
                    onClick={() => setTripType("round-trip")}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                      tripType === "round-trip"
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                        : "bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-700"
                    }`}
                  >
                    Round-Trip
                  </button>
                </div>
 
                {/* Input Fields */}
                <div className={`grid grid-cols-1 ${tripType === "round-trip" ? "md:grid-cols-4" : "md:grid-cols-3"} gap-6`}>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Origin (IATA)
                    </label>
                    <input
                      type="text"
                      value={from}
                      onChange={(e) => setFrom(e.target.value.toUpperCase())}
                      placeholder="e.g., DEL, PEK"
                      maxLength="3"
                      required
                      className="w-full border-2 border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white dark:bg-slate-800 dark:text-gray-100 dark:focus:bg-slate-700 uppercase"
                    />
                  </div>
 
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Destination (IATA)
                    </label>
                    <input
                      type="text"
                      value={to}
                      onChange={(e) => setTo(e.target.value.toUpperCase())}
                      placeholder="e.g., BOM, AUS"
                      maxLength="3"
                      required
                      className="w-full border-2 border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white dark:bg-slate-800 dark:text-gray-100 dark:focus:bg-slate-700 uppercase"
                    />
                  </div>
 
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Departure Date
                    </label>
                    <input
                      type="date"
                      value={depart}
                      onChange={(e) => setDepart(e.target.value)}
                      min={today}
                      required
                      className="w-full border-2 border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white dark:bg-slate-800 dark:text-gray-100"
                    />
                  </div>
 
                  {tripType === "round-trip" && (
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Return Date
                      </label>
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        min={depart || today}
                        required
                        className="w-full border-2 border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white dark:bg-slate-800 dark:text-gray-100"
                      />
                    </div>
                  )}
                </div>
 
                {/* Error Message */}
                {error && (
                  <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/20 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-900/50 rounded-2xl p-4 text-center shadow-lg">
                    <div className="flex items-center justify-center mb-2">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-semibold">Error</span>
                    </div>
                    <p>{error}</p>
                  </div>
                )}
 
                {/* Search Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Searching...
                    </div>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      {tripType === "round-trip" ? "Search Round-Trip Flights" : "Search One-Way Flights"}
                    </>
                  )}
                </button>
              </form>
            </div>
 
            {/* Results Section */}
            {loading && (
              <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20 dark:border-slate-800/50 text-center transition-all duration-300">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-lg text-gray-700 dark:text-gray-300">Searching for the best flight deals...</p>
              </div>
            )}
 
            {!loading && error && hasSearched && (
              <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/20 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-900/50 rounded-3xl p-8 text-center shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-xl font-semibold">Search Error</p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{error}</p>
              </div>
            )}
 
            {!loading && !error && hasSearched && flightData.length === 0 && (
              <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20 dark:border-slate-800/50 text-center transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-slate-800 dark:to-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">No flights found</p>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your dates or airport codes (e.g., DEL, BOM, PEK, AUS).</p>
              </div>
            )}
 
            {!loading && !error && flightData.length > 0 && (
              <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 dark:border-slate-800/50 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {flightData.length} Flight{flightData.length !== 1 ? "s" : ""} Found
                  </h2>
                </div>
 
                <div className="space-y-6">
                  {flightData.map((flight) => (
                    <div
                      key={flight.id}
                      className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-800/60 rounded-2xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
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
                              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{flight.airline || "Unknown Airline"}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{flight.flight_number || "Economy Class"}</p>
                            </div>
                          </div>
 
                          <div className="grid grid-cols-3 gap-4 mt-4">
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Departure</p>
                              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{flight.departure_time || "N/A"}</p>
                              <p className="text-xs text-gray-550 dark:text-gray-450">{searchParams.from}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Duration</p>
                              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{flight.duration || "N/A"}</p>
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full font-medium inline-block mt-2 ${
                                  flight.details?.includes("Non-stop")
                                    ? "bg-green-100 dark:bg-emerald-950/50 text-green-700 dark:text-emerald-300"
                                    : "bg-yellow-100 dark:bg-amber-950/50 text-yellow-700 dark:text-amber-300"
                                }`}
                              >
                                {flight.details || "N/A"}
                              </span>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Arrival</p>
                              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{flight.arrival_time || "N/A"}</p>
                              <p className="text-xs text-gray-550 dark:text-gray-450">{searchParams.to}</p>
                            </div>
                          </div>
                        </div>
 
                        <div className="lg:text-right lg:border-l lg:border-gray-200 dark:lg:border-slate-700 lg:pl-6 lg:ml-6 pt-4 lg:pt-0 flex items-center justify-end">
                          <button 
                            onClick={() => handleBookFlight(flight)}
                            className="w-full lg:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105 shadow-lg cursor-pointer"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
 
            {!hasSearched && (
              <div className="text-center bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20 dark:border-slate-800/50 transition-all duration-300">
                <p className="text-xl text-gray-500 dark:text-gray-400">Enter your travel details above to see flight results here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
