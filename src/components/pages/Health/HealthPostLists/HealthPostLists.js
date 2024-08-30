"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Table, Pagination, Form, InputGroup, Button } from "react-bootstrap";

const HealthPostLists = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [healthsPerPage] = useState(5);

  // Filter health posts based on search query
  const filteredHealths = data?.data?.filter((health) =>
    health.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!filteredHealths || filteredHealths.length === 0) {
    return <div>No data available</div>;
  }

  // Pagination logic
  const indexOfLastHealth = currentPage * healthsPerPage;
  const indexOfFirstHealth = indexOfLastHealth - healthsPerPage;
  const currentHealths = filteredHealths.slice(indexOfFirstHealth, indexOfLastHealth);
  const totalPages = Math.ceil(filteredHealths.length / healthsPerPage);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="mb-3 d-flex justify-content-end align-items-center gap-2 m-3">
        <InputGroup style={{ width: "300px" }}>
          <Form.Control
            type="text"
            placeholder="Search by health name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button
            style={{ backgroundColor: "#00bab3", color: "white" }}
            onClick={() => handleSearchChange({ target: { value: searchQuery } })} // Trigger search
          >
            Search
          </Button>
        </InputGroup>

        <Link href="/add-new-health">
          <Button
            style={{
              backgroundColor: "#00bab3",
              border: "none",
              height: "52px",
              borderRadius: "5px",
              color: "white",
            }}
          >
            Add New Health
          </Button>
        </Link>
      </div>

      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>File</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {currentHealths.map((health, index) => (
            <tr key={health._id}>
              <td>{indexOfFirstHealth + index + 1}</td>
              <td>{health.title}</td>
              <td>{health.file}</td>
              <td>{health.description}</td>
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
    </>
  );
};

export default HealthPostLists;
