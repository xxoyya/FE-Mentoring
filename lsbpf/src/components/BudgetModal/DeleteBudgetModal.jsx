import PFACancelModalButton from "../CancelModalButton";

const DeleteBudgetModal = ({ toggleModal, deleteBudget, category }) => {
  const handleConfirmDelete = () => {
    deleteBudget(category);
    toggleModal();
  }
  return (
    <div className="modal">
      <div className="overlay" onClick={toggleModal}></div>
      <div className="modal-content">
        <div className="modal-flex-column">
          <div className="flex-between">
            <h2>Delete &apos;{category}&apos; ?</h2>
            <PFACancelModalButton toggleModal={toggleModal} />
          </div>
          <p>
            Are you sure you want to delete this budget? This action cannot be
            reversed, and all the data inside it will be removed forever.
          </p>
          <button onClick={handleConfirmDelete} className="secondary-modal-btn">
            Yes, Confirm Deletion
          </button>
          <button onClick={toggleModal} className="tertiary-modal-btn">
            No, Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBudgetModal;
