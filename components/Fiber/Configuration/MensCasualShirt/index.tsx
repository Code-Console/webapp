import { useGLTF } from "@react-three/drei";
import React from "react";
import { mensCasualShirt } from "../../../Assets";
import { useConfiguration } from "../../../hooks";
import { updateMaterialTexture } from "../../../util";
import * as THREE from "three";
const MensCasualShirt = () => {
  const config = useConfiguration();
  const watchGlb = useGLTF(mensCasualShirt);
  const ref = React.useRef();
  React.useEffect(() => {
    if (watchGlb) {
      watchGlb.scene.scale.set(0.01, 0.01, 0.01);
      watchGlb.scene.position.set(0, -1.7, 0);
    }
  }, [watchGlb]);
  React.useEffect(() => {
    if (config?.fabricTex) {
      const texture = new THREE.TextureLoader().load(config?.fabricTex);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(8, 8);
      updateMaterialTexture(ref?.current, texture);
    }
  }, [config?.fabricTex]);
  return (
    <group dispose={null}>
      <primitive ref={ref} object={watchGlb.scene} dispose={null} />
    </group>
  );
};

export default MensCasualShirt;
