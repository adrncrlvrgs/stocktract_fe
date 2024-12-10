import { api } from "instance/instance";
import qs from "qs";
const addUser = async (data) => {
  return await api("POST", `/users/addUser`, data);
};

const getUsers = async (params) => {
  return await api("GET", `/users`, qs.parse(params));
};

const getUser = async (userID) => {
  return await api("GET", `/users/${userID}`);
};

const updateUser = async (userID, data) => {
  return await api("PUT", `/users/${userID}`, data);
};

const deleteUser = async (userID) => {
  return await api("DELETE", `/users/${userID}`);
};

export { addUser, getUsers, getUser, updateUser, deleteUser };
