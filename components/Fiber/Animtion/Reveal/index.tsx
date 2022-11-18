import React from "react";
import * as THREE from "three";
import CameraController from "../../CameraController";
import { useFrame } from "@react-three/fiber";
import { dealWithKeyboard } from "../../../util/Keyboard";
import { FontLoader, Font } from "three/examples/jsm/loaders/FontLoader";
import { basePath } from "../../../Assets";
import gsap from "gsap";
interface IReveal {
  font?: Font;
  firstMeshPositions?: THREE.BufferGeometry;
  firstGeometry?: THREE.ShapeGeometry;
}

const Reveal = (props: any) => {
  const ref: any = React.useRef();
  const loader = new FontLoader();
  const group = new THREE.Group();
  group.position.set(0, 0, -200);
  const gsapState = { count: 0 };

  const reveal: IReveal = {};

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
        new THREE.MeshBasicMaterial({ color: "#000000" })
      ),
    };
  };

  loader.load(`${basePath}3D/Lobster_Regular.json`, (font) => {
    reveal.font = font;
    const first = createShapeGeometry({ str: "This is for", size: 30 });
    reveal.firstGeometry = first.geometry;
    group.add(first.mesh);
    reveal.firstMeshPositions = new THREE.BufferGeometry();
    reveal.firstMeshPositions.copy(first.geometry);
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

    // ///////----2
    // const madeText = createShapeGeometry({
    //   str: "WE’RE MADE OF\n       STORIES",
    //   size: 25,
    // });
    // group.add(madeText.mesh);
    // madeText.mesh.scale.set(0.001, 0.001, 0.001);
    // gsap.to(madeText.mesh.scale, {
    //   x: 1,
    //   y: 1,
    //   z: 1,
    //   duration: 0.3,
    //   delay: 1.4,
    //   ease: "back.out(5)",
    // });
    // revealText.mesh.scale.set(0.001, 0.001, 0.001);

    // ///////----3
    // const madeText = createShapeGeometry({
    //   str: "STORIES THAT LIVE LAST REVEAL",
    //   size: 25,
    // });
    // group.add(madeText.mesh);
    // madeText.mesh.scale.set(0.001, 0.001, 0.001);
    // gsap.to(madeText.mesh.scale, {
    //   x: 1,
    //   y: 1,
    //   z: 1,
    //   duration: 0.3,
    //   delay: 1.4,
    //   ease: "back.out(5)",
    // });
    // revealText.mesh.scale.set(0.001, 0.001, 0.001);

    // ///////----4
    // const madeText = createShapeGeometry({
    //   str: "REVEAL THE IMPOSSIBLE",
    //   size: 25,
    // });
    // ///////----5
    // const madeText = createShapeGeometry({
    //   str: "Brand strategy",
    //   size: 25,
    // });
    // const madeText = createShapeGeometry({
    //   str: "Positioning strategy",
    //   size: 25,
    // });
    // const madeText = createShapeGeometry({
    //   str: "Competitors research",
    //   size: 25,
    // });
    // const madeText = createShapeGeometry({
    //   str: "DISCOVERY \n& RESEARCH",
    //   size: 25,
    // });
    // const madeText = createShapeGeometry({
    //   str: "Company \n PROFILE",
    //   size: 25,
    // });
    // const madeText = createShapeGeometry({
    //   str: "Proposition",
    //   size: 25,
    // });
    // const madeText = createShapeGeometry({
    //   str: "Brand Style\nGUIDES",
    //   size: 25,
    // });

    // const madeText = createShapeGeometry({
    //   str: "Brand \nActivation",
    //   size: 25,
    // });
    // const madeText = createShapeGeometry({
    //   str: "Brand \nManagement",
    //   size: 25,
    // });

    // ///////----6
    // const madeText = createShapeGeometry({
    //   str: "360 \n Strategy and branding",
    //   size: 25,
    // });
    // ///////----7
    // const madeText = createShapeGeometry({
    //   str: "Strategical branding",
    //   size: 25,
    // });
    // ///////----8
    // const madeText = createShapeGeometry({
    //   str: "Branding That disturb",
    //   size: 25,
    // });

    // ///////----9
    // const madeText = createShapeGeometry({
    //   str: "DISTURB",
    //   size: 25,
    // });
  });

  useFrame((state) => {
    state.clock.getElapsedTime();
    if (
      reveal.firstGeometry &&
      reveal.firstMeshPositions &&
      gsapState.count < reveal.firstGeometry.attributes.position.count
    ) {
      const copy = reveal.firstMeshPositions.attributes.position;
      for (let i = 0; i < reveal.firstGeometry.attributes.position.count; i++) {
        if (gsapState.count < i) {
          reveal.firstGeometry.attributes.position.setXYZ(
            i,
            copy.getX(i) - 10,
            copy.getY(i) - 300,
            copy.getZ(i) - 100
          );
        } else {
          reveal.firstGeometry.attributes.position.setXYZ(
            i,
            copy.getX(i),
            copy.getY(i),
            copy.getZ(i)
          );
        }
        reveal.firstGeometry.attributes.position.needsUpdate = true;
      }
    } else {
      // mesh?.children[0].position.set(0, 100, 0);
    }
  });
  React.useEffect(() => {
    document.addEventListener("keydown", dealWithKeyboard);
  }, []);
  return (
    <group ref={ref} {...props} dispose={null}>
      <CameraController />
      <primitive object={group} dispose={null} />
    </group>
  );
};

export default Reveal;
