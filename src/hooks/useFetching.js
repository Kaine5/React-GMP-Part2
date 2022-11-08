import { useState, useEffect, useCallback } from "react";

const useFetching = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({status: false, error: {}});

  const doFetch = useCallback(async (endpoint) => {
    setError(false);
    setLoading(true);
    try {
      const response = await fetch(endpoint, {method: 'GET'});
      console.log(response);
      if (response.ok) {
        let responseData = await response.json();
        setData(responseData);
      } else {
        throw new Error('An error has occured');
      }
    } catch (err) {
      console.log(err);
      setError({status: true, error: err.toString()});
    } finally {
      setLoading(false);
    }
  },[]);

  useEffect(() => {
    doFetch(url);
  },[url]);
  return [data, loading, error];
};

export default useFetching;
