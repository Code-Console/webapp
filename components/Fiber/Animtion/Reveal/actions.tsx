import gsap from "gsap";
export const setPositionValue = ({
  movePos,
  trigger,
  start,
  end,
  position,
  onComplete,
  onReverseComplete,
  onStart,
}: {
  movePos: THREE.Vector3;
  trigger: string;
  start: string;
  end: string;
  position: THREE.Vector3;
  onComplete?: () => void;
  onReverseComplete?: () => void;
  onStart?: () => void;
}) => {
  gsap.to(position, {
    scrollTrigger: {
      trigger: trigger,
      start: start,
      end: end,
      markers: false,
      scrub: true,
      immediateRender: false,
    },
    x: movePos.x,
    y: movePos.y,
    z: movePos.z,
    onComplete: onComplete,
    onReverseComplete: onReverseComplete,
    onStart: onStart,
  });
};
