import express from "express";
import { findDestinations } from "../controllers/destinationController.js";

const router = express.Router();

// POST /api/find-destinations
router.post("/", findDestinations);

export default router;
