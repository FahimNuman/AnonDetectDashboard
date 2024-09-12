/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Pagination,
  Form,
  InputGroup,
  Button,
  Dropdown,
} from "react-bootstrap";
import { FaRegEdit, FaTrashAlt, FaSearch, FaInfoCircle } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import EditProjectModal from "./EditProjectModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import FullDescriptionModal from "./FullDescriptionModal"; // Import Full Description Modal

const ProjectLists = ({ data }) => {
  const [showEditProject, setShowEditProject] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false); // For full description modal
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(""); // To store the full description
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedField, setSortedField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredProjects, setFilteredProjects] = useState(data?.data || []);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterTag, setFilterTag] = useState("All");
  const [filterAuthor, setFilterAuthor] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    let projects = data?.data || [];

    const uniqueCategories = Array.from(
      new Set(projects.map((project) => project.projectType.name))
    );
    setCategories(["All", ...uniqueCategories]);

    const uniqueTags = Array.from(
      new Set(projects.flatMap((project) => project.tags || []))
    );
    setTags(["All", ...uniqueTags]);

    if (searchTerm) {
      projects = projects.filter((project) =>
        project.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== "All") {
      projects = projects.filter(
        (project) => project.projectType.name === filterCategory
      );
    }

    if (filterTag !== "All") {
      projects = projects.filter((project) =>
        project.tags?.includes(filterTag)
      );
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
  }, [
    searchTerm,
    sortedField,
    sortOrder,
    data,
    filterCategory,
    filterTag,
    filterAuthor,
  ]);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
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
    } catch (error) {
      toast.error("Failed to delete the project");
    }
  };

  const deleteSelectedProjects = async () => {
    try {
      await Promise.all(
        selectedProjects.map((project) =>
          axios.delete(
            `https://anon-cat.vercel.app/api/v1/project/${project._id}`
          )
        )
      );
      toast.success("Selected projects deleted successfully");
      setSelectedProjects([]);
    } catch (error) {
      toast.error("Failed to delete selected projects");
    }
  };

  const handleSort = (field) => {
    const newSortOrder =
      sortedField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortedField(field);
    setSortOrder(newSortOrder);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProjects(currentProjects);
    } else {
      setSelectedProjects([]);
    }
  };

  const handleSelectProject = (project) => {
    if (selectedProjects.includes(project)) {
      setSelectedProjects(
        selectedProjects.filter((p) => p._id !== project._id)
      );
    } else {
      setSelectedProjects([...selectedProjects, project]);
    }
  };

  const handleShowFullDescription = (description) => {
    setSelectedDescription(description);
    setShowFullDescription(true);
  };

  return (
    <>
      <div className="container mx-auto p-1">
        {/* Search, Filters, and Bulk Delete Logic */}
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

          {selectedProjects.length > 0 && (
            <Button
              variant="danger"
              className="ms-2"
              onClick={deleteSelectedProjects}
            >
              Delete Selected ({selectedProjects.length})
            </Button>
          )}

          {/* Filters for Category and Tag */}
          <Dropdown className="me-2">
            <Dropdown.Toggle variant="secondary">
              Filter by Category
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {categories.map((category) => (
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
            <Dropdown.Toggle variant="secondary">Filter by Tag</Dropdown.Toggle>
            <Dropdown.Menu>
              {tags.map((tag) => (
                <Dropdown.Item key={tag} onClick={() => setFilterTag(tag)}>
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

        {/* Projects Table */}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  checked={selectedProjects.length === currentProjects.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th>No</th>
              <th>Image</th>
              <th onClick={() => handleSort("projectTitle")}>
                Project Title{" "}
                {sortedField === "projectTitle" && sortOrder === "asc"
                  ? "↑"
                  : "↓"}
              </th>
              <th onClick={() => handleSort("projectType")}>
                Project Type{" "}
                {sortedField === "projectType" && sortOrder === "asc"
                  ? "↑"
                  : "↓"}
              </th>
              <th onClick={() => handleSort("authorName")}>
                Author Name{" "}
                {sortedField === "authorName" && sortOrder === "asc"
                  ? "↑"
                  : "↓"}
              </th>
              <th onClick={() => handleSort("createdAt")}>
                Created At{" "}
                {sortedField === "createdAt" && sortOrder === "asc" ? "↑" : "↓"}
              </th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProjects.map((project, index) => (
              <tr key={project._id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedProjects.includes(project)}
                    onChange={() => handleSelectProject(project)}
                  />
                </td>
                <td>{indexOfFirstProject + index + 1}</td>
                <td>
                  <img
                    src={project.projectPicture[0]}
                    alt={project.projectTitle}
                    style={{ width: "40px", height: "40px" }}
                  />
                </td>
                <td>{project.projectTitle}</td>
                <td>{project.projectType.name}</td>
                <td>{project.authorName}</td>
                <td>{new Date(project.createdAt).toLocaleDateString()}</td>
                <td>
                  {truncateText(project.description, 50)}{" "}
                  <FaInfoCircle
                    onClick={() =>
                      handleShowFullDescription(project.description)
                    }
                    style={{ cursor: "pointer" }}
                  />
                </td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEditProject(project)}
                  >
                    <FaRegEdit />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteProject(project)}
                  >
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination */}
        <Pagination>
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      {/* Modals */}
      <EditProjectModal
        show={showEditProject}
        handleClose={() => setShowEditProject(false)}
        project={selectedProject}
      />
      <DeleteConfirmationModal
        show={showDeleteConfirmation}
        handleClose={() => setShowDeleteConfirmation(false)}
        handleDelete={deleteProject}
      />
      <FullDescriptionModal
        show={showFullDescription}
        handleClose={() => setShowFullDescription(false)}
        description={selectedDescription}
      />
      <Toaster />
    </>
  );
};

export default ProjectLists;
