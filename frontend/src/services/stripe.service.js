import api from "./api";
const API_URL = "/stripe";

const createCheckOutSession = async (cart, email) => {
  return await api.post(`${API_URL}/create-checkout-session`, { cart, email });
};

const StripeServices = {
  createCheckOutSession,
};

export default StripeServices;
