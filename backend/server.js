import http from "http";
import url from "url";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { handleSignup, handleLogin } from "./controllers/authController.js";
import { parseJSON } from "./middleware/bodyParser.js";
import { verifyToken } from "./middleware/authMiddleware.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  if (req.method === "OPTIONS") {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  res.writeHead(200, { ...corsHeaders, "Content-Type": "application/json" });

  // Route: Signup
  if (path === "/api/signup" && req.method === "POST") {
    req.body = await parseJSON(req);
    return handleSignup(req, res);
  }

  // Route: Login
  if (path === "/api/login" && req.method === "POST") {
    req.body = await parseJSON(req);
    return handleLogin(req, res);
  }

  // Example of a protected route
  if (path === "/api/profile" && req.method === "GET") {
    const isValid = verifyToken(req, res);
    if (!isValid) return;
    res.end(JSON.stringify({ message: "Welcome to your profile", user: req.user }));
    return;
  }

  if (path === "/api/google-login" && req.method === "POST") {
  req.body = await parseJSON(req);
  return handleGoogleLogin(req, res);
}


  // Fallback for unknown routes
  res.writeHead(404);
  res.end(JSON.stringify({ message: "Route not found" }));
});

server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
