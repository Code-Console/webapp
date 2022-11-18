import React from "react";
import * as THREE from "three";
import CameraController from "../../CameraController";
import { useFrame } from "@react-three/fiber";
import { dealWithKeyboard } from "../../../util/Keyboard";
import { FontLoader, Font } from "three/examples/jsm/loaders/FontLoader";
import { basePath } from "../../../Assets";
import gsap from "gsap";
import { ShaderMaterial } from "three";
import { basicMultiShader } from "../../../Shaders";

interface IObject {
  positions?: THREE.BufferGeometry;
  geometry?: THREE.ShapeGeometry;
  mesh?: THREE.Mesh;
}
interface IReveal {
  font?: Font;
  first?: IObject;
  disturbObj?: IObject;
}

const Reveal = (props: any) => {
  const ref: any = React.useRef();
  const meshBackref: any = React.useRef();
  const loader = new FontLoader();
  const group = new THREE.Group();
  group.position.set(0, 0, -200);
  const gsapState = { count: 0 };
  const uniforms = {
    u_time: { value: 0 },
  };
  const reveal: IReveal = {};
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

  loader.load(`${basePath}3D/Lobster_Regular.json`, (font) => {
    reveal.font = font;
    const first = createShapeGeometry({ str: "This is for", size: 30 });
    group.add(first.mesh);
    const fPositions = new THREE.BufferGeometry();
    fPositions.copy(first.geometry);
    const firstObj: IObject = {
      positions: fPositions,
      geometry: first.geometry,
      mesh: first.mesh,
    };
    reveal.first = firstObj;
    gsap.to(gsapState, {
      count: first.geometry.attributes.position.count,
      duration: 1,
      delay: 0,
    });
    gsap.to(first.mesh.position, {
      y: 30,
      duration: 0.3,
      delay: 0.9,
      ease: "back.out(5)",
    });
    const revealText = createShapeGeometry({ str: "reveal", size: 25 });
    group.add(revealText.mesh);
    revealText.mesh.scale.set(0.001, 0.001, 0.001);
    gsap.to(revealText.mesh.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.3,
      delay: 1.1,
      ease: "back.out(5)",
    });

    gsap.to(first.mesh.position, {
      x: 400,
      y: 250,
      duration: 0.2,
      delay: 2.0,
      ease: "Power1.out",
    });

    gsap.to(revealText.mesh.position, {
      z: 210,
      duration: 0.5,
      delay: 2.2,
      ease: "Power1.out",
    });


    /////----2
    const madeText = createShapeGeometry({
      str: "WE’RE MADE OF\n       STORIES",
      size: 25,
    });
    group.add(madeText.mesh);
    madeText.mesh.scale.set(0.001, 0.001, 0.001);
    gsap.to(madeText.mesh.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.3,
      delay: 2.6,
      ease: "back.out(5)",
    });

    gsap.to(madeText.mesh.position, {
      y: 200,
      duration: 0.2,
      delay: 4.0,
      ease: "Power1.out",
    });

    ///////----3
    const storiesThatText = createShapeGeometry({
      str: "STORIES THAT \n         LIVE\n LAST REVEAL",
      size: 25,
    });
    group.add(storiesThatText.mesh);
    storiesThatText.mesh.scale.set(0.001, 0.001, 0.001);
    gsap.to(storiesThatText.mesh.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.3,
      delay: 4.2,
      ease: "back.out(5)",
    });
    gsap.to(storiesThatText.mesh.position, {
      y: -300,
      duration: 0.2,
      delay: 5.2,
      ease: "Power1.out",
    });
    let time = 5.5;
    const delTime = 1;
    ///////----4
    gsapAnim({
      str: "REVEAL THE IMPOSSIBLE",
      size: 25,
      inTime: time,
      out: time + delTime,
      pos: [-200, 300, 0],
    });
    time += delTime;
    // ///////----5
    gsapAnim({
      str: "Brand strategy",
      size: 25,
      inTime: time,
      out: time + delTime,
      pos: [500, 0, 0],
    });
    time += delTime;
    // const madeText = createShapeGeometry({
    //   str: "Brand strategy",
    //   size: 25,
    // });
    gsapAnim({
      str: "Positioning strategy",
      size: 25,
      inTime: time,
      out: time + delTime,
      pos: [50, -200, 0],
    });
    time += delTime;
    // const madeText = createShapeGeometry({
    //   str: "Positioning strategy",
    //   size: 25,
    // });
    gsapAnim({
      str: "Competitors research",
      size: 25,
      inTime: time,
      out: time + delTime,
      pos: [-50, 200, 0],
    });
    time += delTime;
    // const madeText = createShapeGeometry({
    //   str: "Competitors research",
    //   size: 25,
    // });
    gsapAnim({
      str: "DISCOVERY \n& RESEARCH",
      size: 25,
      inTime: time,
      out: time + delTime,
      pos: [-400, 250, 0],
    });
    time += delTime;
    // const madeText = createShapeGeometry({
    //   str: "DISCOVERY \n& RESEARCH",
    //   size: 25,
    // });
    gsapAnim({
      str: "Company \n PROFILE",
      size: 25,
      inTime: time,
      out: time + delTime,
      pos: [-300, -250, 0],
    });
    time += delTime;
    // const madeText = createShapeGeometry({
    //   str: "Company \n PROFILE",
    //   size: 25,
    // });
    gsapAnim({
      str: "Proposition",
      size: 25,
      inTime: time,
      out: time + delTime,
      pos: [-100, 300, 0],
    });
    time += delTime;
    // const madeText = createShapeGeometry({
    //   str: "Proposition",
    //   size: 25,
    // });
    gsapAnim({
      str: "Brand Style\nGUIDES",
      size: 25,
      inTime: time,
      out: time + delTime,
      pos: [-250, -300, 0],
    });
    time += delTime;
    // const madeText = createShapeGeometry({
    //   str: "Brand Style\nGUIDES",
    //   size: 25,
    // });
    gsapAnim({
      str: "Brand \nActivation",
      size: 25,
      inTime: time,
      out: time + delTime,
      pos: [100, 300, 0],
    });
    time += delTime;

    // const madeText = createShapeGeometry({
    //   str: "Brand \nActivation",
    //   size: 25,
    // });
    gsapAnim({
      str: "Brand \nManagement",
      size: 25,
      inTime: time,
      out: time + delTime,
      pos: [-100, -300, 0],
    });
    time += delTime;
    // const madeText = createShapeGeometry({
    //   str: "Brand \nManagement",
    //   size: 25,
    // });

    // ///////----6
    gsapAnim({
      str: "360 \n Strategy and branding",
      size: 25,
      inTime: time,
      out: time + delTime,
      pos: [-100, -300, 0],
    });
    time += delTime;
    // const madeText = createShapeGeometry({
    //   str: "360 \n Strategy and branding",
    //   size: 25,
    // });
    // ///////----7
    gsapAnim({
      str: "Strategical branding",
      size: 25,
      inTime: time,
      out: time + delTime,
      pos: [100, 300, 0],
    });
    time += delTime;
    // const madeText = createShapeGeometry({
    //   str: "Strategical branding",
    //   size: 25,
    // });
    // ///////----8
    gsapAnim({
      str: "Branding That disturb",
      size: 25,
      inTime: time,
      out: time + delTime,
      pos: [-0, -300, 0],
    });
    time += delTime;
    // const madeText = createShapeGeometry({
    //   str: "Branding That disturb",
    //   size: 25,
    // });


    time += delTime;
    const disturb = createShapeGeometry({ str: "DISTURB", size: 35 });
    reveal.disturbObj = disturb;
    //group.add(disturb.mesh);
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


    // ///////----9
    gsapAnim({
      str: "DISTURB",
      size: 25,
      inTime: time,
      out: time + delTime,
      pos: [-100, 300, 0],
    });
    time += delTime;
    // const madeText = createShapeGeometry({
    //   str: "DISTURB",
    //   size: 25,
    // });
  });

  useFrame((state) => {
    state.clock.getElapsedTime();
    uniforms.u_time.value++;
    if (
      reveal.first?.geometry &&
      reveal.first?.positions &&
      gsapState.count < reveal.first?.geometry.attributes.position.count
    ) {
      const copy = reveal.first?.positions.attributes.position;
      for (
        let i = 0;
        i < reveal.first?.geometry.attributes.position.count;
        i++
      ) {
        if (gsapState.count < i) {
          reveal.first.geometry.attributes.position.setXYZ(
            i,
            copy.getX(i) - 10,
            copy.getY(i) - 300,
            copy.getZ(i) - 100
          );
        } else {
          reveal.first.geometry.attributes.position.setXYZ(
            i,
            copy.getX(i),
            copy.getY(i),
            copy.getZ(i)
          );
        }
        reveal.first.geometry.attributes.position.needsUpdate = true;
      }
    } else {
      // mesh?.children[0].position.set(0, 100, 0);
    }
    const val = reveal?.disturbObj?.mesh?.position?.y;
    if (val && val > -250 && val < 100) {
      meshBackref?.current?.position.set(0, 0, -210);
    }else{
      meshBackref?.current?.position.set(0, 5000, 0);
    }
  });
  React.useEffect(() => {
    document.addEventListener("keydown", dealWithKeyboard);
  }, []);
  return (
    <group ref={ref} {...props} dispose={null}>
      <CameraController />
      <primitive object={group} dispose={null} />
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
