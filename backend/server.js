require("dotenv").config();
const express = require("express");
const cors = require("cors");
const budgetRoutes = require("./routes/budgetRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all origins (minimal version in first commit)
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

// Budget API routes
app.use("/api/budget", budgetRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
