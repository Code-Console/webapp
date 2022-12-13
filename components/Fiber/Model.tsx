import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { watchGLBPath } from "../Assets";
import { setWireFrameMaterial } from "../util";
import { actionDeposited } from "../../redux/action";
import { useDispatch } from "react-redux";
const Model = (props: any) => {
  const dispatch = useDispatch();
  const watchGlb = useGLTF(watchGLBPath);
  const ref = useRef();
  const degreesToRadians = (degrees: number) => {
    return degrees * (Math.PI / 180);
  };
  const watchHands = ["Hand-Seconds", "Hand-Minutes", "Hand-Hours"];
  React.useEffect(() => {
    if (watchGlb) {
      setWireFrameMaterial({
        model: watchGlb.scene,
        opacity: props?.opacity,
        skip: ["Hand-Seconds"],
      });
      dispatch(actionDeposited(true));
    }
  }, [watchGlb]);
  useFrame((state) => {
    const date = new Date();
    const refCurrent: any = ref?.current;
    const t = state.clock.getElapsedTime();
    if (refCurrent) {
      refCurrent.rotation.x = 0.3 + Math.cos(t / 4) / 8;
      refCurrent.rotation.y = Math.sin(t / 4) / 8;
      refCurrent.rotation.z = (1 + Math.sin(t / 1.5)) / 20;
      refCurrent.position.y = -1 + (1 + Math.sin(t / 1.5)) / 10;
    }
    const meshSeconds = refCurrent.getObjectByName(watchHands[0]);
    const meshMinutes = refCurrent.getObjectByName(watchHands[1]);
    const meshHours = refCurrent.getObjectByName(watchHands[2]);
    if (meshMinutes) {
      meshMinutes.rotation.z =
        Math.PI * 0.5 + degreesToRadians(date.getMinutes() * 6);
    }
    if (meshHours) {
      const extra = degreesToRadians(date.getMinutes() * 6) / 12;
      meshHours.rotation.z =
        Math.PI * 0.5 + degreesToRadians((date.getHours() % 12) * 30) + extra;
    }
    if (meshSeconds) {
      meshSeconds.rotation.z = -(
        Math.PI * 0.5 +
        degreesToRadians(date.getSeconds() * 6)
      );
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
