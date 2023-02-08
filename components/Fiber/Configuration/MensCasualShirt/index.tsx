import { useGLTF } from "@react-three/drei";
import React from "react";
import { mensCasualShirt } from "../../../Assets";

const MensCasualShirt = () => {
  const watchGlb = useGLTF(mensCasualShirt);
  const ref = React.useRef();
  React.useEffect(() => {
    if (watchGlb) {
      watchGlb.scene.scale.set(0.01, 0.01, 0.01);
      watchGlb.scene.position.set(0, -1.7, 0);
    }
  }, [watchGlb]);
  return (
    <group dispose={null}>
      <primitive ref={ref} object={watchGlb.scene} dispose={null} />
    </group>
  );
};

export default MensCasualShirt;
