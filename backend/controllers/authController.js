import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Utility function to create JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "2h" });
};

// ------------------ REGISTER ------------------
export const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();

    const token = generateToken(newUser._id);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ------------------ LOGIN ------------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password || "");
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ------------------ GOOGLE LOGIN ------------------
export const googleLogin = async (req, res) => {
  try {
    console.log("Google login request:", req.body);

    const { tokenId, credential } = req.body;
    const googleToken = tokenId || credential;

    if (!googleToken) {
      return res.status(400).json({ message: "No Google token provided" });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    if (!email) {
      return res.status(400).json({ message: "Invalid Google token - no email found" });
    }

    // ✅ Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      console.log("Creating new user from Google login");
      user = new User({
        email,
        name,
        googleId,
        homeCity: "",
        travelStyle: "",
        interests: [],
      });
      await user.save();
    } else if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Google login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Google login error:", err);
    res.status(500).json({ message: "Google login failed", error: err.message });
  }
};









// // controllers/authController.js
// import { User } from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { OAuth2Client } from "google-auth-library";
// import dotenv from "dotenv";

// dotenv.config();
// const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


// // Utility function to create JWT
// const generateToken = (userId) => {
//   return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "2h" });
// };
// // ------------------ REGISTER ------------------
// export const registerUser = async (req, res) => {
//   try {
//     const { email, password, name } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ email, password: hashedPassword, name });
//     await newUser.save();

//     res.status(201).json({ message: "User created successfully", user: newUser });
//   } catch (err) {
//     console.error("Register error:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// // ------------------ LOGIN ------------------
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password || "");
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2h" });

//     res.status(200).json({ message: "Login successful", token, user });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// // ------------------ GOOGLE LOGIN ------------------
// export const googleLogin = async (req, res) => {
//   try {
//     console.log("Google login request received:", req.body);
    
//     const { tokenId, credential } = req.body;
//     const googleToken = tokenId || credential;

//     if (!googleToken) {
//       console.log("No Google token provided");
//       return res.status(400).json({ message: "No Google token provided" });
//     }

//     console.log("Verifying Google token...");
//     const ticket = await googleClient.verifyIdToken({
//       idToken: googleToken,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();
//     console.log("Google payload:", { email: payload.email, name: payload.name });
    
//     const { email, name, sub: googleId } = payload;

//     if (!email) {
//       console.log("No email found in Google token");
//       return res.status(400).json({ message: "Invalid Google token - no email found" });
//     }

//     let user = await User.findOne({ email });
//     if (!user) {
//       console.log("Creating new user for Google login");
//       user = new User({ email, name, googleId });
//       await user.save();
//     } else if (!user.googleId) {
//       console.log("Updating existing user with Google ID");
//       user.googleId = googleId;
//       await user.save();
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
//     console.log("Google login successful for user:", user.email);

//     res.status(200).json({ message: "Google login successful", token, user });
//   } catch (err) {
//     console.error("Google login error:", err);
//     res.status(500).json({ message: "Google login failed", error: err.message });
//   }
// };






// // import { User } from "../models/User.js";
// // import bcrypt from "bcryptjs";
// // import jwt from "jsonwebtoken";
// // import { OAuth2Client } from "google-auth-library";
// // import dotenv from "dotenv";

// // dotenv.config();
// // const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// // // ------------------ SIGNUP ------------------
// // export const handleSignup = async (req, res) => {
// //   try {
// //     const { email, password, name } = req.body;
// //     if (!email || !password) {
// //       res.writeHead(400, { "Content-Type": "application/json" });
// //       return res.end(JSON.stringify({ message: "All fields required" }));
// //     }

// //     // Check if user exists
// //     let existing = await User.findOne({ email });
// //     if (existing) {
// //       res.writeHead(400, { "Content-Type": "application/json" });
// //       return res.end(JSON.stringify({ message: "User already exists" }));
// //     }

// //     const hashed = await bcrypt.hash(password, 10);
// //     const user = new User({ email, password: hashed, name });
// //     await user.save();

// //     res.writeHead(201, { "Content-Type": "application/json" });
// //     return res.end(JSON.stringify({ message: "User created", user }));
// //   } catch (err) {
// //     console.error("Signup error:", err);
// //     res.writeHead(500, { "Content-Type": "application/json" });
// //     return res.end(JSON.stringify({ message: "Server error", error: err.message }));
// //   }
// // };

// // // ------------------ LOGIN ------------------
// // export const handleLogin = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;
// //     if (!email || !password) {
// //       res.writeHead(400, { "Content-Type": "application/json" });
// //       return res.end(JSON.stringify({ message: "All fields required" }));
// //     }

// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       res.writeHead(400, { "Content-Type": "application/json" });
// //       return res.end(JSON.stringify({ message: "User not found" }));
// //     }

// //     const isMatch = await bcrypt.compare(password, user.password || "");
// //     if (!isMatch) {
// //       res.writeHead(400, { "Content-Type": "application/json" });
// //       return res.end(JSON.stringify({ message: "Invalid credentials" }));
// //     }

// //     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2h" });

// //     res.writeHead(200, { "Content-Type": "application/json" });
// //     return res.end(JSON.stringify({ message: "Login successful", token, user }));
// //   } catch (err) {
// //     console.error("Login error:", err);
// //     res.writeHead(500, { "Content-Type": "application/json" });
// //     return res.end(JSON.stringify({ message: "Server error", error: err.message }));
// //   }
// // };

// // // ------------------ GOOGLE LOGIN ------------------
// // export const handleGoogleLogin = async (req, res) => {
// //   try {
// //     const { tokenId } = req.body;
// //     if (!tokenId) {
// //       res.writeHead(400, { "Content-Type": "application/json" });
// //       return res.end(JSON.stringify({ message: "No Google token provided" }));
// //     }

// //     // Verify token with Google
// //     const ticket = await googleClient.verifyIdToken({
// //       idToken: tokenId,
// //       audience: process.env.GOOGLE_CLIENT_ID,
// //     });
// //     const payload = ticket.getPayload();
// //     const { email, sub: googleId, name } = payload;

// //     // Find or create user
// //     let user = await User.findOne({ email });
// //     if (!user) {
// //       user = new User({ email, name, googleId });
// //       await user.save();
// //     }

// //     // Create JWT
// //     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2h" });

// //     res.writeHead(200, { "Content-Type": "application/json" });
// //     return res.end(JSON.stringify({ message: "Google login successful", token, user }));
// //   } catch (err) {
// //     console.error("Google login error:", err);
// //     res.writeHead(500, { "Content-Type": "application/json" });
// //     return res.end(JSON.stringify({ message: "Google login failed", error: err.message }));
// //   }
// // };







// // // import { User } from "../models/User.js";
// // // import bcrypt from "bcryptjs";
// // // import jwt from "jsonwebtoken";
// // // import { OAuth2Client } from "google-auth-library";
// // // import dotenv from "dotenv";

// // // dotenv.config();
// // // const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// // // // ------------------ SIGNUP ------------------
// // // export const handleSignup = async (req, res) => {
// // //   try {
// // //     const { email, password, name } = req.body;
// // //     if (!email || !password)
// // //       return res.writeHead(400).end(JSON.stringify({ message: "All fields required" }));

// // //     const existing = await User.findOne({ email });
// // //     if (existing)
// // //       return res.writeHead(400).end(JSON.stringify({ message: "User already exists" }));

// // //     const hashed = await bcrypt.hash(password, 10);
// // //     const user = new User({ email, password: hashed, name });
// // //     await user.save();

// // //     res.writeHead(201, { "Content-Type": "application/json" });
// // //     res.end(JSON.stringify({ message: "Signup successful" }));
// // //   } catch (err) {
// // //     res.writeHead(500);
// // //     res.end(JSON.stringify({ message: "Server error", error: err.message }));
// // //   }
// // // };

// // // // ------------------ LOGIN ------------------
// // // export const handleLogin = async (req, res) => {
// // //   try {
// // //     const { email, password } = req.body;
// // //     const user = await User.findOne({ email });
// // //     if (!user)
// // //       return res.writeHead(400).end(JSON.stringify({ message: "User not found" }));

// // //     const isMatch = await bcrypt.compare(password, user.password);
// // //     if (!isMatch)
// // //       return res.writeHead(400).end(JSON.stringify({ message: "Invalid credentials" }));

// // //     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

// // //     res.writeHead(200, { "Content-Type": "application/json" });
// // //     res.end(JSON.stringify({ message: "Login successful", token }));
// // //   } catch (err) {
// // //     res.writeHead(500);
// // //     res.end(JSON.stringify({ message: "Server error", error: err.message }));
// // //   }
// // // };

// // // // ------------------ GOOGLE LOGIN ------------------
// // // export const handleGoogleLogin = async (req, res) => {
// // //   try {
// // //     const { credential } = req.body;
// // //     if (!credential)
// // //       return res.writeHead(400).end(JSON.stringify({ message: "No Google token provided" }));

// // //     // Verify Google token
// // //     const ticket = await googleClient.verifyIdToken({
// // //       idToken: credential,
// // //       audience: process.env.GOOGLE_CLIENT_ID,
// // //     });

// // //     const payload = ticket.getPayload();
// // //     const { email, name, sub: googleId } = payload;

// // //     // Check or create user
// // //     let user = await User.findOne({ email });
// // //     if (!user) {
// // //       user = new User({ email, name, googleId });
// // //       await user.save();
// // //     }

// // //     // Create JWT
// // //     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2h" });

// // //     res.writeHead(200, { "Content-Type": "application/json" });
// // //     res.end(JSON.stringify({ message: "Google login successful", token, user }));
// // //   } catch (err) {
// // //     res.writeHead(500);
// // //     res.end(JSON.stringify({ message: "Google login failed", error: err.message }));
// // //   }
// // // };
