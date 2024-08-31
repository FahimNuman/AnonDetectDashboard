import axios from "axios";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
const UpdateReturnStatus = ({
  showStatusModal,
  setShowStatusModal,
  returnData,
  mutate,
}) => {
  const handleClose = () => setShowStatusModal(false);
  const [status, setStatus] = useState("");
  const [files, setFiles] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === returnData?.status) {
      return toast.error(`Sorry Already ${returnData?.status}`);
    }

    const updatedStatus = {
      acceptableStatus: status,
    };

    try {
      await axios.patch(
        `https://anon-hctxlnvkx-fahimnumans-projects.vercel.app/api/v1/return/${returnData?._id}`,
        updatedStatus
      );
      toast.success("Updated");
      setTimeout(() => {
        handleClose();
      }, 500);
      mutate();
    } catch (err) {
      // console.log(err);
      return toast.error("Something Error Found");
    }
  };

  return (
    <>
      <Modal
        show={showStatusModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Return Status Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <select
              value={status}
              style={{
                width: "100%",
                height: "40px",
                borderRadius: "5px",
                fontSize: "1rem",
              }}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Status
              </option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Approved</option>
              {/* <option>Payment Done</option> */}
            </select>

            <p className="mt-3">
              <span
                className="text-danger fw-bold "
                style={{
                  fontSize: "1.2rem",
                }}
              >
                {" "}
                Warning :
              </span>{" "}
              You {"can't"} change anything after <b>Approving</b> this Status.
            </p>
            <div className="d-flex justify-content-end mt-5">
              <button
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
                Submit
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateReturnStatus;
