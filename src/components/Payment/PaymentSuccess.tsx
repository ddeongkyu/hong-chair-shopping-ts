import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { AiFillShopping, AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import getTotalPrice from "../../util/getTotalPrice";
import getShippingCost from "../../util/getShippingCost";
// import getGSAPopacity from "../../util/getGSAPopacity";
import { RootState } from "../..";
function PaymentSuccess() {
  const navigate = useNavigate();
  const onGoToBackPage = () => {
    navigate(-1);
  };
  const { shoppingCart } = useSelector((state: RootState) => {
    return state.product;
  });
  const totallyFinalCost: number =
    getTotalPrice(shoppingCart) + getShippingCost(shoppingCart);
  const [privacyClick, setPrivacyClick] = useState([
    {
      id: 1,
      value: false,
    },
    {
      id: 2,
      value: false,
    },
  ]);
  const onClickPrivacy = (): void => {
    const mapPrivacy = privacyClick.map((content) =>
      content.id === 1 ? { ...content, value: !content.value } : content
    );
    setPrivacyClick(mapPrivacy);
  };
  const onClickPrivacy2 = (): void => {
    const mapPrivacy = privacyClick.map((content) =>
      content.id === 2 ? { ...content, value: !content.value } : content
    );
    setPrivacyClick(mapPrivacy);
  };
  const privacy1: boolean = privacyClick.filter((id) => id.id === 1)[0].value;
  const privacy2: boolean = privacyClick.filter((id) => id.id === 2)[0].value;
  //   useEffect(() => {
  //     getGSAPopacity(".paymentTotalBox");
  //   }, []);
  return (
    <div className="flex-vertical-center paymentTotalBox">
      <div className="flex-vertical-center paymentTopIconBox">
        <BiArrowBack
          className="paymentTopIconStyle cursorPointer"
          onClick={onGoToBackPage}
        />
        <div className="paymentPaymentTextStyle">Payment</div>
        <div className="paymentTopIconRight">
          <AiFillShopping className="paymentTopIconStyle cursorPointer" />
        </div>
      </div>
      <div className="paymentPrivacyBox">
        <div className="paymentPrivacyName">DDEONGKYU HONG</div>
        <div className="paymentPrivacyPhoneNumber">010-1234-5678</div>
        <div className="paymentPrivacyAdress">
          27 King's College Cir, Toronto, Ontario M5S 1A1, Canada
        </div>
        <div className="flex-center paymentPrivacyShippingRequestBox">
          <input
            className="paymentPrivacyShippingRequest"
            placeholder="Shipping Requests"
          />
        </div>
      </div>
      <div className="paymentOrderedProductBox">
        <div className="paymentOrderedText">Ordered Product</div>
        {shoppingCart.map((product) => (
          <div className="paymentOrderedProduct" key={product.idAndColor}>
            <div className="">
              <img
                alt="product"
                src={product.src}
                className="paymentOrderedProductImg"
              />
            </div>
            <div className="paymentOrderedProductInformationBox">
              <div className="paymentOrderedProductName">{product.name}</div>
              <div className="paymentOrderedProductPriceQuantityShip">
                Color : {product.color}
              </div>
              <div className="paymentOrderedProductPriceQuantityShip">
                $&nbsp;{product.price}
              </div>
              <div className="paymentOrderedProductPriceQuantityShip">
                Amount: &nbsp;{product.quantity}
              </div>
              <div className="paymentOrderedProductPriceQuantityShip">
                shipping:&nbsp;
                {product.shipping}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="paymentMethodOfPaymentBox">
        <div className="paymentMethodText">METHOD OF PAYMENT</div>
        <div className="flex-center">
          <div className="flex-center paymentMethodCartRegistration">
            <div className="paymentMethodBank">WOORI BANK</div>
            <div className="paymentMethodNumber">
              ACCOUNT NUMBER: <br />
              1002-222-222222
            </div>
          </div>
        </div>
      </div>
      <div className="paymentFinalPaymentBox">
        <div className="flex-vertical-center paymentFinalPaymentFinal">
          <div>Final Cost</div>
          <div className="paymentFinalPaymentRight">
            $&nbsp;{totallyFinalCost}
          </div>
        </div>
        <div className="flex-vertical-center paymentFinalDetailBox">
          <div>Product Amount</div>
          <div className="paymentFinalDetailRight">
            $&nbsp;{getTotalPrice(shoppingCart)}
          </div>
        </div>
        <div className="flex-vertical-center paymentFinalDetailBox">
          <div>Discount</div>
          <div className="paymentFinalDetailRight">$&nbsp;0</div>
        </div>

        <div className="flex-vertical-center paymentFinalDetailBox">
          <div>Shipping Cost</div>
          <div className="paymentFinalDetailRight">
            $&nbsp;{getShippingCost(shoppingCart)}
          </div>
        </div>
      </div>
      <div className="flex-vertical-center paymentPolicyGuideBox">
        <div className="paymentPolicyBox">
          <div className="flex-center paymentPolicyGuideName">
            <span>
              개인정보 제 3자 제공고지&nbsp;
              {privacy1 ? (
                <AiOutlineUp
                  className="cursorPointer paymentPolicyGuideIcon"
                  onClick={onClickPrivacy}
                />
              ) : (
                <AiOutlineDown
                  className="cursorPointer paymentPolicyGuideIcon"
                  onClick={onClickPrivacy}
                />
              )}
            </span>
          </div>
          {privacy1 ? (
            <div className="paymentPolicyDetail">
              제공받는자: 몰라
              <br />
              목적: 판매자와 구매자의 거래의 원활한 진행, 본인 의사의 확인, 고객
              상담 및 불만처리, 상품과 경품배송을 위한 배송지 확인 등 항목: ID,
              성명, 전화번호, 휴대전화번호, 배송지 주소, 이메일주소(선택시),
              통관고유부호(선택시), 생년월일(선택시)
              <br />
              보유기간: 배송완료 후 1달
            </div>
          ) : null}
        </div>
        <div className="paymentPolicyBox">
          <div className="flex-center paymentPolicyGuideName">
            <span>
              전자상거래 구매안전 서비스 안내&nbsp;
              {privacy2 ? (
                <AiOutlineUp
                  className="paymentPolicyGuideIcon"
                  onClick={onClickPrivacy2}
                />
              ) : (
                <AiOutlineDown
                  className="paymentPolicyGuideIcon"
                  onClick={onClickPrivacy2}
                />
              )}
            </span>
          </div>
          {privacy2 ? (
            <div className="paymentPolicyDetail">
              G마켓의 모든 판매자는 안전거래를 위해 구매금액, 결제수단에
              상관없이 모든 거래에 대하여 지마켓글로벌 유한책임회사의
              구매안전서비스(에스크로)를 제공하고 있습니다.
              <br />
              지마켓글로벌 유한책임회사의 전자금융거래법에 따른 결제대금예치업
              등록번호는 02-006-00008입니다.
              <br />
              등록여부는 금융감독원 홈페이지(www.fss.or.kr)의
              업무자료-인허가업무안내-전자금융업등록현황에서 확인하실 수
              있습니다.
            </div>
          ) : null}
        </div>
      </div>
      <div className="paymentPayBtnBox">
        <button className="paymentPayBtnStyle cursorPointer">
          PAY&nbsp;${totallyFinalCost}
        </button>
      </div>
    </div>
  );
}
export default PaymentSuccess;
