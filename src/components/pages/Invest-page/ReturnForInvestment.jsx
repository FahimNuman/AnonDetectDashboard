import useUser from "@/app/hooks/useUser";
import { months } from "@/utilis/months";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";

const ReturnForInvestment = ({
  showReturnModal,
  setShowReturnModal,
  investment,
  mutate,
}) => {
  const handleCloseModal = () => setShowReturnModal(false);
  const inputRef = useRef(null);
  const percentRef = useRef(null);
  const { user } = useUser();
  const [returnDate, setReturnDate] = useState(new Date());
  const [percentageOfProfit, setPercentageOfProfit] = useState(0);
  const [profitCount, setProfitCount] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [returnType, setReturnType] = useState("");
  const [dueProfitAmount, setDueProfitAmount] = useState(0);
  const [payAmount, setPayAmount] = useState(0);

  const [loading, setLoading] = useState(false);

  // Calculation Profit Amount
  useEffect(() => {
    let profitAmount = 0;
    profitAmount =
      (investment?.totalInvestAmount * Number(percentageOfProfit)) / 100;

    setProfitCount(profitAmount);
  }, [investment?.totalInvestAmount, percentageOfProfit]);

  // Calculation Paid & Due Amount
  useEffect(() => {
    let dueAmount = 0;
    dueAmount = profitCount - payAmount;

    setDueProfitAmount(dueAmount);
  }, [profitCount, payAmount]);

  // percent show
  // useEffect(() => {
  //   const inputWidth = inputRef.current ? inputRef.current.offsetWidth : 0;
  //   if (percentRef.current) {
  //     percentRef.current.style.left = `${inputWidth + 0}px`; // Adjust as needed
  //   }
  // }, [monthlyReturnPercent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);

    const noteForReturn = e.target.noteForReturn?.value;

    const returnsData = {
      userId: investment?.userId,
      investId: investment?._id,
      manageUserId: user?.data?._id,
      totalInvestAmount: investment?.totalInvestAmount,
      percentageOfProfit,
      profitCount,
      payOfProfitAmount: payAmount,
      dueProfitAmount,
      investmentReturnType: investment?.returnType,
      returnType,
      noteForReturn,
    };

    try {
      await axios.patch(
        `http://localhost:5000/api/v1/investment/${investment?._id}`,
        returnsData
      );
      toast.success("Return Request Submitted");
      setTimeout(() => {
        handleCloseModal();
      }, 500);
      mutate();
    } catch (err) {
      console.log(err);
      return toast.error("Something Error Found.");
    }
  };

  return (
    <Modal
      show={showReturnModal}
      onHide={handleCloseModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Profit Count</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleSubmit}
          style={{
            fontSize: "1rem",
          }}
          className="custom_form_data row"
        >
          <div className="col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="totalInvestment">Investment Amount</label>
            <br />

            <input
              id="totalInvestment"
              type="number"
              name="totalInvestment"
              value={investment?.totalInvestAmount}
              disabled
            />
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="Return Date"> Return Date</label>
            <br />
            <DatePicker
              selected={returnDate}
              onChange={(date) => setReturnDate(date)}
              className="custom-datepicker"
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="returnType"> Return Type</label>
            <br />
            <select
              value={returnType}
              required
              style={{
                cursor: "pointer",
              }}
              onChange={(e) => setReturnType(e.target.value)}
            >
              <option value="" disabled>
                Select Return Type
              </option>

              <option>Monthly</option>
              <option>{investment?.returnType}</option>
              <option>Withdraw</option>
            </select>
          </div>
          {returnType === "Monthly" ? (
            <div className="col-lg-6 col-md-6 col-sm-12">
              <label htmlFor="returnType">Month</label>
              <br />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select a month
                </option>
                {months.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            ""
          )}

          <div className="col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="Profit-Percentage">
              Profit (%) (Ratio {investment?.percentOfReturnMin}% -{" "}
              {investment?.percentOfReturnMax}%)
            </label>
            <br />

            <div style={{ position: "relative", display: "inline-block" }}>
              <input
                type="number"
                required
                onChange={(e) => setPercentageOfProfit(e.target.value)}
                onWheel={(e) => e.target.blur()}
                placeholder="Profit Percentage"
                // ref={inputRef}
                // style={{
                //   paddingLeft: "5px",
                // }}
                // value={monthlyReturnPercent}
              />
              {/* <p
                ref={percentRef}
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(10%)", // Adjust vertical centering
                }}
              >
                %
              </p> */}
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="Return">Profit Count</label>
            <br />
            <input
              type="number"
              placeholder="Profit Count"
              required
              value={profitCount}
              disabled
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="pay">Pay Amount</label>
            <br />
            <input
              id="pay"
              type="number"
              onChange={(e) => setPayAmount(Number(e.target.value))}
              placeholder="Pay Amount"
              required
              onWheel={(e) => e.target.blur()}
            />
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="">Due Amount</label>
            <br />
            <input
              id=""
              type="number"
              value={dueProfitAmount}
              placeholder="Due Amount"
              disabled
            />
          </div>

          <div className="col-12">
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
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ReturnForInvestment;
