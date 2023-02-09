import { useGLTF } from "@react-three/drei";
import React from "react";
import { mensCasualShirt } from "../../../Assets";
import { useConfiguration } from "../../../hooks";
import { updateMaterialTexture } from "../../../util";
import { fabricDetail } from "../../../UI/ConfigurationUI/MensCasualShirt/assets";
import * as THREE from "three";
const MensCasualShirt = () => {
  const config = useConfiguration();
  const watchGlb = useGLTF(mensCasualShirt);
  const ref = React.useRef();
  React.useEffect(() => {
    if (watchGlb) {
      watchGlb.scene.scale.set(1.51, 1.51, 1.51);
      watchGlb.scene.position.set(0, -1.7, 0);
      const frontRight = watchGlb.scene.getObjectByName("frontRight") as any;
      const frontLeft = watchGlb.scene.getObjectByName("frontLeft") as any;
      frontLeft.material = frontRight.material;

      const shoulder = watchGlb.scene.getObjectByName("shoulder") as any;
      shoulder.material = new THREE.MeshStandardMaterial({
        name: "shoulderMat",
        map: shoulder.material.map.clone(),
        metalness: shoulder.material.metalness,
        roughness: shoulder.material.roughness,
      });
      const sleeveL = watchGlb.scene.getObjectByName("sleeveLeft") as any;
      const sleeveR = watchGlb.scene.getObjectByName("sleeveRight") as any;
      const sleeves = new THREE.MeshStandardMaterial({
        name: "sleevesMat",
        map: shoulder.material.map.clone(),
        metalness: shoulder.material.metalness,
        roughness: shoulder.material.roughness,
      });
      sleeveL.material = sleeveR.material = sleeves;

      const cufL = watchGlb.scene.getObjectByName("cufLeft") as any;
      const cufR = watchGlb.scene.getObjectByName("cufRight") as any;
      const cuf = new THREE.MeshStandardMaterial({
        name: "cufMat",
        map: shoulder.material.map.clone(),
        metalness: shoulder.material.metalness,
        roughness: shoulder.material.roughness,
      });
      cufL.material = cufR.material = cuf;


      const collar = watchGlb.scene.getObjectByName("collar") as any;
      const collarMat = new THREE.MeshStandardMaterial({
        name: "cufMat",
        map: shoulder.material.map.clone(),
        metalness: shoulder.material.metalness,
        roughness: shoulder.material.roughness,
      });
      collar.material = collarMat;

    }
  }, [watchGlb]);
  const texture = (img: string) => {
    const texture = new THREE.TextureLoader().load(img);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(8, 8);
    return texture;
  };
  React.useEffect(() => {
    const img = fabricDetail.find((obj) => config?.fabricId === obj.id)?.img;
    if (img) {
      updateMaterialTexture(ref?.current, texture(img), ["buttonMat"]);
    }
  }, [config?.fabricId]);
  React.useEffect(() => {
    const img = fabricDetail.find((obj) => config?.butId === obj.id)?.img;
    if (img && (ref?.current as any)?.getObjectByName("btn1")) {
      updateMaterialTexture(
        (ref?.current as any).getObjectByName("btn1"),
        texture(img),
        []
      );
    }
  }, [config?.butId]);

  React.useEffect(() => {
    const img = fabricDetail.find((obj) => config?.shoulderId === obj.id)?.img;
    if (img && (ref?.current as any)?.getObjectByName("shoulder")) {
      updateMaterialTexture(
        (ref?.current as any).getObjectByName("shoulder"),
        texture(img),
        []
      );
    }
  }, [config?.shoulderId]);

  React.useEffect(() => {
    const img = fabricDetail.find((obj) => config?.collarId === obj.id)?.img;
    if (img && (ref?.current as any)?.getObjectByName("collar")) {
      updateMaterialTexture(
        (ref?.current as any).getObjectByName("collar"),
        texture(img),
        []
      );
    }
  }, [config?.collarId]);


  React.useEffect(() => {
    const img = fabricDetail.find((obj) => config?.cufId === obj.id)?.img;
    if (img && (ref?.current as any)?.getObjectByName("cufLeft")) {
      updateMaterialTexture(
        (ref?.current as any).getObjectByName("cufLeft"),
        texture(img),
        []
      );
    }
  }, [config?.cufId]);


  React.useEffect(() => {
    const img = fabricDetail.find((obj) => config?.sleeveId === obj.id)?.img;
    if (img && (ref?.current as any)?.getObjectByName("sleeveLeft")) {
      updateMaterialTexture(
        (ref?.current as any).getObjectByName("sleeveLeft"),
        texture(img),
        []
      );
    }
  }, [config?.sleeveId]);




  React.useEffect(() => {
    const img = fabricDetail.find((obj) => config?.frontId === obj.id)?.img;
    if (img && (ref?.current as any)?.getObjectByName("frontRight")) {
      updateMaterialTexture(
        (ref?.current as any).getObjectByName("frontRight"),
        texture(img),
        []
      );
    }
  }, [config?.frontId]);




  return (
    <group dispose={null}>
      <primitive ref={ref} object={watchGlb.scene} dispose={null} />
    </group>
  );
};

export default MensCasualShirt;
