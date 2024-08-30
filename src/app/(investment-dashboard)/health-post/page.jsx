import DashboardHeader from "@/components/common/navigationBar/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import SidebarDashboard from "@/components/common/sidebar-panel/SidebarDashboard";
import Footer from "@/components/common/footer/Footer";
import { getHealths } from "@/dataFetching/health";
import AddHealthPost from "@/components/pages/Health/AddHealthPost";

export const metadata = {
  title: "Dashboard Properties || Homez - Real Estate NextJS Template",
};

const AddHealth = async () => {
  const data = await getHealths();
  return (
    <>
      {/* Main Header Nav */}
      <DashboardHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* dashboard_content_wrapper */}
      <div className="dashboard_content_wrapper">
        <div className="dashboard dashboard_wrapper pr30 pr0-xl">
          <SidebarDashboard />
          {/* End .dashboard__sidebar */}

          <div className="dashboard__main pl0-md">
            <div className="dashboard__content bgc-f7">
              {/* End .row */}

              <div className="row align-items-center pb40">
                <div className="col-xxl-3">
                  <div className="dashboard_title_area">
                    <h3>Health Post List</h3>
                  </div>
                </div>
                <div className="col-xxl-9">
                  {/* <FilterHeaderPRManager /> */}
                </div>
              </div>
              {/* End .row */}
              <div className="row">
                <div className="col-xl-12">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 pt30 mb30 overflow-hidden position-relative">
                    <div className="navtab-style1">
                      <AddHealthPost data={data} />
                    </div>
                  </div>
                </div>
              </div>

              {/* End .row */}
            </div>
            {/* End .dashboard__content */}

            <Footer />
          </div>
          {/* End .dashboard__main */}
        </div>
      </div>
      {/* dashboard_content_wrapper */}
    </>
  );
};

export default AddHealth;
