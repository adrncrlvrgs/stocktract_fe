import { api } from "instance/instance";
import qs from "qs";
export const addItem = async (data) => {
  return await api("POST", `/items/addItem`, data);
};

export const getItems = async (params) => {
  return await api("GET", `/items`, qs.parse(params));
};

export const getItem = async (itemID) => {
  return await api("GET", `/items/${itemID}`);
};

export const updateItem = async (itemID, data) => {
  return await api("PUT", `/items/${itemID}`, data);
};

export const deleteItem = async (itemID) => {
  return await api("DELETE", `/items/${itemID}`);
};
