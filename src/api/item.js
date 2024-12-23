import { api } from "instance/instance";
import qs from "qs";
const addItem = async (data) => {
  return await api("POST", `/items/addItem`, data);
};

const getItems = async (params) => {
  return await api("GET", `/items`, qs.parse(params));
};

const getItem = async (itemID) => {
  return await api("GET", `/items/${itemID}`);
};

const updateItem = async (itemID, data) => {
  return await api("PUT", `/items/${itemID}`, data);
};

const deleteItem = async (itemID) => {  
  return await api("DELETE", `/items/${itemID}`);
};

export {  
  addItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
};

