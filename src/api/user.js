import { api } from "instance/instance";

const addUser = async (data) => {
  const response = await api("POST", `/addUser/`, data);
  return response.data;
};

const getUsers = async () => {
  const response = await api("GET", `/user/`);
  return response.data;
};

const getUser = async (data) => {
  const response = await api("POST", `/user/`, data);
  return response.data;
};

const updateUser = async (data) => {
  const response = await api("GET", `/user/`, data);
  return response.data;
};

const deleteUser = async (data) => {
  const response = await api("GET", `/user/`, data);
  return response.data;
};

export { loginUser, signUpUser, getUserProfile, refreshUserData };
