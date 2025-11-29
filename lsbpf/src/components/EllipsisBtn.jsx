import { useState } from "react";
import IconEllipsis from "./icons/IconEllipsis";
import EditPotModal from "./modals/EditPotModal";
import DeletePotModal from "./modals/DeletePotModal";

const PFAEllipsisBtn = ({ deletePot, editPot, pot }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [showEditPotModal, setShowEditPotModal] = useState(false);
  const [showDeletePotModal, setShowDeletePotModal] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleEditPotModal = () => {
    setShowEditPotModal(!showEditPotModal);
  };

  const handleDeletePotModal = () => {
    setShowDeletePotModal(!showDeletePotModal);
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
                    handleEditPotModal();
                  }}
                >
                  Edit Pot
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setDropdownVisible(false);
                    handleDeletePotModal();
                  }}
                >
                  Delete Pot
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showEditPotModal && (
        <EditPotModal
          toggleModal={handleEditPotModal}
          pot={pot}
          editPot={editPot} // Function to handle editing
        />
      )}
      {showDeletePotModal && (
        <DeletePotModal
          toggleModal={handleDeletePotModal}
          deletePot={deletePot}
          potId={pot.id}
          potName={pot.name}
        />
      )}
    </>
  );
};

export default PFAEllipsisBtn;
