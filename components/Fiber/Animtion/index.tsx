import * as React from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { AnimType } from "../../../interfaces";
import { environmentImagePath } from "../../Assets";
import DisplacementShader from "./DisplacementShader";
import { SpaceDust } from "../SpaceDust";
import CameraController from "../CameraController";

const TextParticle = React.lazy(() => import("./TextParticle"));
const RandomShader = React.lazy(() => import("./RandomShader"));
const ToyShader = React.lazy(() => import("./ToyShader"));
const BlockXYZ = React.lazy(() => import("./BlockXYZ"));
const MakersFund = React.lazy(() => import("./MakersFund"));
const AnimationModel = React.lazy(() => import("../AnimationModel"));
const TextAnim = React.lazy(() => import("./TextAnim"));
const Reveal = React.lazy(() => import("./Reveal"));
const Unseen = React.lazy(() => import("./Unseen"));
const Gradient = React.lazy(() => import("./Gradient"));
const NoiseSphere = React.lazy(() => import("./NoiseSphere"));
const PostEffects = React.lazy(() => import("./Outline"));
const SelectFace = React.lazy(() => import("./SelectFace"));
const Globe = React.lazy(() => import("./Globe"));

const PointCloud = React.lazy(() => import("./PointCloud"));
const Auditorium = React.lazy(() => import("../Meet/Auditorium"));
const WorldGlobe = React.lazy(() => import("../WorldGlobe"));

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
      return (
        <>
          <CameraController />
          <WorldGlobe />
        </>
      );
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
    case AnimType.LEGENDARY:
      return (
        <>
          <PostEffects />
          <Unseen />
        </>
      );
    case AnimType.AUDITORIUM:
      return <Auditorium />;
    case AnimType.POINT_CLOUD:
      return <PointCloud />;
    default:
      return <RandomShader />;
  }
};
const AnimationFiberCanvas = ({
  animationType,
  isOrbitControl = false,
}: {
  animationType: AnimType;
  isOrbitControl: boolean | undefined;
}) => {
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
        {isOrbitControl && <CameraController />}
      </Canvas>
    </React.Suspense>
  );
};
export default AnimationFiberCanvas;
