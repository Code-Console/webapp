import React from "react";
import Styles from "../components/Styles";
import AnimationFiberCanvas from "../components/Fiber/Animtion";
import HTMLHeader from "../components/UI/HTMLHeader";
import Menu from "../components/UI/Menu";
import MakersFundUI from "../components/UI/MakersFund/MakersFundUI";
import { AnimType } from "../interfaces";
import { useAnimType } from "../components/hooks";

const GamesWrapper = () => {
  const animationType = useAnimType();
  const getUI = () => {
    switch (animationType) {
      case AnimType.MAKERS_FUND:
        return <MakersFundUI />;
    
    }
    return null;
  };
  return (
    <>
      <HTMLHeader />
      <Menu />
      {getUI()}
      <AnimationFiberCanvas />
      <Styles />
    </>
  );
};

export default GamesWrapper;
