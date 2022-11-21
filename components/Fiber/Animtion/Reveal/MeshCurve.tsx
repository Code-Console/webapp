import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { birdImg } from "../../../Assets";
import { moveTexShader } from "../../../Shaders";
import CameraController from "../../CameraController";
import { setPositionValue } from "./actions";
const MeshCurve = () => {
  const textureBird = new THREE.TextureLoader().load(birdImg);
  const uniforms = {
    uvScale: { value: new THREE.Vector2(1, 1) },
    u_time: { value: 1 },
    map: { value: textureBird },
  };
  const mesh = new THREE.Mesh(
    new THREE.TorusKnotGeometry(128, 48, 128, 16),
    new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: moveTexShader.vertex,
      fragmentShader: moveTexShader.fragment,
      transparent:true,
      wireframe:true
    })
  );
  setPositionValue({
    trigger: ".RevealUI",
    start: "top top",
    end: `+=${document.body.scrollHeight}`,
    movePos: new THREE.Vector3(0, 400, -500),
    position: mesh.position,
  });
  
  mesh.position.set(0, -200, -500);
  useFrame(() => {
    uniforms.u_time.value++;
    const rot = uniforms.u_time.value * 0.005;
    mesh.rotation.set(0, Math.sin(rot), rot);
  });
  return (
    <>
      <CameraController />
      <primitive object={mesh} dispose={null} />
    </>
  );
};

export default MeshCurve;
//
