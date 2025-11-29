import { useState } from "react";
import PFACancelModalButton from "../CancelModalButton";
import PFADropdown from "../Dropdown";
import PFAInputNumber from "../InputNumber";
import CategoryDropdown from "../CategoryDropdown";
import data from "../../../data.json";

const EditBudgetModal = ({ budget, toggleModal, editBudget }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    budget?.category || ""
  );
  const [maximum, setMaximum] = useState(budget?.maximum || 0);

  const initialTheme = data.colors.find(
    (color) => color.theme === budget?.theme
  ) || {
    id: 1,
    name: "Green",
    theme: "#277C78",
  };
  const [theme, setTheme] = useState(initialTheme);

  const handleSaveChanges = () => {
    if (!budget) return;
    const updatedBudget = {
      ...budget,
      category: selectedCategory,
      maximum: parseFloat(maximum),
      theme: theme.theme,
    };
    editBudget(budget.category, updatedBudget);
    toggleModal();
  };

  return (
    <div className="modal">
      <div className="overlay" onClick={toggleModal}></div>
      <div className="modal-content">
        <div className="modal-flex-column">
          <div className="flex-between">
            <h2>Edit Budget</h2>
            <PFACancelModalButton toggleModal={toggleModal} />
          </div>
          <p>
            As your budgets change, feel free to update your spending limits.
          </p>
          <div className="inputs">
            <div className="input">
              <label htmlFor="category">Budget Category</label>
              <CategoryDropdown
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
            <div className="input">
              <label htmlFor="maximum">Maximum Spend</label>
              <PFAInputNumber
                placeholder="e.g. 2000"
                value={maximum}
                onChange={(e) => setMaximum(e.target.value)}
              />
            </div>
            <div className="input">
              <label htmlFor="theme">Theme</label>
              <PFADropdown selectedColor={theme} setSelectedColor={setTheme} />
            </div>
          </div>
          <button onClick={handleSaveChanges} className="primary-modal-btn">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBudgetModal;
