// // controllers/dashboardController.js
// import Trip from "../models/Trip.js";
// import { User } from "../models/User.js";
// import { verifyToken } from "../middlewares/authMiddleware.js";
// //import { verifyToken } from "../middlewares/authMiddleware.js"; // updated import
// import { parse } from "url";

// export const handleDashboard = async (req, res) => {
//   // Protect the route
//   const authorized = verifyToken(req, res);
//   if (!authorized) return;

//   const { pathname } = parse(req.url, true);

//   // GET dashboard data
//   if (pathname === "/dashboard" && req.method === "GET") {
//     try {
//       const userId = req.user.id; // obtained from verifyToken

//       const user = await User.findById(userId);
//       if (!user) {
//         res.writeHead(404, { "Content-Type": "application/json" });
//         return res.end(JSON.stringify({ message: "User not found" }));
//       }

//       const trips = await Trip.find({ userId }).sort({ date: -1 });

//       const totalTrips = trips.length;
//       const totalBudget = trips.reduce((sum, t) => sum + (t.budget || 0), 0);
//       const upcoming = trips.filter((t) => new Date(t.date) > new Date()).length;

//       res.writeHead(200, { "Content-Type": "application/json" });
//       return res.end(
//         JSON.stringify({
//           name: user.name,
//           totalTrips,
//           totalBudget,
//           upcoming,
//           trips,
//         })
//       );
//     } catch (err) {
//       console.error("Dashboard error:", err);
//       res.writeHead(500, { "Content-Type": "application/json" });
//       return res.end(JSON.stringify({ message: "Server error", error: err.message }));
//     }
//   }

//   // Route not matched
//   return false;
// };
// routes/authRoutes.js
import { parseJSON } from "../middlewares/bodyParser.js";
import { handleSignup, handleLogin, handleGoogleLogin } from "../controllers/authController.js";

export const handleAuthRoutes = async (req, res) => {
  if (req.url === "/signup" && req.method === "POST") {
    const body = await parseJSON(req);
    req.body = body;
    return handleSignup(req, res);
  }

  if (req.url === "/login" && req.method === "POST") {
    const body = await parseJSON(req);
    req.body = body;
    return handleLogin(req, res);
  }

  if (req.url === "/google-login" && req.method === "POST") {
    const body = await parseJSON(req);
    req.body = body;
    return handleGoogleLogin(req, res);
  }

  return false;
};
