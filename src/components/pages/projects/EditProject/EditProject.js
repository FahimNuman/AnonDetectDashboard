"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import "./ProjectStyles.css";
import EditProjectInfo from "./EditProjectInfo";
import EditFinancials from "./EditFinancials";
import EditUploadMedia from "./UploadMedia";
import EditTimeline from "./EditTimeline";

const EditProject = ({ data }) => {
  console.log(data);
  const tabs = [
    "1. Basic Info",
    "2. Financials",
    "3. Documents",
    "4. Market",
    "5. Timeline",
  ];

  const [projectType, setProjectType] = useState("");
  // Documents
  const [files, setFiles] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [timeLines, setTimelines] = useState([]);
  const [driveLinks, setDriveLinks] = useState([]);

  // Financials
  const [projectValue, setProjectValue] = useState(null);

  // Notary Fee
  const [notaryFee, setNotaryFee] = useState(0);
  const [displayNotaryFee, setDisplayNotaryFee] = useState("");

  // Sharikana Fee
  const [SharikanaFee, setSharikanaFee] = useState(0);
  const [displaySharikanaFee, setDisplaySharikanaFee] = useState("");

  // Per Share Value
  const [perShareValue, setPerShareValue] = useState(0);
  const [perShareValueDisplay, setPerShareValueDisplay] = useState("");
  const [totalShared, setTotalShared] = useState(0);
  // Asset Value
  const [assetValue, setAssetValue] = useState(0);
  const [displayAssetValue, setDisplayAssetValue] = useState("");

  // Handle Asset Value show Display
  const handleAssetValue = (e) => {
    let inputValue = e.target.value.replace(/,/g, "");
    if (inputValue === "" || isNaN(Number(inputValue))) {
      setAssetValue(0);
      setDisplayAssetValue("");
    } else {
      const numericValue = Number(inputValue);
      setAssetValue(numericValue);
      setDisplayAssetValue(numericValue.toLocaleString());
    }
  };

  // Handle Notary Fee Value show Display
  const handleNotaryFeeValue = (e) => {
    let inputValue = e.target.value;

    if (inputValue === "" || isNaN(Number(inputValue))) {
      setNotaryFee("");
      setDisplayNotaryFee("");
    } else {
      let numericValue = Number(inputValue);
      setNotaryFee(numericValue);
      setDisplayNotaryFee(`${numericValue}`);
    }
  };

  // Handle Sharikana Fee Value show Display
  const handleSharikanaFee = (e) => {
    let inputValue = e.target.value;
    if (inputValue === "" || isNaN(Number(inputValue))) {
      setSharikanaFee("");
      setDisplaySharikanaFee("");
    } else {
      let numericValue = Number(inputValue);
      setSharikanaFee(numericValue);
      setDisplaySharikanaFee(`${numericValue}`);
    }
  };
  // Handle Asset Value show Display
  const handlePerSharedValue = (e) => {
    let inputValue = e.target.value.replace(/,/g, "");
    if (inputValue === "" || isNaN(Number(inputValue))) {
      setPerShareValue(0);
      setPerShareValueDisplay("");
    } else {
      const numericValue = Number(inputValue);
      setPerShareValue(numericValue);
      setPerShareValueDisplay(numericValue.toLocaleString());
    }
  };

  // Collect Project Value
  useEffect(() => {
    const calculatedNotaryFee = parseFloat(assetValue * notaryFee) / 100;
    const calculatedSharikanaFee = parseFloat(assetValue * SharikanaFee) / 100;

    const newProjectValue =
      Number(assetValue) + calculatedNotaryFee + calculatedSharikanaFee;

    setProjectValue(newProjectValue);
  }, [assetValue, notaryFee, SharikanaFee]);

  // Collect Total Shared Value
  useEffect(() => {
    const totalSharedCount = projectValue / perShareValue;

    setTotalShared(totalSharedCount);
  }, [perShareValue, projectValue]);

  // Handle Time Line & Google Drive Link
  useEffect(() => {
    setTimelines([
      {
        date: "",
        title: "",
        details: "",
      },
    ]);
    setDriveLinks([
      {
        googleDriveLink: "",
      },
    ]);
  }, []);

  const handleTimeLine = () => {
    setTimelines([
      ...timeLines,
      {
        date: "",
        title: "",
        details: "",
      },
    ]);
  };

  const handleDriveLink = () => {
    setDriveLinks([
      ...driveLinks,
      {
        googleDriveLink: "",
      },
    ]);
  };

  // handle Remove Time line
  const handleRemoveTimeLine = () => {
    if (timeLines.length === 1) {
      toast.error("You must select at least one Timeline");
      return;
    }
    const updatedOptions = timeLines.slice(0, -1);
    setTimelines(updatedOptions);
  };

  // Handle Remove Drive links
  const handleRemoveDriveLink = () => {
    if (driveLinks.length === 1) {
      toast.error("You must select at least one Drive Link");
      return;
    }
    const updatedOptions = driveLinks.slice(0, -1);
    setDriveLinks(updatedOptions);
  };

  // Handle Tab Content
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleNextClick = () => {
    setActiveTab((prevTab) => (prevTab + 1) % tabs.length);
  };

  const handleNewProject = async (e) => {
    e.preventDefault();

    if (projectType === "") {
      return toast.error("Please Select Project Type");
    }
    const selectedTimeLines = timeLines?.filter(
      (option) => option.date && option.title && option.details
    );
    const selectedDriveLinks = driveLinks?.filter(
      (option) => option.googleDriveLink
    );

    const ProjectData = {
      projectTitle: e.target.projectTitle.value,
      projectAddress: e.target.projectAddress.value,
      aboutMarket: e.target.aboutMarket.value,
      aboutCity: e.target.aboutCity.value,
      projectType: projectType,
      aboutProperty: e.target.aboutProperty.value,
      managementInfo: e.target.managementInfo.value,
      exitStrategy: e.target.exitStrategy.value,
      googleMapLink: e.target.googleMapLink.value,
      totalProjectValue: projectValue,
      projectAssetValue: assetValue,
      minimumShareValue: e.target.minimumShareValue.value,
      perShareValue: perShareValue,
      totalShareValue: totalShared,
      availableTotalShare: totalShared,
      notaryFee: e.target.notaryFee.value,
      SharikanaFee: e.target.SharikanaFee.value,
      yearlyReturnValue: e.target.yearlyReturnValue.value,
      halfYearlyReturnValue: e.target.halfYearlyReturnValue.value,
      monthlyReturnValue: e.target.monthlyReturnValue.value,
      projectAnnualCapitalAppreciation:
        e.target.projectAnnualCapitalAppreciation.value,
      timelines: selectedTimeLines.map((option) => JSON.stringify(option)),
      googleDriveLinks: selectedDriveLinks.map((option) =>
        JSON.stringify(option)
      ),
    };

    // if (ProjectData.projectType === "Select Project Type") {
    //   return toast.warn("please Select Project Type");
    // }

    const formData = new FormData();

    for (const key in ProjectData) {
      formData.append(key, ProjectData[key]);
    }

    try {
      const imageUrls = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "rtemis");

          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dzakjyd9w/image/upload",
            data
          );

          return uploadRes.data.secure_url;
        })
      );

      // Append image URLs to formData
      imageUrls.forEach((url) => formData.append("projectPicture", url));

      // Submit the form data
      const data = await axios.post(
        "http://localhost:5000/api/v1/project",
        formData
      );

      if (data.status === 400) {
        return toast.error(data.data.error);
      }

      toast.success(data.data.message);
    } catch (error) {
      // console.log(error);
      return toast.error("some error found");
    }

    // e.target.reset();
  };

  return (
    <>
      <nav>
        <div className="nav nav-tabs pt30" id="nav-tab2" role="tablist">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`nav-link fw600 ${
                activeTab === index ? "active" : ""
              } ${index > 0 ? "ms-3" : ""}`}
              id={`nav-item${index + 1}-tab`}
              data-bs-toggle="tab"
              data-bs-target={`#nav-item${index + 1}`}
              type="button"
              role="tab"
              aria-controls={`nav-item${index + 1}`}
              aria-selected={activeTab === index}
              onClick={() => handleTabClick(index)}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* End nav tabs */}
      <form onSubmit={handleNewProject} className="form_data">
        <div className="tab-content" id="nav-tabContent">
          <div
            className={`tab-pane fade ${activeTab === 0 ? "show active" : ""}`}
            id="nav-item1"
            role="tabpanel"
            aria-labelledby="nav-item1-tab"
          >
            <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
              <h4 className="title fz17 mb30">Edit Project Description</h4>
              <EditProjectInfo
                data={data}
                setProjectType={setProjectType}
                projectType={projectType}
              />
              <div
                className="d-flex justify-content-end"
                onClick={handleNextClick}
              >
                <p
                  style={{
                    backgroundColor: "#006666",
                    color: "white",
                    padding: "10px 20px",
                    marginRight: "30px",
                    borderRadius: "5px",
                    marginTop: "-20px",
                    zIndex: 10,
                    cursor: "pointer",
                  }}
                >
                  Next
                </p>
              </div>
            </div>
          </div>
          <div
            className={`tab-pane fade ${activeTab === 1 ? "show active" : ""}`}
            id="nav-item2"
            role="tabpanel"
            aria-labelledby="nav-item2-tab"
          >
            <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
              <EditFinancials
                projectValue={projectValue}
                setAssetValue={setAssetValue}
                setNotaryFee={setNotaryFee}
                handleSharikanaFee={handleSharikanaFee}
                displaySharikanaFee={displaySharikanaFee}
                setPerShareValue={setPerShareValue}
                totalShared={totalShared}
                handleAssetValue={handleAssetValue}
                displayAssetValue={displayAssetValue}
                handleNotaryFeeValue={handleNotaryFeeValue}
                displayNotaryFee={displayNotaryFee}
                handlePerSharedValue={handlePerSharedValue}
                perShareValueDisplay={perShareValueDisplay}
              />
            </div>
            <div
              className="d-flex justify-content-end"
              onClick={handleNextClick}
            >
              <p
                style={{
                  backgroundColor: "#006666",
                  color: "white",
                  padding: "9px 18px",
                  marginRight: "31px",
                  borderRadius: "5px",
                  marginTop: "-41px",
                  zIndex: 10,
                  cursor: "pointer",
                }}
              >
                Next
              </p>
            </div>
          </div>
          <div
            className={`tab-pane fade ${activeTab === 2 ? "show active" : ""}`}
            id="nav-item3"
            role="tabpanel"
            aria-labelledby="nav-item3-tab"
          >
            <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
              <h4 className="title fz17 mb30">Edit Documents</h4>
              <EditUploadMedia
                driveLinks={driveLinks}
                setDriveLinks={setDriveLinks}
                handleDriveLink={handleDriveLink}
                handleRemoveDriveLink={handleRemoveDriveLink}
                setFiles={setFiles}
              />
              <div
                className="d-flex justify-content-end"
                onClick={handleNextClick}
              >
                <p
                  style={{
                    backgroundColor: "#006666",
                    color: "white",
                    padding: "10px 20px",
                    marginRight: "30px",
                    borderRadius: "5px",

                    zIndex: 10,
                    cursor: "pointer",
                  }}
                >
                  Next
                </p>
              </div>
            </div>
          </div>
          <div
            className={`tab-pane fade ${activeTab === 3 ? "show active" : ""}`}
            id="nav-item4"
            role="tabpanel"
            aria-labelledby="nav-item4-tab"
          >
            <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
              <h4 className="title fz17 mb30">Edit Market</h4>
              <div className="form-style1">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw600 mb10">
                        About Market
                      </label>
                      <textarea
                        cols={2}
                        rows={3}
                        placeholder="About Market."
                        defaultValue={""}
                        name="aboutMarket"
                      />
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw600 mb10">
                        About this city
                      </label>
                      <textarea
                        cols={2}
                        rows={3}
                        placeholder=" About this city"
                        name="aboutCity"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="d-flex justify-content-end"
              onClick={handleNextClick}
            >
              <p
                style={{
                  backgroundColor: "#006666",
                  color: "white",
                  padding: "10px 20px",
                  marginRight: "30px",
                  borderRadius: "5px",
                  marginTop: "-20px",
                  zIndex: 10,
                  cursor: "pointer",
                }}
              >
                Next
              </p>
            </div>
          </div>
          <div
            className={`tab-pane fade ${activeTab === 4 ? "show active" : ""}`}
            id="nav-item5"
            role="tabpanel"
            aria-labelledby="nav-item5-tab"
          >
            <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
              <h4 className="title fz17 mb30">Timeline</h4>
              <div className="row">
                <EditTimeline
                  timeLines={timeLines}
                  setTimelines={setTimelines}
                  handleTimeLine={handleTimeLine}
                  handleRemoveTimeLine={handleRemoveTimeLine}
                />
              </div>
            </div>
            <div className="d-flex justify-content-end p-5">
              <button
                type="submit"
                className="ud-btn"
                style={{
                  width: 175,
                  backgroundColor: "#00C194",
                  color: "white",
                  border: "none",
                }}
              >
                Add Project
              </button>
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

export default EditProject;
