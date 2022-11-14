import { useFrame } from "@react-three/fiber";
import React from "react";
import { createCube } from "./PipeMesh";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const MakersFund = (props: any) => {
  gsap.registerPlugin(ScrollTrigger);
  const ref: any = React.useRef();
  const mesh = createCube();
  mesh.position.set(2, 0, 0);
  const position = mesh.position;
  React.useEffect(() => {
    gsap.to(".section-first", {
      scrollTrigger: {
        trigger: ".section-second",
        start: "top bottom",
        end: "top top",
        markers: true,
        scrub: true,
        immediateRender: false,
      },

      opacity: 0,
    });
    gsap.fromTo(
      position,
      {
        scrollTrigger: {
          trigger: ".section-third",
          start: "top bottom",
          end: "top top",
          markers: true,
          scrub: true,
          immediateRender: false,
        },
        x: -2,
      },
      {
        scrollTrigger: {
          trigger: ".section-third",
          start: "top bottom",
          end: "top top",
          markers: true,
          scrub: true,
          immediateRender: false,
        },
        x: 2,
      }
    );
    gsap.fromTo(
      position,
      {
        scrollTrigger: {
          trigger: ".section-second",
          start: "top bottom",
          end: "top top",
          markers: true,
          scrub: true,
          immediateRender: false,
        },
        x: 2,
      },
      {
        scrollTrigger: {
          trigger: ".section-second",
          start: "top bottom",
          end: "top top",
          markers: true,
          scrub: true,
          immediateRender: false,
        },
        x: -2,
        onUpdate: () => {
          console.log("~~~~~~~~~~~", position.x);
        },
        onComplete: () => {
          console.log("~~~~onComplete~~~~~~~", position.x);
        },
      }
    );
    
  });
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
  });
  return (
    <group ref={ref} {...props} dispose={null}>
      <primitive object={mesh} dispose={null} />
      {/* <mesh
        geometry={new THREE.BoxGeometry(0.46, 0.46, 0.46)}
        material={new THREE.MeshNormalMaterial()}
        position={[0, 0, 0]}
      /> */}
    </group>
  );
};
export default MakersFund;
