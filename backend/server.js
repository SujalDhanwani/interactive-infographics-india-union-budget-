require("dotenv").config();
const express = require("express");
const cors = require("cors");
const budgetRoutes = require("./routes/budgetRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Root route to avoid "cannot GET /" error
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

app.use("/api/budget", budgetRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
