import { useState, useEffect } from "react";
interface FetchMoviesHookProps {
  apiToCall: () => any;
}

const useFetchMovies = ({apiToCall}: FetchMoviesHookProps) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiToCall();
        if (response) {
          setData(response);
          setError(null);
        }
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, error, loading };
};

export default useFetchMovies;
