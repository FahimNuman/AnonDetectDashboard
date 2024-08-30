"use client";
import useCompanyUser from "@/app/hooks/useCompanyUser";
import Return from "../ReturnAmount/Return";
import Withdrawtable from "../WithdrawRequest/Withdrawtable";
import "./DashboardData.css";
import DashboardStatusCard from "./DashboardStatusCard";
import useUser from "@/app/hooks/useUser";

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

        </div>
      </div>
      <div className="dashboard-data">
        <div>
          <Return />
        </div>
      </div>
      <div className="dashboard-data">
        <div>
          
        </div>
      </div>
    </>
  );
};

export default DashboardData;
