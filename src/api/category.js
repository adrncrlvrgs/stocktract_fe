import { api } from "instance/instance";
import qs from "qs";
export const addCategory = async (data) => {
  return await api("POST", `/category/addCategory`, data);
};

export const getCategories = async (params = {}) => {
  return await api("GET", `/category`, qs.parse(params));
};

export const getCategory = async (categoryID) => {
  return await api("GET", `/category/${categoryID}`);
};

export const updateCategory = async (categoryID, data) => {
  return await api("PUT", `/category/${categoryID}`, data);
};

export const deleteCategory = async (categoryID) => {
  return await api("DELETE", `/category/${categoryID}`);
};
