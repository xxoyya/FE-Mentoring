import { useEffect, useState } from "react";
import IconCaretDown from "./icons/IconCaretDown";
import data from "../../data.json";

const PFADropdown = ({ selectedColor, setSelectedColor }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [availableColors, setAvailableColors] = useState([]); // Available colors excluding those already used

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setDropdownVisible(false);
  };

  // Set available colors based on colors not used in pots
  useEffect(() => {
    const usedColors = data.pots.map((pot) => pot.theme); // Extract used color themes
    const unusedColors = data.colors.filter(
      (color) => !usedColors.includes(color.theme)
    );
    setAvailableColors(unusedColors);
  }, []);

  const colors = data.colors.map((color) => {
    const isUsed = data.pots.some((pot) => pot.theme === color.theme);

    return (
      <li
        key={color.id}
        className={`option ${isUsed ? "disabled" : ""}`} // Disable used colors
        onClick={() => !isUsed && handleColorSelect(color)}
      >
        <div className="section-1">
          <div
            style={{
              backgroundColor: color.theme,
            }}
          ></div>
          <p>{color.name}</p>
        </div>
        {isUsed && <p>Already used</p>}
      </li>
    );
  });

  return (
    <div className="select-menu">
      <div className="select-btn" onClick={toggleDropdown}>
        <div className="section-1">
          <div
            style={{
              backgroundColor: selectedColor ? selectedColor.theme : "",
            }}
          ></div>
          <p>{selectedColor ? selectedColor.name : "Select a color"}</p>
        </div>
        <IconCaretDown />
      </div>

      <ul
        className="options"
        style={{
          display: isDropdownVisible ? "block" : "none",
        }}
      >
        {colors}
      </ul>
    </div>
  );
};

export default PFADropdown;
