import * as React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { AnimType } from "../../../interfaces";
import { environmentImagePath } from "../../Assets";
import DisplacementShader from "./DisplacementShader";
import ToyShader from "./ToyShader";
import { SpaceDust } from "../SpaceDust";
import { useAnimType } from "../../hooks";
import TextParticle from "./TextParticle";
import RandomShader from "./RandomShader";
import MakersFund from "./MakersFund";
import BlockXYZ from "./BlockXYZ";
import AnimationModel from "../AnimationModel";
import TextAnim from "./TextAnim";
import Reveal from "./Reveal";
import Model from "../Model";
const AnimationFiberCanvas = () => {
  const animationType = useAnimType();
  const getAnim = () => {
    switch (animationType) {
      case AnimType.BIRD:
        return <AnimationModel />;
      case AnimType.WATCH:
        return <Model opacity={0.51} />;
        return;
      case AnimType.DISPLACEMENT_SHADER:
        return <DisplacementShader />;
      case AnimType.SPACE_DUST:
        return <SpaceDust count={1000} />;
      case AnimType.TEXT_DUST_ANIM:
        return <TextParticle />;
      case AnimType.TOY_SHADER:
        return <ToyShader />;
      case AnimType.MAKERS_FUND:
        return (
          <>
            <RandomShader />
            <MakersFund />
          </>
        );
      case AnimType.BlockXYZ:
        return <BlockXYZ />;
      case AnimType.TEXT_STRACE:
        return <TextAnim />;
      case AnimType.REVEAL:
        return (
          <>
            <BlockXYZ />
            <Reveal />
          </>
        );
      default:
        return <RandomShader />;
    }
  };
  return (
    <>
      <React.Suspense fallback={null}>
        <Canvas
          style={{ position: "fixed", zIndex: "-1", top: "0" }}
          gl={{ antialias: true, outputEncoding: THREE.sRGBEncoding }}
        >
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Environment files={environmentImagePath} />
          {getAnim()}
        </Canvas>
      </React.Suspense>
    </>
  );
};
export default AnimationFiberCanvas;
