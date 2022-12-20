import { useGLTF } from "@react-three/drei";
import { dracoGLBPath } from "../Assets";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Object3D } from "three";
const WorldGlobe = () => {
  const meshRef: any = useRef();
  const dummy = new Object3D();
  const watchGlb = useGLTF(dracoGLBPath);
  const amount = 8;
  const tAmn = Math.pow(amount, 3);
  let isUpdate = 10;
  const { camera } = useThree();
  if (camera?.position.z) camera.position.z = 20;
  console.log(watchGlb);
  useFrame(({ clock }) => {
    if (!meshRef) return;
    const time = clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(time / 4);
    meshRef.current.rotation.y = Math.sin(time / 2);
    let i = 0;
    const offset = (amount - 1) / 2;

    for (let x = 0; x < amount; x++) {
      for (let y = 0; y < amount; y++) {
        for (let z = 0; z < amount; z++) {
          dummy.position.set(offset - x, offset - y, offset - z);
          dummy.rotation.y =
            Math.sin(x / 2 + time) +
            Math.sin(y / 3 + time) +
            Math.sin(z / 4 + time);
          dummy.rotation.z = dummy.rotation.y * 2;
          dummy.scale.set(0.001, 0.001, 0.001);

          dummy.updateMatrix();
          if (isUpdate > 0) {
            meshRef.current.setColorAt(
              i,
              new THREE.Color(i / tAmn, i / tAmn, (tAmn - i) / tAmn)
            );
          }
          meshRef.current.setMatrixAt(i++, dummy.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
        meshRef.current.instanceColor.needsUpdate = true;
      }
    }
    isUpdate--;
  });
  const gm = (watchGlb?.nodes["mesh_id4005"] as unknown as THREE.Mesh)
    ?.geometry;
  const mat = new THREE.MeshPhongMaterial(); //watchGlb?.materials["69.005"];
  return (
    <>
      {watchGlb?.nodes && (
        <instancedMesh
          ref={meshRef}
          args={[gm, mat, tAmn]}
          onClick={() => {
            console.log(meshRef);
            meshRef.isUpdate > 0 ? 0 : 10;
          }}
        ></instancedMesh>
      )}
    </>
  );
};
export default WorldGlobe;
