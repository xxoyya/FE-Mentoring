import { useState } from "react";
import PFACancelModalButton from "../CancelModalButton";
import PFADropdown from "../Dropdown";
import PFAInputNumber from "../InputNumber";
import PFAInputText from "../InputText";
import data from "../../../data.json"

const EditPotModal = ({ toggleModal, pot, editPot }) => {
  const [name, setName] = useState(pot?.name || "");
  const [target, setTarget] = useState(pot?.target || 0);

  const initialTheme = data.colors.find(
    (color) => color.theme === pot?.theme
  ) || {
    id: 1,
    name: "Green",
    theme: "#277C78",
  };
  const [theme, setTheme] = useState(initialTheme);

  const handleSaveChanges = () => {
    if (!pot) return; // Early return if pot is undefined
    const updatedPot = {
      ...pot,
      name,
      target,
      theme: theme.theme,
    };
    editPot(pot.id, updatedPot);
    toggleModal();
  };

  return (
    <div className="modal">
      <div className="overlay" onClick={toggleModal}></div>
      <div className="modal-content">
        <div className="modal-flex-column">
          <div className="flex-between">
            <h2>Edit Pot</h2>
            <PFACancelModalButton toggleModal={toggleModal} />
          </div>
          <p>If your saving targets change, feel free to update your pots.</p>
          <div className="inputs">
            <div className="input">
              <label htmlFor="potName">Pot Name</label>
              <PFAInputText
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rainy Days"
                id="potName"
              />
              <span>30 of 30 characters left</span>
            </div>
            <div className="input">
              <label htmlFor="amount">Target</label>
              <PFAInputNumber
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
                placeholder="e.g. 2000"
              />
            </div>
            <div className="input">
              <label htmlFor="theme">Theme</label>
              <PFADropdown
                selectedColor={theme}
                setSelectedColor={setTheme} // Update theme in state
              />
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

export default EditPotModal;
