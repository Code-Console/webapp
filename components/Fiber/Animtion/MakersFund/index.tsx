import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
const MakersFund = (props: any) => {
  const group = new THREE.Group();
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array([
    -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0,

    1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
  ]);
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
  });
  return (
    <group {...props} dispose={null}>
      <primitive object={group} dispose={null} />
    </group>
  );
};
export default MakersFund;
