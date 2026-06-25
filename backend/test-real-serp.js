import { getJson } from "serpapi";
import dotenv from "dotenv";
dotenv.config();

async function run() {
  const API_KEY = process.env.SERP_API_KEY;
  console.log("Using API Key:", API_KEY ? "Yes" : "No");
  
  const params = {
    engine: "google_flights",
    departure_id: "IDR",
    arrival_id: "IXE",
    outbound_date: "2026-07-15",
    type: "2",
    currency: "INR",
    hl: "en",
    api_key: API_KEY,
  };

  try {
    const json = await getJson(params);
    const flights = json.best_flights || json.other_flights || [];
    console.log("Total flight groups found:", flights.length);
    if (flights.length > 0) {
      const flightGroup = flights[0];
      console.log("Flight Group Top-level Keys:", Object.keys(flightGroup));
      console.log("Flights array exists:", !!flightGroup.flights);
      if (flightGroup.flights) {
        console.log("Number of segments:", flightGroup.flights.length);
        flightGroup.flights.forEach((seg, idx) => {
          console.log(`Segment ${idx} keys:`, Object.keys(seg));
          console.log(`Segment ${idx} departure_airport:`, seg.departure_airport);
          console.log(`Segment ${idx} arrival_airport:`, seg.arrival_airport);
          console.log(`Segment ${idx} departure_time:`, seg.departure_time);
          console.log(`Segment ${idx} arrival_time:`, seg.arrival_time);
        });
      }
    } else {
      console.log("No flights in response. Full response:", JSON.stringify(json, null, 2));
    }
  } catch (err) {
    console.error("Error running test:", err);
  }
}

run();
