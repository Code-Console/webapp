import React from "react";
import * as THREE from "three";
import CameraController from "../../CameraController";
import { useFrame } from "@react-three/fiber";
import { dealWithKeyboard } from "../../../util/Keyboard";
import { pointShaderAnim } from "../../../Shaders";

const BlockXYZ = (props: any) => {
  const ref: any = React.useRef();

  const mesh = new THREE.Points(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.ShaderMaterial({
      extensions: {
        derivatives: true, //"#extensions GL_OES_standard_derivatives:enable",
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
        viewport: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uMouse: { value: new THREE.Vector2(0, 0) },
        resolution: { value: new THREE.Vector4() },
      },
      vertexShader: pointShaderAnim.vertex,
      fragmentShader: pointShaderAnim.fragment,
    })
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
  });
  React.useEffect(() => {
    document.addEventListener("keydown", dealWithKeyboard);
  }, []);
  return (
    <group ref={ref} {...props} dispose={null}>
      <CameraController />
      <primitive object={mesh} dispose={null} />
      <mesh
        geometry={new THREE.BoxGeometry(0.46, 0.46, 0.46)}
        material={new THREE.MeshNormalMaterial()}
        position={[0, 0, 0]}
      />
    </group>
  );
};

export default BlockXYZ;
