import React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { gradientShader } from "../../../Shaders";
import { multiColorImg, skullGLBPath } from "../../../Assets";
import CameraController from "../../CameraController";
import { useGLTF } from "@react-three/drei";

const Gradient = (props: any) => {
  const ref: any = React.useRef();
  const watchGlb = useGLTF(skullGLBPath);
  const uniforms = {
    u_time: { value: 0 },
    sky: { value: new THREE.TextureLoader().load(multiColorImg) },
  };
  const gradientMet = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: gradientShader.vertex,
    fragmentShader: gradientShader.fragment,
  });
  React.useEffect(() => {
    if (watchGlb) {
      watchGlb.scene.traverse((object: any) => {
        if (!object["isMesh"]) return;
        if (object["material"].isMaterial) {
          object["material"] = gradientMet;
        }
        object.geometry.center();
      });
      watchGlb.scene.scale.set(0.2, 0.2, 0.2);
    }
  }, [watchGlb]);
  useFrame((state) => {
    state.clock.getElapsedTime();
    const mesh = watchGlb?.scene?.children[0] as THREE.Mesh;
    const material = mesh?.material as THREE.ShaderMaterial;
    if (material?.uniforms?.u_time) material.uniforms.u_time.value += 0.1;
  });

  return (
    <group {...props} dispose={null}>
      <primitive ref={ref} object={watchGlb.scene} dispose={null} />
      <CameraController />
    </group>
  );
};

export default Gradient;
