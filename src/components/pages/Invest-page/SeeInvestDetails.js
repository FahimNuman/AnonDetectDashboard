import React, { useState, useEffect, useRef } from "react";
import { Modal, Table } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import {
  FaUser,
  FaMoneyBillWave,
  FaChartLine,
  FaFileInvoice,
} from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { formatDate } from "@/utilis/dateConvert"; // Ensure this function exists
import { serverBaseUrl } from "@/serverAPI/BaseUrl";

const SeeInvestDetails = ({ investment, show, setShow }) => {
  const ref = useRef(null);
  const [profits, setProfits] = useState([]);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchProfitData = async () => {
      if (investment?._id) {
        try {
          const res = await fetch(
            `${serverBaseUrl}/profit-count/${investment._id}/investment`
          );
          const data = await res.json();
          setProfits(data.data || []); // Assuming response has a data property
        } catch (error) {
          console.error("Failed to fetch profit data:", error);
        }
      }
    };

    fetchProfitData();
  }, [investment]);

  const handleClose = () => setShow(false);

  return (
    <div className="see-invest-details">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="xl"
      >
        <Modal.Header
          closeButton
          className=""
          style={{ backgroundColor: "#198754" }}
        >
          <Modal.Title>
            <h4 className="text-white">
              <FaFileInvoice className="me-2 text-white" />
              Investment Info
            </h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div ref={ref}>
            <div className="container-fluid">
              {/* Personal Details */}
              <div className="row">
                <div className="col-md-6 border">
                  <h4 className="section-title text-primary">
                    <FaUser className="me-2" />
                    Personal Details
                  </h4>
                  <div className="row">
                    <div className="col-6">
                      <label className="fw-medium">Profile Name</label>
                      <p className="fw-bold">
                        {investment?.userId?.name || "N/A"}
                      </p>
                    </div>
                    <div className="col-6">
                      <label className="fw-medium">
                        NID or Passport Number
                      </label>
                      <p className="fw-bold">
                        {investment?.userId?.nidOrPassport || "N/A"}
                      </p>
                    </div>
                    <div className="col-6">
                      <label className="fw-medium">Email</label>
                      <p className="fw-bold">
                        {investment?.userId?.email || "N/A"}
                      </p>
                    </div>
                    <div className="col-6">
                      <label className="fw-medium">Mobile Number</label>
                      <p className="fw-bold">
                        {investment?.userId?.phone || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 border">
                  <h4 className="section-title text-primary">
                    <FaUser className="me-2" />
                    Nominee Details
                  </h4>
                  <div className="row">
                    <div className="col-6">
                      <label className="fw-medium">Nominee Name</label>
                      <p className="fw-bold">
                        {investment?.nomineeName || "N/A"}
                      </p>
                    </div>
                    <div className="col-6">
                      <label className="fw-medium">
                        Nominee NID or Passport Number
                      </label>
                      <p className="fw-bold">
                        {investment?.nomineeNid || "N/A"}
                      </p>
                    </div>
                    <div className="col-6">
                      <label className="fw-medium">Nominee Mobile Number</label>
                      <p className="fw-bold">
                        {investment?.nomineePhone || "N/A"}
                      </p>
                    </div>
                    <div className="col-6">
                      <label className="fw-medium">Nominee Email</label>
                      <p className="fw-bold">
                        {investment?.nomineeEmail || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment Details */}
              <div className="row mt-4">
                <div className="col-md-6 border">
                  <h4 className="section-title text-success">
                    <MdAccountBalance className="me-2" />
                    Investment Details
                  </h4>
                  <div className="row">
                    <div className="col-6">
                      <label className="fw-medium">Investment ID</label>
                      <p className="fw-bold">
                        #{investment?._id?.slice(19) || "N/A"}
                      </p>
                    </div>
                    <div className="col-6">
                      <label className="fw-medium">
                        Investment Date & Time
                      </label>
                      <p className="fw-bold">
                        {formatDate(investment?.createdAt) || "N/A"}
                      </p>
                    </div>
                    <div className="col-6">
                      <label className="fw-medium">Project Name</label>
                      <p className="fw-bold">
                        {investment?.projectInfo?.projectTitle || "N/A"}
                      </p>
                    </div>
                    <div className="col-6">
                      <label className="fw-medium">Investment Amount</label>
                      <p className="fw-bold">
                        Tk{" "}
                        {investment?.investmentAmount?.toLocaleString() ||
                          "N/A"}
                      </p>
                    </div>
                    <div className="col-6">
                      <label className="fw-medium">Total Buy Shares</label>
                      <p className="fw-bold">
                        {investment?.totalBuyShare || "N/A"}
                      </p>
                    </div>
                    <div className="col-6">
                      <label className="fw-medium">Payment Method</label>
                      <p className="fw-bold">
                        {investment?.paymentMethod || "N/A"}
                      </p>
                    </div>
                    <div className="col-6">
                      <label className="fw-medium">Return Type</label>
                      <p className="fw-bold">
                        {investment?.returnType || "N/A"}
                      </p>
                    </div>
                    <div className="col-6">
                      <label className="fw-medium">
                        Duration of Investment
                      </label>
                      <p className="fw-bold">
                        {investment?.durationOfInvest || "N/A"}
                      </p>
                    </div>
                    <div className="col-6">
                      <label className="fw-medium">First Return Date</label>
                      <p className="fw-bold">
                        {formatDate(investment?.firstReturnDate) || "N/A"}
                      </p>
                    </div>
                    <div className="col-6">
                      <label className="fw-medium">Status</label>
                      <p className="fw-bold">{investment?.status || "N/A"}</p>
                    </div>
                  </div>
                </div>

                {/* Return Details */}
                <div className="col-md-6 border">
                  <h4 className="section-title text-success">
                    <GiReceiveMoney className="me-2" />
                    Return Details
                  </h4>
                  <div className="row">
                    <div className="col-6">
                      <label className="fw-medium">Percent of Return</label>
                      <p className="fw-bold">
                        {investment?.percentOfReturn || "N/A"}%
                      </p>
                    </div>
                    <div className="col-6">
                      <label className="fw-medium">Total Profit Amount</label>
                      <p className="fw-bold">
                        Tk{" "}
                        {investment?.totalProfitAmount?.toLocaleString() ||
                          "N/A"}
                      </p>
                    </div>
                    <div className="col-6">
                      <label className="fw-medium">
                        Total Paid Profit Amount
                      </label>
                      <p className="fw-bold">
                        Tk{" "}
                        {investment?.totalPaidProfitAmount?.toLocaleString() ||
                          "N/A"}
                      </p>
                    </div>
                    <div className="col-6">
                      <label className="fw-medium">
                        Total Due Profit Amount
                      </label>
                      <p className="fw-bold">
                        Tk{" "}
                        {investment?.totalDueProfitAmount?.toLocaleString() ||
                          "N/A"}
                      </p>
                    </div>
                    <div className="col-6">
                      <label className="fw-medium">
                        Total Profit of Percentage
                      </label>
                      <p className="fw-bold">
                        {investment?.totalProfitOfPercentage || "N/A"}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profit Details Table */}
              <div className="row mt-4 border">
                <div className="col-12">
                  <h4 className="section-title text-info">
                    <FaMoneyBillWave className="me-2" />
                    Profit Summary
                  </h4>
                  <Table bordered hover>
                    <thead className="text-center">
                      <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Project Name</th>
                        <th>Investor</th>
                        <th>Inv. Amount</th>
                        <th>PR Manager</th>
                        <th>Profit Ratio</th>
                        <th>Profit Count</th>
                        <th>Return Type</th>
                        <th>Month</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {profits.map((profit, index) => (
                        <tr key={profit._id}>
                          <td>{index + 1}</td>
                          <td>{formatDate(profit.createdAt)}</td>
                          <td>{profit.projectId?.projectTitle || "N/A"}</td>
                          <td>{profit.userId?.name || "N/A"}</td>
                          <td>{profit.investmentId?.investmentAmount || 0}</td>
                          <td>{profit.manageUserId?.name || "N/A"}</td>
                          <td>{profit.percentageOfProfit}%</td>
                          <td>{profit.profitCount}</td>
                          <td>{profit.returnType}</td>
                          <td>
                            {profit.profitGiveMonths} {profit.profitGiveYear}
                          </td>
                          <td>
                            {profit.paymentStatus === "Paid"
                              ? "Paid"
                              : "Pending"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <ReactToPrint
            trigger={() => <button className="btn btn-primary">Print</button>}
            content={() => ref.current}
          />
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SeeInvestDetails;
