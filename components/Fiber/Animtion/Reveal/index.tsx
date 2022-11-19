import React from "react";
import * as THREE from "three";
import CameraController from "../../CameraController";
import { useFrame } from "@react-three/fiber";
import { dealWithKeyboard } from "../../../util/Keyboard";
import { FontLoader, Font } from "three/examples/jsm/loaders/FontLoader";
import { MADEOuterSans_Bold } from "../../../Assets";
import gsap from "gsap";
import { ShaderMaterial } from "three";
import { basicMultiShader } from "../../../Shaders";
import MeshCurve from "./MeshCurve";
import { useDispatch } from "react-redux";
import { actionDeposited } from "../../../../redux/action";
import { setPositionValue } from "./actions";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { revealStr } from "./Assets";

interface IObject {
  positions?: THREE.BufferGeometry;
  geometry?: THREE.ShapeGeometry;
  mesh?: THREE.Mesh;
}
interface IReveal {
  font?: Font;
  disturbObj?: IObject;

  textObjects: IObject[];
}

const Reveal = (props: any) => {
  const dispatch = useDispatch();
  const ref: any = React.useRef();
  const meshBackref: any = React.useRef();
  const loader = new FontLoader();
  const group = new THREE.Group();
  group.position.set(0, 0, -200);
  const gsapState = { count: 0 };
  gsap.registerPlugin(ScrollTrigger);
  const uniforms = {
    u_time: { value: 0 },
  };
  const reveal: IReveal = { textObjects: [] };
  const gsapAnim = ({
    str,
    size,
    inTime,
    out,
    pos,
  }: {
    str: string;
    size: number;
    inTime: number;
    out: number;
    pos: number[];
  }) => {
    const storiesThatText = createShapeGeometry({
      str: str,
      size: size,
    });
    group.add(storiesThatText.mesh);
    storiesThatText.mesh.scale.set(0.001, 0.001, 0.001);
    gsap.to(storiesThatText.mesh.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.3,
      delay: inTime,
      ease: "back.out(5)",
    });
    gsap.to(storiesThatText.mesh.position, {
      x: pos[0],
      y: pos[1],
      z: pos[2],
      duration: 0.2,
      delay: out,
      ease: "Power1.out",
    });
    return storiesThatText;
  };
  const createShapeGeometry = ({
    str,
    size,
  }: {
    str: string;
    size: number;
  }) => {
    const ThisIsForShapes = reveal.font?.generateShapes(str, size);
    const geometry = new THREE.ShapeGeometry(ThisIsForShapes);
    geometry.computeBoundingBox();
    geometry.center();
    return {
      geometry: geometry,
      mesh: new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({ color: "#000000", depthWrite: false })
      ),
    };
  };

  loader.load(MADEOuterSans_Bold, (font) => {
    reveal.font = font;
    revealStr.forEach((obj) => {
      const meshNgeo = createShapeGeometry({ str: obj.text, size: 30 });
      reveal.textObjects.push(meshNgeo);
      meshNgeo.mesh.scale.set(0.001, 0.001, 0.001);
      group.add(meshNgeo.mesh);
    });

    const first = reveal.textObjects[0]; //createShapeGeometry({ str: "This is for", size: 30 });
    const fPositions = new THREE.BufferGeometry();
    if (first.geometry) fPositions.copy(first.geometry);
    const firstObj: IObject = {
      positions: fPositions,
      geometry: first.geometry,
      mesh: first.mesh,
    };
    reveal.textObjects[0] = firstObj;
    gsap.to(gsapState, {
      count: first?.geometry?.attributes.position.count || 0,
      duration: 1,
      delay: 0,
    });
    if (first?.mesh?.position) {
      first.mesh.scale.set(1, 1, 1);
      gsap.to(first.mesh.position, {
        y: 30,
        duration: 0.3,
        delay: 0.9,
        ease: "back.out(5)",
      });
    }
    const obj1 = reveal.textObjects?.[1];
    if (obj1.mesh) {
      obj1.mesh.scale.set(0.001, 0.001, 0.001);
      gsap.to(obj1.mesh.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.3,
        delay: 1.1,
        ease: "back.out(5)",
      });
      gsap.to(obj1.mesh.position, {
        z: 210,
        duration: 0.5,
        delay: 2.2,
        ease: "Power1.out",
      });
    }
    if (first?.mesh)
      gsap.to(first.mesh.position, {
        x: 400,
        y: 250,
        duration: 0.2,
        delay: 2.0,
        ease: "Power1.out",
      });

    /////----2
    const madeMesh = reveal.textObjects?.[2]?.mesh;
    if (madeMesh) {
      madeMesh.scale.set(0.001, 0.001, 0.001);
      gsap.to(madeMesh.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.3,
        delay: 2.6,
        ease: "back.out(5)",
      });
      setPositionValue({
        trigger: ".section-second",
        start: "top bottom",
        end: "top top",
        movePos: new THREE.Vector3(0, 400, 0),
        position: madeMesh.position,
      });
    }

    ///////----3

    const mesh3 = reveal.textObjects?.[3]?.mesh;
    if (mesh3) {
      mesh3.scale.set(0.001, 0.001, 0.001);
      gsap.to(mesh3.scale, {
        scrollTrigger: {
          trigger: ".section-second",
          start: "top 80%",
          end: "top top",
          markers: false,
          scrub: true,
          immediateRender: false,
        },
        x: 1,
        y: 1,
        z: 1,
      });
      setPositionValue({
        trigger: ".section-third",
        start: "top bottom",
        end: "top top",
        movePos: new THREE.Vector3(0, 400, 0),
        position: mesh3.position,
      });
    }

    const mesh4 = reveal.textObjects?.[4]?.mesh;
    if (mesh4) {
      mesh4.scale.set(0.001, 0.001, 0.001);
      gsap.to(mesh4.scale, {
        scrollTrigger: {
          trigger: ".section-third",
          start: "top 80%",
          end: "top top",
          markers: false,
          scrub: true,
          immediateRender: false,
        },
        x: 1,
        y: 1,
        z: 1,
      });
      gsap.to(mesh4.position, {
        scrollTrigger: {
          trigger: ".section-third",
          start: "top 80%",
          end: "top top",
          markers: false,
          scrub: true,
          immediateRender: false,
        },
        x: -60,
      });
      // setPositionValue({
      //   trigger: ".section-fourth",
      //   start: "top bottom",
      //   end: "top top",
      //   movePos: new THREE.Vector3(0, 400, 0),
      //   position: mesh4.position,
      // });
    }

    const mesh5 = reveal.textObjects?.[5]?.mesh;
    if (mesh5) {
      mesh5.scale.set(0.001, 0.001, 0.001);
      gsap.to(mesh5.scale, {
        scrollTrigger: {
          trigger: ".section-third",
          start: "top 80%",
          end: "top top",
          markers: false,
          scrub: true,
          immediateRender: false,
        },
        x: 1,
        y: 1,
        z: 1,
      });
      gsap.to(mesh5.position, {
        scrollTrigger: {
          trigger: ".section-third",
          start: "top 80%",
          end: "top top",
          markers: false,
          scrub: true,
          immediateRender: false,
        },
        x: 60,
      });
      setPositionValue({
        trigger: ".section-fourth",
        start: "top bottom",
        end: "top top",
        movePos: new THREE.Vector3(0, 400, 0),
        position: mesh5.position,
      });
    }

    const mesh6 = reveal.textObjects?.[6]?.mesh;
    if (mesh6) {
      mesh6.scale.set(0.001, 0.001, 0.001);
      gsap.to(mesh6.scale, {
        scrollTrigger: {
          trigger: ".section-third",
          start: "top 50%",
          end: "top 120%",
          markers: false,
          scrub: true,
          immediateRender: false,
        },
        x: 1,
        y: 1,
        z: 1,
      });
      // gsap.to(mesh6.position, {
      //   scrollTrigger: {
      //     trigger: ".section-third",
      //     start: "top 90%",
      //     end: "top top",
      //     markers: false,
      //     scrub: true,
      //     immediateRender: false,
      //   },
      //   x: 50,
      // });
      // setPositionValue({
      //   trigger: ".section-fourth",
      //   start: "top bottom",
      //   end: "top top",
      //   movePos: new THREE.Vector3(0, 400, 0),
      //   position: mesh6.position,
      // });
    }

    return;
    let time = 10;
    const delTime = 1;
    time += delTime;
    time += delTime;
    const disturb = createShapeGeometry({ str: "DISTURB", size: 35 });
    reveal.disturbObj = disturb;
    const disturbMesh = [disturb.mesh];

    for (let i = 0; i < 5; i++) {
      disturbMesh.push(disturb.mesh.clone());
    }

    disturbMesh.forEach((mesh, i) => {
      group.add(mesh);
      mesh.position.set(0, -250, 0);
      gsap.to(mesh.position, {
        x: 0,
        y: 120 - 50 * i,
        duration: 0.3,
        delay: time + i * 0.1,
        ease: "back.out(2)",
      });
    });
  });

  useFrame((state) => {
    state.clock.getElapsedTime();
    uniforms.u_time.value++;
    const first = reveal.textObjects?.[0];
    if (
      first?.geometry &&
      first?.positions &&
      gsapState.count < first?.geometry.attributes.position.count
    ) {
      const copy = first?.positions.attributes.position;
      for (let i = 0; i < first?.geometry.attributes.position.count; i++) {
        if (gsapState.count < i) {
          first.geometry.attributes.position.setXYZ(
            i,
            copy.getX(i) - 10,
            copy.getY(i) - 300,
            copy.getZ(i) - 100
          );
        } else {
          first.geometry.attributes.position.setXYZ(
            i,
            copy.getX(i),
            copy.getY(i),
            copy.getZ(i)
          );
        }
        first.geometry.attributes.position.needsUpdate = true;
      }
    } else {
      // mesh?.children[0].position.set(0, 100, 0);
    }
    const val = reveal?.disturbObj?.mesh?.position?.y;
    if (val && val > -250 && val < 100) {
      meshBackref?.current?.position.set(0, 0, -210);
    } else {
      meshBackref?.current?.position.set(0, 5000, 0);
    }
  });
  React.useEffect(() => {
    document.addEventListener("keydown", dealWithKeyboard);
    dispatch(actionDeposited(true));
  }, []);
  return (
    <group ref={ref} {...props} dispose={null}>
      <CameraController />
      <primitive object={group} dispose={null} />
      <MeshCurve />
      {
        <mesh
          ref={meshBackref}
          geometry={new THREE.PlaneGeometry(800.46, 500.46)}
          material={
            new ShaderMaterial({
              uniforms: uniforms,
              vertexShader: basicMultiShader.vertex,
              fragmentShader: basicMultiShader.fragment,
            })
          }
          position={[0, 1000, -210]}
        />
      }
    </group>
  );
};

export default Reveal;
