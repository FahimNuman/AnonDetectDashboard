import { serverBaseUrl } from "@/dataFetching/baseUrl";
import { useState, useEffect } from "react";

const useAllUser = () => {
  const [allUser, setAllUser] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${serverBaseUrl}/admin-users`, {
          next: {
            revalidate: 2,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await res.json();
        setAllUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []); // Dependency array includes `token`

  return { allUser, error, loading };
};

export default useAllUser;
