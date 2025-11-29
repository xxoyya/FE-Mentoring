import { defaults } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { AuthContext } from "../context/AuthProvider";
import { useContext, useState } from "react";
import BudgetItem from "../components/BudgetItem";
import AddNewBudgetModal from "../components/BudgetModal/AddNewBudgetModal";
import PFADoughnut from "../components/Doughnut";

defaults.maintainAspectRatio = true;
defaults.responsive = true;

const Budgets = () => {
  const { budgets, setBudgets, enrichedBudgets } = useContext(AuthContext);

  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);

  const handleAddBudgetModal = () => {
    setShowAddBudgetModal(!showAddBudgetModal);
  };

  const addNewBudget = (newBudget) => {
    setBudgets([...budgets, newBudget]);
  };

  const editBudget = (category, updatedBudget) => {
    const updatedBudgets = budgets.map((budget) =>
      budget.category === category ? updatedBudget : budget
    );
    setBudgets(updatedBudgets);
  };

  const deleteBudget = (category) => {
    const budgetToDelete = budgets.find((budget) => budget.category === category);
    if (!budgetToDelete) return;

    const updatedBudgets = budgets.filter((budget) => budget.category !== category);
    setBudgets(updatedBudgets);
  }

  const cardBudgets = enrichedBudgets.map((budget) => (
    <BudgetItem
      key={budget.id}
      budget={budget}
      editBudget={editBudget}
      deleteBudget={deleteBudget}
    />
  ));

  return (
    <>
      <div className="budgets-page">
        <div className="section-1 flex-between">
          <h1>Budgets</h1>
          <button className="dark-cta-btn" onClick={handleAddBudgetModal}>
            + Add New Budget
          </button>
        </div>
        <div className="budgets-content">
          <div className="summary">
            <div className="card">
              <div className="card-body">
                <PFADoughnut />
              </div>
            </div>
          </div>
          <div className="budgets-container">{cardBudgets}</div>
        </div>
      </div>

      {showAddBudgetModal && (
        <AddNewBudgetModal
          toggleModal={handleAddBudgetModal}
          addNewBudget={addNewBudget}
        />
      )}
    </>
  );
};

export default Budgets;
