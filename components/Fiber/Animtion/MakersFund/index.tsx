import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { bufferGeometry } from "./PipeMesh";

const createCube = () => {
  const group = new THREE.Group();
  const mesh = bufferGeometry();
  group.add(mesh);
  for (let i = 0; i < 11; i++) {
    const m = mesh.clone();
    group.add(m);
    if (i > 2) m.rotation.set(0, 0, Math.PI / 2);
    if (i > 6) m.rotation.set(0, Math.PI / 2, Math.PI / 2);
  }
  const diff = 2;
  
  group.children[5].position.set(0, -diff / 2, diff / 2);
  group.children[7].position.set(0, -diff / 2, -diff / 2);
  group.children[8].position.set(-diff / 2, -diff / 2, 0);
  group.children[10].position.set(diff / 2, -diff / 2, 0);

  group.children[0].position.set(-diff / 2, 0, -diff / 2);
  group.children[1].position.set(diff / 2, 0, -diff / 2);
  group.children[2].position.set(diff / 2, 0, diff / 2);
  group.children[3].position.set(-diff / 2, 0, diff / 2);

  group.children[4].position.set(0, diff / 2, diff / 2);
  group.children[6].position.set(0, diff / 2, -diff / 2);
  group.children[9].position.set(-diff / 2, diff / 2, 0);
  group.children[11].position.set(diff / 2, diff / 2, 0);

  return group;
};

const MakersFund = (props: any) => {
  const ref: any = React.useRef();
  const mesh = createCube();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    ref.current.position.set(0, 0, 0);
    // ref.current.rotation.set(time, 0, 0);
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
