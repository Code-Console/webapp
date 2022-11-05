/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const { loadImage, createCanvas } = require("canvas");
const drawCanvasSaveImage = () => {
  const width = 1200;
  const height = 650;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");
  context.fillStyle = "#2b03a3";
  context.fillRect(0, 0, width, height);
  context.font = "bold 72pt Menlo";
  context.textBaseline = "top";
  context.textAlign = "center";
  context.fillStyle = "#f7ab07";
  const imgText = "Tiny Text on Canvas";
  const textAlign = context.measureText(imgText).width;
  context.fillRect(590 - textAlign / 2 - 10, 170 - 5, textAlign + 20, 120);
  context.fillStyle = "#ffffff";
  context.fillText(imgText, 555, 120);
  context.fillStyle = "#ffffff";
  context.font = "bold 32pt Menlo";
  context.fillText("positronx.io", 755, 600);
  loadImage("public/countdown.jpg").then((data) => {
    context.drawImage(data, 340, 515, 70, 70);
    const imgBuffer = canvas.toBuffer("image/png");
    fs.writeFileSync("./resources/drawnImage.png", imgBuffer);
  });
};
const drawCanvas = () => {
  const width = 1200;
  const height = 650;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");
  const grd = context.createLinearGradient(100, 200, 1200, 500);
  grd.addColorStop(0, "#fbb040");
  grd.addColorStop(1, "#ef4136");
  context.fillStyle = grd;
  context.fillRect(0, 0, width, height);
  context.font = "bold 72pt Menlo";
  context.textBaseline = "top";
  context.textAlign = "center";
  const grdBase = context.createLinearGradient(100, 200, 1200, 500);
  grdBase.addColorStop(1, "#fbb040");
  grdBase.addColorStop(0, "#ef4136");
  context.fillStyle = grdBase;
  const imgText = "Tiny Text on Canvas";
  const textAlign = context.measureText(imgText).width;
  context.fillRect(590 - textAlign / 2 - 10, 170 - 5, textAlign + 20, 120);
  context.fillStyle = grd;
  context.fillText(imgText, 593, 168);
  context.fillStyle = "#ffffff";
  context.fillText(imgText, 590, 165);
  context.fillStyle = "#ffffff";
  context.font = "bold 32pt Menlo";
  context.fillText("hututusoftwares.com", 555, 500);
  return showHTML(canvas.toBuffer("image/png").toString("base64"));
};
const showHTML = (image) => {
  const background = `background-position: center;background-repeat: no-repeat;background-size: cover;position: relative; background-image:url(data:image/png;base64,${image});`;
  const style = `width:100%; height:100%;${background}`;
  return `<div style='${style}'>Drawing Canvas from server</div><style>body{margin: 0;}</style>`;
};
module.exports = {
  drawCanvas,
  drawCanvasSaveImage,
};
