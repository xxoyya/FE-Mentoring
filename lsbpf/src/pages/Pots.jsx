import PFAEllipsisBtn from "../components/EllipsisBtn";
import ProgressBar from "../components/ProgressBar";
import JsonData from "../../data.json";
import AddNewPotModal from "../components/modals/AddNewPotModal";
import { useContext, useState } from "react";
import AddMoneyModal from "../components/modals/AddMoneyModal";
import WithdrawModal from "../components/modals/WithdrawModal";
import { AuthContext } from "../context/AuthProvider";

const Pots = () => {
  const [pots, setPots] = useState(JsonData.pots);
  const { balance, setBalance } = useContext(AuthContext);

  const [selectedPot, setSelectedPot] = useState(null);
  const [showAddPotModal, setShowAddPotModal] = useState(false);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const handleAddPotModal = () => {
    setShowAddPotModal(!showAddPotModal);
  };

  const handleAddMoneyModal = (pot) => {
    setSelectedPot(pot);
    setShowAddMoneyModal(!showAddMoneyModal);
  };

  const handleWithdrawModal = (pot) => {
    setSelectedPot(pot);
    setShowWithdrawModal(!showWithdrawModal);
  };

  const addNewPot = (newPot) => {
    setPots([...pots, newPot]); // Add the new pot to the existing pots
  };

  const editPot = (id, updatedPot) => {
    const updatedPots = pots.map((pot) => (pot.id === id ? updatedPot : pot));
    setPots(updatedPots);
  };

  const addMoneyToPot = (potId, amount) => {
    const updatedPots = pots.map((pot) => {
      if (pot.id === potId) {
        return {
          ...pot,
          total: pot.total + amount,
        };
      }
      return pot;
    });

    setPots(updatedPots);
    setBalance(balance - amount);
  };

  const deductMoneyFromPot = (potId, amount) => {
    const updatedPots = pots.map((pot) => {
      if (pot.id === potId) {
        return {
          ...pot,
          total: pot.total - amount,
        };
      }
      return pot;
    });

    setPots(updatedPots);
    setBalance(balance + amount);
  };

  const deletePot = (potId) => {
    const potToDelete = pots.find((pot) => pot.id === potId);
    if (!potToDelete) return;

    // Return all the money from the pot to the balance
    setBalance(balance + potToDelete.total);

    // Remove the pot from the pots array
    const updatedPots = pots.filter((pot) => pot.id !== potId);
    setPots(updatedPots);
  };

  const cardPots = pots.map((card) => {
    const progressPercentage = Math.round((card.total / card.target) * 100);

    return (
      <div key={card.id} className="card">
        <div className="card-header">
          <div className="custom-card-header flex-between">
            <div className="section-1">
              <div
                style={{
                  backgroundColor: card.theme,
                }}
              ></div>
              <h2>{card.name}</h2>
            </div>
            <PFAEllipsisBtn
              deletePot={deletePot}
              potId={card.id}
              editPot={editPot}
              pot={card}
            />
          </div>
        </div>
        <div className="card-body">
          <div className="progress-info">
            <div className="section-1 flex-between">
              <p>Total Saved</p>
              <p>
                $
                {Number(card.total).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="progress-section">
              <ProgressBar theme={card.theme} progress={progressPercentage} />
              <section className="flex-between">
                <p>{progressPercentage.toFixed(2)}%</p>
                <p>Target of ${card.target.toLocaleString()}</p>
              </section>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="buttons">
            <button onClick={() => handleAddMoneyModal(card)}>
              <span>+ Add Money</span>
            </button>
            <button onClick={() => handleWithdrawModal(card)}>
              <span>Withdraw</span>
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="pots-page">
        <div className="section-1 flex-between">
          <h1>Pots</h1>
          <button className="dark-cta-btn" onClick={handleAddPotModal}>
            + Add New Pot
          </button>
        </div>
        <div className="section-2">{cardPots}</div>
      </div>

      {showAddPotModal && (
        <AddNewPotModal toggleModal={handleAddPotModal} addNewPot={addNewPot} />
      )}
      {showAddMoneyModal && (
        <AddMoneyModal
          toggleModal={handleAddMoneyModal}
          pot={selectedPot}
          addMoneyToPot={addMoneyToPot}
        />
      )}
      {showWithdrawModal && (
        <WithdrawModal
          toggleModal={handleWithdrawModal}
          pot={selectedPot}
          deductMoneyFromPot={deductMoneyFromPot}
        />
      )}
    </>
  );
};

export default Pots;
