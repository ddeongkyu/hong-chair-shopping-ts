import { useSelector } from "react-redux";
import { RootState } from "..";
import { Product } from "../type/type";
export default function useGetProductbyKeyWord(keyword: any) {
  const products = useSelector((state: any) => state.product.products);
  const productKeyWord = products.filter((item: any) => {
    if (keyword === "All") {
      return item;
    }
    return item.keyWord.includes(keyword);
  });
  return productKeyWord;
}
