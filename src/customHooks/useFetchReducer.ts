import { useEffect, useState } from 'react'
import { axiosInstance } from '../api';

const useFetchReducer = (url: string) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<unknown>(null)


    useEffect(() => {
        const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(url);
        if (response.data) {
          setData(response.data);
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
  }, [url]);

  return {data, loading, error}
}

export default useFetchReducer