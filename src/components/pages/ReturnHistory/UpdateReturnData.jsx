import useUser from "@/app/hooks/useUser";
import { months } from "@/utilis/months";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";

const UpdateReturnData = ({
  showReturnUpdateModal,
  setShowReturnUpdateModal,
  selectReturnForUpdate,
  mutate,
}) => {
  const handleCloseModal = () => setShowReturnUpdateModal(false);
  const date = new Date();
  const year = date.getFullYear();

  const { user } = useUser();
  // const [returnDate, setReturnDate] = useState(new Date());
  const [percentageOfProfit, setPercentageOfProfit] = useState(
    selectReturnForUpdate?.percentageOfProfit
  );
  const [selectedMonth, setSelectedMonth] = useState(
    selectReturnForUpdate?.returnMonths
  );

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    const noteForReturn = e.target.noteForReturn?.value;
    const returnsData = {
      projectId: selectReturnForUpdate?.projectId?._id,
      manageUserId: user?.data?._id,
      percentageOfProfit,
      // totalInvestAmount: project?.totalInvestAmount,
      // totalProfitCount,
      returnType: selectReturnForUpdate?.returnType,
      // returnDate: returnDate,
      returnMonths: selectedMonth,
      returnYear: year,
      noteForReturn,
    };

    try {
      const res = await axios.patch(
        `https://anon-cat.vercel.app/api/v1/return/${selectReturnForUpdate?._id}`,
        returnsData
      );
      toast.success(res?.response?.data?.message);
      setTimeout(() => {
        handleCloseModal();
      }, 500);
      mutate();
    } catch (err) {
      // console.log(err);
      return toast.error(err?.response?.data?.message);
    }
  };

  return (
    <Modal
      show={showReturnUpdateModal}
      onHide={handleCloseModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Income Submit Update</Modal.Title>
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
            <label htmlFor="returnType"> Return Type</label>
            <br />
            <select
              required
              style={{
                cursor: "pointer",
              }}
              // onChange={(e) => setReturnType(e.target.value)}
            >
              <option>{selectReturnForUpdate?.returnType}</option>
            </select>
          </div>

          {selectReturnForUpdate?.returnType === "Monthly" ? (
            <div className="col-lg-6 col-md-6 col-sm-12">
              <label htmlFor="returnType">Month</label>
              <br />
              <select
                defaultValue={selectReturnForUpdate?.returnMonths}
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
              Profit Ratio {selectReturnForUpdate?.monthlyReturnValue}%
            </label>
            <br />

            <div style={{ position: "relative", display: "inline-block" }}>
              <input
                type="number"
                required
                onChange={(e) => setPercentageOfProfit(e.target.value)}
                onWheel={(e) => e.target.blur()}
                placeholder="Profit Percentage"
                defaultValue={selectReturnForUpdate?.percentageOfProfit}
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

          {/* <div className="col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="Return">Profit Count</label>
            <br />
            <input
              type="number"
              placeholder="Profit Count"
              required
              value={totalProfitCount}
              disabled
            />
          </div> */}

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

export default UpdateReturnData;
