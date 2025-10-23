import express from "express";
import { planTrip } from "../controllers/tripPlannerController.js";

const router = express.Router();

// POST /api/trip-planner/plan-trip
router.post("/plan-trip", planTrip);

export default router;
