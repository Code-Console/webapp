import React from "react";
import { MeetingContext } from "../../meeting/MeetingContext";
import * as THREE from "three";
const VideoPlan = () => {
  const ref: any = React.useRef();
  const meetingContext = React.useContext(MeetingContext);
  React.useEffect(() => {
    if (meetingContext?.localUser) {
      const localVideo1 = document.getElementById(
        `local-video`
      ) as HTMLVideoElement;
      if (localVideo1) {
        const material = new THREE.MeshBasicMaterial({
          map: new THREE.VideoTexture(localVideo1),
        });
        material.needsUpdate = true;
        const localVideo = ref.current.getObjectByName("local-video");
        if (localVideo) {
          localVideo.material = material;
        } else {
          const mesh = new THREE.Mesh(new THREE.PlaneGeometry(6, 4), material);
          mesh.name = "local-video";
          ref.current.add(mesh);
        }
      }
      if (meetingContext?.remoteUsers) {
        const remote = Object.keys(meetingContext?.remoteUsers);
        remote.forEach((element) => {
          const rId = `remote-video-${element}`;
          const remoteVideo = document.getElementById(rId) as HTMLVideoElement;
          if (remoteVideo) {
            const material = new THREE.MeshBasicMaterial({
              map: new THREE.VideoTexture(remoteVideo),
            });
            material.needsUpdate = true;
            const localVideo = ref.current.getObjectByName(rId);
            if (localVideo) {
              localVideo.material = material;
            } else {
              const mesh = new THREE.Mesh(
                new THREE.PlaneGeometry(6, 4),
                material
              );
              mesh.name = rId;
              ref.current.add(mesh);
              mesh.position.set(7, 0, 0);
            }
          }
        });
        console.log(remote, "~~~~~~~~~~~remote-video-${participantId}~~");
      }

      for (let i = 0; i < ref.current.children.length; i++) {
        const mesh = ref.current.children[i];
        if (ref.current.length > 5) {
          mesh.position.set(
            -7.2 + 4.8 * (i % 4),
            -0.2 + 3.2 * Math.floor(i / 4),
            0
          );
          mesh.scale.set(0.79, 0.79, 0.79);
        } else {
          mesh.position.set(
            6.1 * (i % 3) - 6,
            4.1 * Math.floor(i / 3) + 1,
            0
          );
          mesh.scale.set(1, 1, 1);
        }
      }
    }
  }, [meetingContext]);
  return <group ref={ref} position={[0, 0, -19]}></group>;
};
export default VideoPlan;

// <mesh position={[
//         -7.2 + 4.8 * (0 % 4),
//         -0.2 + 3.2 * Math.floor(0 / 4),
//         -19
//       ]}>
//       <planeGeometry args={[6, 4]} />
//       <meshBasicMaterial color={0xff0000}/>
//     </mesh>
