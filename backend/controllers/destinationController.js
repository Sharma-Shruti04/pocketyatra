import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const findDestinations = async (req, res) => {
  try {
    const { budget, season, travelType } = req.body;

    if (!budget || !season || !travelType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // If no API key, return dummy destinations
    if (!process.env.GEMINI_API_KEY) {
      const dummyDestinations = [
        { name: "Manali", state: "Himachal Pradesh", averageBudget: 8000, bestSeason: "winter", type: "adventure" },
        { name: "Goa", state: "Goa", averageBudget: 15000, bestSeason: "summer", type: "relaxation" },
        { name: "Jaipur", state: "Rajasthan", averageBudget: 10000, bestSeason: "winter", type: "cultural" },
      ];

      // Filter based on user input
      const results = dummyDestinations.filter(
        (d) =>
          d.bestSeason.toLowerCase() === season.toLowerCase() &&
          d.type.toLowerCase() === travelType.toLowerCase() &&
          d.averageBudget <= parseInt(budget)
      );

      return res.json({ success: true, destinations: results.length > 0 ? results : [{ note: "No destinations match your criteria" }] });
    }

    // Call external API (like flight API)
    const prompt = `List 3 destinations for a ${travelType} trip in ${season} season with budget under ${budget} INR. 
      Include name, state, averageBudget, bestSeason, type in JSON array format.`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch {
      parsedData = [{ note: "Unable to parse Gemini output", raw: text }];
    }

    res.json({ success: true, destinations: parsedData });
  } catch (err) {
    console.error("Error in findDestinations:", err);
    res.status(500).json({ success: false, message: "Server error while finding destinations.", error: err.message });
  }
};
