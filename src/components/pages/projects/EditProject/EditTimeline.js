import React from "react";

const EditTimeline = ({
  timeLines,
  setTimelines,
  handleTimeLine,
  handleRemoveTimeLine,
}) => {
  return (
    <>
      {timeLines.map((option, index) => (
        <div className="row" key={index}>
          <div className="col-sm-6 col-xl-6">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Select Date"
                value={option.date}
                onChange={(e) => {
                  const updatedOptions = [...timeLines];
                  updatedOptions[index].date = e.target.value;
                  setTimelines(updatedOptions);
                }}
              />
            </div>
          </div>
          <div className="col-sm-6 col-xl-6">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Timeline Title"
                value={option.title}
                onChange={(e) => {
                  const updatedOptions = [...timeLines];
                  updatedOptions[index].title = e.target.value;
                  setTimelines(updatedOptions);
                }}
              />
            </div>
          </div>
          <div className="col-sm-6 col-xl-12">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                Details
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Timeline Details "
                value={option.details}
                onChange={(e) => {
                  const updatedOptions = [...timeLines];
                  updatedOptions[index].details = e.target.value;
                  setTimelines(updatedOptions);
                }}
              />
            </div>
          </div>
        </div>
      ))}
      <div className=" form_sub_stream d-flex  gap-3" style={{ marginTop: 10 }}>
        <p
          onClick={handleTimeLine}
          style={{
            backgroundColor: "#006666",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Add New Date
        </p>

        <p
          onClick={() => handleRemoveTimeLine()}
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Delete
        </p>
      </div>
    </>
  );
};

export default EditTimeline;
