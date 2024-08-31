import axios from "axios";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
const DeleteModal = ({
  showReturnDelete,
  setSelectReturnForDelete,
  returnData,
  mutate,
}) => {
  const handleClose = () => setSelectReturnForDelete(false);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://anon-hctxlnvkx-fahimnumans-projects.vercel.app/api/v1/return/${returnData?._id}`
      );
      toast.success("Deleted");
      setTimeout(() => {
        handleClose();
      }, 500);
      mutate();
    } catch (err) {
      console.log(err);
      return toast.error("Something Error Found.", "warning");
    }
  };

  return (
    <>
      <Modal
        show={showReturnDelete}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Return Status Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Are You Sure For Delete? </h5>
          <div className="d-flex justify-content-end mt-5 gap-2">
            <button
              onClick={handleClose}
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                marginTop: "-20px",
                zIndex: 10,
                cursor: "pointer",
                border: "none",
              }}
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              style={{
                backgroundColor: "#00c194",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                marginTop: "-20px",
                zIndex: 10,
                cursor: "pointer",
                border: "none",
              }}
            >
              Yes
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteModal;
