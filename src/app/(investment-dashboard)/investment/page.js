import AllInvestLists from "@/components/pages/Invest-page/AllInvestLists";
import DashboardHeader from "@/components/common/navigationBar/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import Footer from "@/components/common/footer/Footer";
import SidebarDashboard from "@/components/common/sidebar-panel/SidebarDashboard";
import { getProjects } from "@/dataFetching/Project";

export const metadata = {
  title: "Dashboard Home - Real Estate NextJS Template",
};

const InvestorPage = async () => {
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
              <div className="row align-items-center pb40">
                <div className="col-lg-12">
                  <div className="dashboard_title_area">
                    <h3>Investments</h3>
                  </div>
                </div>
              </div>
              {/* Summary Card */}

              <div className="row">
                <div className="col-xl-12">
                  <div className="ps-widget bgc-white bars12 default-box-shadow2 pt30 mb30 overflow-hidden position-relative">
                    <div className="nafta-style1">
                      <AllInvestLists data={data} />
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

export default InvestorPage;
