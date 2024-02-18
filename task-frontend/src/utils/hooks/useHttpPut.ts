import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import axiosInstance from "@/configs/axiosInstance";

interface UseHttpPutProps {
  url: string;
  data?: any;
  config?: AxiosRequestConfig;
}

const useHttpPut = ({ url, data, config }: UseHttpPutProps) => {
  const [responseData, setResponseData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const putData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.put(url, data, config);
        setResponseData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    putData();
  }, [url, data, config]);

  return { responseData, error, loading };
};

export default useHttpPut;
