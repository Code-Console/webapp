import React from "react";
import Header from "../UI/Header";
import CommonAnimation from "./CommonAnimation";
import Particle from "./Particle";
const ThreeJSAnimation = () => {
  return (
    <>
      <Header />
      <Particle />
      <style>{`
        .identity{
          position: fixed;
        }
        `}</style>
    </>
  );
};
export default ThreeJSAnimation;
