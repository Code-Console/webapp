import React from "react";
import Styles from "../components/Styles";
import AnimationFiberCanvas from "../components/Fiber/Animtion";
import HTMLHeader from "../components/UI/HTMLHeader";
import Menu from "../components/UI/Menu";
import MakersFundUI from "../components/UI/MakersFund/MakersFundUI";
import { AnimType } from "../interfaces";
import { useAnimType } from "../components/hooks";
import RevealUI from "../components/UI/Reveal/RevealUI";

const GamesWrapper = () => {
  const animationType = useAnimType();
  const getUI = () => {
    switch (animationType) {
      case AnimType.MAKERS_FUND:
        return <MakersFundUI />;
      case AnimType.REVEAL:
        return <RevealUI />;
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
