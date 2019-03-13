function request(method) {
  return async (url, data = {}, options = {}) => {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
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
