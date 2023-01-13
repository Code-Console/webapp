import * as THREE from "three";
export const visibleHeightAtZDepth = (
  depth: number,
  camera: THREE.PerspectiveCamera
) => {
  const cameraOffset = camera.position.z;
  if (depth < cameraOffset) depth -= cameraOffset;
  else depth += cameraOffset;

  const vFOV = (camera?.fov * Math.PI) / 180;

  return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
};

export const visibleWidthAtZDepth = (
  depth: number,
  camera: THREE.PerspectiveCamera
) => {
  const height = visibleHeightAtZDepth(depth, camera);
  return height * camera?.aspect;
};

export const distance = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

export const cirCir = (
  x1: number,
  y1: number,
  r1: number,
  x2: number,
  y2: number,
  r2: number
) => {
  if (r1 + r2 > Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))) {
    return true;
  }
  return false;
};
export const createColor=()=>{
  const col= Math.random();
  const frequency=1;
  const r = Math.floor(Math.sin(frequency * col + 0) * 127 + 128);
  const g = Math.floor(Math.sin(frequency * col + 2) * 127 + 128);
  const b = Math.floor(Math.sin(frequency * col + 4) * 127 + 128);
  return new THREE.Color('rgb(' + r + ',' + g + ',' + b + ')');
}