import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { ogImg } from "../../Assets";
import { displacementPositionShader } from "../../Shaders";

class Values {
  count = 0;
}

const BasicShader = (props: any) => {
  const ref: any = React.useRef();
  const uniforms = {
    amplitude: { value: 1.0 },
    color: { value: new THREE.Color(0xff2200) },
    colorTexture: { value: new THREE.TextureLoader().load(ogImg) },
  };
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(16, 32, 16),
    new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: displacementPositionShader.vertex,
      fragmentShader: displacementPositionShader.fragment,
    })
  );
  const displacement = new Float32Array(
    mesh.geometry.attributes.position.count
  );
  const noise = new Float32Array(mesh.geometry.attributes.position.count);
  for (let i = 0; i < displacement.length; i++) {
    noise[i] = Math.random() * 5;
  }
  mesh.geometry.setAttribute(
    "displacement",
    new THREE.BufferAttribute(displacement, 1)
  );
  const vales = new Values();

  useFrame(() => {
    const time = Date.now() * 0.01;
    ref.current.rotation.set(0, 0.01 * time,0);
    ref.current.position.set(0, 0, -50);
    vales.count += 0.01;
    uniforms["amplitude"].value = .5 * Math.sin(ref.current.rotation.y * 0.125);
    uniforms["color"].value.offsetHSL(0.0005, 0, 0);
    for (let i = 0; i < displacement.length; i++) {
      displacement[i] = Math.sin(0.1 * i + time);
      noise[i] += 0.5 * (0.5 - Math.random());
      noise[i] = THREE.MathUtils.clamp(noise[i], -5, 5);

      displacement[i] += noise[i];
    }
    mesh.geometry.attributes.displacement.needsUpdate = true;
  });
  return (
    <group ref={ref} {...props} dispose={null}>
      <primitive object={mesh} dispose={null} name="yogesh" />
    </group>
  );
};
export default BasicShader;
