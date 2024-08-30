import React from "react";
import { Modal } from "react-bootstrap";
import { FaUser, FaMoneyBillWave, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const DetailsModal = ({ project, setShowDetailsModal, showDetailsModal }) => {
  const handleClose = () => {
    setShowDetailsModal(false);
  };

  return (
    <Modal
      show={showDetailsModal}
      onHide={handleClose}
      size="lg"
      backdrop="static"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: "#00C194" }}>
        <Modal.Title className="text-white">Project Wise Investment History</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container-fluid">
          <div className="row mb-4">
            <div className="col-md-6">
              <h4 className="section-title"><FaUser className="me-2" /> Profit Details</h4>
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="fw-medium">Investment ID</label>
                  <p className="fw-bold">#{project?.investId?._id.slice(19)}</p>
                </div>
                <div className="col-6 mb-3">
                  <label className="fw-medium">Management User Name</label>
                  <p className="fw-bold">{project?.manageUserId?.name}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h4 className="section-title"><FaMoneyBillWave className="me-2" /> Profit Summary</h4>
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="fw-medium">Profit Count</label>
                  <p className="fw-bold">{project?.profitCount}</p>
                </div>
                <div className="col-6 mb-3">
                  <label className="fw-medium">Payable Profit Amount</label>
                  <p className="fw-bold">Tk {project?.payOfProfitAmount?.toLocaleString()}</p>
                </div>
                <div className="col-6 mb-3">
                  <label className="fw-medium">Due Profit Amount</label>
                  <p className="fw-bold">Tk {project?.dueProfitAmount?.toLocaleString()}</p>
                </div>
                <div className="col-6 mb-3">
                  <label className="fw-medium">Total Invest Amount</label>
                  <p className="fw-bold">Tk {project?.investId?.totalInvestAmount?.toLocaleString()}</p>
                </div>
                <div className="col-6 mb-3">
                  <label className="fw-medium">Status</label>
                  <p className={`fw-bold ${project?.acceptableStatus === "Accepted" ? "text-success" : "text-danger"}`}>
                    <span className="me-2">{project?.acceptableStatus === "Accepted" ? <FaCheckCircle /> : <FaExclamationCircle />}</span>
                    {project?.acceptableStatus}
                  </p>
                </div>
                <div className="col-6 mb-3">
                  <label className="fw-medium">Investment Return Type</label>
                  <p className="fw-bold">{project?.investmentReturnType}</p>
                </div>
                <div className="col-6 mb-3">
                  <label className="fw-medium">Return Type</label>
                  <p className="fw-bold">{project?.returnType}</p>
                </div>
                <div className="col-6 mb-3">
                  <label className="fw-medium">Percentage of Profit</label>
                  <p className="fw-bold">{project?.percentageOfProfit}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DetailsModal;
