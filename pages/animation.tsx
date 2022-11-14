import React from "react";
import Styles from "../components/Styles";
import AnimationFiberCanvas from "../components/Fiber/Animtion";
import HTMLHeader from "../components/UI/HTMLHeader";
import Menu from "../components/UI/Menu";
import MakersFundUI from "../components/UI/MakersFund/MakersFundUI";

const GamesWrapper = () => {
  return (
    <>
      <HTMLHeader />
      <Menu />
      <MakersFundUI />
      <AnimationFiberCanvas />
      <Styles />
    </>
  );
};

export default GamesWrapper;
