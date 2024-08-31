// "use client";
// import React from "react";

// const DeleteConfirmationModal = ({data, showModal, setShowModal, onConfirm }) => {
//   return (
//     showModal && (
//       <div className="modal show" style={{ display: "block" }}>
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Confirm Delete</h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 onClick={() => setShowModal(false)}
//               ></button>
//             </div>
//             <div className="modal-body">
//               <p>Are you sure you want to delete this project?</p>
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 onClick={() => setShowModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-danger"
//                 onClick={onConfirm}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default DeleteConfirmationModal;
