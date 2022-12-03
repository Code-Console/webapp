import React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { gradientShader } from "../../Shaders";
import { gsap } from "gsap/dist/gsap";
import { multiColorImg } from "../../Assets";
const NoiseSphere = (props: any) => {
  const uniforms = {
    u_time: { value: 0 },
    sky: { value: new THREE.TextureLoader().load(multiColorImg) },
  };
  const gradientMet = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: gradientShader.vertex,
    fragmentShader: gradientShader.fragment,
  });
  const meshObj = new THREE.Mesh(
    new THREE.SphereGeometry(1, 8, 8),
    gradientMet
  );
  meshObj.position.set(0, 0, -2);
  const meshArray: any[] = [];
  for (let i = 0; i < 4; i++) {
    const meshObjChild = meshObj.clone();
    meshArray.push(meshObjChild);
    const red = 0.5 * i * Math.PI;
    meshObjChild.position.set(Math.sin(red) * 1.8, Math.cos(red) * 1.8, 0);
    console.log(meshObjChild.position, red);
  }
  meshArray.forEach((element) => {
    meshObj.add(element);
  });

  const inc = { y: 0 };
  const gsapCall = () => {
    gsap.timeline();
    gsap.to(inc, {
      scrollTrigger: {
        trigger: ".BlockXyzUI",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        snap: 1 / 3,
      },
      y: 2,
      onUpdate: () => {
        const deg = inc.y * Math.PI;
        meshObj.rotation.set(deg, deg * 2.25, 0);
        meshObj.position.set(
          Math.sin(deg) * 0.25,
          Math.sin(deg * 2) * 0.25,
          -2 - inc.y * 2
        );
      },
    });
  };
  useFrame(() => {
    uniforms.u_time.value += 0.1;
    const deg = uniforms.u_time.value * 0.1;
    meshArray.forEach((element, i) => {
      element.rotation.set(deg - i * 0.5, deg * 0.25, deg * 0.5);
      const red = (0.5 * i * Math.PI)+deg ;
      element.position.set(Math.sin(red) * 1.8, Math.cos(red) * 1.8, 0);
    });
  });
  React.useEffect(() => {
    gsapCall();
  }, []);
  return (
    <group {...props} dispose={null}>
      <primitive object={meshObj} dispose={null} />
    </group>
  );
};

export default NoiseSphere;
