import axios from "axios";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";

const UpdateStatus = ({ show, setShow, investment, mutate }) => {
  const handleClose = () => setShow(false);
  const [status, setStatus] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === investment?.status) {
      return toast.error(`Sorry Already ${investment?.status}`);
    }

    const updatedStatus = {
      status: status,
      buyTotalShare: investment?.totalBuyShare,
      projectId: investment?.projectId,
    };

    try {
      await axios.patch(
        `https://anon-hctxlnvkx-fahimnumans-projects.vercel.app/api/v1/investment/${investment?._id}`,
        updatedStatus
      );
      toast.success("Updated");
      setTimeout(() => {
        handleClose();
      }, 500);
      mutate();
    } catch (err) {
      console.log(err);
      return toast.error("Something Error Found.");
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Status Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="custom_form_data">
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
              <option>Received</option>
              <option>Canceled</option>
            </select>
            {/* 
            {status === "Received" ? (
              <>
                <div>
                  <label htmlFor="receive">Inv. Start Date</label>
                  <br />
                  <DatePicker
                    selected={investmentStartDate}
                    onChange={(date) => setInvestmentStartDate(date)}
                    className="custom-datepicker2"
                  />
                </div>
              </>
            ) : (
              ""
            )} */}
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
                  zIndex: 0,
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

export default UpdateStatus;
