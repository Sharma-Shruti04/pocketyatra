import express from "express";
//import { protect } from "../middlewares/authMiddleware.js";
import { User } from "../models/User.js";
import { verifyToken } from "../middlewares/authMiddleware.js";


const router = express.Router();

// ✅ GET user profile
router.get("/user/profile", verifyToken, async (req, res) => {
  try {
    res.status(200).json(req.user); // user already fetched by middleware
  } catch (error) {
    console.error("❌ Error fetching profile:", error);
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
});

// ✅ UPDATE user profile
router.put("/user/profile", verifyToken, async (req, res) => {
  try {
    const { homeCity, travelStyle, interests } = req.body;

    req.user.homeCity = homeCity ?? req.user.homeCity;
    req.user.travelStyle = travelStyle ?? req.user.travelStyle;
    req.user.interests = interests ?? req.user.interests;

    const updatedUser = await req.user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("❌ Error updating profile:", error);
    res.status(500).json({ message: "Failed to update user profile" });
  }
});

export default router;
