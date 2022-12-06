import React from "react";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
  Glitch,
} from "@react-three/postprocessing";

const PostEffects = ({ isGlitch }: { isGlitch?: boolean }) => {
  return (
    <EffectComposer>
      <DepthOfField
        focusDistance={0}
        focalLength={0.2}
        bokehScale={2}
        height={480}
      />
      <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
      <Noise opacity={0.12} />
      <Vignette eskil={true} offset={0.1} darkness={1.1} />
      {isGlitch ? <Glitch /> : <></>}
    </EffectComposer>
  );
};

export default PostEffects;
