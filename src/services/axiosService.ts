import axios, { AxiosRequestConfig } from "axios";
import { IRequestParams } from "shared/types";

const axiosInstance = axios.create();

const request = async ({
  headers = {},
  method,
  url,
  data,
  params,
}: IRequestParams) => {
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
