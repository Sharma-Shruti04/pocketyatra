import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const planTrip = async (req, res) => {
  try {
    const { destination, startDate, endDate, budget } = req.body;

    if (!destination || !startDate || !endDate || !budget) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // If no API key, return dummy trip plan
    if (!process.env.GEMINI_API_KEY) {
      const dummyPlan = {
        destination: destination,
        startDate: startDate,
        endDate: endDate,
        budget: budget,
        itinerary: [
          `Day 1: Arrive in ${destination}, check into hotel, explore local markets`,
          `Day 2: Visit main attractions and landmarks in ${destination}`,
          `Day 3: Enjoy local cuisine and cultural experiences`,
          `Day 4: Day trip to nearby attractions or relax at hotel`,
          `Day 5: Last-minute shopping and departure`
        ],
        flights: [
          `Book round-trip flights to ${destination}`,
          `Consider booking 2-3 months in advance for best prices`,
          `Check for connecting flights if direct flights are expensive`
        ],
        hotels: [
          `Book hotel in city center for easy access to attractions`,
          `Consider boutique hotels for unique experience`,
          `Look for hotels with breakfast included`
        ],
        activities: [
          `Visit top-rated attractions in ${destination}`,
          `Try local cuisine at recommended restaurants`,
          `Take guided tours for better understanding of local culture`,
          `Allocate budget for shopping and souvenirs`
        ],
        budgetBreakdown: {
          flights: Math.round(budget * 0.4),
          accommodation: Math.round(budget * 0.3),
          activities: Math.round(budget * 0.2),
          food: Math.round(budget * 0.1)
        }
      };

      return res.json({ success: true, plan: dummyPlan });
    }

    // Call Gemini API for trip planning
    const prompt = `Create a detailed 5-day trip plan for ${destination} from ${startDate} to ${endDate} with a budget of ₹${budget}. 
      Include daily itinerary, flight suggestions, hotel recommendations, activities, and budget breakdown in JSON format.`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch {
      parsedData = {
        destination: destination,
        startDate: startDate,
        endDate: endDate,
        budget: budget,
        itinerary: [`Visit ${destination} and enjoy your trip!`],
        flights: [`Book flights to ${destination}`],
        hotels: [`Find accommodation in ${destination}`],
        activities: [`Explore ${destination}`]
      };
    }

    res.json({ success: true, plan: parsedData });
  } catch (err) {
    console.error("Error in planTrip:", err);
    res.status(500).json({ success: false, message: "Server error while planning trip.", error: err.message });
  }
};
