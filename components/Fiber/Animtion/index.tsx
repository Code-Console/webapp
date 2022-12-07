import * as React from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
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
import Gradient from "./Gradient";
import NoiseSphere from "./NoiseSphere";
import PostEffects from "./Outline";
import SelectFace from "./SelectFace";
import Globe from "./Globe";

const CanvasDefaultValues = ({
  animationType,
}: {
  animationType: AnimType;
}) => {
  const { camera } = useThree();
  React.useEffect(() => {
    camera?.position.set(0, 0, 5);
    camera?.rotation.set(0, 0, 0);
  }, [animationType]);
  switch (animationType) {
    case AnimType.BIRD:
      return <AnimationModel />;
    case AnimType.WATCH:
      return <Model opacity={0.51} />;
    case AnimType.DISPLACEMENT_SHADER:
      return (
        <>
          <PostEffects isGlitch={true} />
          <DisplacementShader />
        </>
      );
    case AnimType.SPACE_DUST:
      return <SpaceDust count={1000} />;
    case AnimType.TEXT_DUST_ANIM:
      return <TextParticle />;
    case AnimType.TOY_SHADER:
      return (
        <>
          <PostEffects />
          <ToyShader />
        </>
      );
    case AnimType.MAKERS_FUND:
      return (
        <>
          <RandomShader />
          <MakersFund />
        </>
      );
    case AnimType.BlockXYZ:
      return (
        <>
          <NoiseSphere />
          <BlockXYZ />
        </>
      );
    case AnimType.TEXT_STRACE:
      return <TextAnim />;
    case AnimType.REVEAL:
      return (
        <>
          <BlockXYZ />
          <Reveal />
        </>
      );
    case AnimType.YogForm:
      return (
        <>
          <PostEffects />
          <Gradient />
        </>
      );
    case AnimType.STRIP_GLOBE:
      return <Globe />;
    case AnimType.FACE_SELECTION:
      return (
        <>
          <PostEffects />
          <SelectFace />
        </>
      );
    default:
      return <RandomShader />;
  }
};
const AnimationFiberCanvas = () => {
  const animationType = useAnimType();
  return (
    <React.Suspense fallback={null}>
      <Canvas
        style={{ position: "fixed", zIndex: "-1", top: "0" }}
        gl={{ antialias: true, outputEncoding: THREE.sRGBEncoding }}
        className="canvas-container"
        id="canvas-container-id"
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Environment files={environmentImagePath} />
        <CanvasDefaultValues animationType={animationType} />
      </Canvas>
    </React.Suspense>
  );
};
export default AnimationFiberCanvas;
