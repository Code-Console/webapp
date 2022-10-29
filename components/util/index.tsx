import * as THREE from "three";
export const setWireFrameMaterial = (model: any) => {
  if (!model) return;
  var material = new THREE.MeshNormalMaterial({
    wireframe: true,
    opacity: 0.02,
    transparent: true,
  });
  model.traverse((object: any) => {
    if (!object["isMesh"]) return;
    if (object["material"].isMaterial) {
      object["material"] = material;
    }
  });
};
