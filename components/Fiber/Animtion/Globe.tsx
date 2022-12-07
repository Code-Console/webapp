import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { earthImg } from "../../Assets";
import { globeShader } from "../../Shaders";
import CameraController from "../CameraController";
const Globe = (props: any) => {
  const check = new THREE.BufferGeometry();
  const ref: any = React.useRef();
  const texture = useTexture({
    transparent: `${earthImg}`,    
  });
  const uniforms = {
    u_time: { value: 0 },
    u_uv: { value: new THREE.Vector2() },
    u_texture: { value: texture.transparent },
  };
  const geometry = new THREE.SphereGeometry(2, 264, 264);
  const mesh = new THREE.Points(
    geometry,
    new THREE.ShaderMaterial({
      uniforms: uniforms,
      fragmentShader: globeShader.fragment,
      vertexShader: globeShader.vertex,
      transparent: true,
    })
  );
  check.copy(geometry);

  let count = 0;

  useFrame(() => {
    const copy = check?.attributes.position;
    count++;
    for (
      let i = 0;
      count % 200 < 100 &&
      geometry &&
      check &&
      i < geometry.attributes.position.array.length;
      i++
    ) {
      geometry.attributes.position.setXYZ(
        i,
        copy.getX(i) - Math.random() * 0.04,
        copy.getY(i) - Math.random() * 0.04,
        copy.getZ(i) - Math.random() * 0.02
      );
      geometry.attributes.position.needsUpdate = true;
    }
    // mesh.rotation.set(count*.01,count*.01,count*.001);
  });
  return (
    <group ref={ref} {...props} dispose={null}>
      <primitive object={mesh} dispose={null} />
      <mesh>
        <sphereGeometry args={[1.95, 32, 32]} />
        <meshBasicMaterial color={0x081c36} />
      </mesh>
      <CameraController enableZoom={false} />
    </group>
  );
};

export default Globe;
