import { useQuery } from "@tanstack/react-query";
import CartServices from "../services/cart.service";
import { AuthContext } from "../contexts/auth.context";
import { useContext } from "react";

const useCart = () => {
  const { user } = useContext(AuthContext);

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const response = await CartServices.getCartItemsByEmail(user?.email);
      return response.data;
    },
  });
  return [cart, refetch];
};

export default useCart;
