import React, { useRef, useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const COLORS = [
  "#EF4444",
  "#F59E0B",
  "#10B981",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
  "#6366F1",
  "#F87171",
  "#FBBF24",
  "#34D399",
  "#60A5FA",
];

// Custom Tooltip component to handle dark/light mode colors
function CustomTooltip({ active, payload, label }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const darkMode = document.documentElement.classList.contains("dark");
    setIsDark(darkMode);
  }, []);

  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: isDark ? "#222" : "#fff",
          color: isDark ? "#fff" : "#000",
          borderRadius: 8,
          padding: 10,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          fontSize: 14,
          pointerEvents: "none",
          maxWidth: 250,
        }}
      >
        <p style={{ margin: 0, fontWeight: "bold" }}>{label}</p>
        <p style={{ margin: 0 }}>
          Value: {new Intl.NumberFormat().format(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
}

function SectorPieChart({ data, year }) {
  const chartRef = useRef(null);

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="text-center text-lg text-red-600 font-semibold mt-8">
        No sector data available for {year}.
      </div>
    );
  }

  // Convert sector data object to array for recharts
  const sectorData = Object.entries(data).map(([key, value]) => ({
    name: key,
    value,
  }));

  // Download as PNG
  const downloadPNG = () => {
    if (!chartRef.current) return;
    html2canvas(chartRef.current, { scale: 3 }).then((canvas) => {
      const link = document.createElement("a");
      link.download = `sector_allocation_${year}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  // Download as PDF
  const downloadPDF = () => {
    if (!chartRef.current) return;
    html2canvas(chartRef.current, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`sector_allocation_${year}.pdf`);
    });
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-10 rounded-2xl shadow-2xl max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200 tracking-tight">
        Sector Allocation — {year}
      </h2>

      <div
        ref={chartRef}
        className="p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300"
        style={{ minHeight: 500 }}
      >
        <ResponsiveContainer width="105%" height={400}>
          <PieChart>
            <Pie
              data={sectorData}
              dataKey="value"
              nameKey="name"
              cx="65%"
              cy="60%"
              outerRadius={140}
              fill="#8884d8"
              label={(entry) => `${entry.name}`}
            >
              {sectorData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{ paddingLeft: 50 }}
              formatter={(value) => (
                <span className="text-gray-700 dark:text-gray-300">{value}</span>
              )}
            />

            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-6 mt-8 flex-wrap">
        <button
          onClick={downloadPNG}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label="Download sector allocation chart as PNG"
        >
          Download as PNG
        </button>

        <button
          onClick={downloadPDF}
          className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-full shadow-md hover:bg-emerald-700 hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          aria-label="Download sector allocation chart as PDF"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
}

export default SectorPieChart;
