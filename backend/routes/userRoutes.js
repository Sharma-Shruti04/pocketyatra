import express from "express";
import { User } from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET profile
router.get("/user/profile", protect, async (req, res) => {
  res.json(req.user);
});

// UPDATE profile
router.put("/user/profile", protect, async (req, res) => {
  const { homeCity, travelStyle, interests } = req.body;
  try {
    req.user.homeCity = homeCity;
    req.user.travelStyle = travelStyle;
    req.user.interests = interests;
    const updatedUser = await req.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error updating user" });
  }
});

export default router;
