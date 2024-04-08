import { useState, useEffect } from "react";
import { AxiosRequestConfig } from "axios";
import axiosConfig from "@/configs/axiosConfig";

interface UseHttpPatchProps {
  url: string;
  data?: any;
  config?: AxiosRequestConfig;
}

const useHttpPatch = ({ url, data, config }: UseHttpPatchProps) => {
  const [responseData, setResponseData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const patchData = async () => {
      try {
        setLoading(true);
        const response = await axiosConfig.patch(url, data, config);
        setResponseData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    patchData();
  }, [url, data, config]);

  return { responseData, error, loading };
};

export default useHttpPatch;
