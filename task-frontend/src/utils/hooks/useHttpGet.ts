import { useState, useEffect } from "react";
import { AxiosRequestConfig } from "axios";
import axiosConfig from "@/configs/axiosConfig";

interface UseHttpGetProps {
  url: string;
  config?: AxiosRequestConfig;
}

const useHttpGet = ({ url, config }: UseHttpGetProps) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosConfig.get(url, config);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, config]);

  return { data, error, loading };
};

export default useHttpGet;
