import { api } from "instance/instance";

const loginUser = async (data) => {
  const response = await api("POST", `/auth/login`, data);
  return response.data;
};

const signUpUser = async (data) => {
  const response = await api("POST", `/user/signup`, data);
  return response.data;
};

const getUserProfile = async () => {
  const response = await api("GET", `/auth/profile`);
  return response.data;
};

const refreshUserData = async (token) => {
  const response = await api("GET", `/auth/refresh`);
  return response.data;
};

export { loginUser, signUpUser, getUserProfile, refreshUserData };
