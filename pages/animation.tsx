import React from "react";
import Styles from "../components/Styles";
import Animation from "../components/Fiber/Animtion";
import HTMLHeader from "../components/UI/HTMLHeader";
import Menu from "../components/UI/Menu";

const GamesWrapper = () => {
  return (
    <>
      <HTMLHeader />
      <Menu />
      <Animation />
      <Styles />
    </>
  );
};

export default GamesWrapper;
