
import { serverBaseUrl } from "@/dataFetching/baseUrl";
import { useState, useEffect } from "react";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    setToken(token ? token : null);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        setError("No token provided");
        return;
      }

      try {
        const res = await fetch(`${serverBaseUrl}/admin-users/me`, {
          next: {
            revalidate: 2,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]); // Dependency array includes `token`

  return { user, error, loading };
};

export default useUser;
