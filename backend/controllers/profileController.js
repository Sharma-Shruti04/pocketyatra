import { User } from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile", error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { ...(name ? { name } : {}) },
      { new: true, select: "name email" }
    );
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json({ success: true, user: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile", error: err.message });
  }
};






