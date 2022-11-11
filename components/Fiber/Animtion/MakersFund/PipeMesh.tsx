import * as THREE from "three";
export const bufferGeometry = (): THREE.Mesh => {
    const material = new THREE.MeshPhongMaterial();
    const geometry = new THREE.BufferGeometry();
    const minCX = -.1,maxCX = .1;
    const minCY = -.8,maxCY = .8;
    const minCZ = -.1,maxCZ = .1;
    const centV = 0;
    const topTY = maxCY + .1;
    const butTY = minCY - .1;
    const vertices = new Float32Array([
      maxCX, maxCY, maxCZ, centV, topTY, centV, minCX, maxCY,  maxCZ,
      minCX, maxCY, maxCZ, centV, topTY, centV, minCX, maxCY,  minCZ,
      maxCX, maxCY, minCZ, centV, topTY, centV, maxCX, maxCY,  maxCZ,
      minCX, maxCY, minCZ, centV, topTY, centV, maxCX, maxCY,  minCZ,
      // front
      minCX, minCY, maxCZ, maxCX, minCY, maxCZ, minCX, maxCY,  maxCZ,
      minCX, maxCY, maxCZ, maxCX, minCY, maxCZ, maxCX, maxCY,  maxCZ,
      // back
      maxCX, minCY, minCZ, minCX, minCY, minCZ, maxCX, maxCY, minCZ,
      maxCX, maxCY, minCZ, minCX, minCY, minCZ, minCX, maxCY, minCZ,
      // left
      minCX, minCY, minCZ, minCX, minCY, maxCZ, minCX, maxCY, minCZ,
      minCX, maxCY, minCZ, minCX, minCY, maxCZ, minCX, maxCY, maxCZ,
      // right
      maxCX, minCY, maxCZ, maxCX, minCY, minCZ, maxCX, maxCY,  maxCZ,
      maxCX, maxCY, maxCZ, maxCX, minCY, minCZ, maxCX, maxCY, minCZ,
      
      minCX, minCY, maxCZ, centV, butTY, centV, maxCX, minCY,  maxCZ,
      minCX, minCY, minCZ, centV, butTY, centV, minCX, minCY,  maxCZ,
      maxCX, minCY, maxCZ, centV, butTY, centV, maxCX, minCY,  minCZ,
      maxCX, minCY, minCZ, centV, butTY, centV, minCX, minCY,  minCZ,
    ])
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  };