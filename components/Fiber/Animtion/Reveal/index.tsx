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
  disturbGroup: THREE.Group;

  textObjects: IObject[];
}
const disturbObj: IObject = {};
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
  const reveal: IReveal = { textObjects: [], disturbGroup: new THREE.Group() };
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
        new THREE.MeshBasicMaterial({
          color: "#ffffff",
          wireframe: false,
          side: THREE.DoubleSide,
        })
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
    const time = 2;
    const disturb = createShapeGeometry({ str: "DISTURB", size: 35 });

    if (disturb.geometry) {
      const dPositions = new THREE.BufferGeometry();
      dPositions.copy(disturb.geometry);
      disturbObj.geometry = disturb.geometry;
      disturbObj.mesh = disturb.mesh;
      disturbObj.positions = dPositions;
    }

    reveal.disturbGroup.add(disturb.mesh);
    for (let i = 0; i < 5; i++) {
      reveal.disturbGroup.add(disturb.mesh.clone());
    }
    reveal.disturbGroup.position.set(0, -350, 0);
    group.add(reveal.disturbGroup);
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
        ease: "back.out(2)",
      });
      gsap.to(mesh3.rotation, {
        scrollTrigger: {
          trigger: ".section-second",
          start: "top 80%",
          end: "top top",
          markers: false,
          scrub: true,
          immediateRender: false,
        },
        z: Math.PI * 2,
      });
      setPositionValue({
        trigger: ".section-third",
        start: "top bottom",
        end: "top top",
        movePos: new THREE.Vector3(0, 400, 0),
        position: mesh3.position,
      });
    }

    const diff = 30;
    let pera = -100 + (8 - 5) * diff;
    const mesh4 = reveal.textObjects?.[4]?.mesh;
    if (mesh4) {
      mesh4.scale.set(0.001, 0.001, 0.001);
      gsap.to(mesh4.scale, {
        scrollTrigger: {
          trigger: ".section-third",
          start: `top ${pera + diff * 2}%`,
          end: `top ${pera + diff * 1}%`,
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
          start: `top ${pera + diff * 2}%`,
          end: `top ${pera + diff * 1}%`,
          markers: false,
          scrub: true,
          immediateRender: false,
        },
        onComplete: () => {
          mesh4.position.x = -81;
        },
        x: -80,
      });
      pera = -100 + (8 - 7) * diff;
      setPositionValue({
        trigger: ".section-third",
        start: `top ${pera + diff}%`,
        end: `top ${pera}%`,
        movePos: new THREE.Vector3(-200, 300, 0),
        position: mesh4.position,
      });
    }
    const xArr = [60, 70, 110];
    for (let i = 5; i < 8; i++) {
      pera = -100 + (8 - i) * diff;
      const mesh5 = reveal.textObjects?.[i]?.mesh;
      if (mesh5) {
        mesh5.scale.set(0.001, 0.001, 0.001);
        gsap.to(mesh5.scale, {
          scrollTrigger: {
            trigger: ".section-third",
            start: `top ${pera + diff * 2}%`,
            end: `top ${pera + diff * 1}%`,
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
            start: `top ${pera + diff * 2}%`,
            end: `top ${pera + diff * 1}%`,
            markers: false,
            scrub: true,
            immediateRender: false,
          },
          x: xArr[i - 5],
        });
        gsap.to(mesh5.position, {
          scrollTrigger: {
            trigger: ".section-third",
            start: `top ${pera + diff}%`,
            end: `top ${pera}%`,
            markers: false,
            scrub: true,
            immediateRender: false,
          },
          y: 300,
        });
      }
    }
    const diff2 = 10;
    for (let i = 8; i < 11; i++) {
      pera = -0 + (11 - i) * diff2;
      const mesh8 = reveal.textObjects?.[i]?.mesh;
      if (mesh8) {
        mesh8.scale.set(0.001, 0.001, 0.001);
        gsap.to(mesh8.scale, {
          scrollTrigger: {
            trigger: ".section-fourth",
            start: `top ${pera + diff2 * 2}%`,
            end: `top ${pera + diff2 * 1}%`,
            markers: false,
            scrub: true,
            immediateRender: false,
          },
          x: 1,
          y: 1,
          z: 1,
        });
        gsap.to(mesh8.position, {
          scrollTrigger: {
            trigger: ".section-fourth",
            start: `top ${pera + diff2}%`,
            end: `top ${pera}%`,
            markers: false,
            scrub: true,
            immediateRender: false,
          },
          y: -75 + (11 - i) * 50,
        });
        pera = -50;
        gsap.to(mesh8.position, {
          scrollTrigger: {
            trigger: ".section-fourth",
            start: `top ${pera + diff2}%`,
            end: `top ${pera}%`,
            markers: false,
            scrub: true,
            immediateRender: false,
          },
          y: 275 + (11 - i) * 50,
        });
      }
    }
    for (let i = 11; i < 14; i++) {
      pera = -0 + (14 - i) * diff2;
      const mesh11 = reveal.textObjects?.[i]?.mesh;
      if (mesh11) {
        mesh11.scale.set(0.001, 0.001, 0.001);
        gsap.to(mesh11.scale, {
          scrollTrigger: {
            trigger: ".section-fifth",
            start: `top ${pera + diff2 * 2}%`,
            end: `top ${pera + diff2 * 1}%`,
            markers: false,
            scrub: true,
            immediateRender: false,
          },
          x: 1,
          y: 1,
          z: 1,
        });
        gsap.to(mesh11.position, {
          scrollTrigger: {
            trigger: ".section-fifth",
            start: `top ${pera + diff2}%`,
            end: `top ${pera}%`,
            markers: false,
            scrub: true,
            immediateRender: false,
          },
          y: -75 + (14 - i) * 50,
        });
        pera = -50;
        gsap.to(mesh11.position, {
          scrollTrigger: {
            trigger: ".section-fifth",
            start: `top ${pera + diff2}%`,
            end: `top ${pera}%`,
            markers: false,
            scrub: true,
            immediateRender: false,
          },
          y: 275 + (14 - i) * 50,
        });
      }
    }

    for (let i = 14; i < 17; i++) {
      pera = -90 + (17 - i) * diff;
      const mesh11 = reveal.textObjects?.[i]?.mesh;
      if (mesh11) {
        mesh11.scale.set(0.001, 0.001, 0.001);
        gsap.to(mesh11.scale, {
          scrollTrigger: {
            trigger: ".section-six",
            start: `top ${pera + diff * 2}%`,
            end: `top ${pera + diff * 1}%`,
            markers: false,
            scrub: true,
            immediateRender: false,
          },
          x: 1,
          y: 1,
          z: 1,
        });
        gsap.to(mesh11.position, {
          scrollTrigger: {
            trigger: ".section-six",
            start: `top ${pera + diff}%`,
            end: `top ${pera}%`,
            markers: false,
            scrub: true,
            immediateRender: false,
          },
          y: -75 + (17 - i) * 50,
        });
        pera = -90;
        gsap.to(mesh11.position, {
          scrollTrigger: {
            trigger: ".section-six",
            start: `top ${pera + diff}%`,
            end: `top ${pera}%`,
            markers: false,
            scrub: true,
            immediateRender: false,
          },
          y: 275 + (17 - i) * 50,
        });
      }
    }

    for (let i = 17; i < 19; i++) {
      pera = -90 + (19 - i) * diff;
      const mesh11 = reveal.textObjects?.[i]?.mesh;
      if (mesh11) {
        mesh11.scale.set(0.001, 0.001, 0.001);
        gsap.to(mesh11.scale, {
          scrollTrigger: {
            trigger: ".section-seven",
            start: `top ${pera + diff * 2}%`,
            end: `top ${pera + diff * 1}%`,
            markers: false,
            scrub: true,
            immediateRender: false,
          },
          x: 1,
          y: 1,
          z: 1,
        });
        gsap.to(mesh11.position, {
          scrollTrigger: {
            trigger: ".section-seven",
            start: `top ${pera + diff}%`,
            end: `top ${pera}%`,
            markers: false,
            scrub: true,
            immediateRender: false,
          },
          y: -75 + (19 - i) * 50,
        });
        pera = -90;
        gsap.to(mesh11.position, {
          scrollTrigger: {
            trigger: ".section-seven",
            start: `top ${pera + diff}%`,
            end: `top ${pera}%`,
            markers: false,
            scrub: true,
            immediateRender: false,
          },
          y: 275 + (19 - i) * 50,
        });
      }
    }

    {
      pera = -0;
      gsap.to(reveal.disturbGroup.position, {
        scrollTrigger: {
          trigger: ".section-eight",
          start: `top ${pera + diff * 1.1}%`,
          end: `top ${pera + diff * 1}%`,
          markers: false,
          scrub: true,
          immediateRender: false,
        },
        y: 0,
        onStart: () => {
          for (let i = 0; i < reveal.disturbGroup.children.length; i++) {
            reveal.disturbGroup.children[i].position.set(0, -250, 0);
          }
        },
        onComplete: () => {
          reveal.disturbGroup.children.forEach((mesh, i) => {
            if (!mesh) return;
            gsap.to(mesh.position, {
              x: 0,
              y: 120 - 50 * i,
              duration: 0.3,
              ease: "back.out(2)",
            });
          });
        },
      });
      pera = -120;
      gsap.fromTo(
        reveal.disturbGroup.position,
        { x: 0 },
        {
          scrollTrigger: {
            trigger: ".section-eight",
            start: `top ${pera + diff}%`,
            end: `top ${pera}%`,
            markers: false,
            scrub: true,
            immediateRender: false,
          },
          y: 400,
          onStart: () => {
            reveal.disturbGroup.position.y = 0;
          },
        }
      );
    }
    for (let i = 19; i < 22; i++) {
      pera = -90 + (23.5 - i) * diff;
      const mesh11 = reveal.textObjects?.[i]?.mesh;
      if (mesh11) {
        mesh11.scale.set(0.001, 0.001, 0.001);
        gsap.to(mesh11.scale, {
          scrollTrigger: {
            trigger: ".section-ten",
            start: `top ${pera + diff * 2}%`,
            end: `top ${pera + diff * 1}%`,
            markers: false,
            scrub: true,
            immediateRender: false,
          },
          x: 1,
          y: 1,
          z: 1,
        });
        gsap.to(mesh11.position, {
          scrollTrigger: {
            trigger: ".section-ten",
            start: `top ${pera + diff}%`,
            end: `top ${pera}%`,
            markers: false,
            scrub: true,
            immediateRender: false,
          },
          y: -75 + (22 - i) * 50,
        });
        pera = -90;
        gsap.to(mesh11.position, {
          scrollTrigger: {
            trigger: ".section-ten",
            start: `top ${pera + diff}%`,
            end: `top ${pera}%`,
            markers: false,
            scrub: true,
            immediateRender: false,
          },
          y: 275 + (22 - i) * 50,
        });
      }
    }
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
    console.log(reveal.disturbGroup?.position.y);
    if (
      disturbObj?.geometry &&
      disturbObj?.positions &&
      reveal.disturbGroup?.position.y > -150 &&
      reveal.disturbGroup?.position.y < 250
    ) {
      const copy = disturbObj?.positions.attributes.position;
      for (let i = 0; i < disturbObj?.geometry.attributes.position.count; i++) {
        disturbObj.geometry.attributes.position.setXYZ(
          i,
          copy.getX(i) - Math.random() * 2,
          copy.getY(i) - Math.random() * 1,
          copy.getZ(i) - Math.random() * 2
        );
        disturbObj.geometry.attributes.position.needsUpdate = true;
      }
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
