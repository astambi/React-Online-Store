import { auth } from "../constants/constants";

const getAuthHeader = () => {
  const authToken = window.localStorage.getItem(auth.authToken);
  return authToken ? { Authorization: `Bearer ${authToken}` } : {};
};

function request(method) {
  // const getAuthHeader = () => {
  //   const authToken = window.localStorage.getItem(auth.authToken);
  //   return authToken ? { Authorization: `Bearer ${authToken}` } : {};
  // };

  return async (url, data = {}, options = {}) => {
    const authHeader = getAuthHeader();
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...authHeader
    };

    const response = await fetch(url, {
      method,
      headers,
      body: Object.keys(data).length ? JSON.stringify(data) : undefined,
      ...options
    });

    return response.json();
  };
}

function requestUpload(method) {
  return async (url, data = {}, options = {}) => {
    const authHeader = getAuthHeader();
    const headers = {
      // No content type
      Accept: "application/json",
      ...authHeader
    };

    const response = await fetch(url, {
      method,
      headers,
      body: data,
      ...options
    });

    return response.json();
  };
}

function requestDownload(method) {
  return async (url, data = {}, options = {}) => {
    const authHeader = getAuthHeader();
    const headers = {
      // No content type
      // Accept: "application/json",
      ...authHeader
    };

    const response = await fetch(url, {
      method,
      headers,
      // body: data,
      ...options
    });

    return response;
  };
}

const get = request("get");
const post = request("post");
const put = request("put");
const remove = request("delete");
const upload = requestUpload("post");
const download = requestDownload("get");

export { get, post, put, remove, upload, download };
