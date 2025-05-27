import React, { useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function BudgetChart({ data }) {
  const chartRef = useRef(null);

  if (!data) {
    return (
      <div className="text-center text-lg font-semibold text-red-600 dark:text-red-400 py-10">
        No data available for the selected year.
      </div>
    );
  }

  const chartData = [
    { name: "Total Expenditure", value: data.total_expenditure || 0 },
    { name: "Revenue Receipts", value: data.revenue_receipts || 0 },
    { name: "Deficit", value: data.deficit || 0 },
  ];

  const downloadPNG = () => {
    if (!chartRef.current) return;

    toPng(chartRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `budget-overview-${data.year}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Error downloading PNG:", err);
      });
  };

  const downloadPDF = () => {
    if (!chartRef.current) return;

    html2canvas(chartRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`budget-overview-${data.year}.pdf`);
    });
  };

  return (
    <div className="bg-gradient-to-tr from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 p-10 rounded-3xl shadow-2xl max-w-6xl mx-auto border border-gray-300 dark:border-gray-700">
      <h2 className="text-5xl font-bold mb-10 text-center text-gray-900 dark:text-gray-100 tracking-wide">
        Budget Overview - {data.year || "N/A"}
      </h2>

      <div
        ref={chartRef}
        className="p-6 bg-gradient-to-tr from-indigo-100 via-white to-indigo-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 rounded-xl shadow-inner border border-gray-300 dark:border-gray-600"
        style={{ minHeight: "400px" }}
      >
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 40, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#CBD5E0" strokeOpacity={0.5} />
            <XAxis
              dataKey="name"
              tick={{ fill: "currentColor", fontWeight: 700, fontSize: 14 }}
              axisLine={{ stroke: "#4B5563" }}
              tickLine={false}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={60}
            />
            <YAxis
              unit=" ₹ lakh crore"
              tick={{ fill: "currentColor", fontWeight: 700, fontSize: 14 }}
              axisLine={{ stroke: "#4B5563" }}
              tickLine={false}
              width={120}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                color: "#F9FAFB",
                border: "1px solid #4B5563",
                fontWeight: "600",
                borderRadius: "8px",
                padding: "10px",
              }}
              formatter={(value) => `₹${value.toLocaleString()} Lakh Crore`}
              cursor={{ fill: "rgba(99,102,241, 0.1)" }}
            />
            <Legend
              verticalAlign="top"
              height={40}
              wrapperStyle={{ fontWeight: "700", fontSize: "16px", color: "currentColor" }}
            />
            <Bar
              dataKey="value"
              fill="url(#gradient)"
              radius={[8, 8, 0, 0]}
              animationDuration={1600}
              barSize={60}
              cursor="pointer"
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center space-x-8 mt-10">
        <button
          onClick={downloadPNG}
          className="px-8 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-transform hover:scale-105"
          aria-label="Download chart as PNG"
        >
          Download PNG
        </button>

        <button
          onClick={downloadPDF}
          className="px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-green-700 transition-transform hover:scale-105"
          aria-label="Download chart as PDF"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default BudgetChart;
