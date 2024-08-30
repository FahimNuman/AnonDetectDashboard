"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import useUser from "@/app/hooks/useUser";

import { CgProfile } from "react-icons/cg";
import Image from "next/image";
import { Dropdown } from "react-bootstrap";
import useCompanyUser from "@/app/hooks/useCompanyUser";
const DashboardHeader = () => {
  const router = useRouter();
  const { user } = useUser();
  const { companyUser } = useCompanyUser();
  const logOut = () => {
    localStorage.removeItem("token");
    router.push("/");
    // window.location.reload();
  };
  return (
    <>
      <header className="header-nav nav-homepage-style light-header position-fixed menu-home4 main-menu">
        <nav className="posr">
          <div className="container-fluid pr30 pr15-xs pl30 posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-6 col-lg-auto">
                <div className="text-center text-lg-start d-flex align-items-center">
                  <div className="dashboard_header_logo position-relative me-2 me-xl-5">
                    <Link className="logo" href="/">
                      <Image
                        width={138}
                        height={44}
                        src="https://anondetect.netlify.app/hero/hero-logo.svg"
                        alt="Header Logo"
                      />
                    </Link>
                  </div>
                  {/* End Logo */}
                </div>
              </div>

              <div className="col-6 col-lg-auto">
                <Dropdown>
                  <Dropdown.Toggle variant="#fff" id="dropdown-basic">
                    <CgProfile
                      style={{
                        width: "30px",
                        height: "30px",
                      }}
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      {user?.data
                        ? user?.data?.name
                        : companyUser?.data
                        ? companyUser?.data?.companyName
                        : ""}
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link href="/edit-profile">Edit Profile</Link>
                    </Dropdown.Item>
                    <Dropdown.Item></Dropdown.Item>
                    <Dropdown.Item onClick={logOut}>Log out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* DesktopSidebarMenu */}
      {/* <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="SidebarPanel"
        aria-labelledby="SidebarPanelLabel"
      >
        <SidebarPanel />
      </div> */}
      {/* Sidebar Panel End */}
    </>
  );
};

export default DashboardHeader;
