/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Pagination, Form, InputGroup, Button, Dropdown } from "react-bootstrap";
import { FaRegEdit, FaTrashAlt, FaSearch } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import EditProjectModal from "./EditProjectModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { Modal } from "bootstrap";

const ProjectLists = ({ data }) => {
  const [showEditProject, setShowEditProject] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedField, setSortedField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredProjects, setFilteredProjects] = useState(data?.data || []);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterTag, setFilterTag] = useState("All"); // State for tag filter
  const [filterAuthor, setFilterAuthor] = useState(""); // State for author filter
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]); // State for storing available tags

  // Filter and Search Logic
  useEffect(() => {
    let projects = data?.data || [];

    // Load unique categories and tags
    const uniqueCategories = Array.from(new Set(projects.map(project => project.projectType.name)));
    setCategories(["All", ...uniqueCategories]);

    const uniqueTags = Array.from(new Set(projects.flatMap(project => project.tags || [])));
    setTags(["All", ...uniqueTags]);

    // Filter projects by search term, category, tag, and author
    if (searchTerm) {
      projects = projects.filter((project) =>
        project.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== "All") {
      projects = projects.filter((project) => project.projectType.name === filterCategory);
    }

    if (filterTag !== "All") {
      projects = projects.filter((project) => project.tags?.includes(filterTag));
    }

    if (filterAuthor) {
      projects = projects.filter((project) =>
        project.authorName.toLowerCase().includes(filterAuthor.toLowerCase())
      );
    }

    if (sortedField) {
      projects.sort((a, b) => {
        if (a[sortedField] < b[sortedField]) {
          return sortOrder === "asc" ? -1 : 1;
        }
        if (a[sortedField] > b[sortedField]) {
          return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredProjects(projects);
  }, [searchTerm, sortedField, sortOrder, data, filterCategory, filterTag, filterAuthor]);

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setShowEditProject(true);
  };

  const handleDeleteProject = (project) => {
    setSelectedProject(project);
    setShowDeleteConfirmation(true);
  };

  const deleteProject = async () => {
    try {
      await axios.delete(
        `https://anon-cat.vercel.app/api/v1/project/${selectedProject._id}`
      );
      toast.success("Project deleted successfully");
      setShowDeleteConfirmation(false);
      // Refresh the project list or refetch data here
    } catch (error) {
      toast.error("Failed to delete the project");
    }
  };

  const handleSort = (field) => {
    const newSortOrder = sortedField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortedField(field);
    setSortOrder(newSortOrder);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <>
      <div className="container mx-auto p-1">
        <div className="d-flex align-items-center mb-3 max-w-3xl">
          <InputGroup className="me-2 flex-grow-1">
            <Form.Control
              type="text"
              placeholder="Search by project title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="primary">
              <FaSearch />
            </Button>
          </InputGroup>

          <Dropdown className="me-2">
            <Dropdown.Toggle variant="secondary">
              Filter by Category
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {categories.map(category => (
                <Dropdown.Item
                  key={category}
                  onClick={() => setFilterCategory(category)}
                >
                  {category}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="me-2">
            <Dropdown.Toggle variant="secondary">
              Filter by Tag
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {tags.map(tag => (
                <Dropdown.Item
                  key={tag}
                  onClick={() => setFilterTag(tag)}
                >
                  {tag}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Form.Control
            type="text"
            placeholder="Search by author"
            value={filterAuthor}
            onChange={(e) => setFilterAuthor(e.target.value)}
            className="w-25"
          />
        </div>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th onClick={() => handleSort("projectTitle")}>
                Title {sortedField === "projectTitle" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
              </th>
              <th onClick={() => handleSort("description")}>
                Description {sortedField === "description" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
              </th>
              <th>Category</th>
              <th>Tags</th>
              <th>Author</th>
              <th>Created Date</th>
              <th>Updated Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProjects.map((project, index) => (
              <tr key={project._id}>
                <td>{indexOfFirstProject + index + 1}</td>
                <td>
                  <img
                    src={project.projectPicture[0]}
                    alt={project.projectTitle}
                    style={{ width: "40px", height: "40px" }}
                  />
                </td>
                <td>{project.projectTitle}</td>
                <td>{truncateText(project.description, 80)}</td>
                <td>{project.projectType.name}</td>
                <td>{project.tags?.join(", ")}</td>
                <td>{project.authorName}</td>
                <td>{new Date(project.createdAt).toLocaleDateString()}</td>
                <td>{new Date(project.updatedAt).toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="link"
                    onClick={() => handleEditProject(project)}
                    className="text-blue-500 p-0 text-lg"
                  >
                    <FaRegEdit />
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => handleDeleteProject(project)}
                    className="text-red-500 ml-2 p-0 text-lg"
                  >
                    <FaTrashAlt />
                  </Button>
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

        {showEditProject && (
          <EditProjectModal
            showModal={showEditProject}
            setShowModal={setShowEditProject}
            project={selectedProject}
          />
        )}

        {showDeleteConfirmation && (
          <DeleteConfirmationModal
            showModal={showDeleteConfirmation}
            setShowModal={setShowDeleteConfirmation}
            onConfirm={deleteProject}
          />
        )}

        <Toaster
          position="top-center"
          containerStyle={{ marginTop: "100px" }}
          reverseOrder={false}
        />
      </div>
    </>
  );
};

export default ProjectLists;
