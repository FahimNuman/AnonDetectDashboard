"use client";
import CompanySignInForm from "@/components/common/login-signup-modal/CompanySingIn";
import SignInForm from "@/components/common/login-signup-modal/SignIn";
import { useState } from "react";

export default function MainRoot() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <section
      className="our-compare pt60 pb60"
      style={{
        backgroundImage:
          "url('https://anondetect.netlify.app/hero/hero-2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <div className="container">
        <div className="row" data-aos="fade-left" data-aos-delay="300">
          <div className="col-lg-6 offset-lg-3">
            <div className="log-reg-form signup-modal form-style1 bgc-white p50 p30-sm default-box-shadow2 bdrs12">
              <div className="text-center mb40">
                <div
                  className="tab-container"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <button
                    className={`tab ${activeTab === "login" ? "active" : ""}`}
                    onClick={() => setActiveTab("login")}
                    style={{
                      border: "1px solid #adb5bd",
                      backgroundColor:
                        activeTab === "login" ? "#00C194" : "transparent",
                      color: activeTab === "login" ? "white" : "black",
                      fontSize: "1rem",
                      borderRadius: "0 0 0 3px",
                      width: "250px",
                      height: "50px",
                    }}
                  >
                    Login
                  </button>

                  <button
                    className={`tab ${activeTab === "company" ? "active" : ""}`}
                    onClick={() => setActiveTab("company")}
                    style={{
                      border: "1px solid #adb5bd",
                      backgroundColor:
                        activeTab === "company" ? "#00C194" : "transparent",
                      color: activeTab === "company" ? "white" : "black",
                      fontSize: "1rem",
                      borderRadius: "0 0 3px 0",
                      width: "250px",
                      marginLeft: "-1px",
                      height: "50px",
                    }}
                  >
                    Company
                  </button>
                </div>
              </div>

              {activeTab === "login" && <SignInForm />}
              {activeTab === "company" && <CompanySignInForm />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
