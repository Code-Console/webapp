import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { ogImg } from "../../Assets";
import { troyShader } from "../../Shaders";
const ToyShader = (props: any) => {
  const ref: any = React.useRef();
  const texture = new THREE.TextureLoader().load(ogImg);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  const uniforms = {
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector3(1, 1, 1) },
    iChannel0: { value: texture },
  };
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(16, 32, 16),
    new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: troyShader.vertex,
      fragmentShader: troyShader.fragment,
    })
  );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    ref.current.position.set(0, 0, -50);
    ref.current.rotation.set(time, 0, -50);
    uniforms.iTime.value = time;
  });
  return (
    <group ref={ref} {...props} dispose={null}>
      <primitive object={mesh} dispose={null} />
    </group>
  );
};
export default ToyShader;
