import { useEffect, useState } from "react";
import axios from "axios";

const UseFetch = (path) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/${path}`
        );
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [path]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/${path}`
      );
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return {
    data,
    loading,
    error,
    reFetch,
  };
};

export default UseFetch;
