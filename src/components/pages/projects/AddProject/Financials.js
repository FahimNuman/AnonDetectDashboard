import React from "react";

const Financials = ({
  perShareValueDisplay,
  projectValue,
  totalShared,
  handleAssetValue,
  displayAssetValue,
  handleNotaryFeeValue,
  displayNotaryFee,
  handleSharikanaFee,
  displaySharikanaFee,
  handlePerSharedValue,
}) => {
  return (
    <div className="form-style1 asset-Value">
      <div className="row">
        <h4 className="title fz17 mb40 mt30">Asset Value</h4>
        {/* End col-12 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Project Asset Value :
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Total Project Value"
              name="projectAssetValue"
              value={displayAssetValue}
              onChange={handleAssetValue}
            />
          </div>
        </div>

        {/* End col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div
            className="mb20"
            style={{
              position: "relative",
            }}
          >
            <label className="heading-color ff-heading fw600 mb10">
              Notary fee (%) :
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Notary fee %"
              name="notaryFee"
              value={displayNotaryFee}
              onChange={handleNotaryFeeValue}
            />
            {displayNotaryFee?.length >= 1 ? (
              <p
                style={{
                  position: "absolute",
                  top: "50px",
                  left:
                    displayNotaryFee?.length === 1
                      ? `${displayNotaryFee?.length + 25}px`
                      : displayNotaryFee?.length === 2
                      ? `${displayNotaryFee?.length + 30}px`
                      : displayNotaryFee?.length > 2
                      ? `${displayNotaryFee?.length + 40}px`
                      : "",
                }}
              >
                %
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-sm-6 col-xl-4">
          <div
            className="mb20"
            style={{
              position: "relative",
            }}
          >
            <label className="heading-color ff-heading fw600 mb10">
              Sharikana fee (%) :
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Sharikana Fee %"
              name="SharikanaFee"
              value={displaySharikanaFee}
              onChange={handleSharikanaFee}
            />

            {displaySharikanaFee?.length >= 1 ? (
              <p
                style={{
                  position: "absolute",
                  top: "50px",
                  left:
                    displaySharikanaFee?.length === 1
                      ? `${displaySharikanaFee?.length + 25}px`
                      : displaySharikanaFee?.length === 2
                      ? `${displaySharikanaFee?.length + 30}px`
                      : displaySharikanaFee?.length > 2
                      ? `${displaySharikanaFee?.length + 40}px`
                      : "",
                }}
              >
                %
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-sm-6 col-xl-6">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Total Project Value :
            </label>
            <p
              style={{
                width: "100%",
                border: "1px solid #dddddd",
                borderRadius: "5px",
                height: "50px",
                fontSize: "1rem",
                padding: "10px",
                backgroundColor: "#f0f0f0",
              }}
            >
              {projectValue?.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="col-sm-6 col-xl-6">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Per Share Value :
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Per Share Value"
              name="perShareValue"
              value={perShareValueDisplay}
              onChange={handlePerSharedValue}
            />
          </div>
        </div>
        <div className="col-sm-6 col-xl-6">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Minimum Share :
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Minimum Investment Share Value"
              name="minimumShareValue"
            />
          </div>
        </div>
        <div className="col-sm-6 col-xl-6">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Total Shared Count:
            </label>

            <p
              style={{
                width: "100%",
                border: "1px solid #dddddd",
                borderRadius: "5px",
                height: "50px",
                fontSize: "1rem",
                padding: "10px",
                backgroundColor: "#f0f0f0",
              }}
            >
              {Number.isFinite(totalShared) ? totalShared?.toLocaleString() : 0}
            </p>
          </div>
        </div>
      </div>
      <h4 className="title fz17 mb40 mt30">Return</h4>
      <div className="row">
        <div className="col-sm-6">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Annual Return Value:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Annual return Value"
              name="yearlyReturnValue"
            />
          </div>
        </div>

        <div className="col-sm-6">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Half Yearly Return Value:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Half Yearly Return Value"
              name="halfYearlyReturnValue"
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Monthly Return Value:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Half Yearly Return Value"
              name="monthlyReturnValue"
            />
          </div>
        </div>

        <div className="col-sm-6">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Project annual capital appreciation:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Project annual capital appreciation"
              name="projectAnnualCapitalAppreciation"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financials;
