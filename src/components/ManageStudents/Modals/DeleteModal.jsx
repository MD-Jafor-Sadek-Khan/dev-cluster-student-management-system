import React from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";

const DeleteStudentModal = ({ isOpen, onRequestClose, confirmDelete }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={ModalStyle}
      contentLabel="Delete Confirmation"
    >
      <div className="flex justify-between items-center">
        <h2 className="m-0 text-[22px] text-[#ff3b3f]">Delete Confirmation</h2>
        <button
          className="bg-none border-none text-[24px] cursor-pointer text-[#e63946] transition-colors duration-300 hover:text-[#d00000]"
          onClick={onRequestClose}
        >
          <FaTimes />
        </button>
      </div>
      <div className="mt-[25px]">
        <p className="text-center text-[18px] text-[#333] my-[6rem]">
          Are you sure you want to delete this item?
        </p>
        <div className="flex justify-between gap-[15px]">
          <button
            className="flex-1 py-[15px] px-[20px] text-white bg-[#f33823] rounded-[6px] text-[16px] cursor-pointer transition-colors duration-300 hover:bg-[#e22e31]"
            onClick={confirmDelete}
          >
            Delete
          </button>
          <button
            className="flex-1 py-[15px] px-[20px] text-[#333] bg-[#ddd] rounded-[6px] text-[16px] cursor-pointer transition-colors duration-300 hover:bg-[#ccc]"
            onClick={onRequestClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteStudentModal;

const ModalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    padding: "2.5rem 3rem",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#fff",
  },
};

Modal.setAppElement("#root");
