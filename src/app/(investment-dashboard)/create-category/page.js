import DashboardHeader from "@/components/common/navigationBar/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import Footer from "@/components/common/footer/Footer";

import AddProjectType from "@/components/pages/ProjectType/AddProjectType";

import SidebarDashboard from "@/components/common/sidebar-panel/SidebarDashboard";

export const metadata = {
  title: "Dashboard Add Property || Homez - Real Estate NextJS Template",
};

const CreateCategory = () => {
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
        <div className="dashboard dashboard_wrapper pr30 pr0-md">
          <SidebarDashboard />
          {/* End .dashboard__sidebar */}

          <div className="dashboard__main pl0-md">
            <div className="dashboard__content property-page bgc-f7">
              {/* End .row */}

              {/* End .row */}

              <div className="row">
                <div className="col-xl-12">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 pt30 mb30 overflow-hidden position-relative">
                    <div className="navtab-style1">
                      <AddProjectType />
                    </div>
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCategory;
