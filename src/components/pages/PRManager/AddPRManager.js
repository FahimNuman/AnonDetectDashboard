"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

import { FaList, FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

import toast, { Toaster } from "react-hot-toast";
import useCompanyUser from "@/app/hooks/useCompanyUser";

const AddPRManager = ({ projects }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState("");

  const { companyUser } = useCompanyUser();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const userData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      phone: formData.get("phone"),
      companyId: companyUser?.data?._id,
      // projectId: formData.get("projectId"),
      address: formData.get("address"),
      role: formData.get("role"),
      gender: gender,
    };

    try {
      await axios.post(
        "https://anon-hctxlnvkx-fahimnumans-projects.vercel.app/api/v1/admin-users/create-admin-user",
        userData
      );
      toast.success("Account Created");
      e.target.reset();
    } catch (err) {
      // console.log(err);
      return toast.error(err?.response?.data?.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="title fz17 mb30 bg-orange">New User Form</h4>
            <a
              href="http://localhost:3000/admin-users"
              className="btn btn-outline-secondary"
            >
              <FaList className="me-1" />
              User List
            </a>
          </div>
          <div className="form-style1">
            <div className="row">
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw600 mb10">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add User Name"
                    name="name"
                    required
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    name="email"
                    required
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Enter Password"
                      name="password"
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mobile Number"
                    name="phone"
                    required
                  />
                </div>
              </div>

              {/* <div className="col-sm-6">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Project Name
                  </label>
                  <select className="form-select" name="projectId" required>
                    {projects?.data.map((project) => (
                      <option key={project?._id} value={project?._id}>
                        {project?.projectTitle}
                      </option>
                    ))}
                  </select>
                </div>
              </div> */}

              <div className="col-sm-6">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Role
                  </label>
                  <select className="form-select" name="role" required>
                    <option value="superAdmin">Super Admin</option>
                    <option value="admin">Admin</option>
                    {/* <option value="manager">Manager</option> */}
                    <option value="PR Manager">PR Manager</option>
                  </select>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Gender
                  </label>
                  <select
                    className="form-select"
                    name="gender"
                    value={gender}
                    required
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User Address"
                    name="address"
                    required
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end p-2">
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#00c194",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    marginTop: "-20px",
                    zIndex: 10,
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  Create New Account
                </button>
              </div>
            </div>
          </div>
        </div>
        <Toaster
          position="top-center"
          containerStyle={{ marginTop: "100px" }}
          reverseOrder={false}
        />
      </form>
    </>
  );
};

export default AddPRManager;
