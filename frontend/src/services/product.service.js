import api from "./api";
const API_URL = import.meta.env.VITE_BASEURL + "/products";

const getAllProducts = async () => {
  return await api.get(`${API_URL}`);
};

const getProductById = async (id) => {
  return await api.get(`${API_URL}/${id}`);
};

const addNewProduct = async (product) => {
  return await api.post(`${API_URL}`, product, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const updateProduct = async (id, product) => {
  return await api.put(`${API_URL}/${id}`, product, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const deleteProduct = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
};

const ProductServices = {
  getAllProducts,
  getProductById,
  addNewProduct,
  updateProduct,
  deleteProduct,
};

export default ProductServices;
