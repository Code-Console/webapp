import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { GeoLocation } from "../../../services/geolocation";
import { globeCurveShader } from "../../../Shaders";
import { cleanMesh } from "../../../ThreeJS/cleanUpThree";
// n +ve, e +ve s -ve w -ve
const diff = 0.99;
const calcPosFromLatLongRad = (p: { lat: number; lng: number }) => {
  const phi = (90 - p.lat) * (Math.PI / 180);
  const theta = (p.lng + 180) * (Math.PI / 180);

  const x = -(Math.sin(phi) * Math.cos(theta)) * diff;
  const y = Math.sin(phi) * Math.sin(theta) * diff;
  const z = Math.cos(phi) * diff;

  return new THREE.Vector3(x, z, y);
};
const getPoints = () => {
  const geoLocation: GeoLocation[] = [
    {
      latitude: 43.653225,
      longitude: -79.383186,
      city: "Toronto",
    },
    {
      latitude: 34.555347,
      longitude: 69.207489,
      city: "Kabul",
    },
    {
      latitude: -8.839988,
      longitude: 13.289437,
      city: "Luanda",
    },
    {
      latitude: -34.603683,
      longitude: -58.381557,
      city: "Buenos Aires",
    },
    {
      latitude: 40.409264,
      longitude: 49.867092,
      city: "Baku",
    },
    {
      latitude: -15.7975,
      longitude: -47.8919,
      city: "Brasilia",
    },
    {
      latitude: 39.9042,
      longitude: 116.4074,
      city: "Beijing",
    },
    {
      latitude: 55.6761,
      longitude: 12.5683,
      city: "Copenhagen",
    },
    {
      latitude: 30.0444,
      longitude: 31.2357,
      city: "Cairo",
    },
    {
      latitude: 60.1699,
      longitude: 24.9384,
      city: "Helsinki",
    },
    {
      latitude: 41.7151,
      longitude: 44.8271,
      city: "T'bilisi",
    },
    {
      latitude: 47.4979,
      longitude: 19.0402,
      city: "Budapest",
    },
    {
      latitude: 51.5072,
      longitude: -0.1276,
      city: "London",
    },
    {
      latitude: 28.6139,
      longitude: 77.209,
      city: "New Delhi",
    },
    {
      latitude: 23.588,
      longitude: 58.3829,
      city: "Masqat",
    },
    {
      latitude: -17.8216,
      longitude: 31.0492,
      city: "Harare",
    },
  ];
  let rand = Math.floor(Math.random() * geoLocation.length);
  const a = calcPosFromLatLongRad({
    lat: geoLocation[rand].latitude || 0,
    lng: geoLocation[rand].longitude || 0,
  });
  const other = Math.floor(Math.random() * geoLocation.length);
  if (other != rand) rand = other;
  else rand = (rand + 1) % geoLocation.length;

  const b = calcPosFromLatLongRad({
    lat: geoLocation[rand].latitude || 0,
    lng: geoLocation[rand].longitude || 0,
  });
  return { a, b };
};

const Position = ({ wait }: { wait: Number }) => {
  let waitCount = 0;
  const curveMesh = new THREE.Group();
  const geometry = new THREE.CylinderGeometry(0.01, 0.01, 0.01, 32);
  const material = new THREE.MeshNormalMaterial();
  const firstPoint = new THREE.Group();
  const secondPoint = new THREE.Group();

  const mesh1 = new THREE.Mesh(geometry, material);
  mesh1.rotation.set(Math.PI * 0.5, 0, 0);
  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
  );
  mesh.rotation.set(Math.PI * 0.5, 0, 0);
  firstPoint.add(mesh1);
  secondPoint.add(mesh);
  firstPoint.scale.set(0,0,0);
  secondPoint.scale.set(0,0,0);
  
  const uniform = {
    u_time: { value: 0 },
    u_clr: {
      value: new THREE.Vector2(Math.random() + 0.2, Math.random() + 0.2),
    },
  };

  const point1 = {
    lat: 43.653225,
    lng: -79.383186,
  };
  const point2 = {
    lat: 22.7196,
    lng: 75.8577,
  };

  const posPoint1 = calcPosFromLatLongRad(point1);
  const posPoint2 = calcPosFromLatLongRad(point2);
  firstPoint.position.set(posPoint1.x, posPoint1.y, posPoint1.z);
  secondPoint.position.set(posPoint2.x, posPoint2.y, posPoint2.z);
  firstPoint.lookAt(0, 0, 0);
  secondPoint.lookAt(0, 0, 0);

  const getCurve = (p1: THREE.Vector3, p2: THREE.Vector3) => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < 21; i++) {
      const p = new THREE.Vector3().lerpVectors(p1, p2, i / 20);
      p.normalize();
      p.multiplyScalar(1.0 + 0.1 * Math.sin((Math.PI * i) / 20));
      points.push(p);
    }
    const path = new THREE.CatmullRomCurve3(points);
    const tubeGeometry = new THREE.TubeGeometry(path, 32, 0.001, 8, false);
    const tubeGeometryMaterial = new THREE.ShaderMaterial({
      uniforms: uniform,
      vertexShader: globeCurveShader.vertex,
      fragmentShader: globeCurveShader.fragment,
    });
    const mesh = new THREE.Mesh(tubeGeometry, tubeGeometryMaterial);
    return mesh;
  };
  const setNewPosition = () => {
    const pos = getPoints();
    firstPoint.position.set(pos.a.x, pos.a.y, pos.a.z);
    secondPoint.position.set(pos.b.x, pos.b.y, pos.b.z);
    firstPoint.lookAt(0, 0, 0);
    secondPoint.lookAt(0, 0, 0);
    firstPoint.scale.set(1, 1, 1);
    for (let i = curveMesh.children.length - 1; i >= 0; i--) {
      cleanMesh(curveMesh.children[i], curveMesh);
    }
    curveMesh.add(getCurve(pos.a, pos.b));
    uniform.u_clr.value = new THREE.Vector2(
      Math.random() + 0.2,
      Math.random() + 0.2
    );
  };

  setNewPosition();
  useFrame(() => {
    waitCount++;
    if (waitCount < wait) return;
    uniform.u_time.value++;
    if (uniform.u_time.value > 400) {
      uniform.u_time.value = 0;
      setNewPosition();
    }
    secondPoint.visible = uniform.u_time.value > 100;
    if (uniform.u_time.value > 100 && uniform.u_time.value < 150) {
      const s = (100 - uniform.u_time.value) / 50;
      secondPoint.scale.set(s, s, s);
    }
    if (uniform.u_time.value > 230 && uniform.u_time.value < 280) {
      const s = (280 - uniform.u_time.value) / 50;
      firstPoint.scale.set(s, s, s);
    }
  });
  return (
    <group dispose={null}>
      <primitive object={firstPoint} dispose={null} />
      <primitive object={secondPoint} dispose={null} />
      <primitive object={curveMesh} dispose={null} />
    </group>
  );
};

export default Position;
