"use client";
import React, { useState, useEffect } from "react";
import { Table, Pagination, Form, InputGroup, Button } from "react-bootstrap";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaEdit, FaRegEye } from "react-icons/fa";
import Link from "next/link";
import CategoryUpdate from "./CategoryUpdate";

const AddCategories = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(10);

  // Edit Modal Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectCategory, setSelectCategory] = useState(null);
  const handleShowModal = (returnData) => {
    setSelectCategory(returnData);
    setShowEditModal(true);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://anon-cat.vercel.app/api/v1/category"
        );
        if (response.data.status === "success") {
          setCategories(response.data.data);
        } else {
          toast.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );
  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
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
            <Button style={{ backgroundColor: "red", color: "white" }}>
              Search
            </Button>
          </InputGroup>
        </div>
        <div>
          <button
            className="px-3"
            style={{
              backgroundColor: "red",
              border: "none",
              height: "52px",
              borderRadius: "5px",
            }}
          >
            <Link
              href="/create-category"
              style={{
                color: "white",
              }}
            >
              {" "}
              Add New Category
            </Link>
          </button>
        </div>
      </div>

      <Table striped bordered responsive hover size="sm">
        <thead>
          <tr>
            <th>No</th>
            <th>Category Name</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentCategories.map((category, index) => (
            <tr key={category._id}>
              <td>{indexOfFirstCategory + index + 1}</td>
              <td>{category.name}</td>
              <td>{category.createdAt}</td>
              <td>{category.updatedAt}</td>
              <td>
                <button
                  onClick={() => handleShowModal(category)}
                  style={{ backgroundColor: "transparent", border: "none" }}
                >
                  <FaEdit style={{ fontSize: "16px" }} />
                </button>
              </td>
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
      {/* Return Update Modal */}
      {selectCategory && (
        <CategoryUpdate
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          selectCategory={selectCategory}
          // mutate={mutate}
        />
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default AddCategories;
