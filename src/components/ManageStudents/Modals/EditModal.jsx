import React from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";

const EditStudentModal = ({
  isEditModalOpen,
  closeEditModal,
  selectedStudent,
  handleEditChange,
  handleSave,
}) => {
  return (
    <Modal
      isOpen={isEditModalOpen}
      onRequestClose={closeEditModal}
      style={ModalStyle}
      contentLabel="Edit Student Details"
    >
      <div className="flex justify-between items-center">
        <h2 className="m-0 text-[20px] text-[#ff3b3f]">Edit Student Details</h2>
        <button
          className="bg-none border-none text-[24px] cursor-pointer text-[#e63946] transition-colors duration-300 hover:text-[#d00000]"
          onClick={closeEditModal}
        >
          <FaTimes />
        </button>
      </div>
      {selectedStudent && (
        <form onSubmit={handleSave} className="mt-[3.2rem]">
          <div className="flex mb-5 gap-[15px]">
            <label className="flex-1 flex flex-col text-[14px] text-[#333]">
              First Name
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={selectedStudent.firstName}
                onChange={handleEditChange}
                required
                className="mt-[5px] p-3 border border-[#ddd] rounded-[6px] text-[16px] transition-colors duration-300 focus:border-[#f33823] outline-none"
              />
            </label>
            <label className="flex-1 flex flex-col text-[14px] text-[#333]">
              Middle Name
              <input
                type="text"
                name="middleName"
                placeholder="Middle Name"
                value={selectedStudent.middleName}
                onChange={handleEditChange}
                className="mt-[5px] p-3 border border-[#ddd] rounded-[6px] text-[16px] transition-colors duration-300 focus:border-[#f33823] outline-none"
              />
            </label>
            <label className="flex-1 flex flex-col text-[14px] text-[#333]">
              Last Name
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={selectedStudent.lastName}
                onChange={handleEditChange}
                required
                className="mt-[5px] p-3 border border-[#ddd] rounded-[6px] text-[16px] transition-colors duration-300 focus:border-[#f33823] outline-none"
              />
            </label>
          </div>
          <div className="flex mb-5 gap-[15px]">
            <label className="flex-1 flex flex-col text-[14px] text-[#333]">
              Class
              <select
                name="class"
                value={selectedStudent.class}
                onChange={handleEditChange}
                required
                className="mt-[5px] p-3 border border-[#ddd] rounded-[6px] text-[16px] transition-colors duration-300 focus:border-[#f33823] outline-none"
              >
                <option value="">Select Class</option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
                <option value="V">V</option>
                <option value="VI">VI</option>
                <option value="VII">VII</option>
                <option value="VIII">VIII</option>
                <option value="IX">IX</option>
                <option value="X">X</option>
              </select>
            </label>
            <label className="flex-1 flex flex-col text-[14px] text-[#333]">
              Division
              <select
                name="division"
                value={selectedStudent.division}
                onChange={handleEditChange}
                required
                className="mt-[5px] p-3 border border-[#ddd] rounded-[6px] text-[16px] transition-colors duration-300 focus:border-[#f33823] outline-none"
              >
                <option value="">Select Division</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </label>
            <label className="flex-1 flex flex-col text-[14px] text-[#333]">
              Roll Number
              <input
                type="text"
                name="rollNumber"
                placeholder="Enter Roll Number"
                value={selectedStudent.rollNumber}
                onChange={handleEditChange}
                required
                className="mt-[5px] p-3 border border-[#ddd] rounded-[6px] text-[16px] transition-colors duration-300 focus:border-[#f33823] outline-none"
              />
            </label>
          </div>
          <div className="flex mb-5 gap-[15px]">
            <label className="flex-1 flex flex-col text-[14px] text-[#333]">
              Address Line 1
              <input
                type="text"
                name="addressLine1"
                placeholder="Address Line 1"
                value={selectedStudent.addressLine1}
                onChange={handleEditChange}
                required
                className="mt-[5px] p-3 border border-[#ddd] rounded-[6px] text-[16px] transition-colors duration-300 focus:border-[#f33823] outline-none"
              />
            </label>
            <label className="flex-1 flex flex-col text-[14px] text-[#333]">
              Address Line 2
              <input
                type="text"
                name="addressLine2"
                placeholder="Address Line 2"
                value={selectedStudent.addressLine2}
                onChange={handleEditChange}
                className="mt-[5px] p-3 border border-[#ddd] rounded-[6px] text-[16px] transition-colors duration-300 focus:border-[#f33823] outline-none"
              />
            </label>
          </div>
          <div className="flex mb-5 gap-[15px]">
            <label className="flex-1 flex flex-col text-[14px] text-[#333]">
              Landmark
              <input
                type="text"
                name="landmark"
                placeholder="Landmark"
                value={selectedStudent.landmark}
                onChange={handleEditChange}
                className="mt-[5px] p-3 border border-[#ddd] rounded-[6px] text-[16px] transition-colors duration-300 focus:border-[#f33823] outline-none"
              />
            </label>
            <label className="flex-1 flex flex-col text-[14px] text-[#333]">
              City
              <input
                type="text"
                name="city"
                placeholder="City"
                value={selectedStudent.city}
                onChange={handleEditChange}
                required
                className="mt-[5px] p-3 border border-[#ddd] rounded-[6px] text-[16px] transition-colors duration-300 focus:border-[#f33823] outline-none"
              />
            </label>
            <label className="flex-1 flex flex-col text-[14px] text-[#333]">
              Pincode
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={selectedStudent.pincode}
                onChange={handleEditChange}
                required
                className="mt-[5px] p-3 border border-[#ddd] rounded-[6px] text-[16px] transition-colors duration-300 focus:border-[#f33823] outline-none"
              />
            </label>
          </div>
          <button
            type="submit"
            className="py-4 bg-[#f33823] text-white rounded-[6px] w-full text-center mt-7 text-[18px] cursor-pointer transition-colors duration-300 hover:bg-[#e22e31]"
          >
            Save
          </button>
        </form>
      )}
    </Modal>
  );
};

export default EditStudentModal;

const ModalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    padding: "2.5rem 3rem",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#fff",
  },
};

Modal.setAppElement("#root");
