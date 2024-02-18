import { useState, useEffect } from "react";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "@/configs/axiosInstance";

interface UseHttpDeleteProps {
  url: string;
  config?: AxiosRequestConfig;
}

const useHttpDelete = ({ url, config }: UseHttpDeleteProps) => {
  const [responseData, setResponseData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const deleteData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.delete(url, config);
        setResponseData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    deleteData();
  }, [url, config]);

  return { responseData, error, loading };
};

export default useHttpDelete;
