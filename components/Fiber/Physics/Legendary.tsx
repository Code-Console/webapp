import React from "react";
import * as THREE from "three";
import { Physics, usePlane, useBox } from "@react-three/cannon";
const Legendary = () => {
  function Plane(props: any) {
    const [ref] = usePlane(() => ({
      rotation: [-Math.PI / 2, 0, 0],
      ...props,
    })) as any;
    return (
      <mesh ref={ref}>
        <planeGeometry args={[10, 10]} />
        <meshPhongMaterial color={0xff00ff} side={THREE.DoubleSide} />
      </mesh>
    );
  }
  
  function Cube(props: any) {
    const [ref] = useBox(() => ({
      mass: 1,
      position: [0, 5, 0],
      ...props,
    })) as any;
    return (
      <mesh ref={ref}>
        <boxGeometry />
        <meshPhongMaterial color={0xfff000} />
      </mesh>
    );
  }

  return (
    <Physics gravity={[0, -9.81, 0]}>
      <Plane />
      <Cube />
    </Physics>
  );
};

export default Legendary;
