// 
import express from "express";
import { searchFlights } from "../controllers/flightController.js";

const router = express.Router();

// POST /api/flights
router.post("/", searchFlights);

export default router;
