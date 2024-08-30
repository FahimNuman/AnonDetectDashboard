"use client";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { Toaster } from "react-hot-toast";
import useSWR from "swr";
import { getAllReturns } from "@/dataFetching/return";
import SeeReturnDetails from "./SeeReturnDetails";
import UpdateReturnStatus from "./UpdateReturnStatus";
import UpdateReturnData from "./UpdateReturnData";
import DeleteModal from "./DeleteModal";
import ReturnFilter from "./ReturnFilter";
import { formatDate } from "@/utilis/dateConvert";

const returnFetcher = () => getAllReturns();

const ReturnHistoryData = ({ data }) => {
  const { data: returnsData, error, mutate } = useSWR("/return", returnFetcher);

  // Status Modal
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const handleShowModal = (returnData) => {
    setSelectedReturn(returnData);
    setShowStatusModal(true);
  };

  // Details Modal
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedReturnDetails, setSelectReturnDetails] = useState(null);

  const handleDetailsModal = (returnData) => {
    setSelectReturnDetails(returnData);
    setShowDetailsModal(true);
  };

  //  Return Update Modal
  const [showReturnUpdateModal, setShowReturnUpdateModal] = useState(false);
  const [selectReturnForUpdate, setSelectReturnForUpdate] = useState(null);

  const handleReturnShowUpdateModal = (returnData) => {
    setSelectReturnForUpdate(returnData);
    setShowReturnUpdateModal(true);
  };
  // Delete Modal
  const [showReturnDelete, setShowReturnDelete] = useState(false);
  const [selectReturnForDelete, setSelectReturnForDelete] = useState(null);

  const handleReturnDeleteModal = (projectData) => {
    setSelectReturnForDelete(projectData);
    setShowReturnDelete(true);
  };

  // Filter
  const [profitShareType, setProfitShareType] = useState("");
  const [projectId, setProjectId] = useState("");
  const [filterdReturns, setFilterdReturns] = useState([]);
  const allReturns = returnsData?.data;
  useEffect(() => {
    if (projectId && profitShareType) {
      const filterReturn = allReturns.filter(
        (returnData) =>
          returnData.projectId._id === projectId &&
          returnData.returnType === profitShareType
      );
      setFilterdReturns(filterReturn);
    } else if (projectId && !profitShareType) {
      const filterReturn = allReturns.filter(
        (returnData) => returnData.projectId._id === projectId
      );
      setFilterdReturns(filterReturn);
    } else if (!projectId && profitShareType) {
      const filterReturn = allReturns.filter(
        (returnData) => returnData.returnType === profitShareType
      );
      setFilterdReturns(filterReturn);
    } else {
      setFilterdReturns(allReturns);
    }
  }, [allReturns, projectId, profitShareType]);

  return (
    <div className="mx-3">
      <ReturnFilter
        setProfitShareType={setProfitShareType}
        projectId={projectId}
        setProjectId={setProjectId}
        data={data}
      />
      <Table bordered responsive>
        <thead>
          <tr style={{ fontSize: "1rem" }}>
            <th>Submit Date</th>
            <th>Project Name</th>
            <th>Total Investor</th>
            <th>Inv. Amount</th>
            <th>PR Manager</th>
            <th>Profit Ratio</th>
            <th>Profit Count</th>
            <th>Return Type</th>
            <th>Month</th>

            <th>Details</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filterdReturns?.map((returnData, index) => (
            <tr key={returnData?._id} style={{ fontSize: "0.9rem" }}>
              <td>{formatDate(returnData?.createdAt)}</td>
              <td>{returnData.projectId?.projectTitle}</td>
              <td>
                <span className="fw-bold"> {returnData.returnType}</span>:{" "}
                {returnData?.totalInvestor} Investor
              </td>
              <td>Tk {returnData?.totalInvestAmount?.toLocaleString()}</td>

              <td>{returnData.manageUserId?.name}</td>
              <td>{returnData.percentageOfProfit}%</td>
              <td> Tk {returnData.totalProfitCount?.toLocaleString()}</td>

              <td>{returnData.returnType}</td>
              <td>
                {returnData.returnMonths} {""}({returnData.returnYear})
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-light bg-gradient border-0"
                  onClick={() => handleDetailsModal(returnData)}
                >
                  <AiOutlineEye style={{ width: "20px", height: "20px" }} />
                </button>
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
              <td className="d-flex">
                <div>
                  <button
                    disabled={
                      returnData.acceptableStatus === "Approved" ? true : false
                    }
                    onClick={() => handleReturnShowUpdateModal(returnData)}
                    style={{
                      backgroundColor:
                        returnData.acceptableStatus === "Approved"
                          ? "#d5d0d0"
                          : "#00c194",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "5px 5px",
                    }}
                  >
                    Update
                  </button>
                </div>
                <div>
                  <button
                    disabled={
                      returnData.acceptableStatus === "Approved" ? true : false
                    }
                    onClick={() => handleReturnDeleteModal(returnData)}
                    className="btn btn-link delete_button"
                    style={{
                      cursor: "pointer",
                      border: "none",
                      backgroundColor: "transparent",
                    }}
                  >
                    <FaRegTrashAlt className="text-danger" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Status Update Modal */}
      {selectedReturn && (
        <UpdateReturnStatus
          returnData={selectedReturn}
          showStatusModal={showStatusModal}
          setShowStatusModal={setShowStatusModal}
          mutate={mutate}
        />
      )}
      {/* Details Modal */}
      {selectedReturnDetails && (
        <SeeReturnDetails
          data={selectedReturnDetails}
          showDetailsModal={showDetailsModal}
          setShowDetailsModal={setShowDetailsModal}
        />
      )}

      {/* Return Update Modal */}
      {selectReturnForUpdate && (
        <UpdateReturnData
          showReturnUpdateModal={showReturnUpdateModal}
          setShowReturnUpdateModal={setShowReturnUpdateModal}
          selectReturnForUpdate={selectReturnForUpdate}
          mutate={mutate}
        />
      )}
      {/* Return Delete Modal */}
      {selectReturnForDelete && (
        <DeleteModal
          showReturnDelete={showReturnDelete}
          setSelectReturnForDelete={setSelectReturnForDelete}
          returnData={selectReturnForDelete}
          mutate={mutate}
        />
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ReturnHistoryData;
