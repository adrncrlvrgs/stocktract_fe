import { api } from "instance/instance";
import qs from "qs";

 export const getLogs = async (params) => {
  return await api ("GET", `/logs`, qs.parse(params));
};