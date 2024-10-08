import Footer from '@/components/common/footer/Footer';
import MobileMenu from '@/components/common/mobile-menu';
import DashboardHeader from '@/components/common/navigationBar/DashboardHeader';
import SidebarDashboard from '@/components/common/sidebar-panel/SidebarDashboard';
import UserProfileEdit from '@/components/pages/EditUserProfile/UserProfileEdit';


import React from 'react';

const EditUserProfile = () => {
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
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="ps-widget bgc-white bdrs12 default-box-shadow2 pt30 mb30 overflow-hidden position-relative">
                                        <div className="navtab-style1">
                                          <UserProfileEdit/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End .row */}
                        </div>
                        {/* End dashboard__content */}

                        <Footer />
                    </div>
                    {/* End .dashboard__main */}
                </div>
            </div>
            {/* dashboard_content_wrapper */}
        </>
    );
};

export default EditUserProfile;
