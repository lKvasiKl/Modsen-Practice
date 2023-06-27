import axios, { AxiosRequestConfig } from "axios";

import { IRequestParams } from "shared/interface/interface";

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

  const result = await axiosInstance(options);

  return result.data;
};

export { request };
