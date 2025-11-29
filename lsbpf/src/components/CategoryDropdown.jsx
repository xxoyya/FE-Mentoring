import { useState } from "react";
import IconCaretDown from "./icons/IconCaretDown";

const CategoryDropdown = ({ selectedCategory, setSelectedCategory }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const categories = [
    {
      id: 1,
      name: "Entertainment",
    },
    {
      id: 2,
      name: "Bills",
    },
    {
      id: 3,
      name: "Groceries",
    },
    {
      id: 4,
      name: "Dining Out",
    },
    {
      id: 5,
      name: "Transportation",
    },
    {
      id: 6,
      name: "Personal Care",
    },
    {
      id: 7,
      name: "Education",
    },
    {
      id: 8,
      name: "General",
    },
  ];

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleCategory = (category) => {
    setSelectedCategory(category.name);
    setDropdownVisible(false);
  };

  const dropdown = categories.map((category) => (
    <li
      className="option"
      key={category.id}
      onClick={() => handleCategory(category)}
    >
      <div className="section-1">
        <p>{category.name}</p>
      </div>
    </li>
  ));

  return (
    <div className="select-menu">
      <div className="select-btn" onClick={toggleDropdown}>
        <div className="section-1">
          <p>{selectedCategory}</p>
        </div>
        <IconCaretDown />
      </div>

      <ul
        className="options"
        style={{
          display: isDropdownVisible ? "block" : "none",
        }}
      >
        {dropdown}
      </ul>
    </div>
  );
};

export default CategoryDropdown;
