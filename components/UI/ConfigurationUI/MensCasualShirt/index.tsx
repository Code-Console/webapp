import React from "react";
import { useDispatch } from "react-redux";
import { actionConfigurationDetail } from "../../../../redux/action";
import { useConfigurationDetail, useIsAllModelLoadedState } from "../../../hooks";
import Loading from "../../Loading";
import { configType } from "./assets";
import Detail from "./Detail";

const MensCasualShirtUI = () => {
  const [state, setState] = React.useState({
    isShowDetail: false,
  });
  const isAllModelLoaded = useIsAllModelLoadedState();
  const details = useConfigurationDetail();
  const dispatch = useDispatch();
  const onCloseDetail = () => {
    setState((state) => {
      return { ...state, isShowDetail: false };
    });
  };
  const getChildDiv = (obj: any, i: number) => {
    return (
      <div
        key={i}
        onClick={() => {
          dispatch(actionConfigurationDetail(obj.title));
          setState((state) => {
            return { ...state, isShowDetail: true };
          });
        }}
      >
        <div className={`${obj.title} Fit`} key={i}>
          <span className="title-obj">{obj.title}</span>
        </div>
        <style jsx>{`
          .Fit {
            height: 100px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background: ${obj.title === details ? "#333" : "#222"};
            margin: 1px 0;
          }
          .Fit:before {
            font-family: "protexsa";
            content: "${"\\E" + obj.img}";
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
          <Detail details={details || ""} onCloseDetail={onCloseDetail} />
        </div>
        {!isAllModelLoaded && <Loading />}
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
          background: #000;
          z-index: 1;
        }
        .detail-ui {
          width: 30%;
          max-width: 400px;
          height: 100vh;
          position: fixed;
          overflow: hidden;
          left: ${state.isShowDetail ? 100 : -500}px;
          box-shadow: 5px 0px 15px 0px rgb(255 255 225 / 25%);
          transition: left 0.5s;
        }
      `}</style>
    </>
  );
};

export default MensCasualShirtUI;
