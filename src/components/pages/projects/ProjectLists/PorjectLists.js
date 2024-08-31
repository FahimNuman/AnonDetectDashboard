"use client";
import React, { useState } from "react";
// import axios from "axios";
import { Table, Pagination } from "react-bootstrap";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import  { Toaster } from "react-hot-toast";
// import EditProjectModal from "./EditProjectModal";
// import DeleteConfirmationModal from "./DeleteConfirmationModal";

const ProjectLists = ({ data }) => {
  const [showEditProject, setShowEditProject] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = data?.data.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(data?.data.length / projectsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditProject = (project) => {
    console.log("Edit clicked", project); // Debugging
    setSelectedProject(project);
    setShowEditProject(true);
  };

  const handleDeleteProject = (project) => {
    console.log("Delete clicked", project); // Debugging
    setSelectedProject(project);
    setShowDeleteConfirmation(true);
  };

  // const deleteProject = async () => {
  //   try {
  //     await axios.delete(`https://anon-hctxlnvkx-fahimnumans-projects.vercel.app/api/v1/project/${selectedProject._id}`);
  //     toast.success("Project deleted successfully");
  //     setShowDeleteConfirmation(false);
  //     // Refresh the project list or refetch data here
  //   } catch (error) {
  //     toast.error("Failed to delete the project");
  //   }
  // };

  return (
    <>
      <div className="container mx-auto p-4">
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Project</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProjects.map((project, index) => (
              <tr key={project._id}>
                <td>{indexOfFirstProject + index + 1}</td>
                <td>{/* Add project image or thumbnail here if needed */}</td>
                <td>{project.projectTitle}</td>
                <td>{project.description}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleEditProject(project)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteProject(project)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <FaTrashAlt />
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

        {/* {showEditProject && (
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
        )} */}

        <Toaster position="top-center" containerStyle={{ marginTop: "100px" }} reverseOrder={false} />
      </div>
    </>
  );
};

export default ProjectLists;
