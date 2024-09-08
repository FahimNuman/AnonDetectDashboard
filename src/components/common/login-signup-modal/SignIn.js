/* eslint-disable @next/next/no-img-element */
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

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    const { email, password } = data;
    setIsLoading(true);

    try {
      await loginUser(email, password, "admin-users");

      if (user?.role === "admin") {
        router.push("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message === "User not found"
      ) {
        router.push("/");
      } else {
        setLoginError("Invalid email or password");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          50% { transform: translateX(10px); }
          75% { transform: translateX(-10px); }
          100% { transform: translateX(0); }
        }

        .animate {
          animation: shake 0.5s ease-in-out;
        }

        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top: 4px solid #000;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .spinner-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          margin-right: 8px;
        }

        .button-style {
          border: 1px solid #ff6b6b; /* Light red border */
          background-color: #ffe6e6; /* Light red background */
          color: #ff6b6b; /* Light red text */
          font-size: 1rem;
          font-weight: bold;
          border-radius: 8px; /* Rounded corners */
          width: 250px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto; /* Center the button */
          padding: 12px 24px; /* Add padding */
          position: relative;
          overflow: hidden;
          transition: background-color 0.3s ease;
        }

        .button-style:hover {
          background-color: #ff4d4d; /* Darker red on hover */
          color: #fff; /* White text on hover */
        }

        .button-style img {
          margin-right: 8px;
          height: 24px;
        }
      `}</style>

      <form className="form-style1" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="form-label fw600 dark-color text-start">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && <p className="text-danger">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="form-label fw600 dark-color text-start">Password</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
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
                  message: "Password must have uppercase, number and special characters",
                },
              })}
            />
            <span className="password-toggle-icon" onClick={toggleShowPassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && <p className="text-danger">{errors.password.message}</p>}
        </div>

        <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb-4">
          <label className="custom_checkbox fz14 ff-heading">
            Remember me
            <input type="checkbox" defaultChecked />
            <span className="checkmark" />
          </label>
        </div>

        {loginError && <p className="text-danger">{loginError}</p>}

        <div className="d-grid mb-4">
          <button className="button-style" type="submit">
            {isLoading && (
              <div className="spinner-container">
                <div className="spinner"></div>
              </div>
            )}
            <img
              src="https://anondetect.netlify.app/hat-color.png"
              alt="Hat Icon"
              className={isLoading ? '' : 'animate'}
            />
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </div>
      </form>
    </>
  );
};

export default SignInForm;
