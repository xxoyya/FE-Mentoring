import { createContext, useState } from "react";
import JsonData from "../../data.json";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [balance, setBalance] = useState(JsonData.balance.current);
  const [budgets, setBudgets] = useState(JsonData.budgets);

  // Transform budgets with spentAmount and latestTransactions fields
  const enrichedBudgets = budgets.map((budget, index) => {
    const categoryTransactions = JsonData.transactions.filter(
      (transaction) => transaction.category === budget.category
    );

    // Calculate the spentAmount for the currentMonth
    const spentAmount = categoryTransactions
      .filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return (
          transactionDate.getMonth() === 7 &&
          transactionDate.getFullYear() === 2024
        );
      })
      .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);

    // Get the latest transactions regardless of the month
    const latestTransactions = categoryTransactions
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);

    return {
      id: index + 1,
      ...budget,
      spentAmount,
      latestTransactions,
    };
  });

  return (
    <AuthContext.Provider
      value={{
        balance,
        setBalance,
        budgets,
        setBudgets,
        enrichedBudgets,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
