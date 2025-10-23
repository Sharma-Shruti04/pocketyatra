// routes/authRoutes.js
import express from "express";
import { registerUser, loginUser, googleLogin } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google-login", googleLogin);
router.post("/google", googleLogin);

export default router;


// routes/authRoutes.js
// import { parseJSON } from "../middlewares/bodyParser.js";
// import { handleSignup, handleLogin, handleGoogleLogin } from "../controllers/authController.js";

// export const handleAuthRoutes = async (req, res) => {
//   if (req.url === "/signup" && req.method === "POST") {
//     const body = await parseJSON(req);
//     req.body = body;
//     return handleSignup(req, res);
//   }

//   if (req.url === "/login" && req.method === "POST") {
//     const body = await parseJSON(req);
//     req.body = body;
//     return handleLogin(req, res);
//   }

//   if (req.url === "/google-login" && req.method === "POST") {
//     const body = await parseJSON(req);
//     req.body = body;
//     return handleGoogleLogin(req, res);
//   }

//   return false;
// };
