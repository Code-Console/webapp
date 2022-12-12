import { useTexture } from "@react-three/drei";
import { basePath, earthImg } from "../Assets";
import * as THREE from "three";
import CameraController from "./CameraController";
import { globeShader, mapShader } from "../Shaders";
const WorldGlobe = () => {
  const texture = useTexture({
    map: `${basePath}3D/earth.jpg`,
    normalMap: `${basePath}3D/earthNormal.jpg`,
    bnw: earthImg,
  });
  const DOT_COUNT = 60000;
  const positions = new Float32Array(DOT_COUNT * 3 + 3);
  const uvs = new Float32Array(DOT_COUNT * 2 + 2);
  const vector = new THREE.Vector3();
  for (let i = 0, j = 0; i < DOT_COUNT; i++) {
    const phi = Math.acos(-1 + (2 * i) / DOT_COUNT);
    const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;

    vector.setFromSphericalCoords(1, phi, theta);
    positions.set([vector.x, vector.y, vector.z], j * 3);
    uvs.set([-(vector.x-1) * 0.5, (vector.y+1) * 0.5], i * 2);

    j++;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();

  const check = new THREE.BufferGeometry();
  check.copy(geometry);
  const uniforms = {
    u_texture: { value: texture.bnw },
  };
  const mesh = new THREE.Points(
    geometry,//new THREE.SphereGeometry(1, 32, 32),
    new THREE.ShaderMaterial({
      uniforms: uniforms,
      fragmentShader: mapShader.fragment,
      vertexShader: mapShader.vertex,
    })
  );
  const mesh2 = new THREE.Mesh(
    new THREE.SphereGeometry(.99, 32, 32),
    new THREE.ShaderMaterial({
      uniforms: uniforms,
      fragmentShader: globeShader.fragment,
      vertexShader: globeShader.vertex,
    })
  );


  return (
    <>
      <primitive object={mesh} dispose={null} />
      <primitive object={mesh2} dispose={null} />
      <CameraController enableZoom={true} />
    </>
  );
};
export default WorldGlobe;
