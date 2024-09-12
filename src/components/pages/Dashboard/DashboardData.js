"use client";
import useCompanyUser from "@/app/hooks/useCompanyUser";
import "./DashboardData.css";
import DashboardStatusCard from "./DashboardStatusCard";
import useUser from "@/app/hooks/useUser";
import ProjectChart from "./ProjectChart";

const DashboardData = () => {
  const { user } = useUser();
  const { companyUser } = useCompanyUser();

  return (
    <>
      <div className="dashboard_title_area ms-3">
        <h3>
          {user?.data
            ? user?.data?.name
            : companyUser?.data
            ? `${companyUser?.data?.companyOwnerName} (${companyUser?.data?.companyName}) `
            : ""}
        </h3>
      </div>

      <div className="dashboard-data">
        <div>
          <DashboardStatusCard />
        </div>
      </div>

      <div className="dashboard-data">
        <div>{/* <Return /> */}</div>
      </div>

      <div className="dashboard-data">
        <div>{/* <Withdrawtable /> */}</div>
      </div>

      {/* Add the graph component here */}
      <div className="dashboard-data">
        <div style={{ width: "100%", height: "400px" }}>
          {" "}
          {/* Ensure chart container size */}
          <ProjectChart />
        </div>
      </div>
    </>
  );
};

export default DashboardData;
