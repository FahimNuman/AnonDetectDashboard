import { pictureCloudKey } from "@/utilis/pictureCloudKey";
import axios from "axios";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
const ProfitStatusUpdate = ({
  showStatusModal,
  setShowStatusModal,
  profitData,
  mutate,
}) => {
  const handleClose = () => setShowStatusModal(false);
  const [status, setStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [files, setFiles] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const noteForProfit = e.target.noteForProfit.value;
    if (status === profitData?.status) {
      return toast.error(`Sorry Already ${profitData?.status}`);
    }

    const updatedStatus = {
      paymentStatus: status,
      noteForProfit: noteForProfit,
    };

    try {
      const proofOfPhoto = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "alamin");
          const uploadRes = await axios.post(
            `https://api.cloudinary.com/v1_1/${pictureCloudKey}/image/upload`,
            data
          );
          const { secure_url } = uploadRes.data;
          return secure_url;
        })
      );

      const isStatusPaidData = {
        paymentMethod: paymentMethod,
        proofOfPaidPhoto: proofOfPhoto,
        ...updatedStatus,
      };

      const { data } = await axios.patch(
        `https://anon-cat.vercel.app/api/v1/profit-count/${profitData?._id}`,
        status === "Paid" ? isStatusPaidData : updatedStatus
      );
      toast.success(data?.message);
      setTimeout(() => {
        handleClose();
      }, 500);
      mutate();
    } catch (err) {
      //   console.log(err);
      return toast.error(err?.response?.data?.message);
    }
  };

  return (
    <>
      <Modal
        show={showStatusModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Profit Status Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="custom_form_data">
            <select
              value={status}
              style={{
                width: "100%",
                height: "40px",
                borderRadius: "5px",
                fontSize: "1rem",
              }}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Status
              </option>
              <option>Unpaid</option>
              <option>Processing</option>
              <option>Paid</option>
              {/* <option>Payment Done</option> */}
            </select>

            {status === "Paid" ? (
              <>
                <label htmlFor="">Select Payment Method</label>
                <select
                  className="main_form w-100 pt-1"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  value={paymentMethod}
                  required
                >
                  <option value="" disabled>
                    Select Payment Method
                  </option>
                  <option>Cash</option>
                  <option>Bank</option>
                </select>
                <label htmlFor="">Proof Photo</label>
                <input
                  type="file"
                  className="main_form w-100 pt-1"
                  name="img"
                  onChange={(e) => setFiles(e.target.files)}
                  multiple
                  style={{
                    border: "1px solid black",
                    borderRadius: "5px",
                  }}
                />
              </>
            ) : (
              ""
            )}
            <label htmlFor="note">Note (Optional)</label>
            <br />
            <input
              type="text"
              placeholder="note"
              style={{
                height: "60px",
              }}
              name="noteForProfit"
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
                Submit
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProfitStatusUpdate;
