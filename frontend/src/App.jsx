import { useEffect, useState } from "react";
import axios from "axios";
import BudgetChart from "./components/BudgetChart";
import SectorPieChart from "./components/SectorPieChart";
import YearSelector from "./components/YearSelector";
import BudgetExplanation from "./components/BudgetExplanation";
import Footer from "./components/Footer";

function App() {
  const [budgetData, setBudgetData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/budget`)
      .then((res) => {
        const fetchedData = res.data.budget || [];
        setBudgetData(fetchedData);

        if (fetchedData.length > 0) {
          const latestYear = fetchedData[fetchedData.length - 1].year;
          setSelectedYear(latestYear);
          const currentBudget = fetchedData.find(
            (item) => item.year === latestYear
          );
          setSelectedBudget(currentBudget);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching budget data:", err);
        setLoading(false);
      });
  }, [API_BASE_URL]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    const yearData = budgetData.find((item) => item.year === year);
    setSelectedBudget(yearData || null);
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div
        className={`min-h-screen p-6 text-gray-800
          bg-gradient-to-r from-purple-100 to-blue-100
          dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800
          dark:text-gray-200
        `}
      >
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <h1 className="text-4xl font-bold text-center mb-6">
          India Union Budget Dashboard
        </h1>

        {loading ? (
          <p className="text-center text-xl mt-8">Loading budget data...</p>
        ) : (
          <>
            <YearSelector
              years={budgetData.map((item) => item.year)}
              selectedYear={selectedYear}
              onChange={handleYearChange}
            />

            {selectedBudget ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <BudgetChart data={selectedBudget} />
                  <SectorPieChart data={selectedBudget.sectors} year={selectedYear} />
                </div>

                <div className="mt-10 max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md text-gray-700 dark:text-gray-300">
                  <BudgetExplanation data={selectedBudget} />
                </div>

                <Footer />
              </>
            ) : (
              <p className="text-center text-xl mt-8">
                No budget data available for {selectedYear}.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
