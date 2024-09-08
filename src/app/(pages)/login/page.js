import SignIn from "@/components/common/login-signup-modal/SignIn";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Login  || Anon Detect dashboard",
};

const Login = () => {
  return (
    <>
      {/* Our Compare Area */}
      <section className="our-compare pt60 pb60">
        <Image
          width={1012}
          height={519}
          src="/images/home/hero-3.png"
          alt="logo"
          className="login-bg-icon contain"
          data-aos="fade-right"
          data-aos-delay="300"
        />
        <div className="container">
          <div className="row" data-aos="fade-left" data-aos-delay="300">
            <div className="col-lg-6">
              <div className="log-reg-form signup-modal form-style1 bgc-white p50 p30-sm default-box-shadow2 bdrs12">
                <div className="text-center mb40">
                  <Link href="/">
                    
                  </Link>
                  <h2>Sign in</h2>
                  <p className="text">
                    Sign in with this account across the following sites.
                  </p>
                </div>
                <SignIn />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
