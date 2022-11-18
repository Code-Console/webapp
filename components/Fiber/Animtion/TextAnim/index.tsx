import React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { dealWithKeyboard } from "../../../util/Keyboard";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { basePath } from "../../../Assets";
const TextAnim = (props: any) => {
  const ref: any = React.useRef();
  const loader = new FontLoader();
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({ color: "#000000" })
  );
  mesh.position.set(0,0,-200);
  const check = new THREE.BufferGeometry();
  let geometry: THREE.ShapeGeometry | undefined;
  loader.load(`${basePath}3D/Lobster_Regular.json`, (font) => {
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
    for (
      let i = 0;
      geometry && check && i < geometry.attributes.position.array.length;
      i += 3
    ) {
      // if (count % geometry.attributes.position.array.length < i) {
      //   geometry.attributes.position.array[i + 0] = check[i + 0] - 10;
      //   geometry.attributes.position.array[i + 1] = check[i + 1] - 300;
      //   geometry.attributes.position.array[i + 2] = check[i + 2] - 100;
      // } else {
      //   geometry.attributes.position.array[i + 0] = check[i + 0];
      //   geometry.attributes.position.array[i + 1] = check[i + 1];
      //   geometry.attributes.position.array[i + 2] = check[i + 2];
      // }

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
