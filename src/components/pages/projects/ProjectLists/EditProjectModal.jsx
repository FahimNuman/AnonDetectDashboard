// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const EditProjectModal = ({ showModal, setShowModal, project }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [projectType, setProjectType] = useState("");
//   const [files, setFiles] = useState([]);

//   useEffect(() => {
//     if (project) {
//       setTitle(project.projectTitle);
//       setDescription(project.description);
//       setProjectType(project.projectType);
//     }
//   }, [project]);

//   const handleFileChange = (e) => {
//     setFiles(e.target.files);
//   };

//   const handleUpdateProject = async (e) => {
//     e.preventDefault();

//     try {
//       const updatedProject = {
//         projectTitle: title,
//         description: description,
//         projectType: projectType,
//       };

//       const formData = new FormData();
//       for (const key in updatedProject) {
//         formData.append(key, updatedProject[key]);
//       }

//       if (files.length > 0) {
//         const imageUrls = await Promise.all(
//           Array.from(files).map(async (file) => {
//             const data = new FormData();
//             data.append("file", file);
//             data.append("upload_preset", "fahimnuman");

//             const uploadRes = await axios.post(
//               "https://api.cloudinary.com/v1_1/dutyno5yw/image/upload",
//               data
//             );

//             return uploadRes.data.secure_url;
//           })
//         );

//         imageUrls.forEach((url) => formData.append("projectPicture", url));
//       }

//       const response = await axios.put(
//         `https://anon-hctxlnvkx-fahimnumans-projects.vercel.app/api/v1/project/${project._id}`,
//         formData
//       );

//       if (response.status === 400) {
//         toast.error(response.data.error);
//       } else {
//         toast.success(response.data.message);
//         setShowModal(false);
//       }
//     } catch (error) {
//       console.error("Update error:", error);
//       toast.error(error.response?.data?.error || "Failed to update the project. Please try again.");
//     }
//   };

//   return (
//     showModal && (
//       <div className="modal show" style={{ display: "block" }}>
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Edit Project</h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 onClick={() => setShowModal(false)}
//               ></button>
//             </div>
//             <div className="modal-body">
//               <form onSubmit={handleUpdateProject}>
//                 <div className="mb-3">
//                   <label htmlFor="title" className="form-label">Title</label>
//                   <input
//                     type="text"
//                     id="title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     className="form-control"
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="description" className="form-label">Description</label>
//                   <textarea
//                     id="description"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     className="form-control"
//                   />
//                 </div>
//                 {/* <div className="mb-3">
//                   <label htmlFor="projectType" className="form-label">Project Type</label>
//                   <input
//                     type="text"
//                     id="projectType"
//                     value={projectType}
//                     onChange={(e) => setProjectType(e.target.value)}
//                     className="form-control"
//                   />
//                 </div> */}
//                 <div className="mb-3">
//                   <label htmlFor="files" className="form-label">Project Picture</label>
//                   <input
//                     type="file"
//                     id="files"
//                     onChange={handleFileChange}
//                     multiple
//                     className="form-control"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                 >
//                   Save Changes
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default EditProjectModal;
