import React from "react";

import * as THREE from "three";
const Chair = () => {
  const getChair = () => {
    const geometry = new THREE.BoxGeometry(0.1, 1.21, 0.8);
    const material = new THREE.MeshPhongMaterial({ color: 0x966f33 });
    const chair = new THREE.Group();
    const cubeA = new THREE.Mesh(geometry, material);
    cubeA.name = "cubeA";
    const cubeB = cubeA.clone();
    const sit = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.1, 1),
      new THREE.MeshPhongMaterial({ color: 0xf0b581 })
    );
    sit.name = "sit";
    const sitRest = cubeA.clone();
    const dist = 0.5;
    cubeA.position.set(-dist, 0, 0);
    cubeB.position.set(dist, 0, 0);
    sit.position.set(0, 0.2, 0.12);
    sitRest.position.set(0, 0.7, -0.45);
    sitRest.scale.set(10, 1, 0.1);

    chair.add(cubeA);
    chair.add(cubeB);
    chair.add(sit);
    chair.add(sitRest);
    const Obj = new THREE.Group();
    const Obj2 = new THREE.Group();
    const Obj3 = new THREE.Group();
    const Obj4 = new THREE.Group();
    Obj.add(chair);
    for (let i = 0; i < 14; i++) {
      const obj = chair.clone();
      obj.name = "1-chair-" + i;
      Obj.add(obj);
    }
    for (let i = 0; i < 15; i++) {
      const obj = chair.clone();
      obj.name = "2-chair-" + i;
      Obj2.add(obj);
    }
    for (let i = 0; i < 13; i++) {
      const obj = chair.clone();
      obj.name = "3-chair-" + i;
      Obj3.add(obj);
    }
    for (let i = 0; i < 13; i++) {
      const obj = chair.clone();
      obj.name = "4-chair-" + i;
      Obj4.add(obj);
    }

    for (let i = 0; i < Obj.children.length; i++) {
      const red = (Math.PI / 180) * (i - 7) * 8.0;
      Obj.children[i].position.set(
        Math.sin(red) * 13.9,
        0.5,
        Math.cos(red) * 13.9 - 16
      );
      Obj.children[i].rotation.y = red + Math.PI;
    }
    for (let i = 0; i < Obj2.children.length; i++) {
      const red = (Math.PI / 180) * (i - 7) * 8.0;
      Obj2.children[i].position.set(
        Math.sin(red) * 11.8,
        -0.5,
        Math.cos(red) * 11.8 - 16
      );
      Obj2.children[i].rotation.y = red + Math.PI;
    }
    for (let i = 0; i < Obj3.children.length; i++) {
      const red = (Math.PI / 180) * (i - 6.0) * 8.0;
      Obj3.children[i].position.set(
        Math.sin(red) * 10.2,
        -1.5,
        Math.cos(red) * 10.2 - 16.5
      );
      Obj3.children[i].rotation.y = red + Math.PI;
    }
    for (let i = 0; i < Obj4.children.length; i++) {
      const red = (Math.PI / 180) * (i - 6.0) * 8.0;
      Obj4.children[i].position.set(
        Math.sin(red) * 8.7,
        -2.0,
        Math.cos(red) * 8.7 - 17.0
      );
      Obj4.children[i].rotation.y = red + Math.PI;
    }
    const groupSit = new THREE.Group();
    groupSit.name = "groupSit";
    groupSit.add(Obj);
    groupSit.add(Obj2);
    groupSit.add(Obj3);
    groupSit.add(Obj4);
    return groupSit;
  };
  return <primitive object={getChair()} dispose={null} />;
};

export default Chair;
