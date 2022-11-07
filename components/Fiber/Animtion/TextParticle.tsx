import { useFrame, useThree } from "@react-three/fiber";
import React from "react";
import { CreateParticles } from "../../ThreeJS/Particle/CreateParticles";
import { basePath } from "../../Assets";
const TextParticle = (props: any) => {
  const [createParticles, setCreateParticles] =
    React.useState<CreateParticles>();
  const { camera, gl, scene } = useThree();
  const preload = async () => {
    const FontLoader = (await import("three/examples/jsm/loaders/FontLoader"))
      .FontLoader;
    const loader = new FontLoader();
    loader.load(`${basePath}3D/Lobster_Regular.json`, (font) => {
      if (camera && gl && scene) {
        const createParticles = new CreateParticles({
          scene: scene,
          font: font,
          camera: camera,
          renderer: gl,
        });
        setCreateParticles(createParticles);
        camera?.position.set(0, 0, 100);
      }
    });
  };
  const cleanUp = () => {
    createParticles?.unbindEvents();
    camera?.position.set(0, 0, 5);
  };
  React.useEffect(() => {
    if (!createParticles) preload();
    return () => cleanUp();
  }, []);
  useFrame(() => {
    createParticles?.render();
  });
  return (
    <group {...props} dispose={null}>
      {createParticles?.particles && (
        <primitive object={createParticles?.particles} dispose={null} />
      )}
    </group>
  );
};
export default TextParticle;
