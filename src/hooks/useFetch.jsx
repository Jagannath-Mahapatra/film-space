import { useEffect, useState } from 'react';
import { fetchDataFromAPI } from '../utils/api';

const useFetch = (url, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setData(null);
    setLoading(true);
    setError(null);

    fetchDataFromAPI(url, { ...params, language: 'en-US' })
      .then((res) => {
        setLoading(false);
        setData(res);
        return res;
      })
      .catch((error) => {
        setError(true);
        return error;
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
