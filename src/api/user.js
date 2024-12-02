import { api } from "instance/instance";

const addUser = async (data) => {
  return await api("POST", `/user/addUser`, data);
};

const getUsers = async () => {
  return await api("GET", `/user`);
};

const getUser = async (userID) => {
  return await api("GET", `/user/${userID}`);
};

const updateUser = async (userID, data) => {
  return await api("PUT", `/user/${userID}`, data);
};

const deleteUser = async (userID) => {
  return await api("DELETE", `/user/${userID}`);
};

export { addUser, getUsers, getUser, updateUser, deleteUser };
