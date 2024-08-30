"use client";

import { AuthContext } from "@/app/contexts/UserProvider";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./login.css";

const SignInForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const { loginUser, user } = useContext(AuthContext);

  // Function to handle form submission
  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      await loginUser(email, password, "admin-users"); // Call loginUser function from context

      // Redirect to admin dashboard if user role is admin
      if (user?.role === "admin") {
        router.push("/dashboard");
      }
    } catch (error) {
      // Handle specific error cases
      if (
        error.response &&
        error.response.data &&
        error.response.data.message === "User not found"
      ) {
        router.push("/"); // Redirect to homepage if user not found
      } else {
        setLoginError("Invalid email or password"); // Display generic login error
      }
    }
  };

  // State to manage password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="form-style1" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb25">
        <p className="form-label fw600 dark-color text-start">Email</p>
        <input
          type="email"
          className="form-control"
          placeholder="Enter Email"
          {...register("email", {
            required: true,
          })}
          required
        />
      </div>

      <div className="mb15">
        <p className="form-label fw600 dark-color text-start">Password</p>
        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"} // Toggle password visibility based on state
            className="form-control"
            placeholder="Enter Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be 6 characters long",
              },
              pattern: {
                value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                message:
                  "Password must have uppercase, number and special characters",
              },
            })}
            required
          />
          <span className="password-toggle-icon" onClick={toggleShowPassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}
      </div>

      <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb10">
        <label className="custom_checkbox fz14 ff-heading">
          Remember me
          <input type="checkbox" defaultChecked="checked" />
          <span className="checkmark" />
        </label>
      </div>

      {loginError && <p className="text-danger">{loginError}</p>}

      <div className="d-grid mb20">
        <button
          className="ud-btn btn-thm"
          type="submit"
          style={{ backgroundColor: "#00C194" }}
        >
          LogIn <i className="fal fa-arrow-right-long" />
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
