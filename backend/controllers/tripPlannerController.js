import dotenv from "dotenv";
import { getJson } from "serpapi";
dotenv.config();

export const planTrip = async (req, res) => {
  try {
    const { destination, startDate, endDate, budget } = req.body;

    if (!destination || !startDate || !endDate || !budget) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Define suggestions for popular destinations
    const suggestions = {
      ooty: ["Doddabetta Peak", "Ooty Lake", "Botanical Gardens", "Tea Museum", "Pykara Falls"],
      manali: ["Solang Valley", "Rohtang Pass", "Hadimba Temple", "Old Manali", "Jogini Falls"],
      goa: ["Baga Beach", "Fort Aguada", "Basilica of Bom Jesus", "Dudhsagar Falls", "Anjuna Flea Market"],
      jaipur: ["Amber Fort", "Hawa Mahal", "City Palace", "Jantar Mantar", "Nahargarh Fort"],
      delhi: ["India Gate", "Qutub Minar", "Red Fort", "Humayun's Tomb", "Lotus Temple"],
      mumbai: ["Gateway of India", "Marine Drive", "Elephanta Caves", "Juhu Beach", "Sanjay Gandhi National Park"],
      bangalore: ["Cubbon Park", "Lalbagh Botanical Garden", "MG Road", "Bangalore Palace", "Wonderla Amusement Park"],
      kolkata: ["Victoria Memorial", "Howrah Bridge", "Park Street", "Indian Museum", "Science City"],
      chennai: ["Marina Beach", "Kapaleeshwarar Temple", "Fort St. George", "Elliot's Beach", "Santhome Cathedral"],
      agra: ["Taj Mahal", "Agra Fort", "Fatehpur Sikri", "Mehtab Bagh", "Itimad-ud-Daulah's Tomb"],
    };
    
    const getPlaces = (name) => {
      const key = String(name || "").toLowerCase().trim();
      return suggestions[key] || [
        `Top attractions in ${name}: Old Town walking street`,
        `Popular viewpoint near ${name}`,
        `Main lake/park area`,
        `Local museum or cultural center`,
        `Best street-food lane`
      ];
    };

    const splitToBullets = (text) => {
      if (!text || typeof text !== "string") return [];
      const lines = text
        .replace(/\r/g, "\n")
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      if (!lines.length) return [];
      // If it's a long paragraph, try to split by bullet-like delimiters
      if (lines.length === 1) {
        const byDash = text.split(/\n|\s*[•\-\u2022\u25CF\u25AA]|\d+\.|\*/g).map((t) => t.trim()).filter((t) => t);
        if (byDash.length > 1) return byDash;
      }
      // Keep only those that look like bullet points or sentences
      return lines;
    };

    const normalizeSerpToTextBlocks = (serpResponse) => {
      const blocks = [];
      // Direct text_blocks
      if (Array.isArray(serpResponse?.text_blocks)) {
        serpResponse.text_blocks.forEach((t) => {
          if (typeof t === "string" && t.trim()) blocks.push(t.trim());
        });
      }
      // Common single-string fields
      const possibleStrings = [
        serpResponse?.answer,
        serpResponse?.result,
        serpResponse?.content,
        serpResponse?.snippet,
        serpResponse?.answer_box?.answer,
        serpResponse?.answer_box?.snippet,
        serpResponse?.knowledge_graph?.description,
      ].filter((v) => typeof v === "string" && v.trim());
      possibleStrings.forEach((s) => {
        splitToBullets(s).forEach((b) => blocks.push(b));
      });
      // Chat-style arrays
      if (Array.isArray(serpResponse?.chat)) {
        serpResponse.chat.forEach((msg) => {
          if (typeof msg === "string") {
            splitToBullets(msg).forEach((b) => blocks.push(b));
          } else if (msg && typeof msg?.content === "string") {
            splitToBullets(msg.content).forEach((b) => blocks.push(b));
          }
        });
      }
      // Organic results snippets
      if (Array.isArray(serpResponse?.organic_results)) {
        serpResponse.organic_results.forEach((r) => {
          if (typeof r?.snippet === "string" && r.snippet.trim()) {
            blocks.push(r.snippet.trim());
          }
        });
      }
      // Deduplicate and limit
      const seen = new Set();
      const unique = [];
      for (const b of blocks) {
        const k = b.toLowerCase();
        if (!seen.has(k)) {
          seen.add(k);
          unique.push(b);
        }
      }
      return unique.slice(0, 50);
    };

    // Generate a comprehensive trip plan
    const generateTripPlan = () => {
      // Calculate trip duration in days
      const start = new Date(startDate);
      const end = new Date(endDate);
      const tripDays = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
      
      // Generate itinerary based on trip duration
      const itinerary = [];
      for (let i = 1; i <= Math.min(tripDays, 7); i++) {
        switch (i) {
          case 1:
            itinerary.push(`Day 1: Arrive in ${destination}, check into hotel, explore local markets and enjoy welcome dinner`);
            break;
          case 2:
            itinerary.push(`Day 2: Visit main attractions and landmarks in ${destination}, including ${getPlaces(destination)[0] || 'popular sites'}`);
            break;
          case 3:
            itinerary.push(`Day 3: Enjoy local cuisine and cultural experiences, visit ${getPlaces(destination)[1] || 'cultural sites'}`);
            break;
          case 4:
            itinerary.push(`Day 4: Day trip to ${getPlaces(destination)[2] || 'nearby attractions'} or relax at hotel`);
            break;
          case 5:
            itinerary.push(`Day 5: Visit ${getPlaces(destination)[3] || 'remaining attractions'} and evening entertainment`);
            break;
          case 6:
            itinerary.push(`Day 6: Free day for shopping or optional activities of your choice`);
            break;
          case 7:
            itinerary.push(`Day 7: Last-minute shopping and departure`);
            break;
          default:
            itinerary.push(`Day ${i}: Explore more of ${destination} at your own pace`);
        }
      }
      
      // If trip is shorter than 7 days, ensure last day includes departure
      if (tripDays < 7 && tripDays > 1) {
        itinerary[tripDays-1] = `Day ${tripDays}: Last-minute shopping and departure`;
      }

      // Calculate budget breakdown based on trip duration
      const flightPercentage = tripDays <= 3 ? 0.5 : tripDays <= 7 ? 0.4 : 0.35;
      const accommodationPercentage = tripDays <= 3 ? 0.25 : tripDays <= 7 ? 0.3 : 0.35;
      const activitiesPercentage = 0.15;
      const foodPercentage = 0.1;
      
      return {
        destination: destination,
        startDate: startDate,
        endDate: endDate,
        budget: budget,
        tripDuration: `${tripDays} days`,
        itinerary: itinerary,
        flights: [
          `Book round-trip flights to ${destination}`,
          `Consider booking 2-3 months in advance for best prices`,
          `Check for connecting flights if direct flights are expensive`,
          `Look for early morning or late night flights for better deals`
        ],
        hotels: [
          `Book hotel in city center for easy access to attractions`,
          `Consider boutique hotels for unique experience`,
          `Look for hotels with breakfast included`,
          `Check for package deals that include airport transfers`
        ],
        activities: [
          `Visit top-rated attractions in ${destination}`,
          `Try local cuisine at recommended restaurants`,
          `Take guided tours for better understanding of local culture`,
          `Allocate budget for shopping and souvenirs`,
          `Consider booking activities in advance to avoid disappointment`
        ],
        places: getPlaces(destination),
        budgetBreakdown: {
          flights: Math.round(budget * flightPercentage),
          accommodation: Math.round(budget * accommodationPercentage),
          activities: Math.round(budget * activitiesPercentage),
          food: Math.round(budget * foodPercentage)
        },
        tips: [
          `Carry cash for small vendors and shops`,
          `Download offline maps for navigation`,
          `Learn a few local phrases to enhance your experience`,
          `Check weather forecast before packing`,
          `Keep emergency contact numbers handy`
        ]
      };
    };

    // Try to use SerpAPI if available, otherwise use our enhanced trip planner
    if (!process.env.SERP_API_KEY) {
      const enhancedPlan = generateTripPlan();
      return res.json({ success: true, plan: enhancedPlan });
    }

    // Call SerpAPI Bing Copilot for trip planning suggestions
    const q = `Create a detailed trip plan for ${destination} from ${startDate} to ${endDate} with a budget of ₹${budget}. Give bullet points for itinerary, flight suggestions, hotel recommendations, activities, and budget tips.`;

    try {
      const serpResponse = await getJson({
        engine: "bing_copilot",
        q,
        api_key: process.env.SERP_API_KEY,
      });

      const textBlocks = normalizeSerpToTextBlocks(serpResponse);
      
      if (!textBlocks || textBlocks.length === 0) {
        throw new Error("No valid response from SerpAPI");
      }

      return res.json({ 
        success: true, 
        plan: { 
          destination, 
          startDate, 
          endDate, 
          budget, 
          text_blocks: textBlocks, 
          places: getPlaces(destination) 
        } 
      });
    } catch (serpErr) {
      console.error("SerpAPI error:", serpErr?.message || serpErr);
      // Fallback to our enhanced trip planner if SerpAPI fails
      const enhancedPlan = generateTripPlan();
      return res.json({ 
        success: true, 
        plan: enhancedPlan, 
        note: "Generated a custom trip plan for you" 
      });
    }
  } catch (err) {
    console.error("Error in planTrip:", err);
    res.status(500).json({ success: false, message: "Server error while planning trip.", error: err.message });
  }
};


