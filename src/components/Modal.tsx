import React, { useEffect, useRef } from "react";
import { FcAcceptDatabase } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import getPreventScrolling from "../util/getPreventScrolling";
// import getGSAPtimelineOpacity from "../util/getGSAPtimelineOpacity";
const Modal = () => {
  // props : { onToggle, onClose }
  const modalRef: any = useRef();
  // const tl = useRef();
  const navigate = useNavigate();
  const onGoToShoppingCart = () => {
    navigate("/ShoppingCart");
  };
  useEffect(() => {
    getPreventScrolling();
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  // useEffect(() => {
  //   getGSAPtimelineOpacity(tl, modalRef);
  // }, []);
  // useEffect(() => {
  //   onToggle ? tl.current.play() : tl.current.reverse();
  // }, [onToggle]);

  return (
    <div className="ModalTotalBox" onClick={onClose} ref={modalRef}>
      <div className="ModalInnerTotalBox" onClick={(e) => e.stopPropagation()}>
        <div className="flex-center ModalInner">
          <div className="flex-center ModalInnerIconBlock">
            <FcAcceptDatabase className="ModalInnerIconStyle" />
          </div>
          <div className="flex-center ModalInnerTextBlock">
            <div className="ModalInnerTextStyle">Thank you for you CHOICE!</div>
            <div className="ModalInnerTextStyleBuy">
              Successfully added to shopping cart!
            </div>
          </div>
          <div className="ModalInnerBtnBlock">
            <button
              className="ModalInnerBtnStyle cursorPointer"
              onClick={onGoToShoppingCart}
            >
              GO TO SHOPPING CART!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
