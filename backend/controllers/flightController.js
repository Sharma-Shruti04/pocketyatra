import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const searchFlights = async (req, res) => {
  try {
    const { from, to, depart, returnDate } = req.body;
    if (!from || !to || !depart) return res.status(400).json({ message: "Missing required fields" });

    if (!process.env.GEMINI_API_KEY) {
      // Dummy flights
      const dummyFlights = [
        { 
          airline: "IndiGo", 
          departure_time: "08:30 AM", 
          arrival_time: "10:45 AM", 
          duration: "2h 15m", 
          price_in_inr: 4899,
          from: from,
          to: to,
          depart: depart,
          returnDate: returnDate
        },
        { 
          airline: "Air India", 
          departure_time: "11:45 AM", 
          arrival_time: "02:10 PM", 
          duration: "2h 25m", 
          price_in_inr: 5250,
          from: from,
          to: to,
          depart: depart,
          returnDate: returnDate
        },
        { 
          airline: "SpiceJet", 
          departure_time: "06:00 PM", 
          arrival_time: "08:15 PM", 
          duration: "2h 15m", 
          price_in_inr: 4999,
          from: from,
          to: to,
          depart: depart,
          returnDate: returnDate
        },
      ];
      return res.json({ success: true, data: dummyFlights });
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: `List 3 flights from ${from} to ${to} on ${depart}${returnDate ? ` returning on ${returnDate}` : ""} with airline name, departure time, arrival time, duration, and price in INR in JSON array format.` }] }],
      }
    );

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
    let parsedData;
    try { parsedData = JSON.parse(text); } catch { parsedData = [{ note: "Unable to parse Gemini output", raw: text }]; }

    res.json({ success: true, data: parsedData });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch flight data", error: err.message });
  }
};
