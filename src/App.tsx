import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import AllRoute from "./Route/AllRoute";
import { setSelectedColor } from "./slices/productSlice";
import { getProducts } from "./slices/productSlice";
function App() {
  const dispatch: Dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSelectedColor(""));
    dispatch(getProducts());
  }, []);
  return (
    <>
      <AllRoute />;
    </>
  );
}

export default App;
