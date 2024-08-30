const UploadMedia = ({
  handleRemoveDriveLink,
  handleDriveLink,
  setDriveLinks,
  driveLinks,
  setFiles,
}) => {
  return (
    <>
      <div className="row">
        {/* End col-12 */}

        {/* <SelectMulitField /> */}

        {/* <div className="col-sm-6 col-xl-6">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              PDF (Portable Document Format) :
            </label>
            <input
              type="file"
              className="form-control p-3"
              name="pdf"
              onChange={(e) => setProjectPdf(e.target.files)}
              multiple
            />
          </div>
        </div> */}
        <div className="col-sm-6 col-xl-6">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Project Picture :
            </label>
            <input
              type="file"
              className="form-control p-3"
              name="image"
              onChange={(e) => setFiles(e.target.files)}
              multiple
            />
          </div>
        </div>

        {driveLinks.map((option, index) => (
          <div className="col-sm-6 col-xl-6" key={index}>
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                Google Doc {index + 1}:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder={`Google Doc ${index + 1}`}
                value={option.googleDriveLink}
                onChange={(e) => {
                  const updatedOptions = [...driveLinks];
                  updatedOptions[index].googleDriveLink = e.target.value;
                  setDriveLinks(updatedOptions);
                }}
              />
            </div>
          </div>
        ))}

        {/* End col-4 */}
      </div>
      <div className=" form_sub_stream d-flex  gap-3" style={{ marginTop: 10 }}>
        <p
          onClick={handleDriveLink}
          style={{
            backgroundColor: "#006666",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Add New Filed
        </p>

        <p
          onClick={() => handleRemoveDriveLink()}
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

export default UploadMedia;
