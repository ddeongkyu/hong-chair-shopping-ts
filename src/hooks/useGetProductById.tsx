import { useSelector } from "react-redux";
import { RootState } from "..";
import { Product } from "../type/type";
export default function useGetProductById(id: number): Product {
  const products = useSelector((state: RootState) => state.product.products);
  const product = products[id - 1];
  return product;
}
