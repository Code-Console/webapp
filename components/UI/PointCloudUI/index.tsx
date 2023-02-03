import React from "react";
import { useObjectName } from "../../hooks";
import { gsap } from "gsap/dist/gsap";
const PointCloudUI = () => {
  const objectName = useObjectName();
  React.useEffect(() => {
    gsap.to(".PointCloudUI", {
      opacity: 0,
      fontSize: "0px",
      duration: 0.5,
      delay: 0,
      ease: "power1.out",
      onComplete: () => {
        const objName = document.getElementById("objName");
        if (objName) objName.innerHTML = objectName?.replace("_", " ") || "";
      },
    });
    gsap.to(".PointCloudUI", {
      opacity: 1,
      fontSize: "55px",
      duration: 0.5,
      delay: 0.51,
      ease: "power4.out",
    });
  }, [objectName]);

  return (
    <>
      <div className="PointCloudUI" id="objName"></div>
      <style jsx>{`
        .PointCloudUI {
          position: fixed;
          top: 80%;
          left: 50%;
          transform: translate(-50%, 0);
          background: -webkit-linear-gradient(#e47fc5,#81d4fa););
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </>
  );
};

export default PointCloudUI;
