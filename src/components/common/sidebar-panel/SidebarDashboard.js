"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineCategory, MdOutlinePayments } from "react-icons/md";
import {
  AiOutlineHome,
  AiOutlinePlusSquare,
  AiOutlineTeam,
  AiOutlineDollarCircle,
  AiOutlineLogout,
  AiOutlineWindows,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";

import "./Sidebar.css";
import useCompanyUser from "@/app/hooks/useCompanyUser";
import useUser from "@/app/hooks/useUser";

const SidebarDashboard = () => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);
  const { companyUser } = useCompanyUser();
  const { user } = useUser();

  const iconStyle = { width: "24px", height: "24px" };

  const handleToggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div className="dashboard__sidebar">
      <div className="dashboard_sidebar_list">
        {/* Dashboard */}
        <div className="sidebar_list_item">
          <Link
            href="/dashboard"
            className={`sidebar_link ${
              pathname === "/dashboard" ? "active" : ""
            }`}
          >
            <span className="icon">
              <AiOutlineHome style={iconStyle} />
            </span>
            <span className="text ps-2">Dashboard</span>
          </Link>
        </div>

        {/* Investment*/}
        {/* <div className="sidebar_list_item">
          <Link
            href="/investment"
            className={`sidebar_link ${
              pathname === "/investment" ? "active" : ""
            }`}
          >
            <span className="icon">
              <FaPeopleGroup style={iconStyle} />
            </span>
            <span className="text ps-2">Investment</span>
          </Link>
        </div>  */}
        {/* health */}
        <div className="sidebar_list_item">
          <Link
            href="/categories-list"
            className={`sidebar_link ${
              pathname === "/categories-list" ? "active" : ""
            }`}
          >
            <span className="icon">
              <MdOutlineCategory style={iconStyle} />
            </span>
            <span className="text ps-2">Blog Categories</span>
          </Link>
        </div>

        <div className="sidebar_list_item">
          <div className="sidebar_link" onClick={() => handleToggleDropdown(0)}>
            <span className="icon">
              <AiOutlinePlusSquare style={iconStyle} />
            </span>
            <span className="text ps-2">Blog</span>
            <span className="dropdown_icon">
              {openDropdown === 0 ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </div>
          {openDropdown === 0 && (
            <div className="sidebar_dropdown">
              <Link
                href="/project-add"
                className={`dropdown-item ${
                  pathname === "/project-add" ? "active" : ""
                }`}
              >
                Add New Blog
              </Link>
              <Link
                href="/project-list"
                className={`dropdown-item ${
                  pathname === "/project-list" ? "active" : ""
                }`}
              >
               Blog List
              </Link>
            </div>
          )}
        </div>

        {/* // Income */}
        {/* <div className="sidebar_list_item">
          <div className="sidebar_link" onClick={() => handleToggleDropdown(1)}>
            <span className="icon">
              <AiOutlineDollarCircle style={iconStyle} />
            </span>
            <span className="text ps-2">Income</span>
            <span className="dropdown_icon">
              {openDropdown === 1 ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </div>
          {openDropdown === 1 && (
            <div className="sidebar_dropdown">
              <Link
                href="/profit-submit"
                className={`dropdown-item ${
                  pathname === "/profit-submit" ? "active" : ""
                }`}
              >
                Income Submit
              </Link>

              {user?.data?.role === "PR Manager" ? (
                ""
              ) : (
                <Link
                  href="/return-history"
                  className={`dropdown-item ${
                    pathname === "/return-history" ? "active" : ""
                  }`}
                >
                  Income History
                </Link>
              )}
            </div>
          )}
        </div> */}

        {/* Withdraw
         <div className="sidebar_list_item">
          <Link
            href="/profit-counts"
            className={`sidebar_link ${
              pathname === "/profit-counts" ? "active" : ""
            }`}
          >
            <span className="icon">
              <MdOutlinePayments style={iconStyle} />
            </span>
            <span className="text ps-2">Withdraw</span>
          </Link>
        </div>  */}

        {/* Admin Users */}
        <div className="sidebar_list_item">
          <Link
            href="/admin-users"
            className={`sidebar_link ${
              pathname === "/admin-users" ? "active" : ""
            }`}
          >
            <span className="icon">
              <AiOutlineTeam style={iconStyle} />
            </span>
            <span className="text ps-2">Admin Users</span>
          </Link>
        </div>

        {/* Categories */}
        {/* <div className="sidebar_list_item">
          <Link
            href="/health-post"
            className={`sidebar_link ${
              pathname === "/health-post" ? "active" : ""
            }`}
          >
            <span className="icon">
              <MdOutlineCategory style={iconStyle} />
            </span>
            <span className="text ps-2">Healths</span>
          </Link>
        </div> */}

        {/* Company (conditionally rendered) 
         {!(
          companyUser?.data?.role === "company" ||
          user?.data?.role === "PR Manager"
        ) && (
          <div className="sidebar_list_item">
            <div
              className="sidebar_link"
              onClick={() => handleToggleDropdown(2)}
            >
              <span className="icon">
                <AiOutlineWindows style={iconStyle} />
              </span>
              <span className="text ps-2">Company</span>
              <span className="dropdown_icon">
                {openDropdown === 2 ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </div>
            {openDropdown === 2 && (
              <div className="sidebar_dropdown">
                <Link
                  href="/company-list"
                  className={`dropdown-item ${
                    pathname === "/company-list" ? "active" : ""
                  }`}
                >
                  Company List
                </Link>
              </div>
            )}
          </div>
        )} */}

        {/* Logout */}
        <div className="sidebar_list_item">
          <Link
            href="/login"
            className={`sidebar_link ${pathname === "/login" ? "active" : ""}`}
          >
            <span className="icon">
              <AiOutlineLogout style={iconStyle} />
            </span>
            <span className="text ps-2">Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarDashboard;
