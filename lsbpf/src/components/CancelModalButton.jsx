import IconCloseModal from "./icons/IconCloseModal";


const PFACancelModalButton = (props) => {
  return (
    <button
      className="close-modal"
      onClick={props.toggleModal}
    >
      <IconCloseModal />
    </button>
  );
};

export default PFACancelModalButton;
