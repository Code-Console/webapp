import React from "react";

const MensCasualShirtUI = () => {
  const configType = [
    {
      img: "\E900",
      title: "Fit",
    },
    {
      img: "\E901",
      title: "Febric",
    },
    {
      img: "\E902",
      title: "Collar",
    },
    {
      img: "\E903",
      title: "Cuf",
    },
    {
      img: "\E904",
      title: "Sleeve",
    },
    {
      img: "\E905",
      title: "Placeket",
    },
    {
      img: "\E906",
      title: "Pockets",
    },
    {
      img: "\E907",
      title: "Bottom Cut",
    },
    {
      img: "\E908",
      title: "Elbow patch",
    },
    {
      img: '\E90A',
      title: "Contrast",
    },
    {
      img: "\E90B",
      title: "Embroidery",
    },
    {
      img: "\E90C",
      title: "Buttons",
    },
    {
      img: "\E90D",
      title: "Buttons Thread",
    },
    {
      img: "\E90E",
      title: "Buttons Stitch",
    },
  ];
  const getChildDiv = (obj: any) => {
    return (
      <>
        {" "}
        <div className={`${obj.title} Fit`} key={obj.title}>
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
      </>
    );
  };
  return (
    <>
      <div className="title-ui">
        {configType.map((obj) => {
          return getChildDiv(obj);
        })}
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
          background: rosybrown;
        }
      `}</style>
    </>
  );
};

export default MensCasualShirtUI;
