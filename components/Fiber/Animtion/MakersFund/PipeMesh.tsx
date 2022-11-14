import gsap from "gsap";
import * as THREE from "three";
const diff = 2;
  
export const bufferGeometry = (): THREE.Mesh => {
  const material = new THREE.MeshStandardMaterial({
    roughness: 1,
    metalness: 1,
  });
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
      // if (i > 2) m.rotation.set(0, 0, Math.PI / 2);
      // if (i > 6) m.rotation.set(0, Math.PI / 2, Math.PI / 2);
    }
  
    // group.children[5].position.set(0, -diff / 2, diff / 2);
    // group.children[7].position.set(0, -diff / 2, -diff / 2);
    // group.children[8].position.set(-diff / 2, -diff / 2, 0);
    // group.children[10].position.set(diff / 2, -diff / 2, 0);
  
    // group.children[0].position.set(-diff / 2, 0, -diff / 2);
    // group.children[1].position.set(diff / 2, 0, -diff / 2);
    // group.children[2].position.set(diff / 2, 0, diff / 2);
    // group.children[3].position.set(-diff / 2, 0, diff / 2);
  
    // group.children[4].position.set(0, diff / 2, diff / 2);
    // group.children[6].position.set(0, diff / 2, -diff / 2);
    // group.children[9].position.set(-diff / 2, diff / 2, 0);
    // group.children[11].position.set(diff / 2, diff / 2, 0);
  
    return group;
  };


  export const hitAnimation = (group: THREE.Group) => {
    const arr = [
      [-diff / 2, 0, -diff / 2],
      [diff / 2, 0, -diff / 2],
      [diff / 2, 0, diff / 2],
      [-diff / 2, 0, diff / 2],
      [0, diff / 2, diff / 2],
      [0, -diff / 2, diff / 2],
      [0, diff / 2, -diff / 2],
      [0, -diff / 2, -diff / 2],
      [-diff / 2, -diff / 2, 0],
      [-diff / 2, diff / 2, 0],
      [diff / 2, -diff / 2, 0],
      [diff / 2, diff / 2, 0],
    ];
    group.children.forEach((mesh, i) => {
      const position = mesh.position;
      const rotation = mesh.rotation;
      gsap.to(position, {
        x: arr[i][0],
        y: arr[i][1],
        z: arr[i][2],
        duration: 0.1,
        delay: i * 0.1,
      });
      let rot = [0, 0, 0];
      if (i > 3) rot = [0, 0, Math.PI / 2];
      if (i > 7) rot = [0, Math.PI / 2, Math.PI / 2];
      gsap.to(rotation, {
        x: rot[0],
        y: rot[1],
        z: rot[2],
        duration: 0.1,
        delay: i * 0.1,
      });
    });
  };
  
  export const zoomAnimation = (group: THREE.Group) => {
    const object:any = group.children[0];
    const r = Math.floor(Math.random()*155+100);
    const g = Math.floor(Math.random()*165+100);
    const b = Math.floor(Math.random()*145+100);
    object["material"].color = new THREE.Color(`rgb(${r},${g},${b})`);
    object["material"].roughness = 0;
    object["material"].metalness = 1;
    const scale = group.scale;
    gsap.to(scale, {
      x: 0.8,
      y: 0.8,
      z: 0.8,
      duration: 0.1,
      delay: 0,
    });
    gsap.to(scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.1,
      delay: 0.21,
    });
  };
  