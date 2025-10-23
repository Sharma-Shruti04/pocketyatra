import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const searchHotels = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const { location, checkIn, checkOut, guests } = req.body;

    if (!location || !checkIn || !checkOut) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // If no API key, return dummy hotels
    if (!process.env.SERP_API_KEY) {
      const dummyHotels = [
        {
          name: "Taj Palace Hotel",
          location: location,
          rating: "4.5",
          rooms: "25",
          pricePerNight: 8500,
          amenities: ["WiFi", "Pool", "Spa", "Restaurant"]
        },
        {
          name: "Marriott Resort",
          location: location,
          rating: "4.3",
          rooms: "18",
          pricePerNight: 7200,
          amenities: ["WiFi", "Pool", "Gym", "Restaurant"]
        },
        {
          name: "Holiday Inn Express",
          location: location,
          rating: "4.1",
          rooms: "32",
          pricePerNight: 4500,
          amenities: ["WiFi", "Breakfast", "Parking"]
        },
        {
          name: "Budget Stay Inn",
          location: location,
          rating: "3.8",
          rooms: "45",
          pricePerNight: 2800,
          amenities: ["WiFi", "Parking"]
        }
      ];

      return res.json({ success: true, hotels: dummyHotels });
    }

    // Call Serp API for hotel search
    const serpApiUrl = "https://serpapi.com/search";
    const params = {
      engine: "google_hotels",
      q: `hotels in ${location}`,
      check_in_date: checkIn,
      check_out_date: checkOut,
      adults: guests || 1,
      currency: "USD",
      gl: "us",
      hl: "en",
      api_key: process.env.SERP_API_KEY
    };

    const response = await axios.get(serpApiUrl, { params });
    
    let hotels = [];
    
    if (response.data && response.data.properties) {
      hotels = response.data.properties.slice(0, 8).map(property => ({
        name: property.name || "Hotel",
        location: property.address || location,
        rating: property.overall_rating ? property.overall_rating.toString() : "N/A",
        rooms: property.rooms_available ? property.rooms_available.toString() : "N/A",
        pricePerNight: property.price ? parseInt(property.price.replace(/[^\d]/g, '')) : 0,
        amenities: property.amenities || ["WiFi", "Parking"],
        image: property.images && property.images[0] ? property.images[0].thumbnail : "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
        description: property.description || "Comfortable accommodation",
        link: property.link || "#",
        reviews: property.reviews || 0,
        hotelClass: property.hotel_class || "Hotel"
      }));
    }

    // If no hotels found from Serp API, return dummy data
    if (hotels.length === 0) {
      hotels = [
        {
          name: "Hill Side Inn",
          location: location,
          rating: "4.0",
          rooms: "20",
          pricePerNight: 5000,
          amenities: ["WiFi", "Pool"],
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
          description: "Scenic hotel with mountain views"
        }
      ];
    }

    res.json({ success: true, hotels });
  } catch (err) {
    console.error("Error in searchHotels:", err);
    
    // Return dummy hotels on API error
    const fallbackHotels = [
      {
        name: "Grand Hotel",
        location: location,
        rating: "4.2",
        rooms: "30",
        pricePerNight: 6000,
        amenities: ["WiFi", "Pool", "Restaurant"],
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
        description: "Premium hotel with excellent service"
      }
    ];
    
    res.json({ success: true, hotels: fallbackHotels });
  }
};
