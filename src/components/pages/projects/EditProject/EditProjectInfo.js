"use client";

const EditProjectInfo = ({ data, setProjectType, projectType }) => {
  return (
    <div className="">
      <div className="row">
        <div className="col-sm-6">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Project Title
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Project Title"
              name="projectTitle"
            />
          </div>
        </div>
        <div className="col-sm-6 col-xl-6">
          <div className="">
            <label className="heading-color ff-heading fw600 mb10">
              Project Type
            </label>
            <br />

            <select
              className="project_type"
              value={projectType}
              style={{
                width: "100%",
                height: "50px",
                borderRadius: "5px",
                fontSize: "1rem",
                border: "none",
              }}
              onChange={(e) => setProjectType(e.target.value)}
            >
              <option value="" disabled>
                Select Project Type
              </option>
              {/* {data?.data.map((category) => (
                <option key={category?._id} value={category?._id}>
                  {category?.name}
                </option>
              ))} */}
            </select>
          </div>
        </div>
        {/* End .col-12 */}

        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              About Project
            </label>
            <textarea
              cols={2}
              rows={3}
              placeholder="About Project."
              defaultValue={""}
              name="aboutProperty"
            />
          </div>
        </div>
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Management
            </label>
            <textarea
              cols={2}
              rows={3}
              placeholder="Management."
              defaultValue={""}
              name="managementInfo"
            />
          </div>
        </div>
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Exit Strategy
            </label>
            <textarea
              cols={2}
              rows={3}
              placeholder="Exit Strategy."
              defaultValue={""}
              // exitStrategy
              name="exitStrategy"
            />
          </div>
        </div>

        <div className="col-sm-12 col-xl-12">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Project Address
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Project Address"
              name="projectAddress"
            />
          </div>
        </div>
        {/* End .col-6 */}
        <div className="col-sm-12 col-xl-12">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Location (Google Map Link)
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Location"
              name="googleMapLink"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProjectInfo;
