import api from "./api";
const API_URL = "/auth";

const signUser = async (email) => {
  return await api.post(`${API_URL}/sign`, email);
};

const addUser = async (email) => {
  return await api.post(`${API_URL}/`, email);
};

const getAllUsers = async () => {
  return await api.get(`${API_URL}`);
};

const updateUser = async (id, user) => {
  return await api.put(`${API_URL}/${id}`, user);
};

const deleteUser = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
};

const makeAdmin = async (id) => {
  return await api.patch(`${API_URL}/admin/${id}`);
};

const makeUser = async (id) => {
  return await api.patch(`${API_URL}/user/${id}`);
};

const getRoleById = async (id) => {
  return await api.get(`${API_URL}/role/${id}`);
};

const UserServices = {
  signUser,
  addUser,
  getAllUsers,
  updateUser,
  deleteUser,
  makeAdmin,
  makeUser,
  getRoleById,
};

export default UserServices;
