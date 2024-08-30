"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const AddProjectType = () => {
  const MySwal = withReactContent(Swal);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectTypeName = e.target.name.value;

    const projectType = {
      name: projectTypeName,
    };

    try {
      await axios.post(
        "http://localhost:5000/api/v1/category",
        projectType
      );
      MySwal.fire("Project Type Added");
      e.target.reset();
    } catch (err) {
      MySwal.fire("Something Error Found.", "warning");
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className=" p30">
          <h4 className="title fz17 mb30">Project Type</h4>
          <div className="form-style1">
            <div className="row">
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw600 mb10">
                    Project Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Project Type Name"
                    name="name"
                    required
                  />
                </div>
              </div>

              <div className="d-flex p-2">
                <button
                  type="submit"
                  className="ud-btn "
                  style={{
                    backgroundColor: "#006666",
                    color: "white",
                    border: "none",
                  }}
                >
                  Add Project Type
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddProjectType;
