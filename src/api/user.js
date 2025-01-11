import { api } from "instance/instance";
import qs from "qs";

export const addUser = async (data) => {
  return await api("POST", `/users/addUser`, data);
};

export const getUsers = async (params) => {
  return await api("GET", `/users`, qs.parse(params));
};

export const getUser = async (userID) => {
  return await api("GET", `/users/${userID}`);
};

export const updateUser = async (userID, data) => {
  return await api("PUT", `/users/${userID}`, data);
};

export const deleteUser = async (userID) => {
  return await api("DELETE", `/users/${userID}`);
};
