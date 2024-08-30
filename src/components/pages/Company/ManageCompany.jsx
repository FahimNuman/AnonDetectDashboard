"use client";

import { Toaster, toast } from "react-hot-toast";
import { FaList } from "react-icons/fa";
import axios from "axios";

const ManageCompany = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const companyData = {
      companyName: formData.get("companyName"),
      companyOwnerName: formData.get("companyOwnerName"),
      companyOwnerPhoneNumber: formData.get("companyOwnerPhoneNumber"),
      companyAddress: formData.get("companyAddress"),
      companyOwnerEmail: formData.get("companyOwnerEmail"),
      designation: formData.get("designation"),
      tinNumber: formData.get("tinNumber"),
      tradeLicenceNumber: formData.get("tradeLicenceNumber"),
      binNumber: formData.get("binNumber"),
      bankName: formData.get("bankName"),
      accountHolderName: formData.get("accountHolderName"),
      accountNumber: formData.get("accountNumber"),

      password: formData.get("password"),
    };

    try {
      await axios.post(
        "http://localhost:5000/api/v1/company",
        companyData
      );
      toast.success("Company Created Successfully");
      e.target.reset();
    } catch (err) {
      toast.error("Failed to create company");
      console.log(err);
    }
  };

  return (
    <>
      <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative ">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="title fz17 mb30 bg-orange">
            New Company Registration Form
          </h4>
          <a
            href="http://localhost:3000/company"
            className="btn btn-outline-secondary"
          >
            <FaList className="me-1" />
            Company List
          </a>
        </div>
        <div className="form-style1">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw600 mb10">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Company Name"
                    name="companyName"
                    required
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw600 mb10">
                    Company owner name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Company Owner Name"
                    name="companyOwnerName"
                    required
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Owner Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Company Phone Number"
                    name="companyOwnerPhoneNumber"
                    required
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Business Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Company Company Address"
                    name="businessAddress"
                    required
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Owner Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Company Company Address"
                    name="companyOwnerEmail"
                    required
                  />
                </div>
              </div>
              {/* <div className="col-sm-6">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Designation
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="designation"
                    name="designation"
                    required
                  />
                </div>
              </div> */}
            </div>
            {/* Company Validation */}
            <h5>Company Validation</h5>

            <div className="row mt-4">
              <div className="col-sm-6">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Tin Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Company Company Address"
                    name="tinNumber"
                    required
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Trade Licence Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Company Company Address"
                    name="tradeLicenceNumber"
                    required
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Bin Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Company Company Address"
                    name="binNumber"
                    required
                  />
                </div>
              </div>
            </div>
            {/* Bank Details */}
            <h5>Bank Details</h5>
            <div className="row mt-4">
              <div className="col-sm-6">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Bank Name"
                    name="bankName"
                    required
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Account Holder Name"
                    name="accountHolderName"
                    required
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Account Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Account Number"
                    name="accountNumber"
                    required
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Account Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Account Type"
                    name="accountType"
                    required
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Password
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Company Company Address"
                    name="password"
                    required
                  />
                </div>
              </div>
            </div>
            {/* Attachment */}
            <h5>Attachment</h5>
            <div className="row mt-4">
              <div className="col-sm-6">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Incorporation Certificate
                  </label>
                  <input type="file" className="form-control p-3" />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Trade License
                  </label>
                  <input type="file" className="form-control p-3" />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Bin Certificate
                  </label>
                  <input type="file" className="form-control p-3" />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Tin Certificate
                  </label>
                  <input type="file" className="form-control p-3" />
                </div>
              </div>

              <div className="d-flex justify-content-end p-2">
                <button
                  type="submit"
                  className="btn"
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#00c194",
                    color: "white",
                  }}
                >
                  Create New Company
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Toaster
        position="top-center"
        containerStyle={{ marginTop: "100px" }}
        reverseOrder={false}
      />
    </>
  );
};

export default ManageCompany;
