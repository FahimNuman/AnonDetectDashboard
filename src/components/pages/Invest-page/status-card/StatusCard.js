import React from "react";
import "./StatusCard.css";

const StatusCard = ({
  totalInvestors,
  totalInvestmentAmount,
  monthlyReturn,
  totalReturn,
}) => {
  return (
    <>
      <div className="summary-cards-container">
        <div className="summary-card approved-card flex">
          <div className="icon-CLass">
            <i className="fa fa-users"></i>
          </div>
          <div className="details">
            <h4 className="text-white">Total Investors</h4>
            <h5 className="text-white">{totalInvestors}</h5>
          </div>
        </div>

        <div className="summary-card approved-card">
          <div className="icon-CLass">
            <i className="fa fa-coins"></i>
          </div>
          <div className="details">
            <h4 className="text-white">Total Investment</h4>
            <h5 className="text-white font-lg font-bold">
              {totalInvestmentAmount?.toLocaleString()}
            </h5>
          </div>
        </div>

        <div className="summary-card payable-card">
          <div className="icon-CLass">
            <i className="fa fa-calendar-alt"></i>
          </div>
          <div className="details">
            <h4 className="text-white">Monthly Return</h4>
            <h5 className="text-white">Tk 0</h5>
          </div>
        </div>

        <div className="summary-card cash-card">
          <div className="icon-CLass">
            <i className="fa fa-chart-line"></i>
          </div>
          <div className="details">
            <h4 className="text-white">Total Return</h4>
            <h5 className="text-white">Tk 0</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatusCard;
