import React from "react";
import MainHeader from "./MainHeader";
import MainCenter from "./MainCenter";
import MainFooter from "./MainFooter";

function MainComponents() {
  return (
    <div className="MainTotalBox">
      <MainHeader />
      <MainCenter />
      <MainFooter />
    </div>
  );
}

export default MainComponents;
