import { api } from "instance/instance";

export const loginUser = async (data) => {
  return await api("POST", `/auth/login`, data);
};

export const signUpUser = async (data) => {
  return await api("POST", `/auth/signup`, data);
};

export const getUserProfile = async () => {
  return await api("GET", `/auth/profile`);
};

export const refreshUserData = async () => {
  return await api("GET", `/auth/refresh`);
};
