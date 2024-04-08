import { useState, useEffect } from "react";
import { AxiosRequestConfig } from "axios";
import axiosConfig from "@/configs/axiosConfig";

interface UseHttpPostProps {
  url: string;
  data?: any;
  config?: AxiosRequestConfig;
}

const useHttpPost = ({ url, data, config }: UseHttpPostProps) => {
  const [responseData, setResponseData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const postData = async () => {
      try {
        setLoading(true);
        const response = await axiosConfig.post(url, data, config);
        setResponseData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    postData();
  }, [url, data, config]);

  return { responseData, error, loading };
};

export default useHttpPost;
