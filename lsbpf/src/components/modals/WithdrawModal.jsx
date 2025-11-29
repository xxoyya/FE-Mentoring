import { useState } from "react";
import PFACancelModalButton from "../CancelModalButton";
import PFAInputNumber from "../InputNumber";
import TwoProgressBars from "../TwoProgressBars";

const WithdrawModal = ({ toggleModal, pot, deductMoneyFromPot }) => {
  const [amount, setAmount] = useState("");

  const handleAmountChange = (e) => {
    // Ensure that the value is always a number or empty string
    const value = e.target.value;
    setAmount(value === "" ? "" : Number(value));
  };

  const newAmount = pot.total - amount;

  const newWidth = amount > 0 ? (amount / pot.target) * 100 : 0;

    const originalWidth =
      amount > 0
        ? ((pot.total / pot.target) * 100) - newWidth
        : (pot.total / pot.target) * 100;

  const handleConfirmWithdrawal = () => {
    if (amount > 0 && amount <= pot.total) {
      deductMoneyFromPot(pot.id, amount);
      toggleModal();
    }
  };

  return (
    <div className="modal">
      <div className="overlay" onClick={toggleModal}></div>
      <div className="modal-content">
        <div className="modal-content">
          <div className="modal-flex-column">
            <div className="flex-between">
              <h2>Withdraw from &apos;{pot.name}&apos;</h2>
              <PFACancelModalButton toggleModal={toggleModal} />
            </div>
            <p>
              Withdraw from your pot to put money back in your main balance.
              This will reduce the amount you have in this pot.
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
                  type="withdrawal"
                  original={originalWidth}
                  newWidth={newWidth}
                />
                <section className="flex-between">
                  <p style={{ color: "hsl(7, 58%, 50%)" }}>
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
            <button
              onClick={handleConfirmWithdrawal}
              className="primary-modal-btn"
            >
              Confirm Withdrawal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;
