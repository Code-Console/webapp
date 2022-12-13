import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { watchGLBPath } from "../Assets";
import { setWireFrameMaterial } from "../util";
import { actionDeposited } from "../../redux/action";
import { useDispatch } from "react-redux";
import {  Object3D } from "three";
import gsap from "gsap";
const Model = (props: any) => {
  const dispatch = useDispatch();
  const watchGlb = useGLTF(watchGLBPath);
  const ref = useRef();
  const date = new Date();
  const degreesToRadians = (degrees: number) => {
    return degrees * (Math.PI / 180);
  };
  let meshMinutes: Object3D | undefined;
  let meshHours: Object3D | undefined;
  React.useEffect(() => {
    if (watchGlb) {
      setWireFrameMaterial({ model: watchGlb.scene, opacity: props?.opacity });
      dispatch(actionDeposited(true));
    }
    const meshSeconds = watchGlb.scene.getObjectByName("Hand-Seconds");
    meshMinutes = watchGlb.scene.getObjectByName("Hand-Minutes");
    meshHours = watchGlb.scene.getObjectByName("Hand-Hours");
    
    date.getMinutes();
    
    if (meshSeconds)
      gsap.to(meshSeconds.rotation, {
        z: Math.PI * 2,
        duration: 1000,
        repeat: -1,
        ease: "none",
      });
  }, [watchGlb]);
  useFrame((state) => {
    const refCurrent: any = ref?.current;
    const t = state.clock.getElapsedTime();
    if (refCurrent) {
      refCurrent.rotation.x = 0.3 + Math.cos(t / 4) / 8;
      refCurrent.rotation.y = Math.sin(t / 4) / 8;
      refCurrent.rotation.z = (1 + Math.sin(t / 1.5)) / 20;
      refCurrent.position.y = -1 + (1 + Math.sin(t / 1.5)) / 10;
    }
    if (meshMinutes) {
      meshMinutes.rotation.z =
        Math.PI * 0.5 + degreesToRadians(date.getMinutes() * 6);
    }
    if (meshHours) {
      meshHours.rotation.z =
        Math.PI * 0.5 + degreesToRadians((date.getHours()%12) * 30);
    }
  });

  return (
    <group {...props} dispose={null}>
      <primitive
        ref={ref}
        scale={[30, 30, 30]}
        object={watchGlb.scene}
        dispose={null}
      />
    </group>
  );
};
export default Model;
useGLTF.preload(watchGLBPath);
