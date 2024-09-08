import React from "react";

import "./login.css";
import SignInForm from "./SignIn";
import Image from "next/image";


const LoginPage = () => {
  return (
    <div className="custom-form-style">
      <div className="navtab-container">
        <div className="custom-tab-content" id="nav-tabContent">
          {/* Sign In Tab */}
          <Image 
                    src="/public/images/home/home-2.jpg" // Replace with the actual image URL
                    alt="Worker on site"
                    width={600} // Specify the width
                    height={400} // Specify the height
                    className="w-full h-auto object-cover rounded-md"
                />
          <div
            className="tab-pane fade show active custom-fz15"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
            <SignInForm />
          </div>

          {/* <div
            className="tab-pane fade custom-fz15"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
          >
            <CompanySignInForm />
          </div> */}
          {/* End company signin content */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
