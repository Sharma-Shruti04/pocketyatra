import React, { useState } from 'react';
import axios from 'axios';

/**
 * Single component combining the Flight Search Form and Flight Results display.
 * This component manages the state for search inputs and results data for ONE-WAY trips.
 */
const FlightSearch = () => {
    // === State Management ===
    const [from, setFrom] = useState(''); // IATA Code (e.g., 'DEL')
    const [to, setTo] = useState('');     // IATA Code (e.g., 'BOM')
    const [depart, setDepart] = useState(''); // YYYY-MM-DD

    const [flightData, setFlightData] = useState(null); // Array of flight objects
    const [searchParams, setSearchParams] = useState({}); // Parameters used for the search
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);


    // === Form Submission Handler ===
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setFlightData(null); // Clear previous results

        // Basic validation: Only need origin, destination, and departure date
        if (!from || !to || !depart) {
            setError('Please provide origin (IATA), destination (IATA), and departure date.');
            return;
        }

        setLoading(true);
        
        // Construct parameters for a ONE-WAY trip
        const currentParams = {
            from: from.toUpperCase(),
            to: to.toUpperCase(),
            depart,
            // returnDate is intentionally omitted for one-way search
        };
        setSearchParams(currentParams);
        
        try {
            // Call the backend API endpoint
            const response = await axios.post('/api/flights/search', currentParams);
            
            setFlightData(response.data.data);

        } catch (err) {
            console.error('Flight Search Failed:', err);
            setError(err.response?.data?.message || 'Failed to fetch flight data. Check backend logs.');
            setFlightData([]); // Set to empty array to show "No flights found"
        } finally {
            setLoading(false);
            setHasSearched(true);
        }
    };

    // === Result Display Component (Inline) ===
    const renderFlightResults = () => {
        if (loading) {
            return (
                <div className="text-center p-8 bg-white rounded-xl shadow-lg mt-8">
                    <svg className="animate-spin h-8 w-8 text-indigo-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-4 text-lg text-gray-700">Searching for the best one-way fares...</p>
                </div>
            );
        }
        
        if (error) {
            return (
                <div className="text-center p-8 bg-red-50 rounded-xl shadow-lg mt-8 border border-red-200">
                    <p className="text-xl font-semibold text-red-700">Search Error</p>
                    <p className="text-gray-600 mt-2">{error}</p>
                </div>
            );
        }

        if (hasSearched && (!flightData || flightData.length === 0)) {
             return (
                 <div className="text-center p-8 bg-white rounded-xl shadow-lg mt-8 border border-gray-200">
                     <p className="text-xl font-semibold text-gray-700">🚫 No flights found.</p>
                     <p className="text-gray-500 mt-2">Try adjusting your dates or airport codes (e.g., DEL, BOM).</p>
                 </div>
             );
        }

        if (flightData && flightData.length > 0) {
            // Simplified trip summary for one-way
            const tripSummary = `${searchParams.from} to ${searchParams.to} (One Way)`;

            return (
                <div className="max-w-5xl mx-auto mt-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
                        Showing {flightData.length} Flight Options for {tripSummary}
                    </h2>
                    
                    <div className="space-y-5">
                        {flightData.map((flight) => (
                            <div 
                                key={flight.id} 
                                className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100"
                            >
                                {/* 1. Times, Duration, and Stops */}
                                <div className="w-full md:w-1/3 flex items-center space-x-4 mb-4 md:mb-0">
                                    <div className="flex flex-col">
                                        <span className="text-3xl font-extrabold text-indigo-700">{flight.departure_time}</span>
                                        <span className="text-sm text-gray-500">Depart ({searchParams.from})</span>
                                    </div>
                                    
                                    <div className="flex flex-col items-center flex-grow">
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                            flight.details.includes('Non-stop') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {flight.details}
                                        </span>
                                        <span className="text-sm text-gray-400 mt-1">{flight.duration}</span>
                                    </div>
                                    
                                    <div className="flex flex-col text-right">
                                        <span className="text-3xl font-extrabold text-indigo-700">{flight.arrival_time}</span>
                                        <span className="text-sm text-gray-500">Arrive ({searchParams.to})</span>
                                    </div>
                                </div>

                                {/* 2. Airline Details */}
                                <div className="w-full md:w-1/3 flex flex-col justify-center items-start md:items-center mb-4 md:mb-0">
                                    <span className="text-lg font-semibold text-gray-800">{flight.airline}</span>
                                    <span className="text-sm text-gray-500">Economy Class</span>
                                </div>

                                {/* 3. Price and Action */}
                                <div className="w-full md:w-1/4 flex flex-col items-start md:items-end space-y-2 pt-4 md:pt-0 border-t md:border-t-0 md:border-l md:pl-6">
                                    <span className="text-4xl font-bold text-green-600">
                                        ₹{flight.price_in_inr.toLocaleString()} 
                                    </span>
                                    <span className="text-sm text-gray-500">Total Price</span>
                                    <button className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300">
                                        View Deal
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        
        return null; // Initial state before search
    };

    // === Main Component Render ===
    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans">
            <div className="container mx-auto max-w-6xl">
                
                {/* Search Form */}
                <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-2xl space-y-4 mb-10">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">✈️ One-Way Flight Finder</h2>
                    
                    {/* Input Fields (3 columns: From, To, Depart) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        
                        {/* Origin (IATA Code) */}
                        <div>
                            <label htmlFor="from" className="block text-sm font-medium text-gray-700">Origin (IATA)</label>
                            <input
                                id="from"
                                type="text"
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                                placeholder="e.g., DEL"
                                maxLength="3"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm uppercase"
                            />
                        </div>

                        {/* Destination (IATA Code) */}
                        <div>
                            <label htmlFor="to" className="block text-sm font-medium text-gray-700">Destination (IATA)</label>
                            <input
                                id="to"
                                type="text"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                placeholder="e.g., BOM"
                                maxLength="3"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm uppercase"
                            />
                        </div>

                        {/* Departure Date */}
                        <div>
                            <label htmlFor="depart" className="block text-sm font-medium text-gray-700">Departure Date</label>
                            <input
                                id="depart"
                                type="date"
                                value={depart}
                                onChange={(e) => setDepart(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                    </div>

                    {/* Search Button */}
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full md:w-auto px-8 py-3 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-150 ease-in-out"
                        >
                            {loading ? 'Searching...' : 'Search One-Way Flights'}
                        </button>
                    </div>
                </form>

                {/* Search Results Area */}
                {renderFlightResults()}

                {!hasSearched && (
                    <div className="text-center p-12 bg-white rounded-xl shadow-lg">
                        <p className="text-xl text-gray-500">
                            Enter your travel details above to see the one-way flight results here. 
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlightSearch;
