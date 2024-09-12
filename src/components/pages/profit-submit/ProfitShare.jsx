"use client";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { AiOutlineEye } from "react-icons/ai";
import { getAllInvests } from "@/dataFetching/invest";
import useSWR from "swr";
import { Toaster } from "react-hot-toast";

import Filter from "./Filter";
import DetailsModal from "./DetailsModal";
import ProfitSubmitModal from "./ProfitSubmitModal";

const investFetcher = () => getAllInvests();

const ProfitShare = ({ data }) => {
  const {
    data: investments,
    error,
    mutate,
  } = useSWR("/investment", investFetcher);
  const allInvestment = investments?.data?.investments;

  const [profitShareType, setProfitShareType] = useState("Monthly");
  const [selectedProject, setSelectedProject] = useState({});
  const [projectInvestor, setProjectInvestor] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [totalInvestAmount, setTotalInvestAmount] = useState(0);

  // find Project Investor
  useEffect(() => {
    const findInvestor = allInvestment?.filter(
      (investor) =>
        investor.projectId?._id === selectedProject?._id &&
        investor.returnType === profitShareType &&
        investor.status === "Received"
    );
    setProjectInvestor(findInvestor);
    setTotalInvestAmount(
      findInvestor?.reduce(
        (total, investor) => total + investor.investmentAmount,
        0
      )
    );
  }, [selectedProject, allInvestment, profitShareType]);

  useEffect(() => {
    if (data?.data) {
      const project =
        data?.data.find((project) => project._id === projectId) || data.data[0];
      setSelectedProject(project);
    }
  }, [projectId, data?.data]);

  // Details Modal
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleDetailsModal = () => {
    setShowDetailsModal(true);
  };

  // Return Modal
  const [showReturnModal, setShowReturnModal] = useState(false);
  const handleReturnShowModal = () => {
    // setSelectedProjectForReturn(projectData);
    setShowReturnModal(true);
  };

  return (
    <div className="mx-3 ">
      <Filter
        setProfitShareType={setProfitShareType}
        projectId={projectId}
        setProjectId={setProjectId}
        data={data}
      />
      <div>
        <Table bordered responsive>
          <thead>
            <tr style={{ fontSize: "1rem" }}>
              <th>Project Name</th>
              <th>{profitShareType} Investor</th>
              <th>Investment Amount</th>
              <th>{profitShareType} Profit Ratio</th>
              {/* <th>Total Profit Count</th>
              <th>Withdraw Amount</th>
              <th>Due Amount</th> */}
              <th>Income Submit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ fontSize: "0.9rem" }}>
              <td>{selectedProject?.projectTitle}</td>
              <td>{projectInvestor?.length} Person</td>
              <td>
                Tk {totalInvestAmount?.toLocaleString()} <br />
              </td>

              <td>
                {profitShareType === "Monthly"
                  ? `${selectedProject?.monthlyReturnValue} %`
                  : profitShareType === "Half-yearly"
                  ? `${selectedProject?.halfYearlyReturnValue} %`
                  : `${selectedProject?.yearlyReturnValue} %`}
              </td>

              <td>
                {" "}
                <div className="d-flex gap-2">
                  <div>
                    <button
                      disabled={projectInvestor?.length > 0 ? false : true}
                      onClick={() => handleReturnShowModal(selectedProject)}
                      style={{
                        backgroundColor:
                          projectInvestor?.length > 0 ? "#00c194" : "#c6cbca",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        padding: "5px 5px",
                      }}
                    >
                      Income Submit
                    </button>
                  </div>
                </div>
              </td>

              <td>
                <div>
                  <button
                    type="button"
                    className="bg-light bg-gradient border-0"
                    onClick={handleDetailsModal}
                  >
                    <span>
                      <AiOutlineEye style={{ width: "24px", height: "24px" }} />
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      {/* Detail Modal */}

      {/* Details Modal */}
      {showDetailsModal && (
        <DetailsModal
          project={selectedProject}
          showDetailsModal={showDetailsModal}
          setShowDetailsModal={setShowDetailsModal}
        />
      )}
      {/* Return Submit Modal */}
      {showReturnModal && (
        <ProfitSubmitModal
          profitShareType={profitShareType}
          showReturnModal={showReturnModal}
          setShowReturnModal={setShowReturnModal}
          projectInvestor={projectInvestor}
          project={selectedProject}
          // mutate={mutate}
        />
      )}
      <Toaster
        position="top-center"
        containerStyle={{ marginTop: "100px" }}
        reverseOrder={false}
      />
    </div>
  );
};

export default ProfitShare;
