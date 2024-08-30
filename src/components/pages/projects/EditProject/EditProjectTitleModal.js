import axios from "axios";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
const EditProjectTitleModal = ({ showModal, setShowModal }) => {
  const handleClose = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectTitle = e.target.projectTitle?.value;
    const newProjectTitle = {
      projectTitle: projectTitle,
    };

    try {
      await axios.post(
        `http://localhost:5000/api/v1/project-title`,
        newProjectTitle
      );
      toast.success("Succefully Created");
      setTimeout(() => {
        handleClose();
      }, 500);
    } catch (err) {
      return toast.error("Something Error Found.", "warning");
    }
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Add New Project Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="project_title"
              style={{
                fontSize: "1rem",
              }}
            >
              Project Title :
            </label>
            <input
              id="project_title"
              type="text"
              style={{
                width: "100%",
                height: "40px",
                fontSize: "1rem",
              }}
              name="projectTitle"
              placeholder="Project Title"
            />
            <div className="d-flex justify-content-end mt-5">
              <button
                style={{
                  backgroundColor: "#00c194",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  marginTop: "-20px",
                  zIndex: 10,
                  cursor: "pointer",
                  border: "none",
                }}
              >
                Add Project Title
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditProjectTitleModal;
