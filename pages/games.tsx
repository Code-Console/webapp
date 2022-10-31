import React from "react";
import FiberCanvas from "../components/Fiber/FiberCanvas";
import Styles from "../components/Styles";
import Games from "../components/UI/Games";
import HTMLHeader from "../components/UI/HTMLHeader";

const GamesWrapper = () => {
  return (
    <>
      <HTMLHeader />
      <FiberCanvas />
      <Games />
      <Styles />
    </>
  );
};

export default GamesWrapper;
