export const cleanTexture = (value: THREE.Texture | undefined) => {
  if (value && typeof value === "object" && "minFilter" in value) {
    value.dispose();
  }
  value = undefined;
  return undefined;
};
export const cleanMaterial = (material: any) => {
  for (const key of Object.keys(material)) {
    const value = material[key];
    if (value && typeof value === "object" && "minFilter" in value) {
      value.dispose();
    }
  }
  material.dispose();
  material = undefined;
};

export const cleanUpThree = ({
  scene,
  renderer,
  container,
}: {
  scene?: any;
  renderer?: any;
  container?: any;
}) => {
  if (scene != undefined) {
    scene.traverse((object: any) => {
      if (!object["isMesh"]) return;
      object["geometry"].dispose();
      if (object["material"].isMaterial) {
        cleanMaterial(object["material"]);
      } else {
        for (const material of object["material"]) cleanMaterial(material);
      }
      object["geometry"] = undefined;
      object = undefined;
    });
    scene.children.forEach((model: any) => {
      scene.remove(model);
    });
  }
  if (renderer != undefined) {
    renderer.dispose();
    renderer && renderer.renderLists?.dispose();
  }
  if (renderer) container?.removeChild(renderer.domElement);
  scene = undefined;
  renderer = undefined;
};
