import React from "react";
import { Modal } from "react-bootstrap";

const DetailsModal = ({ project, setShowDetailsModal, showDetailsModal }) => {
  const handleClose = () => {
    setShowDetailsModal(false);
  };

  return (
    <Modal
      show={showDetailsModal}
      onHide={handleClose}
      size="xl"
      // centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Project wise investment History</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <h4 className="section-title">Profit Details</h4>
              <div className="row">
                <div className="col-6">
                  <label className="fw-medium">Investment ID</label>
                  <p className="fw-bold">#{project?.investId?._id.slice(19)}</p>
                </div>
                <div className="col-6">
                  <label className="fw-medium">Management User Name</label>
                  <p className="fw-bold">{project?.manageUserId?.name}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h4 className="section-title">Profit Summary</h4>
              <div className="row">
                <div className="col-6">
                  <label className="fw-medium">Profit Count</label>
                  <p className="fw-bold">{project?.profitCount}</p>
                </div>
                <div className="col-6">
                  <label className="fw-medium">Payable Profit Amount</label>
                  <p className="fw-bold">
                    Tk {project?.payOfProfitAmount?.toLocaleString()}
                  </p>
                </div>
                <div className="col-6">
                  <label className="fw-medium">Due Profit Amount</label>
                  <p className="fw-bold">
                    Tk {project?.dueProfitAmount?.toLocaleString()}
                  </p>
                </div>
                <div className="col-6">
                  <label className="fw-medium">Total Invest Amount</label>
                  <p className="fw-bold">
                    Tk {project?.investId?.totalInvestAmount?.toLocaleString()}
                  </p>
                </div>
                <div className="col-6">
                  <label className="fw-medium">Status</label>
                  <p
                    className={`fw-bold ${
                      project?.acceptableStatus === "Accepted"
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {project?.acceptableStatus}
                  </p>
                </div>
                <div className="col-6">
                  <label className="fw-medium">Investment Return Type</label>
                  <p className="fw-bold">{project?.investmentReturnType}</p>
                </div>
                <div className="col-6">
                  <label className="fw-medium">Return Type</label>
                  <p className="fw-bold">{project?.returnType}</p>
                </div>
                <div className="col-6">
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
