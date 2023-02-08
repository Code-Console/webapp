import React from "react";
import { configType } from "./assets";
import Detail from "./Detail";

const MensCasualShirtUI = () => {
  const getChildDiv = (obj: any, i: number) => {
    return (
      <div key={i}>
        <div className={`${obj.title} Fit`} key={i}>
          <span className="title-obj">{obj.title}</span>
        </div>
        <style jsx>{`
          .Fit {
            height: 100px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background: #000;
            margin: 1px 0;
          }
          .Fit:before {
            font-family: "protexsa";
            content: "\\${obj.img}";
            text-align: center;
            font-size: 2rem;
          }
          .title-obj {
            text-align: center;
            margin: 10px 0;
          }
        `}</style>
      </div>
    );
  };
  return (
    <>
      <div>
        <div className="title-ui">
          {configType.map((obj, i) => {
            return getChildDiv(obj, i);
          })}
        </div>
        <div className="detail-ui">
          <Detail />
        </div>
      </div>
      <style jsx>{`
        @font-face {
          font-family: "protexsa";
          src: url("/fonts/protexsa.eot?1cvtwt");
          src: url("/fonts/protexsa.eot?1cvtwt#iefix")
              format("embedded-opentype"),
            url("/fonts/protexsa.ttf?1cvtwt") format("truetype"),
            url("/fonts/protexsa.woff?1cvtwt") format("woff"),
            url("/fonts/protexsa.svg?1cvtwt#protexsa") format("svg");
          font-weight: normal;
          font-style: normal;
        }
        .title-ui {
          width: 100px;
          height: 100vh;
          overflow: auto;
          position: fixed;
          overflow-x: hidden;
          background: #888;
        }
        .detail-ui {
          width: 30%;
          max-width: 400px;
          height: 100vh;
          overflow: auto;
          position: fixed;
          overflow-x: hidden;
          left: 100px;
          box-shadow: 5px 0px 15px 0px rgb(255 255 225 / 25%);
        }
      `}</style>
    </>
  );
};

export default MensCasualShirtUI;
