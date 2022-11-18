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
