import DashboardHeader from "@/components/common/navigationBar/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import SidebarDashboard from "@/components/common/sidebar-panel/SidebarDashboard";
import Footer from "@/components/common/footer/Footer";
import CompanyList from "@/components/pages/Company/CompanyList";
import { getAllCompanies } from "@/dataFetching/company";

export const metadata = {
  title: "Dashboard Properties || Homez - Real Estate NextJS Template",
};

const Company = async () => {
  const data = await getAllCompanies();
  return (
    <>
      <DashboardHeader />
      <MobileMenu />

      <div className="dashboard_content_wrapper">
        <div className="dashboard dashboard_wrapper pr30 pr0-xl">
          <SidebarDashboard />

          <div className="dashboard__main pl0-md">
            <div className="dashboard__content bgc-f7">
              {/* End .row */}

              <div className="row align-items-center pb40">
                <div className="col-xxl-3">
                  <div className="dashboard_title_area">
                    <h3>Company LIst</h3>
                  </div>
                </div>
                <div className="col-xxl-9">
                  {/* <FilterHeaderPRManager /> */}
                </div>
              </div>

              <div className="row">
                <div className="col-xl-12">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 pt30 mb30 overflow-hidden position-relative">
                    <div className="navtab-style1">
                      <CompanyList data={data} />
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

export default Company;
