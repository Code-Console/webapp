import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { randomShader } from "../../Shaders";
const RandomShader = (props: any) => {
  const ref: any = React.useRef();
  const uniforms = {
    u_resolution: { value: new THREE.Vector3(128, 128, 1) },
    u_time: { value: 1.0 },
  };
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(16, 16, 16),
    new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: randomShader.vertex,
      fragmentShader: randomShader.fragment,
    })
  );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    ref.current.position.set(0, 0, -50);
    ref.current.rotation.set(time, 0, -50);
    uniforms.u_time.value +=.01;
  });
  return (
    <group ref={ref} {...props} dispose={null}>
      <primitive object={mesh} dispose={null} />
    </group>
  );
};
export default RandomShader;
