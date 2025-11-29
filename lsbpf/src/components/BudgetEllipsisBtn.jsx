import { useState } from "react";
import IconEllipsis from "./icons/IconEllipsis";
import EditBudgetModal from "./BudgetModal/EditBudgetModal";
import DeleteBudgetModal from "./BudgetModal/DeleteBudgetModal";

const BudgetEllipsisBtn = ({ budget, editBudget, deleteBudget }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [showEditBudgetModal, setShowEditBudgetModal] = useState(false);
  const [showDeleteBudgetModal, setShowDeleteBudgetModal] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleEditBudgetModal = () => {
    setShowEditBudgetModal(!showEditBudgetModal);
  };

  const handleDeleteBudgetModal = () => {
    setShowDeleteBudgetModal(!showDeleteBudgetModal);
  };

  return (
    <>
      <div className="btn-dropdown">
        <button onClick={toggleDropdown}>
          <IconEllipsis />
        </button>

        <div
          className={`dropdown-content ${isDropdownVisible ? "show" : "hide"}`}
        >
          <div className="card">
            <div className="card-body">
              <div className="menu">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setDropdownVisible(false);
                    handleEditBudgetModal();
                  }}
                >
                  Edit Budget
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setDropdownVisible(false);
                    handleDeleteBudgetModal();
                  }}
                >
                  Delete Budget
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showEditBudgetModal && (
        <EditBudgetModal
          toggleModal={handleEditBudgetModal}
          budget={budget}
          editBudget={editBudget}
        />
      )}

      {showDeleteBudgetModal && (
        <DeleteBudgetModal
          toggleModal={handleDeleteBudgetModal}
          category={budget.category}
          deleteBudget={deleteBudget}
        />
      )}
    </>
  );
};

export default BudgetEllipsisBtn;
