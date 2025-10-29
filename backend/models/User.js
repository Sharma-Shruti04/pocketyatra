import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: false, // Not required for Google login
      minlength: 6,
    },
    googleId: {
      type: String,
      required: false,
    },
    profileImage: {
      type: String, // For Google users or uploaded avatar
      default: "",
    },

    // ✅ New fields to support ProfilePage.jsx
    homeCity: {
      type: String,
      trim: true,
      default: "",
    },
    travelStyle: {
      type: String,
      enum: ["Budget", "Mid-range", "Luxury"],
      default: "Mid-range",
    },
    interests: [
      {
        type: String,
        trim: true,
      },
    ],

    // ✅ Existing saved data
    savedCurrencies: [
      {
        from: String,
        to: String,
        lastConverted: Date,
      },
    ],
    savedSearches: [
      {
        type: {
          category: String, // e.g., "accommodation" or "flight"
          query: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);

export const User = mongoose.model("User", userSchema);



// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       trim: true,
//       required: false,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: false, // Not required for Google login
//       minlength: 6,
//     },
//     googleId: {
//       type: String,
//       required: false,
//     },
//     profileImage: {
//       type: String, // For Google users or uploaded avatar
//       default: "",
//     },
//     savedCurrencies: [
//       {
//         from: String,
//         to: String,
//         lastConverted: Date,
//       },
//     ],
//     savedSearches: [
//       {
//         type: {
//           category: String, // e.g., "accommodation" or "flight"
//           query: String,
//         },
//         createdAt: {
//           type: Date,
//           default: Date.now,
//         },
//       },
//     ],
//   },
//   {
//     timestamps: true, // Automatically adds createdAt & updatedAt
//   }
// );

// export const User = mongoose.model("User", userSchema);

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String },
//   name: { type: String },
//   googleId: { type: String },
// });

// export const User = mongoose.model("User", userSchema);
