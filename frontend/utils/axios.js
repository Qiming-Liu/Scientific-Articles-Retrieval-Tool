/* eslint-disable no-console */
import axios from 'axios';

const getInstance = () => {
  const axiosInstance = axios.create();

  axiosInstance.interceptors.response.use(
    (config) => {
      return config;
    },
    (error) => {
      // eslint-disable-next-line no-unused-expressions
      error && console.log(error.response);

      return Promise.reject(error);
    },
  );
  return axiosInstance;
};

const http = (endpoint, { method, data, headers, ...customConfig }) => {
  const config = {
    method,
    headers,
    data,
    ...customConfig,
  };
  const axiosInstance = getInstance();
  return axiosInstance(endpoint, { ...config });
};

export default http;
