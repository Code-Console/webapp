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
      watchGlb.scene.scale.set(0.1, 0.1, 0.1);
    }
  }, [watchGlb]);

  // mesh.scale.set(.01,.01,.01); 
  useFrame((state) => {
    state.clock.getElapsedTime();
    uniforms.u_time.value += 0.1;
  });
  
  return (
    <group ref={ref} {...props} dispose={null}>
      <primitive object={watchGlb.scene} dispose={null} />
      <CameraController />
    </group>
  );
};

export default Gradient;
