import { useState } from "react";
import PFACancelModalButton from "../CancelModalButton";
import PFAInputNumber from "../InputNumber";
import TwoProgressBars from "../TwoProgressBars";

const AddMoneyModal = ({ toggleModal, pot, addMoneyToPot }) => {
  const [amount, setAmount] = useState(null);

  const handleAmountChange = (e) => {
    setAmount(Number(e.target.value));
  }

  const newAmount = pot.total + amount

  const originalWidth = (pot.total / pot.target) * 100
  const newWidth = amount > 0 ? ((amount / pot.target) * 100) : 0

  const handleConfirmAddition = () => {
    if (amount > 0) {
      addMoneyToPot(pot.id, amount);
      toggleModal();
    }
  }

  return (
    <div className="modal">
      <div className="overlay" onClick={toggleModal}></div>
      <div className="modal-content">
        <div className="modal-flex-column">
          <div className="flex-between">
            <h2>Add to &apos;{pot.name}&apos;</h2>
            <PFACancelModalButton toggleModal={toggleModal} />
          </div>
          <p>
            Add money to your pot to keep it separate from your main balance. As
            soon as you add this money, it will be deducted from your current
            balance.
          </p>
          <div className="progress-info">
            <div className="section-1 flex-between">
              <p>New Amount</p>
              <p>
                {amount > 0
                  ? newAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : 0}
              </p>
            </div>
            <div className="progress-section">
              <TwoProgressBars
                type="add"
                original={originalWidth}
                newWidth={newWidth}
              />
              <section className="flex-between">
                <p style={{ color: "hsl(177, 52%, 32%)" }}>
                  {((newAmount / pot.target) * 100).toFixed(2)}%
                </p>
                <p>Target of ${pot.target.toLocaleString()}</p>
              </section>
            </div>
          </div>
          <div className="inputs">
            <div className="input">
              <label htmlFor="amount">Amount to Add</label>
              <PFAInputNumber
                placeholder="e.g. 2000"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
          </div>
          <button onClick={handleConfirmAddition} className="primary-modal-btn">
            Confirm Addition
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMoneyModal;
