import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiFillShopping } from "react-icons/ai";
import { BiArrowBack, BiDownArrowAlt } from "react-icons/bi";
import { BsHeart } from "react-icons/bs";
import useGetBestSellerProduct from "../../hooks/useGetBestSellerProduct";
import onAddToCart from "../../util/onAddToCart";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal";
import ModalPortal from "../../Portal/ModalPortal";
import { RootState } from "../..";

function BestSellerMainProduct() {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { shoppingCart } = useSelector((state: RootState) => {
    return state.product;
  });
  const { products } = useSelector((state: RootState) => {
    return state.product;
  });
  const navigate = useNavigate();
  const bestSellerArray = useGetBestSellerProduct();
  const onGoToMainPage = () => {
    navigate("/");
  };
  const onGoToShoppingCart = () => {
    navigate("/ShoppingCart");
  };
  const handleModalToggle = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <div className="BestProductMainTotalBox">
      <div className="flex-vertical-center BestProductHeadIconBlock">
        <BiArrowBack
          className="BestProductIconStyle cursorPointer"
          onClick={onGoToMainPage}
        />
        <AiFillShopping
          className="BestProductIconStyleBag cursorPointer"
          onClick={onGoToShoppingCart}
        />
      </div>
      <div className="BestSellerTextBlock">
        <span className="BestSellerHeadText">Chairs</span>
      </div>
      <div className="flex-vertical-center BestMainTopBox">
        <div className="BestProductStyle">
          {bestSellerArray.length} Products
        </div>
        <div className="BestMainPopularBox">
          Popular
          <BiDownArrowAlt className="BiDownArrowAlt cursorPointer" />
        </div>
      </div>
      <div className="flex-vertical-center BestSellerproductWrappingBox">
        {bestSellerArray.map((product) => (
          <div className="BestSellerproductBox" key={product.id}>
            <Link className="BestSellerLink" to={`/products/${product.id}`}>
              <img
                className="productPictureStyleBestSeller cursorPointer"
                alt="alt"
                src={product.src}
              />
            </Link>
            <BsHeart
              className="MainProductHeratStyle cursorPointer"
              onClick={() => {
                onAddToCart(product, shoppingCart, dispatch, products);
                handleModalToggle();
              }}
            />
            <div className="flex-center MainProductNameAndPriceBox">
              <div className="MainProductNameStyle">{product.name}</div>
              <div className="MainProductPriceStyle">
                <span className="MainDollorColor">$&nbsp;</span>
                {product.price}
              </div>
            </div>
          </div>
        ))}
      </div>
      {modalOpen && (
        <ModalPortal>
          <Modal onClose={handleModalToggle} />
        </ModalPortal>
      )}
    </div>
  );
}

export default BestSellerMainProduct;
