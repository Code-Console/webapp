import React from "react";
import Fit from "./Fit";

const Detail = () => {
  return (
    <div>
      <div className="options-header">
        <div className="options-close"></div>
        <h1 className="options-tab-title">Fit</h1>
        <div className="options-tab-underline"></div>
      </div>
      <Fit />
      <style jsx>{`
        .options-header {
          height: 100px;
          width: 100%;
        }
        .options-tab-title {
          text-align: center;
        }
        .options-tab-underline {
          height: 1px;
          width: 80%;
          background: #888;
          transform: translateY(-15px);
          margin: 0 auto;
        }
        .options-close {
          padding: 0 20px;
          text-align: right;
          right: 0;
          transform: translateY(20px);
        }
        .options-close:after {
          content: "\E916";
          font-family: "protexsa";
          font-size: 22px;
        }
      `}</style>
    </div>
  );
};

export default Detail;
