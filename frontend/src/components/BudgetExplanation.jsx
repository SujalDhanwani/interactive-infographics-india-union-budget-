function BudgetExplanation() {
  return (
    <div className="bg-white dark:bg-gray-800 p-10 mt-12 rounded-xl shadow-lg max-w-4xl mx-auto text-gray-900 dark:text-gray-200">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-indigo-700 dark:text-indigo-300 tracking-wide border-b-4 border-indigo-300 dark:border-indigo-600 pb-3">
        Understanding Key Budget Terms
      </h2>
      <ul className="space-y-8 text-lg leading-relaxed">
        <li>
          <span className="font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900 px-2 py-1 rounded">
            Total Expenditure:
          </span>{" "}
          This represents the total amount the government plans to spend on various services, infrastructure projects, social schemes, defense, and other public expenditures necessary to run the country effectively.
        </li>
        <li>
          <span className="font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900 px-2 py-1 rounded">
            Revenue Receipts:
          </span>{" "}
          This is the income the government generates through taxes (like income tax, GST), fees, fines, and other non-borrowing sources. It reflects the government's earnings that fund day-to-day operations without incurring debt.
        </li>
        <li>
          <span className="font-semibold text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded">
            Deficit:
          </span>{" "}
          The deficit occurs when the government's total spending exceeds its revenue receipts. A higher deficit means the government must borrow more money, which can impact the economy and future budgets.
        </li>
      </ul>
    </div>
  );
}

export default BudgetExplanation;
