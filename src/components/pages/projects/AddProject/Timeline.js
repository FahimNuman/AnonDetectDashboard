import React from "react";

const Timeline = ({
  timeLines,
  setTimelines,
  handleTimeLine,
  handleRemoveTimeLine,
  setInvestmentStartDate,
  setInvestmentEndDate,
  setFirstReturnDate,
}) => {
  return (
    <>
      <div className="row">
        <div className="col-sm-6 col-xl-6">
          
        </div>
        <div className="col-sm-6 col-xl-6">
         
        </div>
        
      </div>
      
      <hr
        style={{
          fontWeight: "bold",
          border: "1px solid black",
        }}
      />
      {timeLines.map((option, index) => (
        <div className="row" key={index}>
          <div className="col-sm-6 col-xl-6">
           
          </div>
          <div className="col-sm-6 col-xl-6">
            
          </div>
          <div className="col-sm-6 col-xl-12">
           
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
      <div className="flex justify-end p-5">
        <button
          type="submit"
          className="rounded"
          style={{
            padding: "10px 20px",
            backgroundColor: "#00C194",
            color: "white",
            border: "none",
          }}
        >
          Add Project
        </button>
      </div>
    </>
  );
};

export default Timeline;
