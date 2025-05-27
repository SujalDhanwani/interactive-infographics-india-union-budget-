const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/budget2017_2025.json");
let budgetData = [];

const loadBudgetData = () => {
  if (budgetData.length === 0) {
    try {
      const raw = fs.readFileSync(dataPath, "utf-8");
      budgetData = JSON.parse(raw);
    } catch (err) {
      console.error("Failed to load budget data:", err);
      budgetData = [];
    }
  }
  return budgetData;
};

const getAllBudgets = () => {
  return loadBudgetData();
};

const getBudgetByYear = (year) => {
  const data = loadBudgetData();
  return data.find(item => item.year === year);
};

module.exports = {
  getAllBudgets,
  getBudgetByYear,
};
