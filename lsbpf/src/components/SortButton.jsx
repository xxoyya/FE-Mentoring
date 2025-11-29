import { useState } from "react";
import IconCaretDown from "./icons/IconCaretDown";
import IconSort from "./icons/IconSort";

const PFASortButton = ({ sortType, onSortChange }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="filter-button">
      <label htmlFor="sort">Sort by</label>
      <button id="sort" onClick={toggleDropdown}>
        <div className="mobile-layout">
          <IconSort />
        </div>

        <div className="desktop-layout">
          <span>{sortType}</span>
          <IconCaretDown />
        </div>

        <div
          className={`sort-content ${isDropdownVisible ? "show" : "hide"}`}
          id="dropdownMenu"
        >
          <div className="card">
            <div className="card-body">
              <div className="menu">
                {[
                  "Oldest",
                  "Latest",
                  "A to Z",
                  "Z to A",
                  "Highest",
                  "Lowest",
                ].map((type) => (
                  <a
                    href="#"
                    key={type}
                    onClick={(e) => {
                      e.preventDefault();
                      onSortChange(type);
                      setDropdownVisible(false);
                    }}
                  >
                    {type}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default PFASortButton