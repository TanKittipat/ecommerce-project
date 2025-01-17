import api from "./api";
const API_URL = import.meta.env.VITE_BASEURL + "/products";

const getAllProducts = async () => {
  return await api.get(`${API_URL}`);
};

const ProductServices = {
  getAllProducts,
};

export default ProductServices;
