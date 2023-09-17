import { useState, useEffect } from 'react';
import axios from 'axios';

interface UrlApi {
    url: string;
}

export function useAxios(url : UrlApi) {
  const [data, setData] = useState<String[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<Error | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

