"use client";
import React from "react";
import "./DashboardStatusCard.css";

const DashboardStatusCard = ({
  totalInvestors,
  totalInvestmentAmount,
  monthlyReturn,
  totalReturn,
}) => {
  return (
    <>
      <div className="summary-cards-container">
        {[
          { title: "Blog Post", count: 10, icon: "fa-users" },
          { title: "Live Blog", count: 7, icon: "fa-coins" },
          { title: "Comments", count: 15, icon: "fa-calendar-alt" },
          { title: "Total Download", count: 5, icon: "fa-chart-line" },
        ].map((card, index) => (
          <div key={index} className="summary-card approved-card">
            <div className="icon-css">
              <i className={`fa ${card.icon}`}></i>
            </div>
            <div className="details">
              <h4>{card.title}</h4>
              <h5>{card.count}</h5>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DashboardStatusCard;
