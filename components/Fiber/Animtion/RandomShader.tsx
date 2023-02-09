import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { birdImg, distinctiveImg } from "../../Assets";
import { galaxyShader } from "../../Shaders";
const RandomShader = (props: any) => {
  const ref: any = React.useRef();
  const texture = new THREE.TextureLoader().load(distinctiveImg);
  const texture1 = new THREE.TextureLoader().load(birdImg);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  const uniforms = {
    iResolution: { value: new THREE.Vector3(1024, 1024, 1024) },
    iTime: { value: 1.0 },
    iChannel0: { value: texture1 },
    iChannel1: { value: texture1 },
    iChannel2: { value: texture1 },
    iMouse: { value: new THREE.Vector4() },
    uPerspective: { value: 0.1 },
    uViewport: { value: new THREE.Vector4(1, 1, 128, 128) },
    uMaterialColor: { value: new THREE.Vector4(0.1, 1, 1, 1) },
  };
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(512, 512),
    new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: galaxyShader.vertex,
      fragmentShader: galaxyShader.fragment,
    })
  );
  const noise = new Float32Array(4);
  for (let i = 0; i < 4; i++) {
    noise[i] = Math.random() * 5;
  }
  mesh.geometry.setAttribute("aPosition", new THREE.BufferAttribute(noise, 1));
  mesh.geometry.setAttribute("aDirection", new THREE.BufferAttribute(noise, 1));
  const eventMove = (e: any) => {
    uniforms.iMouse.value.set(e.clientX * 0.01, e.clientY * 0.01, 0, 0);
  };
  React.useEffect(() => {
    document.addEventListener("mousemove", eventMove);
  }, []);
  useFrame(() => {
    // const time = state.clock.getElapsedTime();
    ref.current.position.set(0, 0, -20);
    // ref.current.rotation.set(time, 0, -50);
    uniforms.iTime.value += 0.01;
  });
  return (
    <group ref={ref} {...props} dispose={null}>
      <primitive object={mesh} dispose={null} />
      <mesh
        geometry={new THREE.BoxGeometry(16, 16, 16)}
        material={new THREE.MeshNormalMaterial()}
        position={[50, 0, 0]}
      />
    </group>
  );
};
export default RandomShader;
