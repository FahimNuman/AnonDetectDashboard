import React from "react";

const Filter = ({ projectId, setProjectId, data, setProfitShareType }) => {
  const returnTypes = ["Monthly", "Half Yearly", "Yearly"];

  return (
    <div className="d-flex gap-4 align-items-center mb-3">
      <div>
        <label
          htmlFor="project"
          className="fw-bold mb-3"
          style={{
            fontSize: "1rem",
          }}
        >
          Select a Project
        </label>
        <br />
        <select
          value={projectId}
          id="project"
          // className="mb-5"
          style={{
            width: "300px",
          }}
          onChange={(e) => setProjectId(e.target.value)}
        >
          <option value="" disabled>
            Select a Project
          </option>
          {data?.data.map((project) => (
            <option key={project?._id} value={project?._id}>
              {project?.projectTitle}
            </option>
          ))}
        </select>
      </div>

      <div
        className="d-flex gap-3"
        style={{
          marginTop: "35px",
        }}
      >
        {returnTypes.map((type, index) => (
          <div className="d-flex gap-3 radio-buttons" key={index}>
            <div
              style={{
                marginTop: "3px",
              }}
            >
              <input
                id={type}
                type="radio"
                value={type}
                defaultChecked={index === 0}
                name="return-type"
                onClick={() => setProfitShareType(type)}
              />
            </div>

            <div>
              <label htmlFor={type}>{type}</label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
