import React from "react";
import { Modal } from "react-bootstrap";

const SeeReturnDetails = ({ data, setShowDetailsModal, showDetailsModal }) => {
  const handleClose = () => {
    setShowDetailsModal(false);
  };
  console.log(data);
  return (
    <Modal
      show={showDetailsModal}
      onHide={handleClose}
      // centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Profit Details</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-4">
                  <label className="fw-medium">PR Name</label>
                  <p className="fw-bold">{data?.manageUserId?.name}</p>
                </div>

                <div className="col-4">
                  <label className="fw-medium">Project Name</label>
                  <p className="fw-bold">{data?.projectId?.projectTitle}</p>
                </div>
                <div className="col-4">
                  <label className="fw-medium">Profit Count</label>
                  <p className="fw-bold">
                    {data?.totalProfitCount?.toLocaleString()}
                  </p>
                </div>

                <div className="col-4">
                  <label className="fw-medium">Total Investment Amount</label>
                  <p className="fw-bold">
                    Tk {data?.totalInvestAmount?.toLocaleString()}
                  </p>
                </div>

                <div className="col-4">
                  <label className="fw-medium">Return Type</label>
                  <p className="fw-bold">{data?.returnType}</p>
                </div>
                <div className="col-4">
                  <label className="fw-medium">Percentage of Profit</label>
                  <p className="fw-bold">{data?.percentageOfProfit}%</p>
                </div>
                <div className="col-4">
                  <label className="fw-medium">Status</label>
                  <p
                    className={`fw-bold ${
                      data?.acceptableStatus === "Accepted"
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {data?.acceptableStatus}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SeeReturnDetails;
