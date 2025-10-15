// server.js
import http from "http";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { handleAuthRoutes } from "./routes/authRoutes.js";
import { handleDashboardRoutes } from "./routes/dashboardRoutes.js";

dotenv.config();
connectDB();

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  try {
    // 1️⃣ Auth Routes
    const authHandled = await handleAuthRoutes(req, res);
    if (authHandled !== false) return;

    // 2️⃣ Dashboard Routes
    const dashHandled = await handleDashboardRoutes(req, res);
    if (dashHandled !== false) return;
  } catch (err) {
    console.error("Error handling route:", err);
    res.writeHead(500, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Internal server error" }));
  }

  // Default 404
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route not found" }));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
