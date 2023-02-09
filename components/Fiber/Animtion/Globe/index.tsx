import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { basePath, earthImg, multiColorImg } from "../../../Assets";
import { globeShader } from "../../../Shaders";
import CameraController from "../../CameraController";
import Position from "./Position";
import gsap from "gsap";
const Globe = (props: any) => {
  const [state, setState] = React.useState({ pos: 0 });
  const check = new THREE.BufferGeometry();
  const ref: any = React.useRef();
  const material = new THREE.MeshBasicMaterial({
    color: 0x081c36,
    transparent: true,
    opacity: 0.7,
  });

  const texture = useTexture({
    transparent: `${earthImg}`,
    iChannel0: `${multiColorImg}`,
    iChannel1: `${basePath}3D/iChannel1.jpg`,
    iChannel2: `${basePath}3D/iChannel2.jpg`,
  });
  const uniforms = {
    u_time: { value: 0 },
    u_uv: { value: new THREE.Vector2() },
    u_texture: { value: texture.transparent },
  };
  const geometry = new THREE.SphereGeometry(1, 264, 264);
  const mesh = new THREE.Points(
    geometry,
    new THREE.ShaderMaterial({
      uniforms: uniforms,
      fragmentShader: globeShader.fragment,
      vertexShader: globeShader.vertex,
      side: THREE.DoubleSide,
    })
  );
  mesh.name = "pointsGlobe";
  check.copy(geometry);
  let count = 0;

  React.useEffect(() => {
    const mesh = ref.current.getObjectByName("pointsGlobe");
    if (!ref.current) return;
    mesh.position.set(10, 5, 5);
    mesh.scale.set(5, 5, 5);
    gsap.to(mesh.position, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1.3,
      delay: 0.3,
      ease: "power3.out",
    });
    gsap.to(mesh.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 1.3,
      delay: 0.3,
      ease: "power3.out",
    });
    const material = ref.current.getObjectByName("meshGlobe").material;
    material.opacity = .01;
    gsap.to(material, {
      opacity: 0.71,
      duration: 1.3,
      delay: 1.3,
      ease: "power3.out",
    });
  }, []);

  useFrame(() => {
    const copy = check?.attributes.position;

    count++;
    for (
      let i = 0;
      count < 100 &&
      geometry &&
      check &&
      i < geometry.attributes.position.array.length;
      i++
    ) {
      if (count % 200 > 18) {
        geometry.attributes.position.setXYZ(
          i,
          copy.getX(i),
          copy.getY(i),
          copy.getZ(i)
        );
      } else {
        geometry.attributes.position.setXYZ(
          i,
          copy.getX(i) - Math.random() * 0.04,
          copy.getY(i) - Math.random() * 0.04,
          copy.getZ(i) - Math.random() * 0.02
        );
      }
      geometry.attributes.position.needsUpdate = true;
    }
    if (count % 320 === 0 && state.pos < 4) {
      setState((state) => {
        return { ...state, pos: state.pos + 1 };
      });
    }
  });
  return (
    <group ref={ref} {...props} dispose={null} scale={[2, 2, 2]}>
      <primitive object={mesh} dispose={null} />
      <mesh
        onPointerDown={() => (count = 0)}
        material={material}
        name="meshGlobe"
      >
        <sphereGeometry args={[0.99, 32, 32]} />
      </mesh>
      <Position wait={100} />
      <Position wait={130} />
      <Position wait={160} />
      <Position wait={190} />
      <Position wait={220} />
      <CameraController enableZoom={false} />
    </group>
  );
};

export default Globe;
