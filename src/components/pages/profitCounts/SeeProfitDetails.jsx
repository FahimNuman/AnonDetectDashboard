import React from "react";
import { Modal } from "react-bootstrap";

const SeeProfitDetails = ({ data, setShowDetailsModal, showDetailsModal }) => {
  const handleClose = () => {
    setShowDetailsModal(false);
  };

  return (
    <Modal
      show={showDetailsModal}
      onHide={handleClose}
      //   size="xl"
      // centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Profit Count Details</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-6">
                  <label className="fw-medium">Investment ID</label>
                  <p className="fw-bold">
                    #{data?.investmentId?._id.slice(19)}
                  </p>
                </div>
                <div className="col-6">
                  <label className="fw-medium">Investor Name</label>
                  <p className="fw-bold">{data?.userId?.name}</p>
                </div>
                <div className="col-6">
                  <label className="fw-medium">PR Name</label>
                  <p className="fw-bold">{data?.manageUserId?.name}</p>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <h4 className="section-title">Profit Summary</h4>
              <div className="row">
                <div className="col-6">
                  <label className="fw-medium">Profit Ratio</label>
                  <p className="fw-bold">{data?.percentageOfProfit}%</p>
                </div>
                <div className="col-6">
                  <label className="fw-medium">Profit Count</label>
                  <p className="fw-bold">Tk {data?.profitCount}</p>
                </div>
                <div className="col-6">
                  <label className="fw-medium"> Investment Amount</label>
                  <p className="fw-bold">
                    Tk {data?.investmentId?.investmentAmount?.toLocaleString()}
                  </p>
                </div>

                <div className="col-6">
                  <label className="fw-medium">Return Type</label>
                  <p className="fw-bold">{data?.returnType}</p>
                </div>
                <div className="col-6">
                  <label className="fw-medium">Status</label>
                  <p
                    className={`fw-bold ${
                      data?.acceptableStatus === "Paid"
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

export default SeeProfitDetails;
