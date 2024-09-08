/* eslint-disable @next/next/no-img-element */
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
        backgroundImage: "url('https://anondetect.netlify.app/hero/hero-2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <div className="container">
        <div className="row" data-aos="fade-left" data-aos-delay="300">
          <div
            className="col-lg-6"
            style={{
              maxWidth: "500px",
              marginLeft: "5%", // Moves the form to the left by 5% of the container's width
              marginTop: "10%", // Moves the form down by 10% of the container's height
            }}
          >
            <div
              className="log-reg-form signup-modal form-style1 bgc-white p50 p30-sm"
              style={{
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)", // Deep shadow effect
                borderRadius: "12px",
              }}
            >
              <div className="text-center mb40">
                <div
                  className="tab-container"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <button
                    className={`tab ${activeTab === "login" ? "active" : ""}`}
                    onClick={() => setActiveTab("login")}
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                      color: activeTab === "login" ? "white" : "#333",
                      fontSize: "1rem",
                      fontWeight: "600",
                      width: "250px",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0",
                      padding: "0",
                      cursor: "pointer",
                      transition: "background-color 0.3s, color 0.3s",
                    }}
                  >
                    <img
                      src="https://anondetect.netlify.app/hero/hero-logo.svg"
                      alt="Logo"
                      style={{ marginRight: "8px", height: "24px" }}
                    />
                    <span style={{ color: "red" }}>Login</span>
                  </button>

                  {/* Uncomment and adjust the Company tab if needed */}
                  {/* <button
                    className={`tab ${activeTab === "company" ? "active" : ""}`}
                    onClick={() => setActiveTab("company")}
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                      color: activeTab === "company" ? "white" : "#333",
                      fontSize: "1rem",
                      fontWeight: "600",
                      width: "250px",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: "-1px",
                      padding: "0",
                      cursor: "pointer",
                      transition: "background-color 0.3s, color 0.3s",
                    }}
                  >
                    Company
                  </button> */}
                </div>
              </div>

              {activeTab === "login" && <SignInForm />}
              {activeTab === "company" && <CompanySignInForm />}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 767px) {
          .col-lg-6 {
            margin-left: 0;
            margin-top: 5%;
          }

          .log-reg-form {
            padding: 20px;
          }

          .tab {
            font-size: 0.875rem; /* Smaller font size */
            width: 200px;
            height: 40px;
          }

          .tab img {
            height: 20px; /* Smaller logo image */
            margin-right: 6px;
          }

          .tab span {
            font-size: 0.875rem; /* Smaller text size */
          }
        }
      `}</style>
    </section>
  );
}
