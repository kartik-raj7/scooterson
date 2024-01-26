import axios from 'axios';
import { config } from '../../config';
const { baseUrl } = config;
export const axiosInstance = axios.create({
  baseURL: baseUrl,
});
export const axiosPost = async (
  url,
  data,
  contentType = 'application/json',
  params = null,
  type = 'normal',
  refreshToken = '',
) => {
  let response = {};
  let headers = {
    'Content-Type': contentType,
  };
  if (type === 'refresh') {
    headers['Authorization'] = `Bearer ${refreshToken}`;
  }
  try {
    const result = await axiosInstance.post(url, data, {
      headers: headers,
      params: params,
    });
    response = result.data;
    response.status = result?.data?.status || result?.data?.[0]?.status;
    response.message = result?.data?.message || result?.data?.[0]?.status;
  } catch (e) {
    response.status = false;
    response.message = e?.data?.message
      ? e?.data?.message
      : e?.message
      ? e?.message
      : 'something went wrong';
    response.data = e;
  }
  return response;
};

export const axiosPatch = async (url, data, contentType = 'application/json') => {
  let response = {};
  try {
    const result = await axiosInstance.patch(url, data, {
      headers: {
        'Content-Type': contentType,
      },
    });
    response = result.data;
    response.status = result?.data?.status || result?.data?.[0]?.status || result.status;
    response.message = result?.data?.message || result?.data?.[0]?.status;
  } catch (e) {
    response.status = false;
    response.message = 'something went wrong';
    response.data = e;
  }
  return response;
};

export const axiosPut = async (url, data, contentType = 'application/json') => {
  let response = {};
  try {
    const result = await axiosInstance.put(url, data, {
      headers: {
        'Content-Type': contentType,
      },
    });
    response = result.data;
    response.status = result?.data?.status || result?.data?.[0]?.status;
    response.message = result?.data?.message || result?.data?.[0]?.status;
  } catch (e) {
    response.status = false;
    response.message = 'something went wrong';
    response.data = e;
  }
  return response;
};

export const axiosGet = async (url, params = {}, contentType = 'application/json') => {
  let response = {};
  try {
    const result = await axiosInstance.get(url, {
      headers: {
        'Content-Type': contentType,
      },
      params,
    });
    response = result.data || {};
    response.status = result?.status === 200;
    response.message = result?.data?.message;
  } catch (e) {
    response.status = false;
    response.message = 'something went wrong';
    response.data = e;
  }
  return response;
};

export const axiosDelete = async (url, contentType = 'application/json') => {
  let response = {};
  try {
    const result = await axiosInstance.delete(url, {
      headers: {
        'Content-Type': contentType,
      },
    });
    response = result.data || {};
    response.status = result?.data?.status;
    response.message = result?.data?.message;
  } catch (e) {
    response.status = false;
    response.message = 'something went wrong';
    response.data = e;
  }
  return response;
};