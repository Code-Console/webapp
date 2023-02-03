import React from "react";
import Styles from "../components/Styles";
import AnimationFiberCanvas from "../components/Fiber/Animtion";
import HTMLHeader from "../components/UI/HTMLHeader";
import Menu from "../components/UI/Menu";
import MakersFundUI from "../components/UI/MakersFund/MakersFundUI";
import { AnimType } from "../interfaces";
import { useAnimType, useIsOrbitControl } from "../components/hooks";
import RevealUI from "../components/UI/Reveal/RevealUI";
import BlockXyzUI from "../components/UI/BlockXYZ/BlockXyzUI";
import PointCloudUI from "../components/UI/PointCloudUI";

const GamesWrapper = () => {
  const animationType = useAnimType();
  const isOrbitControl = useIsOrbitControl();

  const getUI = () => {
    switch (animationType) {
      case AnimType.MAKERS_FUND:
        return <MakersFundUI />;
      case AnimType.REVEAL:
        return <RevealUI />;
      case AnimType.BlockXYZ:
        return <BlockXyzUI />;
      case AnimType.POINT_CLOUD:
        return <PointCloudUI />;
    }
    return null;
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [animationType]);
  return (
    <>
      <HTMLHeader />
      <Menu />
      {getUI()}
      <AnimationFiberCanvas
        animationType={animationType}
        isOrbitControl={isOrbitControl}
      />
      <Styles />
    </>
  );
};

export default GamesWrapper;
