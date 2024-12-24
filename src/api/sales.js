import { api } from "instance/instance";
import qs from "qs";

const addSale = async (data) => {
  return await api("POST", `/sales/addSale`, data);
}

const getSales = async (params = {}) => {
  return await api("GET", `/sales`, qs.parse(params));
}

const getSale = async (saleID) => {
  return await api("GET", `/sales/${saleID}`);
}

const updateSale = async (saleID, data) => {
  return await api("PUT", `/sales/${saleID}`, data);
}

const deleteSale = async (saleID) => {
  return await api("DELETE", `/sales/${saleID}`);
}

export {
  addSale,
  getSales,
  getSale,
  updateSale,
  deleteSale,
};