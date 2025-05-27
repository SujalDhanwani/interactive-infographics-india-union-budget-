const budgetService = require("../services/budgetService");

const getAllBudgets = (req, res) => {
  const data = budgetService.getAllBudgets();
  if (!data.length) {
    return res.status(500).json({ error: "Budget data is unavailable" });
  }
  res.json(data);
};

const getBudgetByYear = (req, res) => {
  const year = parseInt(req.params.year);
  if (isNaN(year)) {
    return res.status(400).json({ error: "Year parameter must be a valid number" });
  }

  const result = budgetService.getBudgetByYear(year);
  if (result) {
    return res.json(result);
  } else {
    return res.status(404).json({ error: `No budget data found for year ${year}` });
  }
};

module.exports = { getAllBudgets, getBudgetByYear };
