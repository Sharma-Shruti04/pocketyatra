export const findDestinations = async (req, res) => {
  try {
    const { budget, season, travelType } = req.body;

    if (!budget || !season || !travelType) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Example static dataset (you can replace this with a database query)
    const allDestinations = [
      {
        name: "Manali",
        state: "Himachal Pradesh",
        averageBudget: 8000,
        bestSeason: "winter",
        type: "adventure",
      },
      {
        name: "Goa",
        state: "Goa",
        averageBudget: 15000,
        bestSeason: "summer",
        type: "relaxation",
      },
      {
        name: "Jaipur",
        state: "Rajasthan",
        averageBudget: 10000,
        bestSeason: "winter",
        type: "cultural",
      },
    ];

    // Filter logic
    const results = allDestinations.filter(
      (d) =>
        d.bestSeason.toLowerCase() === season.toLowerCase() &&
        d.type.toLowerCase() === travelType.toLowerCase() &&
        d.averageBudget <= parseInt(budget)
    );

    if (results.length === 0) {
      return res.status(404).json({ message: "No destinations found." });
    }

    return res.status(200).json({ destinations: results });
  } catch (err) {
    console.error("Error in findDestinations:", err);
    res.status(500).json({ message: "Server error while finding destinations." });
  }
};
