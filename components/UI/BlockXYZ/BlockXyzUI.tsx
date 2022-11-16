import React from "react";

const BlockXyzUI = () => {
  return (
    <div className="BlockXyzUI">
      <h1 style={{ margin: "100px 0 0 10px" }}>3D DEVELOPMENT BRIEF</h1>
      <hr />
      <h2>INTRODUCTION:</h2>
      <p>
        We are a creative design studio based in Bharat, currently we are in
        process of rebranding and of course redesigning our website.
      </p>

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

      <h2>WHAT WE ARE LOOKING FOR::</h2>
      <p>
        We are looking to create an awesome/award-winning one page portfolio and
        informational website, using HTML, CSS, JS ( with GSAP, GSAP Scroll
        trigger and Locomotive Scroll also **THREE.js for 3D elements** )
      </p>
      <h2>TEHNOLOGIES NEEDED:</h2>

      <p>- Three JS ( **GURU 🙌👨‍💻** )</p>
      <p>- Webgl ( **GURU 🙌👨‍💻** )</p>
      <p>- Blender</p>
      <p>- GSAP and Srolltrigger</p>
      <p>- Locomotive Scroll</p>
      <p>- NPM</p>
      <p>- Vercel</p>

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
