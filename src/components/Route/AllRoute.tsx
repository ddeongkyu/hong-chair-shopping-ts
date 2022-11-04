import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetails from "../ProductDetails/ProductDetails";
import MainComponents from "../Main/MainComponents";
import BestSellerMainProduct from "../BestSellersViewAll/BestSellerMainProduct";
import PaymentSuccess from "../Payment/PaymentSuccess";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
function AllRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainComponents />} />
        <Route path="/BestSellers" element={<BestSellerMainProduct />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/ShoppingCart" element={<ShoppingCart />} />
        <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AllRoute;
