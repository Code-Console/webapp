import React from "react";
import gsap from "gsap";
import { useIsAllModelLoadedState } from "../../hooks";
import Spinner from "../Blockchain/Spinner";

const MakersFundUI = () => {
  const isAllModelLoaded = useIsAllModelLoadedState();
  const [state, setState] = React.useState({ hide: false });
  React.useEffect(() => {
    if (isAllModelLoaded) {
      setTimeout(
        () =>
          gsap.to(".main-overlay", {
            duration: 1,
            height: "0px",
            opacity: ".51",
            ease: "bounce.out",
            onComplete: () => {
              setState((state) => {
                return { ...state, hide: true };
              });
            },
          }),
        200
      );
    }
  }, [isAllModelLoaded]);
  return (
    <>
      <main className="MakersFundUI">
        <section className="section-container section-first">
          <h1 className="title-h1 first-h1">
            BACKING <span className="gradient-text">BUILDERS</span> OF THE
            FUTURE OF INTERACTIVE{" "}
            <span className="gradient-text">ENTERTAINMENT</span>
          </h1>
          <p>
            Makers Fund is a global venture capital fund dedicated to games and
            interactive entertainment
          </p>
        </section>
        <section className="section-container section-second">
          <p>We Support</p>
          <h1 className="title-h1">
            INNOVATIVE, <span className="gradient-text">AMBITIOUS</span>{" "}
            FOUNDERS
          </h1>
          <p>
            Our fund helps visionary entrepreneurs create their initial
            foundation and support them as they navigate the waters of
            early-stage business
          </p>
        </section>
        <section className="section-container section-third">
          <p>We embrace</p>
          <h1 className="title-h1">
            {" "}
            <span className="gradient-text">OUR</span> CULTURE AND{" "}
            <span className="gradient-text">VALUES</span>
          </h1>
          <h2>EMBRACING THE INDUSTRY</h2>
          <h2>FAITH IN OUR FOUNDERS</h2>
          <h2>CHARGING FORWARD, TOGETHER</h2>
          <p>Meet our Team</p>
        </section>
        <section className="section-container section-fourth">
          <h1 className="title-h1">ECOSYSTEM</h1>
          <p>See our Portfolio</p>
        </section>
        <section className="section-container section-fifth">
          <h1 className="title-h1">IN CREATORS WITH DEER CRAFTSMANSHIP</h1>
        </section>
        {!state.hide && (
          <div className="main-overlay">
            <div className="loading">
              <Spinner radius={"50px"} />
            </div>
            <p className="loading">loading..</p>
          </div>
        )}
      </main>
      <style>{`
        .main-overlay{
            position:fixed;
            width:100vw;
            height:100vh;
            top:0;
            right:0;
            background:blue;
        }
        .loading{
            margin:0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            min-height: 100vh;
        }
        .MakersFundUI {
            max-width:1400px;
            margin:0 auto;
        }
        .section-container{
            min-height: 100vh;
            margin:20px;
            display:flex;
            flex-direction: column;
        }
        .title-h1{
            font-size: 3.6rem;
            max-width: 500px;
        }
        .gradient-text{
            background-image: -webkit-linear-gradient(294deg, rgb(255, 79, 82) 0%, rgb(57, 58, 220) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .first-h1{
            padding-top: 300px;
        }
        .section-second{
            padding-top:500px;
            align-items: flex-end;
            margin-bottom: 500px;
        }
        .section-third{
            padding-top:500px;
        }
        .section-fourth{
            padding-top:500px;
            align-items: center;
        }
        .section-fifth{
            padding-top:500px;
            align-items: center;
            text-align:center;
        }
        p{
            max-width: 500px;
        }
    `}</style>
    </>
  );
};

export default MakersFundUI;
