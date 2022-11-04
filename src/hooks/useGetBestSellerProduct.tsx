import { useSelector } from "react-redux";
import { RootState } from "..";
import { Product } from "../type/type";
export default function useGetBestSellerProduct(): Product[] {
  const products = useSelector((state: RootState) => state.product.products);
  const bestSeller = products.filter(
    (product: Product) => product.isBestSeller
  );
  return bestSeller;
}
