import React, { useEffect } from "react";
import * as THREE from "three";
import { Font } from "three/examples/jsm/loaders/FontLoader";
import { Lobster_Regular } from "../../Assets";
import { Environment } from "./Environment";
const Particle = () => {
  const [environment, setEnvironment] = React.useState<Environment>();
  const preload = async () => {
    const FontLoader = (await import("three/examples/jsm/loaders/FontLoader"))
      .FontLoader;
    const manager = new THREE.LoadingManager();

    manager.onLoad = () => {
      if (!environment) {
        setEnvironment(new Environment(typo));
      }
    };

    let typo: Font | null = null;
    const loader = new FontLoader(manager);
    loader.load(Lobster_Regular, (font) => {
      typo = font;
    });
  };
  const cleanUp = () => {
    environment?.cleanUp();
    setEnvironment(undefined);
  };
  useEffect(() => {
    if (!environment) preload();
    return () => cleanUp();
  }, []);
  return (
    <>
      <div id="magic" className="magic"></div>
      <style>
        {`
          .magic{
            position: fixed;
            width: 100vw; height: 100vh;
            top: 0;
            z-index: -1;
          }
        `}
      </style>
    </>
  );
};

export default Particle;
