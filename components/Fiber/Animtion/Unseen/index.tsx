import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { MeshBasicMaterial } from "three";
import { sandImg, roomGLBPath, brashImg, skyImg } from "../../../Assets";
import { rippleShader2 } from "../../../Shaders";
import gsap from "gsap/dist/gsap";
import UnseenTextAnim from "./UnseenTextAnim";
const Unseen = () => {
  const meshRef = React.useRef() as any;
  const { camera, gl } = useThree();
  const texture = useTexture({
    chan1: sandImg,
    brashImg: brashImg,
    skyImg: skyImg,
  });

  const watchGlb = useGLTF(roomGLBPath);
  const basicTexture = new THREE.WebGLRenderTarget(
    window.innerWidth,
    window.innerHeight,
    {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    }
  );
  const uniforms = {
    iTime: { value: 0 },
    iChannel0: { value: texture.chan1 },
    iChannel1: { value: texture.chan1 },
    iChannel2: { value: basicTexture.texture },
  };
  const material = new THREE.ShaderMaterial({
    vertexShader: rippleShader2.vertex,
    fragmentShader: rippleShader2.fragment,
    uniforms: uniforms,
    transparent: true,
  });

  const raycaster = new THREE.Raycaster();
  const iMouse = new THREE.Vector2();
  const iPreMouse = new THREE.Vector2();
  const groupWave = new THREE.Group();
  const max = 50;
  const sceneWave = new THREE.Scene();
  let currentWave = 0;
  const geometry = new THREE.PlaneGeometry(0.5, 0.5);
  const materialPlan = new MeshBasicMaterial({
    map: texture.brashImg,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    depthWrite: false,
  });

  for (let i = 0; i < max; i++) {
    const m = new THREE.Mesh(geometry, materialPlan.clone());
    m.visible = false;
    m.rotation.z = 2 * Math.PI * Math.random();
    groupWave.add(m);
  }
  sceneWave.add(groupWave);
  const mesh2 = new THREE.Mesh(new THREE.PlaneGeometry(12, 5), material);
  mesh2.rotation.set(-0.195, -0.325, -0.063);
  const eventMove = (e: any) => {
    iMouse.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1
    );
    if (iMouse.distanceTo(iPreMouse) > 0.01) {
      iPreMouse.copy(iMouse);
      raycaster.setFromCamera(iMouse, camera);
      const intersects = raycaster.intersectObjects([mesh2]);
      if (intersects.at(0)?.point) {
        currentWave++;
        currentWave = currentWave % max;
        const m = groupWave?.children[currentWave] as any;
        m.position.set(
          intersects[0].point.x,
          intersects[0].point.y,
          intersects[0].point.z + 0.2
        );
        m.visible = true;
        m.material.opacity = 1;
        m.scale.x = m.scale.y = 1;
      }
    }
    const rot = meshRef?.current?.rotation;
    if (rot) {
      gsap.to(rot, {
        x: 0.2 + iMouse.y * 0.1,
        y: 0.3 + iMouse.x * 0.2,
        z: 0.0,
        duration: 0.1,
        delay: 0,
      });
    }
  };
  texture.chan1.wrapS = THREE.RepeatWrapping;
  texture.chan1.wrapT = THREE.RepeatWrapping;
  texture.chan1.anisotropy = 16;
  texture.chan1.repeat.set(4, 4);
   
  useFrame(() => {
    gl.setRenderTarget(basicTexture);
    gl.render(sceneWave, camera);
    const uni = meshRef?.current?.material?.uniforms;
    if (uni) uni.iChannel2.value = basicTexture.texture;
    gl.setRenderTarget(null);
    gl.clear();
    uniforms.iTime.value += 0.1;
    groupWave.children.forEach((mesh: any) => {
      if (mesh.material.opacity < 0.01) {
        mesh.visible = false;
      } else {
        mesh.rotation.z += 0.02;
        mesh.scale.x = mesh.scale.y = mesh.scale.y * 0.97 + 0.1;
        mesh.material.opacity *= 0.98;
      }
    });
  });
  return (
    <>
      <group ref={meshRef}>
        <primitive
          scale={[70, 70, 70]}
          position={[-3, 0.0, -3]}
          rotation={[0, -0.7, 0]}
          object={watchGlb.scene}
          dispose={null}
        />
        <mesh position={[-7, 2, -10]}>
          <planeGeometry args={[30, 15]} />
          <meshBasicMaterial map={texture.skyImg} />
        </mesh>
        <mesh
          position={[1.5, 6.4, 1.8]}
          rotation={[Math.PI * 0.5, 0, Math.PI * 0.22]}
        >
          <planeGeometry args={[15, 15]} />
          <meshPhongMaterial color={0xaaaaaa} />
        </mesh>
        <mesh
          material={material}
          rotation={[-Math.PI * 0.5, 0, 0]}
          position={[-1, -3.0, -4]}
        >
          <planeGeometry args={[30, 30]} />
        </mesh>
      </group>
      <UnseenTextAnim eventMove={eventMove}/>
    </>
  );
};

export default Unseen;
