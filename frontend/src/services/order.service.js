import api from "./api";
const API_URL = "/orders";

const getOrders = async () => {
  return await api.get(`${API_URL}`);
};

const getOrderById = async (id) => {
  return await api.get(`${API_URL}/${id}`);
};

const getOrderByEmail = async (email) => {
  return await api.get(`${API_URL}/user/${email}`);
};

const updateOrder = async (id, data) => {
  return await api.put(`${API_URL}/${id}`, data);
};

const deleteOrder = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
};

const OrderServices = {
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};

export default OrderServices;
