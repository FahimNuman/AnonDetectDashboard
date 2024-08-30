"use client";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "./ProfileEdit.css";
import { Image } from "react-bootstrap";
import { FaCamera } from "react-icons/fa"; // Import the camera icon

const UserProfileEdit = () => {
  const [previewUrl, setPreviewUrl] = useState(null);
  console.log("hello");

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="container profile-edit">
      <h1>Edit Profile</h1>
      <hr />
      <div className="row">
        {/* Left column */}
        <div className="col-md-3 text-center">
          <div
            {...getRootProps({ className: "dropzone" })}
            style={{
              //border: '2px dashed #00c194',
              borderRadius: "10px",
              padding: "24px",
              cursor: "pointer",
              marginBottom: "20px",
              backgroundImage:
                "url(https://png.pngitem.com/pimgs/s/150-1503945_transparent-user-png-default-user-image-png-png.png)", // Your image URL
              backgroundSize: "contain", // Adjust for a smaller image
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "150px", // Adjust height as needed
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <input {...getInputProps()} style={{ display: "none" }} />

            {previewUrl ? (
              <Image
                src={previewUrl}
                className="avatar img-circle"
                alt="avatar"
                style={{ width: "140px", height: "140px" }}
              />
            ) : (
              <>
                <FaCamera style={{ fontSize: "40px", color: "#00c194" }} />
                <div
                  style={{
                    color: "#fff",
                    marginTop: "8px",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                ></div>
              </>
            )}
          </div>
        </div>

        {/* Edit form column */}
        <div className="col-md-9 personal-info">
          <h3>Personal Info</h3>

          <form className="form-horizontal" role="form">
            <div className="form-group">
              <label className="control-label">Username:</label>
              <input
                className="form-control"
                type="text"
                defaultValue="janeuser"
              />
            </div>
            <div className="form-group">
              <label className="control-label">Email:</label>
              <input
                className="form-control"
                type="email"
                defaultValue="janesemail@gmail.com"
              />
            </div>
            <div className="form-group">
              <label className="control-label">Mobile:</label>
              <input
                className="form-control"
                type="text"
                defaultValue="017XXXXXXXX"
              />
            </div>

            <div className="form-group button-group">
              <button type="button" className="btn btn-primary">
                Save Changes
              </button>
              <button type="reset" className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfileEdit;
