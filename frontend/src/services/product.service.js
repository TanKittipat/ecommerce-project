import api from "./api";
const API_URL = "";

const getAllProducts = async () => {
  return await api.get(`${API_URL}/products.json`);
};

const ProductServices = {
  getAllProducts,
};

export default ProductServices;
