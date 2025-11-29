import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/Home";
import TransactionsPage from "./pages/Transactions";
import BudgetsPage from "./pages/Budgets";
import PotsPage from "./pages/Pots";
import RecurringBillsPage from "./pages/RecurringBills";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/budgets" element={<BudgetsPage />} />
        <Route path="/pots" element={<PotsPage />} />
        <Route path="/recurring" element={<RecurringBillsPage />} />
      </Route>
    </Routes>
  );
};

const App = () => {
  return <AppRoutes />;
};

export default App;
