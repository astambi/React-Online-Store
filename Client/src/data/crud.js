import { auth } from "../constants/constants";

function request(method) {
  const getAuthHeader = () => {
    const authToken = window.localStorage.getItem(auth.authToken);
    return authToken ? { Authorization: `Bearer ${authToken}` } : {};
  };

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

const get = request("get");
const post = request("post");
const put = request("put");
const remove = request("delete");

export { get, post, put, remove };
