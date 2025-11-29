import { useState } from "react";
import PFACancelModalButton from "../CancelModalButton";
import PFADropdown from "../Dropdown";
import PFAInputNumber from "../InputNumber";
import PFAInputText from "../InputText";

const AddNewPotModal = ({ toggleModal, addNewPot }) => {
  const [potName, setPotName] = useState("");
  const [target, setTarget] = useState("");
  const [theme, setTheme] = useState({
    id: 1,
    name: "Green",
    theme: "#277C78",
  });

  const handleAddPot = () => {
    if (potName && target) {
      const newPot = {
        id: Math.random().toString(36).substr(2, 9), // Generate a random ID
        name: potName,
        target: parseFloat(target),
        total: 0,
        theme: theme.theme,
      };
      addNewPot(newPot); // Call the function passed from the Pots component
      toggleModal(); // Close the modal
      // Reset the inputs
      setPotName("");
      setTarget("");
    }
  };

  return (
    <div className="modal">
      <div className="overlay" onClick={toggleModal}></div>
      <div className="modal-content">
        <div className="modal-flex-column">
          <div className="flex-between">
            <h2>Add New Pot</h2>
            <PFACancelModalButton toggleModal={toggleModal} />
          </div>
          <p>
            Create a pot to set savings targets. These can help keep you on
            track as you save for special purchases.
          </p>
          <div className="inputs">
            <div className="input">
              <label htmlFor="potName">Pot Name</label>
              <PFAInputText
                placeholder="e.g. Rainy Days"
                id="potName"
                value={potName}
                onChange={(e) => setPotName(e.target.value)}
              />
              <span>{30 - potName.length} of 30 characters left</span>
            </div>
            <div className="input">
              <label htmlFor="amount">Target</label>
              <PFAInputNumber
                placeholder="e.g. 2000"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
            </div>
            <div className="input">
              <label htmlFor="theme">Theme</label>
              <PFADropdown selectedColor={theme} setSelectedColor={setTheme} />
            </div>
          </div>
          <button onClick={handleAddPot} className="primary-modal-btn">
            Add Pot
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewPotModal;
