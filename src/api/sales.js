import { api } from "instance/instance";
import qs from "qs";

export const addSale = async (data) => {
  return await api("POST", `/sales/addSale`, data);
};

export const getSales = async (params = {}) => {
  return await api("GET", `/sales`, qs.parse(params));
};

export const getSale = async (saleID) => {
  return await api("GET", `/sales/${saleID}`);
};

export const updateSale = async (saleID, data) => {
  return await api("PUT", `/sales/${saleID}`, data);
};

export const deleteSale = async (saleID) => {
  return await api("DELETE", `/sales/${saleID}`);
};
