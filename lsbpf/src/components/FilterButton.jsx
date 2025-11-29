import { useState } from "react";
import IconCaretDown from "./icons/IconCaretDown";
import IconFilterMobile from "./icons/IconFilterMobile";

const PFAFilterButton = ({ selectedCategory, onCategoryChange }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="filter-button">
      <label htmlFor="category">Category</label>
      <button id="category" onClick={toggleDropdown}>
        <div className="mobile-layout">
          <IconFilterMobile />
        </div>

        <div className="desktop-layout">
          <span>{selectedCategory}</span>
          <IconCaretDown />
        </div>
      </button>

      <div className={`filter-content ${isDropdownVisible ? "show" : "hide"}`}>
        <div className="card">
          <div className="card-body">
            <div className="menu">
              {[
                "All Transactions",
                "Entertainment",
                "Bills",
                "Groceries",
                "Dining Out",
                "Transportation",
              ].map((category) => (
                <a
                  href="#"
                  key={category}
                  onClick={(e) => {
                    e.preventDefault();
                    onCategoryChange(category);
                    setDropdownVisible(false);
                  }}
                >
                  {category}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PFAFilterButton