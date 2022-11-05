import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { AnimType } from "../../../interfaces";
import { environmentImagePath } from "../../Assets";
import DisplacementShader from "./DisplacementShader";
import ToyShader from "./ToyShader";
const FiberCanvas = ({ animationType }: { animationType?: AnimType }) => {
  const getAnim = () => {
    switch (animationType) {
      case AnimType.DISPLACEMENT_SHADER:
        return <DisplacementShader />;
      case AnimType.TOY_SHADER:
      default:
        return <ToyShader />;
    }
  };
  return (
    <>
      <React.Suspense fallback={null}>
        <Canvas
          style={{ position: "fixed", zIndex: "-1" }}
          gl={{ antialias: true }}
        >
          <color attach="background" args={[0, 0, 0]} />
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
export default FiberCanvas;
