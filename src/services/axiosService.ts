import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9000",
});

interface RequestParams {
  headers?: Record<string, string>;
  method: "POST" | "GET";
  url: string;
  data?: any;
  params?: Record<string, string>;
}

const request = async ({
  headers = {},
  method,
  url,
  data,
  params,
}: RequestParams) => {
  const options: AxiosRequestConfig = {
    headers,
    method,
    url,
    data,
    params,
  };

  try {
    const result = await axiosInstance(options);

    return result.data;
  } catch (error) {
    throw error;
  }
};

export { request };
