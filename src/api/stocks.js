import { api } from "instance/instance";
import qs from "qs";

const addStock = async (data) => {
  return await api("POST", `/stocks/addStock`, data);
};

const getStocks = async (params = {}) => {
  return await api("GET", `/stocks`, qs.parse(params));
};

const getStock = async (stockID) => {
  return await api("GET", `/stocks/${stockID}`);
};

const updateStock = async (stockID, data) => {
  return await api("PUT", `/stocks/${stockID}`, data);
};

const deleteStock = async (stockID) => {
  return await api("DELETE", `/stocks/${stockID}`);
};

export { addStock, getStocks, getStock, updateStock, deleteStock };
