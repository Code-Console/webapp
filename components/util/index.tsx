import * as THREE from "three";
export const setWireFrameMaterial = ({
  model,
  opacity,
  skip = [],
}: {
  model: any;
  opacity?: number;
  skip?: string[];
}) => {
  if (!model) return;
  const material = new THREE.MeshNormalMaterial({
    wireframe: true,
    opacity: opacity || 0.02,
    transparent: true,
  });
  model.traverse((object: any) => {
    if (!object["isMesh"] || skip.includes(object.name)) return;
    if (object["material"].isMaterial) {
      object["material"] = material;
    }
  });
};
export const updateMaterial = (model: any) => {
  if (!model) return;
  model.traverse((object: any) => {
    if (!object["isMesh"]) return;
    if (object["material"].isMaterial) {
      object["material"].color = new THREE.Color("rgb(255,0,0)");
      object["material"].wireframe = false;
      object["material"].metalness = 1;
      object["material"].roughness = 0;
    }
  });
};
export const updateMaterialTexture = (
  model: any,
  texture: any,
  except: string[]
) => {
  if (!model) return;
  model.traverse((object: any) => {
    if (!object["isMesh"]) return;
    if (object["material"].isMaterial && !except.includes(object["material"].name)) {
      object["material"].map = texture;
      object["material"].metalness = 1;
      object["material"].roughness = 1;
    }
  });
};
19343;
export const isPortraitViewport = () =>
  Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) <
  Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
