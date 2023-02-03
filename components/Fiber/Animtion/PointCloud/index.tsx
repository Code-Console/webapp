import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import React from "react";
import {
  beyonceGLBPath,
  gogoGLBPath,
  jumpManGLBPath,
  nikeGLBPath,
  spacemanGLBPath,
  u505GLBPath,
} from "../../../Assets";
import { useFrame, useThree } from "@react-three/fiber";
import { pointShaderAnim } from "../../../Shaders";
import { useDispatch } from "react-redux";
import { actionUpdateObjectName } from "../../../../redux/action";
export enum OBJ3D {
  JUMP_MAN = "JUMP_MAN",
  BEYONCE = "BEYONCE",
  U505 = "U505",
  SPACEMAN = "SPACEMAN",
  NIKE = "NIKE",
  GOGO = "GOGO",
}
const PointCloud = () => {
  const values = { counter: 0, inc: 0.1 };
  const raycaster = new THREE.Raycaster();
  const refMesh = React.useRef() as any;
  const mouse = React.useRef(new THREE.Vector2());
  const dispatch = useDispatch();
  const { camera } = useThree();
  const [jumpMan, beyonce, u505, spaceman, nike, gogo] = useGLTF([
    jumpManGLBPath,
    beyonceGLBPath,
    u505GLBPath,
    spacemanGLBPath,
    nikeGLBPath,
    gogoGLBPath,
  ]);
  const material = new THREE.ShaderMaterial({
    extensions: {
      derivatives: true, //"#extensions GL_OES_standard_derivatives:enable",
    },
    side: THREE.DoubleSide,
    uniforms: {
      u_time: { value: 0 },
    },
    vertexShader: pointShaderAnim.vertex,
    fragmentShader: pointShaderAnim.fragment,
    transparent: true,
    depthTest: true,
    depthWrite: true,
    blending: THREE.AdditiveBlending,
  });
  const getPointMesh = (object: any, name: string) => {
    const keys = Object.keys(object);
    const max = Math.floor(
      object[keys[0]].geometry.attributes.position.array.length / 3
    );
    const vertices = [...object[keys[0]].geometry.attributes.position.array];
    const opacity = new Float32Array(max);
    const p_geom = new THREE.BufferGeometry();
    for (let i = 0; i < max; i++) {
      opacity.set([Math.random() / 2], i);
    }
    p_geom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    p_geom.setAttribute(
      "displacement",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    p_geom.setAttribute("opacity", new THREE.BufferAttribute(opacity, 1));
    const p = new THREE.Points(p_geom, material);
    p.name = name;
    return p;
  };

  React.useEffect(() => {
    const mesh = refMesh.current;
    refMesh.current.currentName = OBJ3D.JUMP_MAN;
    const isJumpMan = mesh.getObjectByName(OBJ3D.JUMP_MAN);
    if (jumpMan && !isJumpMan) {
      const jumpManMesh = getPointMesh(jumpMan.nodes, OBJ3D.JUMP_MAN);
      mesh.add(jumpManMesh);
    }
    const isBeyonce = mesh.getObjectByName(OBJ3D.BEYONCE);
    if (beyonce && !isBeyonce) {
      const beyonceMesh = getPointMesh(beyonce.nodes, OBJ3D.BEYONCE);
      mesh.add(beyonceMesh);
      beyonceMesh.visible = false;
    }
    const isU505 = mesh.getObjectByName(OBJ3D.U505);
    if (u505 && !isU505) {
      const u505Mesh = getPointMesh(u505.nodes, OBJ3D.U505);
      mesh.add(u505Mesh);
      u505Mesh.visible = false;
    }
    const isSpaceman = mesh.getObjectByName(OBJ3D.SPACEMAN);
    if (spaceman && !isSpaceman) {
      const spacemanMesh = getPointMesh(spaceman.nodes, OBJ3D.SPACEMAN);
      mesh.add(spacemanMesh);
      spacemanMesh.visible = false;
    }
    const isNike = mesh.getObjectByName(OBJ3D.NIKE);
    if (nike && !isNike) {
      const nikeMesh = getPointMesh(nike.nodes, OBJ3D.NIKE);
      mesh.add(nikeMesh);
      nikeMesh.visible = false;
    }
    const isGogo = mesh.getObjectByName(OBJ3D.GOGO);
    if (gogo && !isGogo) {
      const gogoMesh = getPointMesh(gogo.nodes, OBJ3D.GOGO);
      mesh.add(gogoMesh);
      gogoMesh.visible = false;
    }
    setTimeout(() => {
      changeModel({ clientX: 0, clientY: 0 });
    }, 500);
  }, [jumpMan, beyonce, u505, spaceman, nike, gogo]);
  const changeModel = (e: any) => {
    if (e.clientX < 50 && e.clientY < 50) {
      switch (refMesh.current.currentName) {
        case OBJ3D.JUMP_MAN:
          refMesh.current.nextName = OBJ3D.BEYONCE;
          break;
        case OBJ3D.BEYONCE:
          refMesh.current.nextName = OBJ3D.U505;
          break;
        case OBJ3D.U505:
          refMesh.current.nextName = OBJ3D.SPACEMAN;
          break;
        case OBJ3D.SPACEMAN:
          refMesh.current.nextName = OBJ3D.NIKE;
          break;
        case OBJ3D.NIKE:
          refMesh.current.nextName = OBJ3D.GOGO;
          break;
        case OBJ3D.GOGO:
          refMesh.current.nextName = OBJ3D.JUMP_MAN;
          break;
      }
      const nextMesh = refMesh.current.getObjectByName(
        refMesh.current.nextName
      );
      const geometryPosNext = nextMesh.geometry?.attributes.position;

      for (let i = 0; i < geometryPosNext?.array.length; i++) {
        geometryPosNext.setXYZ(i, 0, 0, 0);
        geometryPosNext.needsUpdate = true;
      }
      nextMesh.visible = true;
    }
    values.counter = 0;
    dispatch(actionUpdateObjectName(refMesh?.current?.nextName || ""));
  };
  useFrame(() => {
    const mesh = refMesh.current;
    const currentMesh = mesh?.getObjectByName(mesh?.currentName);
    const nextMesh = mesh?.getObjectByName(mesh?.nextName);
    raycaster.setFromCamera(mouse.current, camera);

    if (nextMesh && currentMesh && refMesh.current.nextName.length > 1) {
      values.counter++;

      const geometryPos = currentMesh.geometry?.attributes.position;
      for (let i = 0; i < geometryPos?.array.length; i++) {
        geometryPos.setXYZ(
          i,
          geometryPos.getX(i) * 0.9,
          geometryPos.getY(i) * 0.9,
          geometryPos.getZ(i) * 0.9
        );
        geometryPos.needsUpdate = true;
      }
      const geometryPosNext = nextMesh.geometry?.attributes.position;
      const displacementPosNext = nextMesh.geometry?.attributes.displacement;
      values.inc *= 1.1;
      const inc = values.inc;
      for (let i = 0; i < geometryPosNext?.array.length; i++) {
        geometryPosNext.setXYZ(
          i,
          Math.abs(geometryPosNext.getX(i) - displacementPosNext.getX(i)) <
            inc * 2
            ? displacementPosNext.getX(i)
            : geometryPosNext.getX(i) +
                (displacementPosNext.getX(i) > geometryPosNext.getX(i)
                  ? inc
                  : -inc),
          Math.abs(geometryPosNext.getY(i) - displacementPosNext.getY(i)) <
            inc * 2
            ? displacementPosNext.getY(i)
            : geometryPosNext.getY(i) +
                (displacementPosNext.getY(i) > geometryPosNext.getY(i)
                  ? inc
                  : -inc),
          Math.abs(geometryPosNext.getZ(i) - displacementPosNext.getZ(i)) <
            inc * 2
            ? displacementPosNext.getZ(i)
            : geometryPosNext.getZ(i) +
                (displacementPosNext.getZ(i) > geometryPosNext.getZ(i)
                  ? inc
                  : -inc)
        );
        geometryPosNext.needsUpdate = true;
      }
      if (values.counter > 20) {
        currentMesh.visible = false;
      }
      if (values.counter > 500) {
        values.counter = 0;
        values.inc = 0.1;
        currentMesh.visible = false;
        mesh.currentName = refMesh.current.nextName;
        refMesh.current.nextName = "";
        changeModel({ clientX: 0, clientY: 0 });
      }
    }
    refMesh.current.rotation.y += 0.01;
  });

  return (
    <>
      <group ref={refMesh} scale={0.015}></group>
    </>
  );
};

export default PointCloud;
