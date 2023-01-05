import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { MeshBasicMaterial } from "three";
import { sandImg, roomGLBPath, brashImg, skyImg } from "../../../Assets";
import { rippleShader2 } from "../../../Shaders";
const Unseen = () => {
  const meshRef = React.useRef() as any;
  const { camera,gl } = useThree();
  const texture = useTexture({
    chan1: sandImg,
    brashImg: brashImg,
    skyImg: skyImg,
  });
  
  const watchGlb = useGLTF(roomGLBPath);
  const basicTexture = new THREE.WebGLRenderTarget(
    window.innerWidth,
    window.innerHeight,
    {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    }
  );
  const uniforms = {
    iTime: { value: 0 },
    iChannel0: { value: texture.chan1 },
    iChannel1: { value: texture.chan1 },
    iChannel2: { value: basicTexture.texture },
  };
  const material = new THREE.ShaderMaterial({
    vertexShader: rippleShader2.vertex,
    fragmentShader: rippleShader2.fragment,
    uniforms: uniforms,
    transparent: true,
  });

  const raycaster = new THREE.Raycaster();
  const iMouse = new THREE.Vector2();
  const iPreMouse = new THREE.Vector2();
  const groupWave = new THREE.Group();
  const max = 50;
  const sceneWave = new THREE.Scene();
  let currentWave = 0;
  const geometry = new THREE.PlaneGeometry(0.5, 0.5);
  const materialPlan = new MeshBasicMaterial({
    map: texture.brashImg,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    depthWrite: false,
  });

  for (let i = 0; i < max; i++) {
    const m = new THREE.Mesh(geometry, materialPlan.clone());
    m.visible = false;
    m.rotation.z = 2 * Math.PI * Math.random();
    groupWave.add(m);
  }
  sceneWave.add(groupWave);
  const mesh2 = new THREE.Mesh(new THREE.PlaneGeometry(12, 5), material);
  mesh2.rotation.set(-0.195, -0.325, -0.063);
  const eventMove = (e: any) => {
    // if((e.clientX / window.innerWidth) * 2 - 1 > iMouse.x){
    //   camera.rotation.y+=.01;
    // }else if(camera.rotation.y>-.51){
    //   camera.rotation.y-=.01;
    // }
    console.log(camera.rotation.y);
    console.log(camera.rotation.y);
    iMouse.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1
    );
    if (iMouse.distanceTo(iPreMouse) > 0.01) {
      iPreMouse.copy(iMouse);
      raycaster.setFromCamera(iMouse, camera);
      const intersects = raycaster.intersectObjects([mesh2]);
      if (intersects.at(0)?.point) {
        currentWave++;
        currentWave = currentWave % max;
        const m = groupWave?.children[currentWave] as any;
        m.position.set(
          intersects[0].point.x,
          intersects[0].point.y,
          intersects[0].point.z + 0.2
        );
        m.visible = true;
        m.material.opacity = 1;
        m.scale.x = m.scale.y = 1;
      }
    }

  };
  camera?.position.set(-1, 0.6, 2.9);
  camera?.rotation.set(-0.195, -0.325, -0.063);
  texture.chan1.wrapS = THREE.RepeatWrapping;
  texture.chan1.wrapT = THREE.RepeatWrapping;
  texture.chan1.anisotropy = 16;
  texture.chan1.repeat.set( 4, 4 );
  React.useEffect(() => {
    document.addEventListener("mousemove", eventMove);
    console.log(THREE.REVISION, "~~~~~~~~~~");
  }, []);
  useFrame(() => {
    gl.setRenderTarget(basicTexture);
    gl.render(sceneWave, camera);
    const uni = meshRef?.current?.material?.uniforms;
    if (uni) uni.iChannel2.value = basicTexture.texture;

    gl.setRenderTarget(null);
    gl.clear();
    uniforms.iTime.value += 0.1;
    groupWave.children.forEach((mesh: any) => {
      if (mesh.material.opacity < 0.01) {
        mesh.visible = false;
      } else {
        mesh.rotation.z += 0.02;
        mesh.scale.x = mesh.scale.y = mesh.scale.y * 0.97 + 0.1;
        mesh.material.opacity *= 0.98;
      }
    });
  });
  return (
    <>
      <primitive
        scale={[70, 70, 70]}
        position={[-3, 0.0, -3]}
        rotation={[0, -0.7, 0]}
        object={watchGlb.scene}
        dispose={null}
      />

      <mesh position={[0, 2, -10]}>
        <planeGeometry args={[30, 15]} />
        <meshBasicMaterial map={texture.skyImg}/>
      </mesh>
      <mesh
        material={material}
        rotation={[-Math.PI * 0.5, 0, 0]}
        position={[-1, -3.0, -4]}
      >
        <planeGeometry args={[30, 30]} />
      </mesh>
    </>
  );
};

export default Unseen;
