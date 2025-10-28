import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

/**
 * Controller function to search for flights using the SerpApi Google Flights API.
 * This provides real-time, structured flight data.
 */
export const searchFlights = async (req, res) => {
  try {
    // NOTE: SerpApi Google Flights requires IATA Airport Codes (e.g., 'DEL', 'JFK').
    // Ensure 'from' and 'to' contain these 3-letter codes.
    const { from, to, depart, returnDate } = req.body;

    // 1. Input Validation
    if (!from || !to || !depart) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    //const SERP_API_KEY = process.env.SERP_API_KEY;

    // 2. Fallback to Dummy Data (If API Key is missing)
    if (!process.env.SERP_API_KEY) {
      const dummyFlights = [
        { 
          id: 1, 
          airline: "IndiGo", 
          departure_time: "08:30 AM", 
          arrival_time: "10:45 AM", 
          duration: "2h 15m", 
          price_in_inr: 4899,
          details: `Non-stop flight from ${from} (${depart})`,
          is_round_trip: !!returnDate
        },
        { 
          id: 2, 
          airline: "Air India", 
          departure_time: "11:45 AM", 
          arrival_time: "02:10 PM", 
          duration: "2h 25m", 
          price_in_inr: 5250,
          details: `1 stop via BOM (${depart})`,
          is_round_trip: !!returnDate
        },
        { 
          id: 3, 
          airline: "SpiceJet", 
          departure_time: "06:00 PM", 
          arrival_time: "08:15 PM", 
          duration: "2h 15m", 
          price_in_inr: 4999,
          details: `Direct, cheapest fare (${depart})`,
          is_round_trip: !!returnDate
        },
      ];
      console.log("Using dummy flight data. Set SERP_API_KEY for real flight data.");
      return res.json({ success: true, data: dummyFlights });
    }

    // 3. Construct API URL and Parameters
    // SerpApi uses YYYY-MM-DD format for dates
    const serpApiUrl = "https://serpapi.com/search";
    const params = {
      //api_key: SERP_API_KEY,
      engine: "google_flights",
      departure_id: from, // IATA Airport Code
      arrival_id: to,     // IATA Airport Code
      outbound_date: depart, // YYYY-MM-DD
      // Use '1' for Round trip, '2' for One-way
      return_date: returnDate,
      // Optional: Set currency and language
      currency: "INR", 
      hl: "en",
      api_key: process.env.SERP_API_KEY
    };

    //const url = "https://serpapi.com/search";

    // 4. Call SerpApi
    const response = await axios.get(serpApiUrl, { params });

    // 5. Process SerpApi Response
    // SerpApi returns flights in 'best_flights' and 'other_flights' arrays.
    // We'll combine them for a comprehensive list.
    const bestFlights = response.data.best_flights || [];
    const otherFlights = response.data.other_flights || [];

    // The data structure from SerpApi is complex (flights are nested).
    // This helper function simplifies the data structure for the frontend
    // to match the 'accommodation-like' format you wanted.
    const formatFlights = (flights) => {
        let idCounter = 1;
        const formattedList = [];

        // Flights can be single flights or a set of connecting flights (best_flights)
        for (const flightGroup of flights) {
            // Check if it's a 'best_flights' group (it has a 'flights' array)
            const flightSegments = flightGroup.flights || [flightGroup];
            
            // Extract the core data for the display format
            const firstSegment = flightSegments[0];
            const lastSegment = flightSegments[flightSegments.length - 1];
            const totalDuration = flightGroup.duration; // Total duration in minutes
            const price = flightGroup.price;

            // This creates a single flight object from potentially multiple segments
            formattedList.push({
                id: idCounter++,
                airline: flightSegments.map(s => s.airline).join(' / '), // Show all airlines
                departure_time: firstSegment.departure_airport?.time.substring(11, 16) || 'N/A',
                arrival_time: lastSegment.arrival_airport?.time.substring(11, 16) || 'N/A',
                duration: `${Math.floor(totalDuration / 60)}h ${totalDuration % 60}m`,
                price_in_inr: price,
                details: flightSegments.length > 1 
                         ? `${flightSegments.length - 1} stop${flightSegments.length > 2 ? 's' : ''}`
                         : 'Non-stop',
                is_round_trip: !!returnDate,
                // Optional: keep the raw SerpApi data for debugging
                raw: flightGroup 
            });
        }
        return formattedList;
    };

    const allFlights = [
      ...formatFlights(bestFlights), 
      ...formatFlights(otherFlights)
    ];

    // 6. Send Successful Response
    res.json({ success: true, data: allFlights });
  } catch (err) {
    console.error("Error fetching flights from SerpApi:", err.response?.data || err.message);
    // Be sure to check the exact error response for better debugging
    res.status(500).json({ 
      message: "Failed to fetch flight data from SerpApi.", 
      error: err.message,
      serp_error_detail: err.response?.data?.error 
    });
  }
};