import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const getToken = () => Cookies.get("token");

const instance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((request) => {
  if (getToken()) {
    request.headers.Authorization = `Bearer ${getToken()}`;
  }
  return request;
});

instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

export async function api(method, url, data, options) {
  const _options = { method, url, ...options };

  if (method === "get") {
    _options.params = data;
  } else {
    _options.data = data;
  }

  const response = await instance(_options);

  return response;
}

export default instance;
