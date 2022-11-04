import React, { useState, useCallback, useEffect } from "react";
import Loading from "../Loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import { BsHeart } from "react-icons/bs";
import onAddToCart from "../../util/onAddToCart";
import { useDispatch, useSelector } from "react-redux";
import useGetBestSellerProduct from "../../hooks/useGetBestSellerProduct";
import Modal from "../Modal";
import ModalPortal from "../../Portal/ModalPortal";
import { RootState } from "../..";
// import getGSAPopacity from "../../util/getGSAPopacity";
function MainFooter() {
  const [handleToggleModal, setHandleToggleModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shoppingCart, isLoading, products } = useSelector(
    (state: RootState) => {
      return state.product;
    }
  );
  const bestSellerArray = useGetBestSellerProduct();
  const onGoBestSellersViewAll = () => {
    navigate("/BestSellers");
  };
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

  // useEffect(() => {
  //   getGSAPopacity(".productWrappingBox");
  // });

  return (
    <div>
      <div className="flex-vertical-center MainTextBlock">
        <div
          className="MainSellOrPicks cursorPointer"
          onClick={onGoBestSellersViewAll}
        >
          Best sellers
        </div>
        <div
          className="MainViewAllText cursorPointer"
          onClick={onGoBestSellersViewAll}
        >
          See all
        </div>
      </div>
      <div className="flex-center productWrappingBox">
        {isLoading && <Loading />}
        {bestSellerArray.map((product) => (
          <div className="flex-center BestSellerproductBox" key={product.id}>
            <Link
              className="flex-center BestSellerLink"
              to={`/products/${product.id}`}
            >
              <img
                className="productPictureStyle cursorPointer"
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
          <Modal onToggle={handleToggleModal} onClose={handleModalToggle} />
        </ModalPortal>
      )}
    </div>
  );
}

export default React.memo(MainFooter);
