import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export const UserProvider = ({ children }) => {
  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user")) || null;

      return storedUser;
    }
    return null;
  });

  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token") || null;

      return storedToken;
    }
    return null;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [user, token]);

  const loginUser = async (email, password, path) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://anon-cat.vercel.app/api/v1/${path}/login`,
        { email, password }
      );

      if (response.status === 200) {
        const responseData = response.data.data; // Extract the nested data object

        setUser(responseData.user);
        setToken(responseData.token);
        router.push("/dashboard");
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred. Please try again later.";
      MySwal.fire({
        icon: "error",
        title: "Login Error",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };
  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loginUser, logoutUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
