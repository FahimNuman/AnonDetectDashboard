"use client";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { Toaster } from "react-hot-toast";
import useSWR from "swr";
import { getAllProfit } from "@/dataFetching/profitCounts";
import ProfitStatusUpdate from "./ProfitStatusUpdate";
import SeeProfitDetails from "./SeeProfitDetails";
import ProfitFilter from "./ProfitFilter";
import { formatDate } from "@/utilis/dateConvert";

const profitFetcher = () => getAllProfit();

const ProfitCountsHistory = ({ data }) => {
  const {
    data: profitCounts,
    error,
    mutate,
  } = useSWR("/profit-count", profitFetcher);
  const allProfits = profitCounts?.data;

  // Status Modal
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedProfit, setSelectedProfit] = useState(null);
  const handleShowStatusModal = (profitData) => {
    setSelectedProfit(profitData);
    setShowStatusModal(true);
  };

  // Details Modal
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProfitDetails, setSelectProfitDetails] = useState(null);

  const handleDetailsModal = (profitData) => {
    setSelectProfitDetails(profitData);
    setShowDetailsModal(true);
  };

  // Filter
  const [profitShareType, setProfitShareType] = useState("");
  const [withdrawRQ, setWithdrawRQ] = useState("");
  const [projectId, setProjectId] = useState("");
  const [filterdProfits, setFilterdProfits] = useState([]);

  useEffect(() => {
    if (projectId && profitShareType && withdrawRQ) {
      const filterProfit = allProfits.filter(
        (profit) =>
          profit.projectId._id === projectId &&
          profit.returnType === profitShareType &&
          profit.withdrawRQ === withdrawRQ
      );
      setFilterdProfits(filterProfit);
    } else if (projectId && !profitShareType && !withdrawRQ) {
      const filterProfit = allProfits.filter(
        (profit) => profit.projectId._id === projectId
      );
      setFilterdProfits(filterProfit);
    } else if (!projectId && profitShareType && !withdrawRQ) {
      const filterProfit = allProfits.filter(
        (profit) => profit.returnType === profitShareType
      );
      setFilterdProfits(filterProfit);
    } else if (!projectId && !profitShareType && withdrawRQ) {
      const filterProfit = allProfits.filter(
        (profit) => profit.withdrawRQ === withdrawRQ
      );
      setFilterdProfits(filterProfit);
    } else if (projectId && profitShareType && !withdrawRQ) {
      const filterProfit = allProfits.filter(
        (profit) =>
          profit.projectId._id === projectId &&
          profit.returnType === profitShareType
      );
      setFilterdProfits(filterProfit);
    } else if (!projectId && profitShareType && withdrawRQ) {
      const filterProfit = allProfits.filter(
        (profit) =>
          profit.returnType === profitShareType &&
          profit.withdrawRQ === withdrawRQ
      );
      setFilterdProfits(filterProfit);
    } else if (projectId && !profitShareType && withdrawRQ) {
      const filterProfit = allProfits.filter(
        (profit) =>
          profit.projectId._id === projectId && profit.withdrawRQ === withdrawRQ
      );
      setFilterdProfits(filterProfit);
    } else {
      setFilterdProfits(allProfits);
    }
  }, [allProfits, projectId, profitShareType, withdrawRQ]);

  return (
    <div className="mx-3">
      <ProfitFilter
        setProfitShareType={setProfitShareType}
        projectId={projectId}
        setProjectId={setProjectId}
        data={data}
        profitShareType={profitShareType}
        setWithdrawRQ={setWithdrawRQ}
        withdrawRQ={withdrawRQ}
      />
      <Table bordered responsive>
        <thead>
          <tr style={{ fontSize: "1rem" }}>
            <th>Date</th>
            <th>Project Name</th>
            <th>Investor</th>
            <th>Inv. Amount</th>
            <th>PR Manager</th>
            <th>Profit Ratio</th>
            <th>Profit Count</th>
            <th>Return Type</th>
            <th>Month</th>
            <th>Withdraw RQ</th>
            <th>Status</th>
            <th>Details</th>

            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {filterdProfits?.map((profit, index) => (
            <tr key={profit?._id} style={{ fontSize: "0.9rem" }}>
              <td>{formatDate(profit?.createdAt)}</td>
              <td>{profit.projectId?.projectTitle}</td>
              <td>{profit.userId?.name}</td>

              <td>
                Tk {profit?.investmentId?.investmentAmount.toLocaleString()}
              </td>

              <td>{profit.manageUserId?.name}</td>
              <td>{profit.percentageOfProfit}%</td>
              <td className="fw-bold">
                {" "}
                Tk {profit.profitCount?.toLocaleString()}
              </td>

              <td>{profit.returnType}</td>

              <td>
                {profit.profitGiveMonths} {""} ({profit?.profitGiveYear})
              </td>
              <td className="d-flex justify-content-center">
                <p
                  style={{
                    color: profit?.withdrawRQ === "Yes" ? "green" : "red",
                    padding: "2px 20px",
                    borderRadius: "5px",
                    fontWeight: "bold",
                  }}
                >
                  {profit?.withdrawRQ === "Yes" ? "Request" : "No request"}
                </p>
              </td>
              <td>
                <span
                  style={{
                    color: profit.paymentStatus === "Paid" ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {profit.paymentStatus}
                </span>

                <button
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                  }}
                  // disabled={
                  //   profit.paymentStatus === "Paid" ||
                  //   profit?.withdrawRQ === "No"
                  //     ? true
                  //     : false
                  // }
                >
                  <FaRegEdit
                    onClick={() => handleShowStatusModal(profit)}
                    style={{ cursor: "pointer", marginLeft: "5px" }}
                  />
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-light bg-gradient border-0"
                  onClick={() => handleDetailsModal(profit)}
                >
                  <AiOutlineEye style={{ width: "20px", height: "20px" }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Status Update Modal */}
      {selectedProfit && (
        <ProfitStatusUpdate
          profitData={selectedProfit}
          showStatusModal={showStatusModal}
          setShowStatusModal={setShowStatusModal}
          mutate={mutate}
        />
      )}

      {/* Details Modal */}
      {selectedProfitDetails && (
        <SeeProfitDetails
          data={selectedProfitDetails}
          showDetailsModal={showDetailsModal}
          setShowDetailsModal={setShowDetailsModal}
        />
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ProfitCountsHistory;
