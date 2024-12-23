import { api } from "instance/instance";
import qs from "qs";
const addCategory = async (data) => {
  return await api("POST", `/category/addCategory`, data);
};

const getCategories = async (params = {}) => {
  return await api("GET", `/category`, qs.parse(params));
};

const getCategory = async (categoryID) => {
  return await api("GET", `/category/${categoryID}`);
};

const updateCategory = async (categoryID, data) => {
  return await api("PUT", `/category/${categoryID}`, data);
};

const deleteCategory = async (categoryID) => {
  return await api("DELETE", `/category/${categoryID}`);
};

export {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
