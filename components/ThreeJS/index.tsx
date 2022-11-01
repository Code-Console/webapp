import { useRouter } from "next/router";
import React from "react";
import Games from "../UI/Games";
import Particle from "./Particle";
const ThreeJSAnimation = () => {
  const router = useRouter();
  const anim = router.query.anim === 'true';
  return (
    <>
      {!anim && (
        <div className="games prevent-select">
          <Games />
        </div>
      )}
      <Particle />
    </>
  );
};
export default ThreeJSAnimation;
