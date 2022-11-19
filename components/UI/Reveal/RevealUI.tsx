import React from "react";
import gsap from "gsap";
import { useIsAllModelLoadedState } from "../../hooks";
import Spinner from "../Blockchain/Spinner";
const RevealUI = () => {
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
      <main className="RevealUI">
        <section className="section-container section-first"></section>
        <section className="section-container section-second"></section>
        <section className="section-container section-third"></section>
        <section className="section-container section-fourth"></section>
        <section className="section-container section-fifth"></section>
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
            width:100%;
            height:100%;
            top:0;
            right:0;
            left:0;
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
        .RevealUI {
            max-width:1400px;
            margin:0 auto;
        }
        .section-container{
            min-height: 100vh;
            margin:20px;
            display:flex;
            flex-direction: column;
        }
        .section-first{
          background-color:#ff000031;
        }
        .section-second{
          background-color:#ffff0031;
            padding-top:500px;
            align-items: flex-end;
        }
        .section-third{
          background-color:#ff00ff31;
        }
        .section-fourth{
          background-color:#ffa00031;
            padding-top:500px;
            align-items: center;
        }
        .section-fifth{
          background-color:#ff00b031;
            padding-top:500px;
            align-items: center;
            text-align:center;
        }
        
    `}</style>
    </>
  );
};

export default RevealUI;
