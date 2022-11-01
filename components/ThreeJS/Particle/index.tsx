import React, { useEffect } from "react";
import * as THREE from "three";
import { Font } from "three/examples/jsm/loaders/FontLoader";
import { basePath } from "../../Assets";
import { Environment } from "./Environment";
const Particle = () => {
  const preload = async () => {
    const FontLoader = (await import("three/examples/jsm/loaders/FontLoader"))
      .FontLoader;
    let manager = new THREE.LoadingManager();
    let environment: Environment;
    manager.onLoad = () => {
      console.log("manager", environment);
      if (!environment) environment = new Environment(typo);
    };

    var typo: Font | null = null;
    const loader = new FontLoader(manager);
    loader.load(`${basePath}3D/Lobster_Regular.json`, (font) => {
      typo = font;
    });
  };
  useEffect(() => {
    preload();
  }, []);
  return <div id="magic" style={{ width: "100vw", height: "100vh" }}></div>;
};

export default Particle;
