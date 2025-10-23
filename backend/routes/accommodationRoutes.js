import express from "express";
import { searchHotels } from "../controllers/accommodationController.js";

const router = express.Router();

// POST /api/accommodation/search-hotels
router.post("/search-hotels", searchHotels);

export default router;
