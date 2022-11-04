import React, { useState, useCallback } from "react";
import { VscGrabber } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import { setSearchedProducts } from "../../slices/productSlice";
import { useNavigate } from "react-router-dom";
import ModalPortal from "../../Portal/ModalPortal";
import SideBarMenu from "../SideBarMenu/SideBarMenu";
import SearchedProducts from "../SearchedProducts/SearchedProducts";
import { RootState } from "../..";
import { Dispatch } from "@reduxjs/toolkit";
function MainHeader() {
  const dispatch: Dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSideBarComponentRendered, setIsSideBarComponentRendered] =
    useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [handleSearchedComponents, setHandleSearchedComponents] =
    useState(false);
  const [handleToggleSearch, setHandleToggleSearch] = useState(false);
  const [isSearchedComponentRendered, setIsSearchedComponentRendered] =
    useState(false);
  const { products } = useSelector((state: RootState) => {
    return state.product;
  });

  const handleSearchToggle = useCallback(() => {
    if (searchOpen) {
      setSearchOpen(false);
      setHandleToggleSearch(false);
      setTimeout(() => {
        setIsSearchedComponentRendered(false);
        dispatch(setSearchedProducts([]));
      }, 250);
    } else if (!searchOpen) {
      setSearchOpen(true);
      setHandleToggleSearch(true);
    }
  }, [dispatch, searchOpen]);
  const onKeyPressEscape = useCallback(
    (e: any) => {
      if (e.keyCode === 27) {
        setTimeout(() => {
          setIsSearchedComponentRendered(false);
          dispatch(setSearchedProducts([]));
        }, 250);
        setSearchOpen(false);
        setHandleToggleSearch(false);
      }
      e.stopPropagation();
    },
    [dispatch]
  );
  const onGoShoppingCart = () => {
    navigate("/ShoppingCart");
  };
  const handleSideBarToggle = useCallback(() => {
    if (!isSideBarComponentRendered) {
      setIsSideBarComponentRendered(true);
      setHandleSearchedComponents(true);
    } else if (isSideBarComponentRendered) {
      setHandleSearchedComponents(false);
      setTimeout(() => {
        setIsSideBarComponentRendered(false);
      }, 250);
    }
  }, [isSideBarComponentRendered]);
  const handleSearchedToggle = useCallback(() => {
    if (isSearchedComponentRendered) {
      setHandleToggleSearch(false);
      setTimeout(() => {
        setIsSearchedComponentRendered(false);
      }, 250);
    } else if (!isSearchedComponentRendered) {
      setIsSearchedComponentRendered(true);
      setHandleToggleSearch(true);
    }
  }, [isSearchedComponentRendered]);
  const onKeyPressEnter = useCallback(
    (e: any) => {
      const searchedProductsArray = products.filter((item) =>
        item.name.match(
          new RegExp(e.target.value === "" ? null : e.target.value, "i")
        )
      );
      if (e.key === "Enter") {
        dispatch(setSearchedProducts(searchedProductsArray));
        setIsSearchedComponentRendered(true);
        setHandleToggleSearch(true);
      }
    },
    [dispatch, products]
  );

  return (
    <div>
      <div className="flex-vertical-center HeadIconBlock">
        {isSideBarComponentRendered ? (
          <AiOutlineClose
            className="IconStyle cursorPointer"
            onClick={handleSideBarToggle}
          />
        ) : (
          <VscGrabber
            onClick={handleSideBarToggle}
            className="IconStyle cursorPointer"
          />
        )}
        <div className="IConWrapping">
          <BsSearch
            onClick={handleSearchToggle}
            className="IconStyleWrapping cursorPointer"
          />
          <BiShoppingBag
            className="IconStyleWrappingBag cursorPointer"
            onClick={onGoShoppingCart}
          />
        </div>
      </div>
      {searchOpen && (
        <div className="flex-center MainSearchTotal">
          <img
            alt="SearchIcon"
            src={"img/pngwing.com.png"}
            className="MainSearchInputLeftIcon"
          />
          <input
            placeholder="What are you looking for?"
            className="MainSearchInputStyle"
            onKeyPress={onKeyPressEnter}
            onKeyDown={onKeyPressEscape}
          />
          <AiOutlineClose
            className="cursorPointer MainSearchInputRightIcon"
            onClick={handleSearchToggle}
          />
        </div>
      )}
      {isSearchedComponentRendered && (
        <ModalPortal>
          <SearchedProducts
            onToggle={handleToggleSearch}
            onClose={handleSearchedToggle}
          />
        </ModalPortal>
      )}
      {isSideBarComponentRendered && (
        <ModalPortal>
          <SideBarMenu onToggle={handleSearchedComponents} />
        </ModalPortal>
      )}
    </div>
  );
}

export default React.memo(MainHeader);
