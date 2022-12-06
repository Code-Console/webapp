import React from "react";
import gsap from "gsap";
import { useIsAllModelLoadedState } from "../../hooks";
import Spinner from "../Blockchain/Spinner";
import Link from "next/link";

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
          <div>
            <div className="section-left">
              <h1 className="section-title gradient-text">250+</h1>
              <h4 className="section-title">Games developed and designed</h4>
            </div>
            <div className="section-left">
              <h1 className="section-title gradient-text">150+</h1>
              <h4 className="section-title">Game developers under one roof</h4>
            </div>
            <div className="section-left">
              <h1 className="section-title gradient-text">13+</h1>
              <h4 className="section-title">
                Years in software development business
              </h4>
            </div>
            <div className="section-left ">
              <h1 className="section-title gradient-text">50M+</h1>
              <h4 className="section-title">Game downloads on app stores</h4>
            </div>

            <p>
              All applications are created from scratch, so that each one can be
              modeled to do its job perfectly. Our final result is a clean,
              uncomplicated and an inviting design that is a pleasure to use.
            </p>
          </div>
        </section>
        <section className="section-container section-second">
          <p>We Support</p>
          <h1 className="title-h1">
            STRIVEN TO MOVE DEEPER INTO{" "}
            <span className="gradient-text">SOFTWARE DEVELOPMENT</span>
          </h1>
          <h4 className="detail">
            We experienced a rich and varied career that is most often in
            cadence with a strong and dedicated group of experienced and skilled
            developers and artist. Immediately setting out to work into S/W
            Development.
          </h4>
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
          <p><Link href="/games" style={{ width: "100%" }} >See our Portfolio</Link></p>
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
        .section-left{
          display: flex;
          align-items: center;
        }
        .section-title{
          margin: 0px 10px 10px 0px;
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
        .detail{
          max-width: 500px;
        }
        @media (max-width: 576px) {
          .section-second{
              align-items: flex-start;
          }
          .title-h1{
            font-size: 2.0rem;
            max-width: 500px;
        }
        }
    `}</style>
    </>
  );
};

export default MakersFundUI;
