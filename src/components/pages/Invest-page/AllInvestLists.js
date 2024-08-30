"use client";
import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

import useSWR from "swr";
import { Toaster } from "react-hot-toast";

import { getAllInvests } from "@/dataFetching/invest";

import StatusCard from "@/components/pages/Invest-page/status-card/StatusCard";
import InvestmentFilter from "./InvestmentFilter";
import AllInvestmentTable from "./AllInvestmentTable";

const investFetcher = () => getAllInvests();
const AllInvestLists = ({ data }) => {
  const {
    data: investments,
    error,
    mutate,
  } = useSWR("/investment", investFetcher);
  const allInvestment = investments?.data?.investments;
  const totalInvestmentAmount = investments?.data?.totalInvestmentAmount;
  const totalInvestor = investments?.data?.totalInvestor;

  const [profitShareType, setProfitShareType] = useState("");
  const [projectId, setProjectId] = useState("");
  const [filterdInvestment, setFilterdInvestment] = useState([]);

  // Filter
  useEffect(() => {
    if (projectId && profitShareType) {
      const filterInvestment = allInvestment.filter(
        (investment) =>
          investment.projectId?._id === projectId &&
          investment.returnType === profitShareType
      );
      setFilterdInvestment(filterInvestment);
    } else if (projectId && !profitShareType) {
      const filterInvestment = allInvestment.filter(
        (investment) => investment.projectId === projectId
      );
      setFilterdInvestment(filterInvestment);
    } else if (!projectId && profitShareType) {
      const filterInvestment = allInvestment.filter(
        (investment) => investment.returnType === profitShareType
      );
      setFilterdInvestment(filterInvestment);
    } else {
      setFilterdInvestment(allInvestment);
    }
  }, [allInvestment, projectId, profitShareType]);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const investmentsPerPage = 10;

  // Ensure data is an array before using filter
  const filteredInvestments = Array.isArray(filterdInvestment)
    ? filterdInvestment.filter(
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

  // const MAX_PAGE_BUTTONS = 5; // Define the maximum number of page buttons to show

  // // Calculate the range of page numbers to display
  // const startPage = Math.max(1, page - Math.floor(MAX_PAGE_BUTTONS / 2));
  // const endPage = Math.min(startPage + MAX_PAGE_BUTTONS - 1, pageCount);
  // const visiblePageNumbers = [...Array(endPage - startPage + 1).keys()].map(
  //   (i) => startPage + i
  // );

  return (
    <>
      <div className="row align-items-center pb40">
        <div className="col-lg-12">
          {" "}
          <StatusCard
            totalInvestors={totalInvestor}
            totalInvestmentAmount={totalInvestmentAmount}
          />
        </div>
      </div>
      <div className="mx-3">
        <div>
          <InvestmentFilter
            setProfitShareType={setProfitShareType}
            projectId={projectId}
            setProjectId={setProjectId}
            data={data}
          />
        </div>
        <AllInvestmentTable
          currentInvestments={filterdInvestment}
          mutate={mutate}
        />
        {/* Pagination */}
        <div className="d-flex justify-content-end">
          <Pagination>
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>

        <Toaster
          position="top-center"
          containerStyle={{ marginTop: "100px" }}
          reverseOrder={false}
        />
      </div>
    </>
  );
};

export default AllInvestLists;
