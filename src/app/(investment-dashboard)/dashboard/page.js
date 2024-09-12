import DashboardHeader from "@/components/common/navigationBar/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import Footer from "@/components/common/footer/Footer";
import SidebarDashboard from "@/components/common/sidebar-panel/SidebarDashboard";
import { getProjects } from "@/dataFetching/Project";
import DashboardData from "@/components/pages/Dashboard/DashboardData";

export const metadata = {
  title: "Dashboard Home - Real Estate NextJS Template",
};

const Dashboard = async () => {
  const data = await getProjects();

  return (
    <>
      {/* Main Header Nav */}
      <DashboardHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav */}
      <MobileMenu />
      {/* End Mobile Nav */}

      {/* dashboard_content_wrapper */}
      <div className="dashboard_content_wrapper">
        <div className="dashboard dashboard_wrapper pr30 pr0-md">
          <SidebarDashboard />
          {/* End .dashboard__sidebar */}

          <div className="dashboard__main pl0-md">
            <div className="dashboard__content property-page bgc-f7">
              {/* Summary Card */}

              <div className="row">
                <div className="col-xl-12">
                  <div className="ps-widget bgc-white bars12 default-box-shadow2 pt30 mb30 overflow-hidden position-relative">
                    <div className="nafta-style1">
                      <DashboardData />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
