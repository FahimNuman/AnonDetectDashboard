import useUser from "@/app/hooks/useUser";
import axios from "axios";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";

const CategoryUpdate = ({
  showEditModal,
  setShowEditModal,
  selectCategory,
  //   mutate,
}) => {
  const handleCloseModal = () => setShowEditModal(false);

  const { user } = useUser();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryData = {
      name: e.target.name.value,
    };

    try {
      //   setLoading(true);
      const { data } = await axios.patch(
        `https://anon-cat.vercel.app/api/v1/category/${selectCategory?._id}`,
        categoryData
      );
      toast.success(data?.message);
      setTimeout(() => {
        handleCloseModal();
      }, 500);
      //   mutate();
    } catch (err) {
      console.log(err);
      return toast.error(err?.response?.data?.message);
    }
  };

  return (
    <Modal
      show={showEditModal}
      onHide={handleCloseModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Category Update</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleSubmit}
          style={{
            fontSize: "1rem",
          }}
          className="custom_form_data row"
        >
          <div className="col-lg-12 col-md-12 col-sm-12">
            <label htmlFor="Return">Category</label>
            <br />
            <input
              type="text"
              placeholder="Type Category Name"
              name="name"
              required
              defaultValue={selectCategory?.name}
            />
          </div>

          <br />
          <div className="mt-3 d-flex justify-content-end">
            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: "#00c194",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "10px 15px",
                fontSize: "1rem",
                fontWeight: "600",
              }}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CategoryUpdate;
