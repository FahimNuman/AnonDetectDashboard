"use client";
import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import useSWR from "swr";
import { Toaster } from "react-hot-toast";

import "./Return.css";
import { getAllReturns } from "@/dataFetching/return";
import { formatDate } from "@/utilis/dateConvert";
import { FaRegEdit } from "react-icons/fa";
import UpdateReturnStatus from "../ReturnHistory/UpdateReturnStatus";
import Link from "next/link";
const returnFetcher = () => getAllReturns();

const Return = () => {
  const { data: returnsData, error, mutate } = useSWR("/return", returnFetcher);
  const allReturns = returnsData?.data;

  // Status Modal
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const handleShowModal = (returnData) => {
    setSelectedReturn(returnData);
    setShowStatusModal(true);
  };
  return (
    <div className="mx-3">
      <div
        style={{
          width: "100%",
          height: "100%",
          paddingTop: 13,
          paddingBottom: 10,
          paddingLeft: 32,
          paddingRight: 32,
          background: "#EB6753",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottom: "1px rgba(0, 0, 0, 0.20) dotted",
          justifyContent: "space-between",
          alignItems: "flex-start",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 20,
            fontFamily: "Poppins",
            fontWeight: "600",
            lineHeight: "17px",
            wordWrap: "break-word",
          }}
        >
          Return
        </div>
        <div>
          <span
            style={{
              color: "white",
              fontSize: 15,
              fontFamily: "Poppins",
              fontWeight: "600",
              lineHeight: "17px",
              wordWrap: "break-word",
            }}
          >
            Last Update:{" "}
          </span>
          <span
            style={{
              color: "white",
              fontSize: 15,
              fontFamily: "Poppins",
              fontWeight: "600",
              wordWrap: "break-word",
            }}
          >
            {allReturns?.[0]?.createdAt
              ? formatDate(allReturns[0]?.createdAt)
              : ""}
          </span>
        </div>
        <div>
          <Link href="/return-history">
            <span
              style={{
                color: "white",
                fontSize: 15,
                fontFamily: "Poppins",
                fontWeight: "600",
                wordWrap: "break-word",
              }}
            >
              See More
            </span>
          </Link>
        </div>
      </div>
      <div className="table-responsive">
        <Table bordered className="custom-table">
          <thead>
            <tr style={{ fontSize: "1rem" }}>
              <th>Submit Date</th>
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
          <tbody>
            {allReturns?.map((returnData, index) => (
              <tr key={returnData?._id} style={{ fontSize: "0.9rem" }}>
                <td>{formatDate(returnData?.createdAt)}</td>
                <td>{returnData.projectId?.projectTitle}</td>
                <td>{returnData?.totalInvestor}</td>
                <td>Tk {returnData?.totalInvestAmount?.toLocaleString()}</td>

                <td>{returnData.manageUserId?.name}</td>
                <td>{returnData.percentageOfProfit}%</td>
                <td> Tk {returnData.totalProfitCount?.toLocaleString()}</td>

                <td>{returnData.returnType}</td>
                <td>
                  {returnData.returnMonths} {""}({returnData.returnYear})
                </td>
                <td>
                  <span
                    style={{
                      color:
                        returnData.acceptableStatus === "Approved"
                          ? "green"
                          : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {returnData.acceptableStatus}
                  </span>

                  <button
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                    }}
                    disabled={
                      returnData.acceptableStatus === "Approved" ? true : false
                    }
                  >
                    <FaRegEdit
                      onClick={() => handleShowModal(returnData)}
                      style={{ cursor: "pointer", marginLeft: "5px" }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {/* Status Update Modal */}
      {selectedReturn && (
        <UpdateReturnStatus
          returnData={selectedReturn}
          showStatusModal={showStatusModal}
          setShowStatusModal={setShowStatusModal}
          mutate={mutate}
        />
      )}
      <Toaster
        toastOptions={{
          style: {
            fontFamily: "Poppins",
          },
        }}
      />
    </div>
  );
};

export default Return;
