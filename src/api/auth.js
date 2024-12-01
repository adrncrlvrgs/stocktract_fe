import { api } from "instance/instance";

const loginUser = async (data) => {
  return await api("POST", `/auth/login`, data);
};

const signUpUser = async (data) => {
  return await api("POST", `/auth/signup`, data);
};

const getUserProfile = async () => {
  return await api("GET", `/auth/profile`);
};

const refreshUserData = async (token) => {
  return await api("GET", `/auth/refresh`);
};

export { loginUser, signUpUser, getUserProfile, refreshUserData };


// userID
// add meta
// get users
// add user
// delete user
// update user
// password comparison
