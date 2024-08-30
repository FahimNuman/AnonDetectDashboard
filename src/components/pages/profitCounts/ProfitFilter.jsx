const ProfitFilter = ({
  projectId,
  setProjectId,
  data,
  setProfitShareType,
  profitShareType,
  setWithdrawRQ,
  withdrawRQ,
}) => {
  const returnTypes = ["Monthly", "Half Yearly", "Yearly"];

  return (
    <div className="d-flex gap-4 align-items-center mb-3">
      <div>
        <label
          htmlFor="project"
          className="fw-bold mb-2"
          style={{
            fontSize: "1rem",
          }}
        >
          Project wise
        </label>
        <br />
        <select
          value={projectId}
          id="project"
          // className="mb-5"
          style={{
            width: "200px",
          }}
          onChange={(e) => setProjectId(e.target.value)}
        >
          <option value="" disabled>
            Select a project
          </option>
          {data?.data.map((project) => (
            <option key={project?._id} value={project?._id}>
              {project?.projectTitle}
            </option>
          ))}
        </select>
      </div>
      {/* Return Type */}

      <div>
        <label
          htmlFor="project"
          className="fw-bold mb-2"
          style={{
            fontSize: "1rem",
          }}
        >
          Return type wise
        </label>
        <br />
        <select
          style={{
            width: "200px",
          }}
          onChange={(e) => setProfitShareType(e.target.value)}
          value={profitShareType}
        >
          <option value="" disabled>
            Select a return type
          </option>
          {returnTypes.map((type, index) => (
            <option key={index}>{type}</option>
          ))}
        </select>
      </div>
      {/* Paid Status */}

      <div>
        <label
          htmlFor="project"
          className="fw-bold mb-2"
          style={{
            fontSize: "1rem",
          }}
        >
          Withdraw RQ type
        </label>
        <br />
        <select
          style={{
            width: "200px",
          }}
          onChange={(e) => setWithdrawRQ(e.target.value)}
          value={withdrawRQ}
        >
          <option value="" disabled>
            Select a request type
          </option>

          <option value="Yes">Request</option>
          <option value="No">No Request</option>
        </select>
      </div>
    </div>
  );
};

export default ProfitFilter;
