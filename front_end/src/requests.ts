import axios from "axios";
import { Cookies } from "react-cookie";
import * as Important from "src/important";

const backEndBaseUrl = Important.backEndBaseUrl;
const accessTokenCookie = Important.accessTokenCookie;

export const axiosConfig = {
  url: "",
  headers: {
    Authorization: "",
  },
  params: {},
  initialized: false,
};

async function getRequest(requestUrl: string, params?: any) {
  try {
    if (params) axiosConfig.params = params;

    const response = await axios.get(requestUrl, {
      baseURL: axiosConfig.url,
      headers: axiosConfig.headers,
      params: axiosConfig.params,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

async function deleteRequest(requestUrl: string) {
  try {
    const response = await axios.delete(requestUrl, {
      baseURL: axiosConfig.url,
      headers: axiosConfig.headers,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

async function postRequest(requestUrl: string, data: any) {
  try {
    const response = await axios.post(`${requestUrl}`, data, {
      baseURL: axiosConfig.url,
      headers: axiosConfig.headers,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

async function patchRequest(requestUrl: string, data: any) {
  try {
    const response = await axios.patch(`${requestUrl}`, data, {
      baseURL: axiosConfig.url,
      headers: axiosConfig.headers,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

async function putRequest(requestUrl: string, data: any) {
  try {
    const response = await axios.put(`${requestUrl}`, data, {
      baseURL: axiosConfig.url,
      headers: axiosConfig.headers,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

function getCookies() {
  const cookies = new Cookies();
  const token = cookies.get(accessTokenCookie);
  return token;
}

export const initializeAxiosConfig = () => {
  const token = getCookies();
  axiosConfig.url = backEndBaseUrl ? `${backEndBaseUrl}` : "";
  axiosConfig.headers.Authorization = token ? `Bearer ${token}` : "";
  axiosConfig.initialized = true;
};

const authGetRequest = async (requestUrl: string, params?: any) => {
  if (axiosConfig.initialized === false) {
  }
  initializeAxiosConfig();
  return getRequest(requestUrl, params);
};
const authDeleteRequest = async (requestUrl: string) => {
  if (axiosConfig.initialized === false) initializeAxiosConfig();
  return deleteRequest(requestUrl);
};

const authPostRequest = async (requestUrl: string, data: any) => {
  if (axiosConfig.initialized === false) initializeAxiosConfig();
  return postRequest(requestUrl, data);
};

const authPatchRequest = async (requestUrl: string, data: any) => {
  if (axiosConfig.initialized === false) initializeAxiosConfig();
  return patchRequest(requestUrl, data);
};

const authPutRequest = async (requestUrl: string, data: any) => {
  if (axiosConfig.initialized === false) initializeAxiosConfig();
  return putRequest(requestUrl, data);
};

export const httpClient = {
  get: authGetRequest,
  post: authPostRequest,
  patch: authPatchRequest,
  put: authPutRequest,
  delete: authDeleteRequest,
};
