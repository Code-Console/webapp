import React from "react";
import * as THREE from "three";
import { Physics, usePlane, useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
const Legendary = () => {
  function Plane(props: any) {
    const [ref] = usePlane(() => ({
      rotation: [-Math.PI / 2, 0, 0],
      ...props,
    })) as any;
    return (
      <mesh ref={ref}>
        <planeGeometry args={[10, 10]} />
        <meshPhongMaterial color={0xff00ff} transparent={true} opacity={0.01} />
      </mesh>
    );
  }

  function Cube(props: any) {
    const [ref, api] = useSphere(() => ({
      mass: 10,
      position: [0, 5, 0],
      ...props,
    })) as any;
    const pos = React.useRef(new THREE.Vector3(0, 0, 0));
    let counter = 0;
    React.useEffect(
      () =>
        api.position.subscribe((v: any) => {
          return (pos.current = new THREE.Vector3(v[0], v[1], v[2]));
        }),
      []
    );
    useFrame(({ clock }) => {
      if (pos.current.y < -2.5) {
        counter++;
        if (counter > 100) {
          api.position.set(
            (Math.random() - 0.5) * 2,
            Math.random() * 2 + 5,
            (Math.random() - 0.5) * 2
          );
          counter = 0;
        }
      }
    });
    return (
      <mesh ref={ref}>
        <sphereGeometry args={props.args} />
        <meshPhongMaterial color={0xfff000} />
      </mesh>
    );
  }

  return (
    <Physics gravity={[0, -9.81, 0]}>
      <Plane position={[0, -3.0, 0]} />
      <Cube args={[0.5, 16, 16]} position={[0.1, 29, 0]} />
      <Cube args={[0.5, 16, 16]} position={[0.2, 27, 0]} />
      <Cube args={[0.5, 16, 16]} position={[-0.1, 25, 0]} />
      <Cube args={[0.5, 16, 16]} position={[-0.2, 23, 0]} />
      <Cube args={[0.5, 16, 16]} position={[0.1, 21, 0]} />
      <Cube args={[0.5, 16, 16]} position={[0, 19, 0]} />
      <Cube args={[0.5, 16, 16]} position={[0.1, 17, 0]} />
      <Cube args={[0.5, 16, 16]} position={[0.2, 15, 0]} />
      <Cube args={[0.5, 16, 16]} position={[-0.1, 13, 0]} />
      <Cube args={[0.5, 16, 16]} position={[-0.2, 11, 0]} />
      <Cube args={[0.5, 16, 16]} position={[0.1, 9, 0]} />
      <Cube args={[0.5, 16, 16]} position={[0, 7, 0]} />
    </Physics>
  );
};

export default Legendary;
