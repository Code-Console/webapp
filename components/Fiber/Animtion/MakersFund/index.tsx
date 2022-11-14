import { useFrame } from "@react-three/fiber";
import React from "react";
import { createCube, hitAnimation, zoomAnimation } from "./PipeMesh";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const MakersFund = (props: any) => {
  gsap.registerPlugin(ScrollTrigger);
  const ref: any = React.useRef();
  const mesh = createCube();
  mesh.position.set(2, 0, 0);
  const position = mesh.position;
  const setPositionValue = ({
    startX,
    endX,
    trigger,
    start,
    end,
  }: {
    startX: number;
    endX: number;
    trigger: string;
    start: string;
    end: string;
  }) => {
    gsap.fromTo(
      position,
      {
        scrollTrigger: {
          trigger: trigger,
          start: start,
          end: end,
          markers: false,
          scrub: true,
          immediateRender: false,
        },
        x: startX,
      },
      {
        scrollTrigger: {
          trigger: trigger,
          start: start,
          end: end,
          markers: false,
          scrub: true,
          immediateRender: false,
        },
        x: endX,
        onComplete: () => {
          console.log("trigger->  ", trigger);
          zoomAnimation(mesh);
        },
        onReverseComplete:()=>{
          console.log("onReverseComplete->  ", trigger);
          zoomAnimation(mesh);
        }
      }
    );
  };
  React.useEffect(() => {
    gsap.to(".section-first", {
      scrollTrigger: {
        trigger: ".section-second",
        start: "top bottom",
        end: "top top",
        markers: false,
        scrub: true,
        immediateRender: false,
      },
      rotate: "50%",
      opacity: 0,
    });
    setPositionValue({
      startX: -2,
      endX: 2,
      trigger: ".section-third",
      start: "top bottom",
      end: "top top",
    });
    setPositionValue({
      startX: 2,
      endX: -2,
      trigger: ".section-fourth",
      start: "top 70%",
      end: "top top",
    });
    setPositionValue({
      startX: -2,
      endX: 0,
      trigger: ".section-fifth",
      start: "top 11%",
      end: "top top",
    });
    setPositionValue({
      startX: 2,
      endX: -2,
      trigger: ".section-second",
      start: "top bottom",
      end: "top top",
    });
    hitAnimation(mesh);
  });
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.rotation.set(time*.1,time*.1,0);
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
