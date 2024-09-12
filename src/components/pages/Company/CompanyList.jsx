"use client";
import React, { useState } from "react";
import {
  Table,
  Pagination,
  Form,
  InputGroup,
  Modal,
  Button,
} from "react-bootstrap";
import useSWR from "swr";
import axios from "axios";
import { AiOutlineEye } from "react-icons/ai";
import { Toaster, toast } from "react-hot-toast";
import { getAllCompanies } from "@/dataFetching/company";
import Link from "next/link";

const CompanyLists = () => {
  const { data: companies, error } = useSWR("/company", getAllCompanies);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 10;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Ensure data is an array before using filter
  const filteredCompanies = Array.isArray(companies?.data)
    ? companies?.data.filter(
        (company) =>
          company.companyName &&
          company.companyName
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase())
      )
    : [];

  // Pagination logic
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );
  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (error) {
    toast.error("Failed to fetch companies. Please try again later.");
    console.error("Error fetching companies:", error);
  }

  return (
    <div className="mx-3">
      <div className="mb-3 d-flex justify-content-end align-items-center gap-2 m-3">
        <div>
          <InputGroup style={{ width: "300px" }}>
            <Form.Control
              type="text"
              placeholder="Search by user name"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Button style={{ backgroundColor: "#00bab3", color: "white" }}>
              Search
            </Button>
          </InputGroup>
        </div>
        <div>
          <button
            className="px-3"
            style={{
              backgroundColor: "#00bab3",
              border: "none",
              height: "52px",
              borderRadius: "5px",
            }}
          >
            <Link
              href="/manage-company"
              style={{
                color: "white",
              }}
            >
              {" "}
              Add New Company
            </Link>
          </button>
        </div>
      </div>

      <Table bordered responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Company Name</th>
            <th>Owner Name</th>
            <th>Owner Email</th>
            <th>Phone Number</th>

            <th>Business Address</th>
            {/* <th>Details</th>
            <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {currentCompanies.map((company, index) => (
            <tr key={company._id}>
              <td>{index + 1}</td>
              <td>{company.companyName}</td>
              <td>{company.companyOwnerName}</td>
              <td>{company.email}</td>
              <td>{company.companyOwnerPhoneNumber}</td>
              <td>{company.companyAddress}</td>
              {/* <td>
                <a
                  href={company.locationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Location
                </a>
              </td> */}
              {/* <td>
                <div className="d-flex gap-2">
                  <button
                    className="btn "
                    data-bs-toggle="modal"
                    data-bs-target={`#details${company._id}`}
                  >
                    <AiOutlineEye />
                  </button>
                </div>
              </td>
              <td>
                <div className="d-flex gap-2">
                  <button
                    className="btn "
                    data-bs-toggle="modal"
                    data-bs-target={`#details${company._id}`}
                  >
                    <AiOutlineEye />
                  </button>
                </div>
              </td> */}
            </tr>
          ))}
        </tbody>
      </Table>

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
  );
};

export default CompanyLists;
