import React, { useState, useCallback, useEffect } from "react";
import useGetProductbyKeyWord from "../../hooks/useGetproductByKeyWord";
import { useSelector, useDispatch } from "react-redux";
import { BsHeart } from "react-icons/bs";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import ModalPortal from "../../Portal/ModalPortal";
import Loading from "../Loading/Loading";
import onAddToCart from "../../util/onAddToCart";
import { setFilter } from "../../slices/productSlice";
import { RootState } from "../..";
import { Dispatch } from "@reduxjs/toolkit";
import { Product } from "../../type/type";
// import getGSAPopacity from "../../util/getGSAPopacity";
function MainCenter() {
  const [modalOpen, setModalOpen] = useState(false);
  const [handleToggleModal, setHandleToggleModal] = useState(false);
  const filterBtn: string[] = ["All", "Dark", "Fabric", "Colored"];
  const dispatch: Dispatch = useDispatch();
  const { filter, shoppingCart, isLoading, products } = useSelector(
    (state: RootState) => {
      return state.product;
    }
  );
  const filteredProducts: Product[] = useGetProductbyKeyWord(filter);
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
  const onFilterKeywordClick = useCallback(
    (keyword: string) => {
      dispatch(setFilter(keyword));
    },
    [dispatch]
  );
  //   useEffect(() => {
  //     getGSAPopacity(".MainProductFindBlock");
  //   });

  return (
    <div>
      <div className="flex-vertical-center HeadTextBlock">
        <span className="HeadText">Find your style</span>
      </div>
      <div className="flex-vertical-center MainBtnBlock">
        {filterBtn.map((keyword) => (
          <button
            key={keyword}
            className={
              filter === keyword
                ? "MainBtnStyle MainBtnStyleClicked cursorPointer"
                : "MainBtnStyle cursorPointer"
            }
            onClick={() => onFilterKeywordClick(keyword)}
          >
            {keyword}
          </button>
        ))}
      </div>
      <div className="flex-vertical-center MainProductFindBlock">
        {isLoading && <Loading />}
        {filteredProducts.map((product) => (
          <div className="flex-center MainProductFind" key={product.id}>
            <div className="flex-center">
              <Link to={`/products/${product.id}`}>
                <img
                  alt="alt"
                  src={product.src}
                  className="MainProductFindImgStyle"
                />
              </Link>
            </div>
            <BsHeart
              className="MainFindHeratStyle cursorPointer"
              onClick={() => {
                onAddToCart(product, shoppingCart, dispatch, products);
                handleModalToggle();
              }}
            />
            <div className="flex-center MainFindNameAndPriceBox">
              <div className="MainFindNameStyle">{product.name}</div>
              <div className="MainFindPriceStyle">
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

export default React.memo(MainCenter);
