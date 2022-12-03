import React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { dealWithKeyboard } from "../../../util/Keyboard";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { Lobster_Regular } from "../../../Assets";
import { glitchShader } from "../../../Shaders";
const TextAnim = (props: any) => {
  const ref: any = React.useRef();
  const loader = new FontLoader();
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({ color: "#000000" })
  );
  const uniforms = {
    seed: { value: 0.02 },
    amount: { value: 0.08 },
    u_time: { value: 0 },

  };
  mesh.position.set(0, 0, -200);
  const check = new THREE.BufferGeometry();
  let geometry: THREE.ShapeGeometry | undefined;
  loader.load(Lobster_Regular, (font) => {
    const shapes = font?.generateShapes("Choose to shine", 30);
    geometry = new THREE.ShapeGeometry(shapes);
    geometry.computeBoundingBox();
    geometry.center();
    const testMesh = new THREE.Mesh(
      geometry,
      new THREE.ShaderMaterial({
        fragmentShader: glitchShader.fragment,
        vertexShader: glitchShader.vertex,
        uniforms: uniforms,
      })
    );
    mesh.add(testMesh);
    check.copy(geometry);
  });

  let count = 0;
  useFrame((state) => {
    state.clock.getElapsedTime();
    count += 1;
    uniforms.seed.value = Math.random();
    uniforms.u_time.value=1;
    const copy = check?.attributes.position;
    const max = 500;
    for (
      let i = 0;
      geometry && check && i < geometry.attributes.position.array.length;
      i++
    ) {
      if (copy.getY(i) < 21 - (count % 100) && count % max < 100) {
        geometry.attributes.position.setXYZ(
          i,
          copy.getX(i),
          copy.getY(i) - 300,
          copy.getZ(i)
        );
      } else if (
        copy.getX(i) > (count % 100) * 2 - 81 &&
        count % max > 100 &&
        count % max < 200
      ) {
        geometry.attributes.position.setXYZ(
          i,
          copy.getX(i) + 400,
          copy.getY(i),
          copy.getZ(i)
        );
      } else if (
        copy.getY(i) > -21 + (count % 100) &&
        count % max > 200 &&
        count % max < 300
      ) {
        geometry.attributes.position.setXYZ(
          i,
          copy.getX(i),
          copy.getY(i) + 300,
          copy.getZ(i)
        );
      } else if (
        copy.getX(i) < -(count % 100) * 2 + 81 &&
        count % max > 300 &&
        count % max < 400
      ) {
        geometry.attributes.position.setXYZ(
          i,
          copy.getX(i) - 400,
          copy.getY(i) - 100,
          copy.getZ(i)
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
