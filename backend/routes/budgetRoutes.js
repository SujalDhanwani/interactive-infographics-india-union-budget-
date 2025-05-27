const express = require("express");
const router = express.Router();
const budgetService = require("../services/budgetService");

// Route to get all budget data
router.get("/", (req, res) => {
  const data = budgetService.getAllBudgets();
  if (data.length === 0) {
    return res.status(404).json({ message: "Budget data is unavailable" });
  }
  res.json(data);
});

// Route to get budget data by year
router.get("/:year", (req, res) => {
  const year = parseInt(req.params.year);
  const data = budgetService.getBudgetByYear(year);
  if (!data) {
    return res.status(404).json({ message: `Budget data for year ${year} not found` });
  }
  res.json(data);
});

module.exports = router;
