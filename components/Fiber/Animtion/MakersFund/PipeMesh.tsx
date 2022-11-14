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
  export const createCube = () => {
    const group = new THREE.Group();
    const mesh = bufferGeometry();
    group.add(mesh);
    for (let i = 0; i < 11; i++) {
      const m = mesh.clone();
      group.add(m);
      if (i > 2) m.rotation.set(0, 0, Math.PI / 2);
      if (i > 6) m.rotation.set(0, Math.PI / 2, Math.PI / 2);
    }
    const diff = 2;
  
    group.children[5].position.set(0, -diff / 2, diff / 2);
    group.children[7].position.set(0, -diff / 2, -diff / 2);
    group.children[8].position.set(-diff / 2, -diff / 2, 0);
    group.children[10].position.set(diff / 2, -diff / 2, 0);
  
    group.children[0].position.set(-diff / 2, 0, -diff / 2);
    group.children[1].position.set(diff / 2, 0, -diff / 2);
    group.children[2].position.set(diff / 2, 0, diff / 2);
    group.children[3].position.set(-diff / 2, 0, diff / 2);
  
    group.children[4].position.set(0, diff / 2, diff / 2);
    group.children[6].position.set(0, diff / 2, -diff / 2);
    group.children[9].position.set(-diff / 2, diff / 2, 0);
    group.children[11].position.set(diff / 2, diff / 2, 0);
  
    return group;
  };