import { useGLTF } from "@react-three/drei";
import React from "react";
import { mensCasualPant, mensCasualShirt } from "../../../Assets";
import { useConfiguration } from "../../../hooks";
import { updateMaterialTexture } from "../../../util";
import { fabricDetail } from "../../../UI/ConfigurationUI/MensCasualShirt/assets";
import * as THREE from "three";
import { useDispatch } from "react-redux";
import { actionDeposited } from "../../../../redux/action";
const MensCasualShirt = () => {
  const config = useConfiguration();
  const watchGlb = useGLTF(mensCasualShirt);
  const mensPantGlb = useGLTF(mensCasualPant);
  const ref = React.useRef() as any;
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (watchGlb) {
      watchGlb.scene.scale.set(1.51, 1.51, 1.51);
      watchGlb.scene.position.set(0, 0.0, 0);
      const frontRight = watchGlb.scene.getObjectByName("frontRight") as any;
      const frontLeft = watchGlb.scene.getObjectByName("frontLeft") as any;
      frontLeft.material = frontRight.material;

      const shoulder = watchGlb.scene.getObjectByName("shoulder") as any;
      shoulder.material = frontRight.material.clone();
      const sleeveL = watchGlb.scene.getObjectByName("sleeveLeft") as any;
      const sleeveR = watchGlb.scene.getObjectByName("sleeveRight") as any;
      sleeveL.material = sleeveR.material = frontRight.material.clone();

      const cufL = watchGlb.scene.getObjectByName("cufLeft") as any;
      const cufR = watchGlb.scene.getObjectByName("cufRight") as any;
      cufL.material = cufR.material = frontRight.material.clone();

      const collar = watchGlb.scene.getObjectByName("collar") as any;
      collar.material = frontRight.material.clone();

      const stand = watchGlb.scene.getObjectByName("stand") as any;
      stand.material = frontRight.material.clone();
      watchGlb.scene.name = "shirt";
      dispatch(actionDeposited(true));
    }
  }, [watchGlb]);
  React.useEffect(() => {
    if (mensPantGlb) {
      mensPantGlb.scene.position.set(0, -5.0, 0.31);
      mensPantGlb.scene.scale.set(7.5, 7.5, 7.5);
      mensPantGlb.scene.name = "pant";
      const pant = mensPantGlb.scene.getObjectByName("DG100110_1") as any;
      if (pant?.material) {
        pant.material = new THREE.MeshStandardMaterial({
          roughness: 1,
          metalness: 1,
          color: 0xeeeeee,
        });
      }
      console.log(mensPantGlb);
    }
  }, [mensPantGlb]);
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
      const group = (ref?.current as any).getObjectByName("shirt");
      updateMaterialTexture(group, texture(img), ["buttonMat"]);
    }
  }, [config?.fabricId]);
  React.useEffect(() => {
    const mat = (ref?.current as any)?.getObjectByName("DG100110_1")?.material;
    if (mat) {
      mat.color = new THREE.Color(config?.paintId || "rgb(255,255,255)");
    }
  }, [config?.paintId]);
  React.useEffect(() => {
    const mat = (ref?.current as any)?.getObjectByName("btn1")?.material;
    if (mat) {
      mat.color = new THREE.Color(config?.butId || "rgb(255,255,255)");
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
    const img = fabricDetail.find(
      (obj) => config?.collarStandId === obj.id
    )?.img;
    if (img && (ref?.current as any)?.getObjectByName("stand")) {
      updateMaterialTexture(
        (ref?.current as any).getObjectByName("stand"),
        texture(img),
        []
      );
    }
  }, [config?.collarStandId]);

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
    <group ref={ref} dispose={null}>
      <primitive object={watchGlb.scene} dispose={null} />
      <primitive object={mensPantGlb.scene} dispose={null} />
    </group>
  );
};

export default MensCasualShirt;
