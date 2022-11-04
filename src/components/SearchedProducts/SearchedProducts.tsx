import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import getPreventScrolling from "../../util/getPreventScrolling";
import { MdRemoveShoppingCart } from "react-icons/md";
import { RootState } from "../..";
// import getGSAPtimelineOpacity from "../../util/getGSAPtimelineOpacity";
function SearchedProducts({ onToggle, onClose }) {
  const { searchedProducts } = useSelector((state: RootState) => {
    return state.product;
  });
  const searchedRef = useRef<any>();
  //   const tl = useRef();
  useEffect(() => {
    getPreventScrolling();
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  //   useEffect(() => {
  //     getGSAPtimelineOpacity(tl, searchedRef);
  //   }, []);
  //   useEffect(() => {
  //     onToggle ? tl.current.play() : tl.current.reverse();
  //   }, [onToggle]);
  return (
    <div className="searchedTotalBox" ref={searchedRef}>
      <div className="searchedProductsWrappingBox" onClick={onClose}>
        {Boolean(!searchedProducts.length) && (
          <div className="flex-vertical-center searchedProductsNothingTotalBox">
            <div className="searchedProductsNothingCartIcon">
              <MdRemoveShoppingCart />
            </div>
            <div className="searchedProductsNothingCartText">
              Nothing Found!
            </div>
          </div>
        )}
        {searchedProducts.map((product) => (
          <div
            key={product.id}
            className="searchedProductsBox"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="searchedProductsImgBox">
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.src}
                  alt={product}
                  className="searchedProductsImgStyle"
                />
              </Link>
            </div>
            <div className="flex-center searchedProductsInformationBox">
              <div className="flex-center searchedProductsInformation">
                {product.name}
              </div>
              <div className="flex-center searchedProductsInformation">
                price&nbsp;:&nbsp;$ {product.price}
              </div>
              <div className="flex-center searchedProductsInformation">
                Shipping Cost&nbsp;:&nbsp;$ {product.shipping}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(SearchedProducts);
