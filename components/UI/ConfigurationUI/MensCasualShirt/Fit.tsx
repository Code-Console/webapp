import React from "react";
import { fitType } from "./assets";

const Fit = () => {
  return (
    <div className="fit-detail">
      {fitType.map((obj, i) => {
        return (
          <div className="fit-detail-child" key={i}>
            <div className="fit-detail-figure">
              <img src={obj.img} className="img" />
              <div>{obj.type}</div>
              <div>{obj.description}</div>
            </div>
          </div>
        );
      })}
      <style jsx>{`
        .fit-detail {
          display: flex;
          flex-wrap: wrap;
        }
        .fit-detail-child {
          width: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          margin: 10px 0;
        }
        .fit-detail-figure .img {
          width: 100px;
          height: 100px;
          background: #333;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default Fit;
