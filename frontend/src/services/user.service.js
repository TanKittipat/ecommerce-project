import api from "./api";
const API_URL = "/auth";

const signUser = async (email) => {
  return await api.post(`${API_URL}/sign`, email);
};

const addUser = async (email) => {
  return await api.post(`${API_URL}/`, email);
};

const UserServices = {
  signUser,
  addUser,
};

export default UserServices;
