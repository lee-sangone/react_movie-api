import axios from "axios";
import { useEffect, useState } from "react";

const useGetData = (url, options) => {
  const [results, setResults] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(url, { ...options });
      setResults(data);
    };
    getData();
  }, [url]);
  return results;
};

export default useGetData;
