import { Product } from "../type/type";

const getShippingCost = (shoppingCart: Product[]): number =>
  shoppingCart.reduce((acc, product) => {
    return acc + product.shipping * product.quantity;
  }, 0);
export default getShippingCost;
