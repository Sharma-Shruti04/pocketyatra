import express from "express";

const app = express();

// Parse JSON automatically
app.use(express.json());

// Example route
app.post("/api/example", (req, res) => {
  console.log(req.body); // Already parsed
  res.json({ received: req.body });
});

app.listen(5000, () => console.log("Server running"));




// // Middleware to parse incoming JSON bodies in Node.js (no Express)
// export const parseJSON = async (req) => {
//   return new Promise((resolve, reject) => {
//     let body = "";
//     req.on("data", (chunk) => (body += chunk.toString()));
//     req.on("end", () => {
//       try {
//         resolve(JSON.parse(body));
//       } catch (err) {
//         reject(err);
//       }
//     });
//   });
// };
