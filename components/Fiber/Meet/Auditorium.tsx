import { Stars, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import React, { useRef } from "react";
import { auditoriumGLB, tileUrl } from "../../Assets";
import Chair from "./Chair";
import VideoPlan from "./VideoPlan";
import { useThree } from "@react-three/fiber";
import { useDispatch } from "react-redux";
import { actionDeposited } from "../../../redux/action";
const Auditorium = () => {
  const ref: any = useRef();
  const dispatch = useDispatch();
  const watchGlb = useGLTF(auditoriumGLB);
  const texture = useTexture({
    tileTex: `${tileUrl}`,
  });
  const {gl}= useThree();
  React.useEffect(() => {
    if (watchGlb) {
      texture.tileTex.wrapS = THREE.RepeatWrapping;
      texture.tileTex.wrapT = THREE.RepeatWrapping;
      texture.tileTex.repeat.set(4, 4);
      texture.tileTex.needsUpdate = true;
      watchGlb.scene.traverse((object: any) => {
        if (!object["isMesh"]) return;
        if (object["isMesh"] && object["material"].isMaterial) {
          if (object.name === "chair_rings_2") {
            object.material.map = texture.tileTex;
          }
          if (object.name === "FloorHall") {
            object.material.map = texture.tileTex;
          }
          if (object.name === "stairs_centre_platfoform") {
            object.material.color = new THREE.Color(0x555555);
          }
          if (object.name === "chair_rings_1") {
            object.material.color = new THREE.Color(0x999999);
          }
          if (object.name === "Object03") {
            object.material.color = new THREE.Color(0x999999);
          }
          if (object.name === "center_podium_light") {
            object.material.color = new THREE.Color(0xff0000);
          }
          if (object.name === "dance_flo") {
            object.material.color = new THREE.Color(0x00ff00);
          }
          if (object.name === "walls") {
            object.material.color = new THREE.Color(0x555555);
          }
          if (object.name === "floorStage") {
            object.material.color = new THREE.Color(0x009999);
          }
          if (object.name === "railing") {
            object.material.color = new THREE.Color(0x009999);
          }
        }
      });
      watchGlb.scene.position.set(0,0,12.5);
      dispatch(actionDeposited(true));
    }
    if(gl){
      gl.setClearColor(0x000000);
    }
  }, [watchGlb]);

  return (
    <>
      <primitive
        ref={ref}
        object={watchGlb.scene}
        dispose={null}
      >
        <Chair/>
        <VideoPlan />
      </primitive>
      <Stars radius={20} depth={20} count={5000} factor={1} saturation={0} fade speed={5} />
    </>
  );
};
export default Auditorium;
