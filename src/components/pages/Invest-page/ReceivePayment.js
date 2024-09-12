import axios from "axios";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";

const ReceivePayment = ({ showModal, setShowModal, investment, mutate }) => {
  const handleCloseModal = () => setShowModal(false);
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [investmentStartDate, setInvestmentStartDate] = useState(new Date());
  const [investmentEndDate, setInvestmentEndDate] = useState(new Date());
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // setLoading(true);

    const bankName = e.target.bankName?.value;
    const accountHolderName = e.target.accountHolderName?.value;
    const accountNumber = e.target.accountNumber?.value;
    const receiveAmount = Number(e.target.receiveAmount?.value);
    const transferMode = e.target.transferMode?.value;

    const noteForPayment = e.target.noteForPayment?.value;
    const receiverName = e.target.receiverName?.value;

    const paymentData = {
      userId: investment?.userId,
      investId: investment?._id,
      bankName,
      accountHolderName,
      accountNumber,
      receiveAmount,
      totalInvestAmount: investment?.totalInvestAmount,
      transferMode,
      paymentMethod: selectedPaymentMethod,
      paymentDate,
      investmentStartDate,
      investmentEndDate,
      noteForPayment,
      receiverName,
    };

    try {
      await axios.patch(
        `https://anon-cat.vercel.app/api/v1/investment/${investment?._id}`,
        paymentData
      );
      toast.success("Deposit Success");
      setTimeout(() => {
        handleCloseModal();
      }, 500);
      mutate();
    } catch (err) {
      // console.log(err);
      return toast.error("Something Error Found.");
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Deposit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleSubmit}
          style={{
            fontSize: "1rem",
          }}
          className="payment_form_data row"
        >
          <div className="col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="date">Deposit Date</label>
            <br />

            <DatePicker
              selected={paymentDate}
              onChange={(date) => setPaymentDate(date)}
              className="custom-datepicker"
            />
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="payment-method"> Deposit Method</label>
            <br />
            <select
              value={selectedPaymentMethod}
              required
              style={{
                cursor: "pointer",
              }}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            >
              <option value="" disabled>
                Select Deposit Method
              </option>

              <option>Cash</option>
              <option>Check</option>
              <option>Card</option>
            </select>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="receive">Received Amount</label>
            <br />
            <input
              type="number"
              name="receiveAmount"
              placeholder="Enter Received Amount"
              required
              onWheel={(e) => e.target.blur()}
            />
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="receive">Inv. Start Date</label>
            <br />
            <DatePicker
              selected={investmentStartDate}
              onChange={(date) => setInvestmentStartDate(date)}
              className="custom-datepicker"
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="receiver-name">Inv. End Date</label>
            <br />
            <DatePicker
              selected={investmentEndDate}
              onChange={(date) => setInvestmentEndDate(date)}
              className="custom-datepicker"
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="receiver-name">Receiver Name</label>
            <br />
            <input
              type="text"
              placeholder="Enter Receiver Name"
              required
              name="receiverName"
            />
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12">
            <label htmlFor="note">Note (Optional)</label>

            <br />
            <input
              type="text"
              placeholder="note"
              style={{
                height: "60px",
              }}
              name="noteForPayment"
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
              {loading ? "Submitting..." : "Submit Payment"}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ReceivePayment;
