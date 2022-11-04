import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BiArrowBack,
  BiChevronRight,
  BiX,
  BiShoppingBag,
} from "react-icons/bi";
import { MdRemoveShoppingCart } from "react-icons/md";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { setShoppingCart } from "../../slices/productSlice";
import getShippingCost from "../../util/getShippingCost";
// import getGSAPopacity from "../../util/getGSAPopacity";
import getTotalPrice from "../../util/getTotalPrice";
import { RootState } from "../..";
function ShoppingCart() {
  const dispatch = useDispatch();
  const { shoppingCart } = useSelector((state: RootState) => {
    return state.product;
  });
  const [checkOutHandle, setCheckOutHandle] = useState(false);
  const navigate = useNavigate();
  const handleGoBackBtn = () => {
    navigate(-1);
  };
  const handleGoToPaymentSuccess = () => {
    navigate("/PaymentSuccess");
  };
  const onQuantityPlusRedux = (idAndColor: string) => {
    const inReduxShoppingCartArrayPlus = shoppingCart.map((item) =>
      item.idAndColor === idAndColor
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    dispatch(setShoppingCart(inReduxShoppingCartArrayPlus));
  };
  const onQuantityMinusRedux = (idAndColor: string) => {
    const inReduxShoppingCartArrayMinus = shoppingCart.map((item) =>
      item.idAndColor === idAndColor
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    const isQuantityZeroCheck =
      inReduxShoppingCartArrayMinus.filter(
        (item) => item.idAndColor === idAndColor
      )[0].quantity === 0;
    if (isQuantityZeroCheck) {
      const inReduxShoppingCartArrayMinusAndDelete = shoppingCart.filter(
        (item) => item.idAndColor !== idAndColor
      );
      dispatch(setShoppingCart(inReduxShoppingCartArrayMinusAndDelete));
    } else {
      dispatch(setShoppingCart(inReduxShoppingCartArrayMinus));
    }
  };
  const onShoppingCartDeleteRedux = (idAndColor: string) => {
    const inReduxShoppingCartArrayDelete = shoppingCart.filter(
      (item) => item.idAndColor !== idAndColor
    );
    dispatch(setShoppingCart(inReduxShoppingCartArrayDelete));
  };
  const onClickCheckout = () => {
    setCheckOutHandle(!checkOutHandle);
  };
  const onGoToPaymentComponents = () => {
    setTimeout(() => {
      handleGoToPaymentSuccess();
    }, 2000);
  };
  //   useEffect(() => {
  //     getGSAPopacity(".FavoritesContainer");
  //   }, []);
  return (
    <div className="flex-vertical-center FavoritesContainer">
      <div className="flex-vertical-center FavoritesHeadBox">
        <BiArrowBack
          className="FavoritesTopIconStyle cursorPointer"
          onClick={handleGoBackBtn}
        />
        <div className="FavoritesMyCartTextStyle">My Cart</div>
        <BiShoppingBag className="FavoritesTopIconStyle cursorPointer" />
      </div>
      {shoppingCart.map((item) => (
        <div className="FavoritesProductBox" key={item.idAndColor}>
          <div className="flex-vertical-center ">
            <div className="FavoritesProductImgBox">
              <img
                alt="product"
                src={item.src}
                className={`${
                  item.color
                    ? `FavoritesProductImgWith${item.color}`
                    : "FavoritesProductImg"
                }`}
              />
            </div>
            <div className="FavoritesPriceAndQuantiy">
              <div className="FavoritesNameBox">{item.category}</div>
              <div className="FavoritesNameBox">{item.name}</div>
              <div className="FavoritesColorBox">Color : {item.color}</div>
              <div className="FavoritesPriceBox">
                <span className="FavoritesDollorColor">$&nbsp;</span>
                {item.price}
              </div>
              <div className="flex-vertical-center ">
                <div className="flex-vertical-center ">
                  <FiMinusSquare
                    className="FavoritesPlusMinusBtn cursorPointer"
                    onClick={() => onQuantityMinusRedux(item.idAndColor)}
                  />
                  <span className="FavoritesQuantityText">{item.quantity}</span>
                  <FiPlusSquare
                    className="FavoritesPlusMinusBtn cursorPointer"
                    onClick={() => onQuantityPlusRedux(item.idAndColor)}
                  />
                </div>
                <div className="flex-vertical-center FavoritesDelete cursorPointer">
                  <BiX
                    className="FavoritesXIcon"
                    onClick={() => onShoppingCartDeleteRedux(item.idAndColor)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {shoppingCart.length === 0 ? (
        <div className="flex-center FavoritesNothinginCartBlock">
          <div className="FavoritesNothingCartIcon">
            <MdRemoveShoppingCart />
          </div>
          <div className="FavoritesNothingCartText">
            Nothing in Your Shopping Cart!
          </div>
        </div>
      ) : (
        <>
          <div className="flex-vertical-center FavoritesPromoBox">
            <div className="FavoritesPromoTextBox">
              Promo / Student Code or Vourchers
            </div>
            <div className="flex-vertical-center BiChevronRight cursorPointer">
              <BiChevronRight />
            </div>
          </div>
          <div className="FavoritesTotalPriceBox">
            <div className="flex-vertical-center FavoritesSubTotal">
              <div className="FavoritesSubtotalText">Sub Total</div>
              <div className="FavoritesSubtotalPrice">
                <span className="FavoritesDollorColor">$</span>&nbsp;
                {getTotalPrice(shoppingCart)}
              </div>
            </div>
            <div className="flex-vertical-center FavoritesSubTotal">
              <div className="FavoritesSubtotalText">Shipping</div>
              <div className="FavoritesSubtotalPrice">
                <span className="FavoritesDollorColor">$</span>&nbsp;
                {getShippingCost(shoppingCart)}
              </div>
            </div>
            <div className="FavoritesSubTotalTotalBox">
              <div className="FavoritesSubtotalText">Total</div>
              <div className="FavoritesSubtotalPrice">
                <span className="FavoritesDollorColor">$</span>&nbsp;
                {getShippingCost(shoppingCart) + getTotalPrice(shoppingCart)}
              </div>
            </div>
            <div className="flex-center FavoritesCheckOutBtn">
              <button
                className="FavoritesCheckOutBtnStyle cursorPointer"
                disabled={checkOutHandle}
                onClick={() => {
                  onClickCheckout();
                  onGoToPaymentComponents();
                }}
              >
                {checkOutHandle ? "Processing Payment.." : "Checkout"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default ShoppingCart;
