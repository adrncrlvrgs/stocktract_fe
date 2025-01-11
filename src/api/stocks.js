import { api } from "instance/instance";
import qs from "qs";

export const addStock = async (data) => {
  return await api("POST", `/stocks/addStock`, data);
};

export const getStocks = async (params = {}) => {
  return await api("GET", `/stocks`, qs.parse(params));
};

export const getStock = async (stockID) => {
  return await api("GET", `/stocks/${stockID}`);
};

export const updateStock = async (stockID, data) => {
  return await api("PUT", `/stocks/${stockID}`, data);
};

export const deleteStock = async (stockID) => {
  return await api("DELETE", `/stocks/${stockID}`);
};
