import React from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import CameraController from "../../CameraController";
import { selectShader } from "../../../Shaders";
import { useTexture } from "@react-three/drei";
import { multiColorImg } from "../../../Assets";
const SelectFace = (props: any) => {
  const ref: any = React.useRef();
  const { camera } = useThree();
  const texture = useTexture({
    transparent: `${multiColorImg}`,
  });
  const uniforms = {
    u_time: { value: 0 },
    u_uv: { value: new THREE.Vector2() },
    u_texture: { value: texture.transparent },
  };
  const geometry = new THREE.SphereGeometry(2, 40, 40);
  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    fragmentShader: selectShader.fragment,
    vertexShader: selectShader.vertex,
    transparent: true,
  });

  useFrame((state) => {
    state.clock.getElapsedTime();
    uniforms.u_time.value++;
  });
  const onClickPosition = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const container = document.getElementById("canvas-container-id");
  const onMouseMove = (evt: any) => {
    evt.preventDefault();
    const mesh = ref.current;
    if (!mesh) return;
    const array = getMousePosition(container, evt.clientX, evt.clientY);
    onClickPosition.fromArray(array);
    const intersects = getIntersects(onClickPosition, [mesh]);
    if (intersects.length > 0 && intersects[0].uv) {
      mesh.material.uniforms.u_uv.value = intersects[0].uv;
    }
  };

  const getMousePosition = (dom: any, x: number, y: number) => {
    const rect = dom.getBoundingClientRect();
    return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];
  };

  const getIntersects = (point: THREE.Vector2, objects: THREE.Object3D[]) => {
    mouse.set(point.x * 2 - 1, -(point.y * 2) + 1);

    raycaster.setFromCamera(mouse, camera);

    return raycaster.intersectObjects(objects, false);
  };
  React.useEffect(() => {
    console.log(container);
    container?.addEventListener("mousemove", onMouseMove);
  }, []);
  return (
    <group {...props} dispose={null}>
      <mesh ref={ref} geometry={geometry} material={material} />
      <mesh
        geometry={new THREE.BoxGeometry(1.4, 1.4, 1.4)}
        material={new THREE.MeshNormalMaterial({})}
        position={[0, 0, 0]}
      />
      <CameraController />
    </group>
  );
};

export default SelectFace;
