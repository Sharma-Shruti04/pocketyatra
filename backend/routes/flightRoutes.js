import express from "express";
import { searchFlights } from "../controllers/flightController.js";
//import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST /api/flights - Legacy endpoint
router.post("/", searchFlights);

// POST /api/flights/search - New endpoint with token verification
router.post("/search", searchFlights);

export default router;
