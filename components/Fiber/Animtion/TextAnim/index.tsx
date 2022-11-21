import React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { dealWithKeyboard } from "../../../util/Keyboard";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { Lobster_Regular } from "../../../Assets";
const TextAnim = (props: any) => {
  const ref: any = React.useRef();
  const loader = new FontLoader();
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({ color: "#000000" })
  );
  mesh.position.set(0, 0, -200);
  const check = new THREE.BufferGeometry();
  let geometry: THREE.ShapeGeometry | undefined;
  loader.load(Lobster_Regular, (font) => {
    const shapes = font?.generateShapes("This is for", 30);
    geometry = new THREE.ShapeGeometry(shapes);
    geometry.computeBoundingBox();
    geometry.center();
    const testMesh = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({ color: "#ff0000" })
    );
    mesh.add(testMesh);
    check.copy(geometry);
  });

  let count = 0;
  useFrame((state) => {
    state.clock.getElapsedTime();
    count += 50;
    const copy = check?.attributes.position;
    for (
      let i = 0;
      geometry && check && i < geometry.attributes.position.array.length;
      i++
    ) {
      if (count < i) {
        geometry.attributes.position.setXYZ(
          i,
          copy.getX(i) - 10,
          copy.getY(i) - 300,
          copy.getZ(i) - 100
        );
      } else {
        geometry.attributes.position.setXYZ(
          i,
          copy.getX(i),
          copy.getY(i),
          copy.getZ(i)
        );
      }
      geometry.attributes.position.needsUpdate = true;
    }
  });
  React.useEffect(() => {
    document.addEventListener("keydown", dealWithKeyboard);
  }, []);
  return (
    <group ref={ref} {...props} dispose={null}>
      <primitive object={mesh} dispose={null} />
    </group>
  );
};

export default TextAnim;
