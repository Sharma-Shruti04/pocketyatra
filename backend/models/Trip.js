import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  from: String,
  to: String,
  date: Date,
  budget: Number,
  created_date: { type: Date, default: Date.now }
});

export default mongoose.model("Trip", tripSchema);
