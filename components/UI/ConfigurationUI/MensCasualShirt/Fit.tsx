import React from "react";
import { useDispatch } from "react-redux";
import { actionConfiguration } from "../../../../redux/action";
import { useConfiguration } from "../../../hooks";
import { MENS_ITEM, ShirtDetail } from "./assets";

const Fit = ({ shirtDetail }: { shirtDetail: ShirtDetail[] }) => {
  const dispatch = useDispatch();
  const configuration = useConfiguration();
  const onClick = (obj: ShirtDetail) => {
    dispatch(actionConfiguration(obj.id, configuration?.details));
  };
  const isSelected = (str: string) => {
    switch (configuration?.details) {
      case MENS_ITEM.SLEEVE:
        return configuration?.sleeveId === str;
      case MENS_ITEM.CUF:
        return configuration?.cufId === str;
      case MENS_ITEM.BUTTONS:
        return configuration?.butId === str;
      case MENS_ITEM.FRONT:
        return configuration?.frontId === str;
      case MENS_ITEM.COLLAR:
        return configuration?.collarId === str;
      case MENS_ITEM.FABRIC:
        return configuration?.fabricId === str;
      case MENS_ITEM.FIT:
        return configuration?.fitId === str;
      case MENS_ITEM.SHOULDER:
        return configuration?.shoulderId === str;
      case MENS_ITEM.COLLAR_STAND:
        return configuration?.collarStandId === str;
    }
  };
  return (
    <div className="fit-detail">
      {shirtDetail.map((obj, i) => {
        return (
          <div className="fit-detail-child" key={i}>
            <div className="fit-detail-figure" onClick={() => onClick(obj)}>
              <img
                src={obj.img}
                className={`img ${isSelected(obj.id) ? "border" : ""}`}
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
