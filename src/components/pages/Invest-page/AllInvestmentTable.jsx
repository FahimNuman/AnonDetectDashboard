import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import SeeInvestDetails from "./SeeInvestDetails";
import { FaRegEdit } from "react-icons/fa";
import { Table } from "react-bootstrap";
import UpdateStatus from "./UpdateStatus";
import ReceivePayment from "./ReceivePayment";
import ReturnForInvestment from "./ReturnForInvestment";
import { afterSixMonth } from "@/utilis/afterSixMonth";
import { formatDate } from "@/utilis/dateConvert";
import { afterOneYear } from "@/utilis/afterOneYear";

const AllInvestmentTable = ({ currentInvestments, mutate }) => {
  // Return Modal
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectInvestForReturn, setSelectInvestForReturn] = useState(null);

  // Payment Modal
  const [showModal, setShowModal] = useState(false);
  const [selectInvestForPayment, setSelectInvestForPayment] = useState(null);

  // Status Modal
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const handleShowStatusModal = (investment) => {
    setSelectedInvestment(investment);
    setShowStatusModal(true);
  };
  // Details Modal
  const [selectDetailsInvestment, setSelectDetailsInvestment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const handleShowDetailsModal = (investment) => {
    setSelectDetailsInvestment(investment);
    setShowDetailsModal(true);
  };

  // Pagination
  // const MAX_PAGE_BUTTONS = 5; // Define the maximum number of page buttons to show

  // // Calculate the range of page numbers to display
  // const startPage = Math.max(1, page - Math.floor(MAX_PAGE_BUTTONS / 2));
  // const endPage = Math.min(startPage + MAX_PAGE_BUTTONS - 1, pageCount);
  // const visiblePageNumbers = [...Array(endPage - startPage + 1).keys()].map(
  //   (i) => startPage + i
  // );

  return (
    <>
      <Table bordered responsive>
        <thead>
          <tr style={{ fontSize: "1rem" }}>
            <th>Inv.Id</th>
            <th>Investor</th>
            <th>Project Title</th>
            <th>Project Type</th>
            <th>Pay Method</th>
            <th>Inv. Amount</th>
            <th>Share</th>
            <th>Return Type</th>
            <th>Profit Share Date</th>
            <th>Duration of Invest</th>
            <th>Profit Ratio</th>
            <th>Profit Details</th>

            <th>Status</th>
            <th>Details</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {currentInvestments?.map((investment, index) => {
            return (
              <tr key={investment._id} style={{ fontSize: "0.9rem" }}>
                <td>
                  {/* {formatDate(investment?.createdAt)} */}
                  <br />#{investment?._id?.slice(19)}
                </td>
                <td>{investment?.userId?.name}</td>

                <td>{investment.projectInfo?.projectTitle}</td>
                <td className="fw-bold">
                  {investment.projectInfo?.projectType}
                </td>

                <td>{investment.paymentMethod}</td>

                <td
                  style={{
                    fontWeight: "bold",
                    width: "150px",
                  }}
                >
                  Tk {investment?.investmentAmount?.toLocaleString()}
                </td>
                <td
                  style={{
                    fontWeight: "bold",
                    width: "120px",
                  }}
                >
                  {investment?.totalBuyShare?.toLocaleString()} {""}Share
                </td>

                <td>{investment.returnType}</td>
                <td
                  className="fw-bold"
                  style={{
                    width: "130px",
                    color: "red",
                  }}
                >
                  {investment?.returnType === "Yearly"
                    ? formatDate(afterOneYear(investment?.firstReturnDate))
                    : investment?.returnType === "Monthly"
                    ? formatDate(investment?.firstReturnDate)
                    : formatDate(afterSixMonth(investment?.firstReturnDate))}
                </td>
                <td>
                  {investment.projectInfo?.projectType === "Co-ownership" ? (
                    <div className="text-center fw-bold">
                      <span>-</span>
                    </div>
                  ) : (
                    `${investment.durationOfInvest} Year`
                  )}
                </td>
                <td>Upto {investment?.percentOfReturn}%</td>

                <td
                  style={{
                    fontWeight: "bold",
                    width: "200px",
                  }}
                >
                  P.Count: Tk{" "}
                  {investment.totalProfitAmount
                    ? investment.totalProfitAmount?.toLocaleString()
                    : 0}
                  <br />
                  <span
                    style={{
                      color: "green",
                    }}
                  >
                    Paid : Tk{" "}
                    {investment.totalPaidProfitAmount
                      ? investment.totalPaidProfitAmount?.toLocaleString()
                      : 0}
                  </span>
                  <br />
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    Due : Tk {""}
                    {investment.totalDueProfitAmount
                      ? investment.totalDueProfitAmount?.toLocaleString()
                      : 0}
                  </span>
                </td>
                <td className="d-flex justify-items-center gap-2">
                  <div>
                    <p
                      style={{
                        color:
                          investment.status !== "Received" ? "red" : "green",
                        fontWeight: "bold",
                      }}
                    >
                      {investment.status}
                    </p>
                  </div>

                  <div>
                    <button
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                      disabled={investment.status !== "Received" ? false : true}
                    >
                      <FaRegEdit
                        style={{ cursor: "pointer" }}
                        onClick={() => handleShowStatusModal(investment)}
                      />
                    </button>
                  </div>
                </td>
                <td>
                  <div>
                    <button
                      type="button"
                      className="bg-light bg-gradient border-0"
                      onClick={() => handleShowDetailsModal(investment)}
                    >
                      <span>
                        <AiOutlineEye
                          style={{ width: "24px", height: "24px" }}
                        />
                      </span>
                    </button>

                    {/* Modal for Investment Details */}
                    {selectDetailsInvestment && (
                      <SeeInvestDetails
                        show={showDetailsModal}
                        setShow={setShowDetailsModal}
                        investment={selectDetailsInvestment}
                      />
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* Pagination */}

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
    </>
  );
};

export default AllInvestmentTable;
