import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { brashImg, sandImg } from "../../../Assets";
import { rippleShader } from "../../../Shaders";
const UnseenTextAnim = ({ eventMove }: { eventMove?: (e: any) => void }) => {
  const { camera, gl } = useThree();
  const meshRef = React.useRef() as any;
  const texture = useTexture({
    chan1: sandImg,
    brashImg: brashImg,
  });
  const raycaster = new THREE.Raycaster();
  const iMouse = new THREE.Vector2();
  const iPreMouse = new THREE.Vector2();
  const max = 50;
  let currentWave = 0;
  const [sceneWave] = React.useState(new THREE.Scene());
  const [groupWave] = React.useState(new THREE.Group());
  let counter = 0;
  const createWave = () => {
    if (groupWave.children.length >= max) return;
    const geometry = new THREE.PlaneGeometry(0.5, 0.5);
    const materialPlan = new THREE.MeshBasicMaterial({
      map: texture.brashImg,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false,
    });

    for (let i = 0; i < max; i++) {
      const m = new THREE.Mesh(geometry, materialPlan.clone());
      m.visible = true;
      m.rotation.z = 2 * Math.PI * Math.random();
      m.position.set(Math.random() * 2 - 2, Math.random() * 2 - 2, 0);
      groupWave.add(m);
    }
    sceneWave.add(groupWave);
  };
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
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
    iChannel2: { value: basicTexture.texture },
  };
  const material = new THREE.ShaderMaterial({
    vertexShader: rippleShader.vertex,
    fragmentShader: rippleShader.fragment,
    uniforms: uniforms,
    transparent: true,
  });
  const basicMaterial = new THREE.MeshBasicMaterial();
  if (ctx) {
    ctx.fillStyle = "green";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "28px serif";
    ctx.fillText("The brand digital & motion picture", 52, 132);
    ctx.font = "60px serif";
    ctx.fillText("Creating the", 112, 192);
    ctx.fillText("Unexpected", 117, 252);

    ctx.fillStyle = "red";
    ctx.font = "28px serif";
    ctx.fillText("The brand digital & motion picture", 50, 130);
    ctx.font = "60px serif";
    ctx.fillText("Creating the", 110, 190);
    ctx.fillText("Unexpected", 115, 250);
    const texture = new THREE.CanvasTexture(canvas);
    uniforms.iChannel0.value = texture;
    basicMaterial.map = texture;
  }
  const addWave = ({ x, y, z }: { x: number; y: number; z: number }) => {
    currentWave++;
    currentWave = currentWave % groupWave.children.length;
    const m = groupWave?.children[currentWave] as any;
    if (!m) return;
    m.position.set(x * 1.0, y * 0.8, z);
    m.visible = true;
    m.material.opacity = 0.01;
    m.scale.x = m.scale.y = 1;
  };
  const eventMovePointer = (e: any) => {
    if (!meshRef?.current) return;
    eventMove?.(e);
    iMouse.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1
    );
    if (iMouse.distanceTo(iPreMouse) > 0.01) {
      iPreMouse.copy(iMouse);
      raycaster.setFromCamera(iMouse, camera);
      const intersects = raycaster.intersectObjects([meshRef.current]);
      if (intersects.at(0)?.point) {
        addWave({
          x: intersects[0].point.x * 1.0,
          y: intersects[0].point.y * 0.8,
          z: intersects[0].point.z,
        });
      }
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousemove", eventMovePointer);
    createWave();
    return () => {
      document.removeEventListener("mousemove", eventMovePointer);
    };
  }, []);
  useFrame(() => {
    gl.setRenderTarget(basicTexture);
    gl.render(sceneWave, camera);
    const uni = meshRef?.current?.material?.uniforms;
    if (uni) uni.iChannel2.value = basicTexture.texture;
    gl.setRenderTarget(null);
    gl.clear();
    groupWave.children.forEach((mesh: any) => {
      if (mesh.material.opacity < 0.001) {
        mesh.visible = false;
      } else {
        mesh.rotation.z += 0.02;
        mesh.scale.x = mesh.scale.y = mesh.scale.y * 0.97 + 0.1;
        mesh.material.opacity *= 0.98;
      }
    });
    if (counter % 5 === 0) {
      addWave({
        x: Math.random() * 6 - 3,
        y: Math.random() * 3,
        z: -1,
      });
    }
    counter++;
  });
  return (
    <>
      <mesh material={material} position={[0, 0, -1]} ref={meshRef}>
        <planeGeometry args={[12, 12]} />
      </mesh>
    </>
  );
};

export default UnseenTextAnim;
