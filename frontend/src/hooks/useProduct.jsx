import { useQuery } from "@tanstack/react-query";
import ProductServices from "../services/product.service";

const useProduct = () => {
  const { refetch, data: product = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await ProductServices.getAllProducts();
      return response.data;
    },
  });
  return [product, refetch];
};

export default useProduct;
