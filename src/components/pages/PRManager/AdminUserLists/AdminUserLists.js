"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Table, Pagination, Form, InputGroup, Button } from "react-bootstrap";

const AdminUserLists = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [adminUsersPerPage] = useState(5);

  // Filtered users based on search query
  const filteredUsers = data?.data?.filter((user) =>
    user.name.toLowerCase().includes(searchQuery)
  );

  // If data is not available, display a message
  if (!filteredUsers) {
    return <div>No data available</div>;
  }

  // Pagination logic
  const indexOfLastUser = currentPage * adminUsersPerPage;
  const indexOfFirstUser = indexOfLastUser - adminUsersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / adminUsersPerPage);

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
              href="/add-new-user"
              style={{
                color: "white",
              }}
            >
              {" "}
              Add New User
            </Link>
          </button>
        </div>
      </div>

      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>User Status</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user._id}>
              <td>{indexOfFirstUser + index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.userStatus}</td>
              <td>{user.role}</td>
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

export default AdminUserLists;
