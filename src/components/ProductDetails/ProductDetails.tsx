import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { BsHeart, BsSquare } from "react-icons/bs";
import useGetProductById from "../../hooks/useGetProductById";
import onAddToCart from "../../util/onAddToCart";
import ModalPortal from "../../Portal/ModalPortal";
import Modal from "../Modal";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedColor } from "../../slices/productSlice";
import { RootState } from "../..";
import { Dispatch } from "@reduxjs/toolkit";
// import getGSAPopacity from "../../util/getGSAPopacity";
function ProductDetails() {
  const { id } = useParams();
  const product = useGetProductById(id) || {};
  const [handleToggleModal, setHandleToggleModal] = useState(false);
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  const productColors: string[] = ["Red", "Pink", "Green"];
  const productSizes: string[] = ["S", "M", "L", "XL", "XXL"];
  const { shoppingCart, selectedColor } = useSelector((state: RootState) => {
    return state.product;
  });
  const products = useSelector((state: RootState) => state.product.products);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch: Dispatch = useDispatch();
  const handleModalToggle = useCallback(() => {
    if (modalOpen) {
      setHandleToggleModal(false);
      setTimeout(() => {
        setModalOpen(false);
      }, 250);
    } else if (!modalOpen) {
      setModalOpen(true);
      setHandleToggleModal(true);
    }
  }, [modalOpen]);
  //   useEffect(() => {
  //     getGSAPopacity(".detailTotalBox");
  //   }, []);
  return (
    <div className="detailTotalBox">
      <div className="flex-vertical-center detailHeadBox">
        <BiArrowBack
          className="detailArrowIcon cursorPointer"
          onClick={handleGoBack}
        />
        <BsHeart
          className="detailHeadBoxHeart cursorPointer"
          onClick={() => {
            onAddToCart(
              product,
              shoppingCart,
              dispatch,
              products,
              selectedColor
            );
            handleModalToggle();
          }}
        />
      </div>
      <div className="flex-center detailTopPriceNameBox">
        <div className="detailTopPriceNameStyle">{product.name}</div>
        <div className="detailTopPriceNamePriceStyle">
          <span className="FavoritesDollorColor">$&nbsp;</span>
          {product.price}
        </div>
      </div>
      <div className="flex-vertical-center detailProductImgBox">
        <img
          src={product.src}
          alt="alt"
          className={`${
            selectedColor
              ? `detailPageBoxImgWith${selectedColor}`
              : "detailPageBoxImg"
          }`}
        />
      </div>
      <div className="detailSizeTotalBox">
        <div className="detailSelectColorText">Select Size </div>
        <div className="flex-vertical-center detailSizeBox">
          <div className="flex-center">
            {productSizes.map((size) => (
              <div
                key={size}
                className="flex-center detailSizeSquareBox cursorPointer"
              >
                <div className="detailSquareInnerText">{size}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="detailCircleBox">
        <div className="detailSelectColorText">Select Color </div>
        <div className="detailCircleCircleBox">
          {productColors.map((color) => (
            <BsSquare
              key={color}
              className={`detailCircle${color}NotClicked cursorPointer ${
                color === selectedColor ? "detailCircleYesClicked" : ""
              }`}
              onClick={() => {
                dispatch(setSelectedColor(color));
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex-vertical-center detailShoppingCartBox">
        <span className="detailShoppingPrice">
          <strong className="FavoritesDollorColor">$&nbsp;</strong>
          {product.price}
        </span>
        <div
          className="flex-center detailShoppingCart cursorPointer"
          onClick={() => {
            onAddToCart(
              product,
              shoppingCart,
              dispatch,
              products,
              selectedColor
            );
            dispatch(setSelectedColor(""));
            handleModalToggle();
          }}
        >
          Add To Cart
        </div>
      </div>
      {modalOpen && (
        <ModalPortal>
          <Modal onToggle={handleToggleModal} onClose={handleModalToggle} />{" "}
        </ModalPortal>
      )}
    </div>
  );
}
export default ProductDetails;
