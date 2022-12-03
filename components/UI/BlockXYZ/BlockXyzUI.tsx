import React from "react";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
const BlockXyzUI = () => {
  gsap.registerPlugin(ScrollTrigger);

  const splitTest = () => {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top top",
          scrub: 5,
        },
        opacity: 1,
      });
    });
    ScrollTrigger.create({
      trigger: ".BlockXyzUI",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      snap: 1 / (sections.length - 1),
    });
  };
  React.useEffect(() => {
    splitTest();
  }, []);

  return (
    <div className="BlockXyzUI">
      <section className="section-container section-first">
        <h1 style={{ margin: "100px 0 0 0px" }}>3D DEVELOPMENT BRIEF</h1>
        <hr style={{ width: "100%" }} />
        <h2>INTRODUCTION:</h2>
        <span>
          We are a creative design studio based in Bharat, currently we are in
          process of rebranding and of course redesigning our website.
        </span>
        <p>
          Putting together a 3D scene in the browser with Three.js is like
          playing with Legos. We put together some boxes, add lights, define a
          camera, and Three.js renders the 3D image.
        </p>
      </section>
      <section className="section-container section-second">
        <h2>SCOPE:</h2>
        <p>- Translate 3D Blender Assets provided by us to code</p>
        <p>- Develop the 3D animation as per reference provided</p>
        <p>- Implement your 3D animation to our existing front-end</p>
        <p>- Performance and compatibility check</p>
        <p>
          - Pushing to our codding environment completed website ( with added 3D
          animations )
        </p>
        <p>- Final review</p>
      </section>
      <section className="section-container section-third">
        <h2>WHAT WE ARE LOOKING FOR:</h2>
        <p>
          We are looking to create an awesome/award-winning one page portfolio
          and informational website, using HTML, CSS, JS ( with GSAP, GSAP
          Scroll trigger and Locomotive Scroll also **THREE.js for 3D elements**
          )
        </p>
      </section>
      <section className="section-container section-first">
        <h2>TEHNOLOGIES NEEDED:</h2>

        <p>- Three JS ( **GURU 🙌👨‍💻** )</p>
        <p>- Webgl ( **GURU 🙌👨‍💻** )</p>
        <p>- Blender</p>
        <p>- GSAP and Srolltrigger</p>
        <p>- Locomotive Scroll</p>
        <p>- NPM</p>
        <p>- Vercel</p>
      </section>
      <style>{`
        .BlockXyzUI {
            max-width:800px;
            margin:0 auto;
        }
        h2{margin-top: 50px;}
        .gradient-text{
            background-image: -webkit-linear-gradient(294deg, rgb(255, 79, 82) 0%, rgb(57, 58, 220) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        p{ position: 'relative'}
        .section-container{
          min-height: 64vh;
          margin:20px;
          display:flex;
          flex-direction: column;
          opacity:0.257;
        }
      }
        @media (max-width: 576px) {
          .BlockXyzUI {
            margin:0 10px;
          }
        }
    `}</style>
    </div>
  );
};

export default BlockXyzUI;
