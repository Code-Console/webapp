import React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { dealWithKeyboard } from "../../../util/Keyboard";
import { pointShaderAnim } from "../../../Shaders";
import { pathSVG } from "../../../Assets/svg";

const BlockXYZ = (props: any) => {
  const ref: any = React.useRef();
  const lines: {
    id: number;
    path: SVGPathElement;
    length: number;
    number: number;
    currentPos: number;
    points: THREE.Vector3[];
  }[] = [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(pathSVG(), "image/svg+xml");
  const path = doc.getElementsByTagName("path");

  for (let i = 0; i < path.length; i++) {
    const len = path[i].getTotalLength();
    const numberOfPoints = Math.floor(len / 5);
    const points = [];
    for (let j = 0; j < numberOfPoints; j++) {
      const pointAt = (len * j) / numberOfPoints;
      const p = path[i].getPointAtLength(pointAt);
      const ranX = (Math.random() - 0.5) * 10,
        ranY = (Math.random() - 0.5) * 10;
      points.push(
        new THREE.Vector3(
          (ranX + p.x - 1024) * 0.008,
          (ranY + p.y - 512) * 0.008,
          0
        )
      );
    }
    lines.push({
      id: i,
      path: path[i],
      length: len,
      number: numberOfPoints,
      points: points,
      currentPos: 0,
    });
  }
  const maxPointPerLine = 100;
  const max = lines.length * maxPointPerLine;
  const positions = new Float32Array(max * 3);
  const opacity = new Float32Array(max);
  const geometry = new THREE.BufferGeometry();

  for (let i = 0; i < max; i++) {
    positions.set([Math.random() * 1, Math.random(), 0], i * 3);
    opacity.set([Math.random() / 2], i);
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("opacity", new THREE.BufferAttribute(opacity, 1));

  const mesh = new THREE.Points(
    geometry,
    new THREE.ShaderMaterial({
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
    })
  );
  // mesh.scale.set(.01,.01,.01);
  useFrame((state) => {
    state.clock.getElapsedTime();
    let j = 0;

    lines.forEach((line) => {
      line.currentPos++;
      for (let i = 0; i < maxPointPerLine; i++) {
        const index = (i + line.currentPos) % line.points.length;
        const p = line.points[index];
        positions.set([p.x, p.y, p.z], j * 3);
        opacity.set([i / 500], j);
        j++;
      }
    });
    geometry.attributes.position.array = positions;
    geometry.attributes.position.needsUpdate = true;
  });
  React.useEffect(() => {
    document.addEventListener("keydown", dealWithKeyboard);
  }, []);
  return (
    <group ref={ref} {...props} dispose={null}>
      <primitive object={mesh} dispose={null} />
    </group>
  );
};

export default BlockXYZ;
