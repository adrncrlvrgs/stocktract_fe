import { api } from "instance/instance";

const addUser = async (data) => {
  console.log(data)
  return await api("POST", `/users/addUser`, data);
};

const getUsers = async () => {
  return await api("GET", `/users`);
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
