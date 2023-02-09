import React from "react";
import { useDispatch } from "react-redux";
import { actionConfigurationFabric } from "../../../../redux/action";
import { useConfiguration } from "../../../hooks";
import { ShirtDetail } from "./assets";

const Fit = ({ shirtDetail }: { shirtDetail: ShirtDetail[] }) => {
  const dispatch = useDispatch();
  const configuration = useConfiguration();
  const onClick = (obj: ShirtDetail) => {
    dispatch(actionConfigurationFabric(obj.img));
    console.log(obj);
  };
  return (
    <div className="fit-detail">
      {shirtDetail.map((obj, i) => {
        return (
          <div className="fit-detail-child" key={i}>
            <div className="fit-detail-figure" onClick={() => onClick(obj)}>
              <img
                src={obj.img}
                className={`img ${
                  configuration?.fabricTex === obj.img ? "border" : ""
                }`}
              />
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
        .border {
          border: 2px solid;
        }
      `}</style>
    </div>
  );
};

export default Fit;
