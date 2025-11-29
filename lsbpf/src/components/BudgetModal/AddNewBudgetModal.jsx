import { useState } from "react";
import PFACancelModalButton from "../CancelModalButton";
import PFADropdown from "../Dropdown";
import PFAInputNumber from "../InputNumber";
import CategoryDropdown from "../CategoryDropdown";

const AddNewBudgetModal = ({ toggleModal, addNewBudget }) => {
  const [selectedCategory, setSelectedCategory] = useState("Entertainment");
  const [maximum, setMaximum] = useState("");
  const [theme, setTheme] = useState({
    id: 1,
    name: "Green",
    theme: "#277C78",
  });

  const handleBudget = () => {
    if (selectedCategory && maximum && theme) {
      const newBudget = {
        category: selectedCategory,
        maximum: parseFloat(maximum),
        theme: theme.theme
      }
      addNewBudget(newBudget)
      toggleModal();
      setMaximum("")
    }
  };

  return (
    <div className="modal">
      <div className="overlay" onClick={toggleModal}></div>
      <div className="modal-content">
        <div className="modal-flex-column">
          <div className="flex-between">
            <h2>Add New Budget</h2>
            <PFACancelModalButton toggleModal={toggleModal} />
          </div>
          <p>
            Choose a category to set a spending budget. These categories can
            help you monitor spending.
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
          <button onClick={handleBudget} className="primary-modal-btn">
            Add Budget
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewBudgetModal;
