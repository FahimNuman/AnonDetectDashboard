"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { Table, Pagination, Button, Modal, Form } from "react-bootstrap";

const AddHealthPost = () => {
  const [healthPosts, setHealthPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchHealthPosts = async () => {
      try {
        const response = await axios.get("https://anon-hctxlnvkx-fahimnumans-projects.vercel.app/api/v1/health");
        if (Array.isArray(response.data.data)) {
          setHealthPosts(response.data.data);
        } else {
          setHealthPosts([]);
        }
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch health posts");
        setHealthPosts([]);
        setLoading(false);
      }
    };

    fetchHealthPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const userData = {
      title: formData.get("title"),
      file: formData.get("file"),
      description: formData.get("description"),
    };

    try {
      await axios.post("https://anon-hctxlnvkx-fahimnumans-projects.vercel.app/api/v1/health", userData);
      toast.success("Health Post Created");
      e.target.reset();
      const response = await axios.get("https://anon-hctxlnvkx-fahimnumans-projects.vercel.app/api/v1/health");
      if (Array.isArray(response.data.data)) {
        setHealthPosts(response.data.data);
      } else {
        setHealthPosts([]);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create health post");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const updatedData = {
      title: formData.get("title"),
      file: formData.get("file") || selectedPost.file, // Use existing file if not updated
      description: formData.get("description"),
    };

    try {
      await axios.put(`https://anon-hctxlnvkx-fahimnumans-projects.vercel.app/api/v1/health/${selectedPost._id}`, updatedData);
      toast.success("Health Post Updated");
      setShowEditModal(false);
      const response = await axios.get("https://anon-hctxlnvkx-fahimnumans-projects.vercel.app/api/v1/health");
      if (Array.isArray(response.data.data)) {
        setHealthPosts(response.data.data);
      } else {
        setHealthPosts([]);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update health post");
    }
  };

  const handleDelete = async () => {
    try {
      // Display a loading state if desired
      await axios.delete(`https://anon-hctxlnvkx-fahimnumans-projects.vercel.app/api/v1/health/${deleteId}`);
      toast.success("Health Post Deleted");
      setShowDeleteModal(false);
      const response = await axios.get("https://anon-hctxlnvkx-fahimnumans-projects.vercel.app/api/v1/health");
      if (Array.isArray(response.data.data)) {
        setHealthPosts(response.data.data);
      } else {
        setHealthPosts([]);
      }
    } catch (err) {
      // Improved error logging
      console.error("Delete operation failed", err); // Log full error for debugging
      toast.error(err?.response?.data?.message || "Failed to delete health post");
    }
  };


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = healthPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(healthPosts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="title fz17 mb30 bg-orange">New Health Post</h4>
            <a
              href="http://localhost:3000/health-posts"
              className="btn btn-outline-secondary"
            >
              <FaList className="me-1" />
              Post List
            </a>
          </div>
          <div className="form-style1">
            <div className="row">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label className="heading-color ff-heading fw600 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add Post Title"
                    name="title"
                    required
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label className="heading-color ff-heading fw600 mb-2">
                    File
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="file"
                  />
                </div>
              </div>

              <div className="col-sm-12">
                <div className="mb-3">
                  <label className="heading-color ff-heading fw600 mb-2">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="Description"
                    name="description"
                    rows="3"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="d-flex justify-content-end p-2">
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#00c194",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Create New Post
                </button>
              </div>
            </div>
          </div>
        </div>
        <Toaster
          position="top-center"
          containerStyle={{ marginTop: "100px" }}
          reverseOrder={false}
        />
      </form>

      <div className="mt-5">
        <h4 className="mb-3">Health Posts List</h4>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>File</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((health, index) => (
                <tr key={health._id}>
                  <td>{indexOfFirstPost + index + 1}</td>
                  <td>{health.title}</td>
                  <td>
                    {Array.isArray(health.file) && health.file.length > 0 ? (
                      health.file.map((file, i) => (
                        <div key={i}>
                          {typeof file === 'string' && file.includes('http') ? (
                            <a href={file} target="_blank" rel="noopener noreferrer">{file}</a>
                          ) : (
                            <span>No preview available</span>
                          )}
                        </div>
                      ))
                    ) : (
                      <span>No file available</span>
                    )}
                  </td>
                  <td>{health.description}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => {
                        setSelectedPost(health);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => {
                        setDeleteId(health._id); // Make sure this ID is correct
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </Button>

                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <div className="d-flex justify-content-between">
          <Pagination>
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages).keys()].map((pageNumber) => (
              <Pagination.Item
                key={pageNumber + 1}
                active={pageNumber + 1 === currentPage}
                onClick={() => handlePageChange(pageNumber + 1)}
              >
                {pageNumber + 1}
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
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Health Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPost && (
            <Form onSubmit={handleUpdate}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  defaultValue={selectedPost.title}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>File</Form.Label>
                <Form.Control
                  type="file"
                  name="file"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  defaultValue={selectedPost.description}
                  rows={3}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Update Post
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this post?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddHealthPost;
