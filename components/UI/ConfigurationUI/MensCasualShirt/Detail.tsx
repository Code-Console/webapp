import React from "react";
import Fit from "./Fit";
import { fabricDetail, fitType, MENS_ITEM, ShirtDetail } from "./assets";
const Detail = ({
  details,
  onCloseDetail,
}: {
  details: string;
  onCloseDetail: () => void;
}) => {
  const [showDetail, setShowDetail] = React.useState<ShirtDetail[]>([]);
  React.useEffect(() => {
    switch (details) {
      case MENS_ITEM.FIT:
        setShowDetail(fitType);
        break;
      case MENS_ITEM.FABRIC:
        setShowDetail(fabricDetail);
        break;
      default:
        setShowDetail(fabricDetail);
        break;
    }
  }, [details]);
  return (
    <div>
      <div className="options-header">
        <div className="options-close" onClick={onCloseDetail}></div>
        <h1 className="options-tab-title">{details}</h1>
        <div className="options-tab-underline"></div>
      </div>
      <Fit shirtDetail={showDetail} />
      <style jsx>{`
        .options-header {
          height: 70px;
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
          width: 30px;
          float: right;
          transform: translateY(-15px);
        }
        .options-close:after {
          content: "\E916";
          font-family: "protexsa";
          font-size: 22px;
        }
        @media (max-width: 780px) {
          .options-tab-title {
            font-size: 1.6rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Detail;
