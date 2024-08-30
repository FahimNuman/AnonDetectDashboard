"use client";
import React, { useState } from "react";
import { Table, Pagination, Button } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import useSWR from "swr";
import { Toaster } from "react-hot-toast";
import { AiOutlineEye } from "react-icons/ai";
import { getAllInvests } from "@/dataFetching/invest";
import ReturnForInvestment from "../Invest-page/ReturnForInvestment";
import ReceivePayment from "../Invest-page/ReceivePayment";
import UpdateStatus from "../Invest-page/UpdateStatus";
import SeeInvestDetails from "../Invest-page/SeeInvestDetails";

const investFetcher = () => getAllInvests();

const Resale = () => {
  const { data: investments, error, mutate } = useSWR("/invest", investFetcher);

  // Return Modal
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectInvestForReturn, setSelectInvestForReturn] = useState(null);

  const handleReturnShowModal = (investment) => {
    setSelectInvestForReturn(investment);
    setShowReturnModal(true);
  };

  // Payment Modal
  const [showModal, setShowModal] = useState(false);
  const [selectInvestForPayment, setSelectInvestForPayment] = useState(null);

  const handleShowModal = (investment) => {
    setSelectInvestForPayment(investment);
    setShowModal(true);
  };

  // Status Modal
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const handleShowStatusModal = (investment) => {
    setSelectedInvestment(investment);
    setShowStatusModal(true);
  };

  const investorsData = investments?.data;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const investmentsPerPage = 10;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Ensure data is an array before using filter
  const filteredInvestments = Array.isArray(investorsData)
    ? investorsData.filter(
        (investment) =>
          investment.projectInfo &&
          investment.projectInfo.projectTitle &&
          investment.projectInfo.projectTitle
            .toLowerCase()
            .startsWith(searchQuery.trim().toLowerCase())
      )
    : [];

  // Pagination logic
  const indexOfLastInvestment = currentPage * investmentsPerPage;
  const indexOfFirstInvestment = indexOfLastInvestment - investmentsPerPage;
  const currentInvestments = filteredInvestments.slice(
    indexOfFirstInvestment,
    indexOfLastInvestment
  );
  const totalPages = Math.ceil(filteredInvestments.length / investmentsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
          background: "#00C194",
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
          Resale
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
            01 Jan 2024
          </span>
          
        </div>
        <div>
         
         <span
           style={{
             color: "white",
             fontSize: 15,
             fontFamily: "Poppins",
             fontWeight: "600",
             wordWrap: "break-word",
             
           }}  onClick={() => alert("More button clicked!")}
         >
          
         
         See More
         </span>
       </div>
      </div>
      <div className="table-responsive">
        <Table bordered className="custom-table">
          <thead>
            <tr style={{ fontSize: "1rem" }}>
              <th>No</th>
              <th>Project Name</th>
              <th>PR Name</th>
              <th>Project Type</th>
              <th>Investor</th>
              <th>Resale Request</th>
              <th>Appreciation Value</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentInvestments.map((investment, index) => {
              const formattedDate = new Date(
                investment?.createdAt
              ).toLocaleString();

              return (
                <tr key={investment._id} style={{ fontSize: "0.9rem" }}>
                  <td>{index + 1}</td>
                  <td>
                  <span style={{ fontWeight: 'bold' }}>
                      {investment.projectInfo?.projectTitle}
                    </span>
                    <br />
                    {investment.projectInfo?.projectAddress}
                  </td>
                  <td>
                    {investment.prName} <br />
                    {investment.prContact}
                  </td>
                  <td>{investment.returnType}</td>
                  <td>{investment.durationOfInvest} Year</td>
                  <td>
                    {investment.lastPayAmount
                      ? investment.lastPayAmount.toLocaleString()
                      : "-"}
                  </td>
                  <td>{investment.lastPayRatio}%</td>
                  <td>{investment.nextPay}</td>
                  <td>
                    <Button
                      variant={
                        investment.paymentStatus === "Paid"
                          ? "primary"
                          : investment.paymentStatus === "Processing"
                          ? "warning"
                          : "danger"
                      }
                      size="sm"
                    >
                      {investment.paymentStatus}
                    </Button>
                  </td>
                  <td>
                    <Button variant="link" size="sm">
                      View Details
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
       
      </div>

     

     
      {/* Modals */}
      {selectedInvestment && (
        <UpdateStatus
          show={showStatusModal}
          setShow={setShowStatusModal}
          investment={selectedInvestment}
          mutate={mutate}
        />
      )}
      {selectInvestForPayment && (
        <ReceivePayment
          showModal={showModal}
          setShowModal={setShowModal}
          investment={selectInvestForPayment}
          mutate={mutate}
        />
      )}
      {selectInvestForReturn && (
        <ReturnForInvestment
          showReturnModal={showReturnModal}
          setShowReturnModal={setShowReturnModal}
          investment={selectInvestForReturn}
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

export default Resale;
