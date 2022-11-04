import { Product } from "../type/type";

const getTotalPrice = (shoppingCart: Product[]): number =>
  shoppingCart.reduce((acc, product) => {
    return acc + product.quantity * product.price;
  }, 0);
export default getTotalPrice;
