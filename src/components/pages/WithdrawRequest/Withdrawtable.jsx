"use client";
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import useSWR from "swr";
import { Toaster } from "react-hot-toast";
import { getAllProfit } from "@/dataFetching/profitCounts";
import { formatDate } from "@/utilis/dateConvert";
import Link from "next/link";

const profitFetcher = () => getAllProfit();
const Withdrawtable = () => {
  const {
    data: profitCounts,
    error,
    mutate,
  } = useSWR("/profit-count", profitFetcher);
  const allProfits = profitCounts?.data;

  const [requestWithdraw, setRequestWithdraw] = useState([]);

  useEffect(() => {
    const findRequestWithdraw = allProfits?.filter(
      (profit) =>
        profit?.withdrawRQ === "Yes" && profit?.paymentStatus !== "Paid"
    );
    setRequestWithdraw(findRequestWithdraw);
  }, [allProfits]);

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
          background: "#8E44AD",
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
          Withdraw Request
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
            {allProfits?.[0]?.createdAt
              ? formatDate(allProfits[0]?.createdAt)
              : ""}
          </span>
        </div>
        <div>
          <Link href="/profit-counts">
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

              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {requestWithdraw?.map((profit, index) => (
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
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

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

export default Withdrawtable;
