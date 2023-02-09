import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import React from "react";
import { Environment } from "@react-three/drei";
import CameraController from "../CameraController";
import { environmentImagePath } from "../../Assets";
import { ConfigurationModel } from "../../../interfaces";
import MensCasualShirt from "./MensCasualShirt";

const Configuration3DChild = ({
  configurationType,
}: {
  configurationType: ConfigurationModel;
}) => {
  const { camera } = useThree();
  React.useEffect(() => {
    camera?.position.set(0, 0, 5);
    camera?.rotation.set(0, 0, 0);
  }, [configurationType]);
  switch (configurationType) {
    case ConfigurationModel.MENS_CASUAL_SHIRT:
      return <MensCasualShirt />;

    default:
      return <MensCasualShirt />;
  }
};
const Configuration3D = ({
  configurationType,
  isOrbitControl = false,
}: {
  configurationType: ConfigurationModel;
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
        <directionalLight position={[-10, 10, -10]} />
        <Environment files={environmentImagePath} />
        <Configuration3DChild configurationType={configurationType} />
        {isOrbitControl && <CameraController />}
      </Canvas>
    </React.Suspense>
  );
};

export default Configuration3D;
