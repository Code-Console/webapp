import { debounce } from "lodash";
import React from "react";
import { useDispatch } from "react-redux";
import { actionConfiguration } from "../../../../redux/action";
import { useConfiguration } from "../../../hooks";
import { isHexColor } from "../../../util";
import { MENS_ITEM, ShirtDetail } from "./assets";

const Fit = ({ shirtDetail }: { shirtDetail: ShirtDetail[] }) => {
  const dispatch = useDispatch();
  const configuration = useConfiguration();
  const color =
    (configuration?.details === MENS_ITEM.BUTTONS
      ? configuration?.butId
      : configuration?.paintId) || "#ffffff";

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
      case MENS_ITEM.PAINT_COLOR:
        return configuration?.paintId === str;
    }
  };

  const onChange = debounce((color) => {
    console.log("onChange", color);
    if (isHexColor(color))
      dispatch(actionConfiguration(color, configuration?.details));
  }, 200);
  return (
    <div>
      {configuration?.details === MENS_ITEM.BUTTONS ||
      configuration?.details === MENS_ITEM.PAINT_COLOR ? (
        <>
          <span className="desc-button">
            Click and pick button color as you want
          </span>
          <input
            type="color"
            id="modelColorPicker"
            value={color}
            onChange={(e) => onChange(e.target.value)}
          />
        </>
      ) : (
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
        </div>
      )}
      <style jsx>{`
        .desc-button {
          margin: 0 5%;
        }
        #modelColorPicker {
          width: 90%;
          margin: 10px 5%;
          height: 50px;
        }
        .fit-detail {
          display: flex;
          flex-wrap: wrap;
          overflow: auto;
          height: calc(100vh - 130px);
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
        @media (max-width: 780px) {
          .fit-detail-child {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Fit;
