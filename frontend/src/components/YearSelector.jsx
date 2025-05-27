import React from "react";

function YearSelector({ years, selectedYear, onChange }) {
  return (
    <div className="flex justify-center items-center space-x-4">
      <label
        htmlFor="year"
        className="text-lg font-semibold text-gray-700 dark:text-gray-300"
      >
        Select Year:
      </label>
      <select
        id="year"
        value={selectedYear || ""}
        onChange={(e) => onChange(Number(e.target.value))}
        className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
      >
        {years.map((year) => (
          <option
            key={year}
            value={year}
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          >
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}

export default YearSelector;
