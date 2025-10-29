import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // ✔ correct for default export

import authRouter from "./routes/authRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";
import flightRouter from "./routes/flightRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import accommodationRouter from "./routes/accommodationRoutes.js";
import tripPlannerRouter from "./routes/tripPlannerRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import profileRouter from "./routes/profileRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// 🔧 Middlewares
app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
// Express 5: avoid wildcard path-to-regexp issues; handle preflight manually
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.sendStatus(204);
  }
  next();
});
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/flights", flightRouter);
app.use("/api/destinations", destinationRoutes);
// Mount new routers under /api to match frontend calls
app.use("/api", accommodationRouter); // provides POST /api/search-hotels
app.use("/api", tripPlannerRouter);   // provides POST /api/plan-trip
app.use("/api", profileRouter);       // provides GET/PUT /api/profile
// Health check
app.get("/", (req, res) => res.send("✅ PocketYatra Backend Running"));

// Centralized error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});



// New server code

// import http from "http";
// import dotenv from "dotenv";
// import { connectDB } from "./config/db.js";
// import { handleAuthRoutes } from "./routes/authRoutes.js";
// import { handleDashboardRoutes } from "./routes/dashboardRoutes.js";
// import { handleFlightRoutes } from "./routes/flightRoutes.js";

// dotenv.config();
// connectDB();

// const server = http.createServer(async (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

//   if (req.method === "OPTIONS") {
//     res.writeHead(204);
//     return res.end();
//   }

//   try {
//     if (await handleAuthRoutes(req, res)) return;
//     if (await handleDashboardRoutes(req, res)) return;
//     if (await handleFlightRoutes(req, res)) return;
//   } catch (err) {
//     console.error("Server error:", err);
//     res.writeHead(500, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ message: "Internal server error" }));
//   }

//   res.writeHead(404, { "Content-Type": "application/json" });
//   res.end(JSON.stringify({ message: "Route not found" }));
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () =>
//   console.log(`🚀 Server running on http://localhost:${PORT}`)
// );
