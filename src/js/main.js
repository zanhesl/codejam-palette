import drawStock from './draw-stock';
import changeTools from './change-tools';
import penDraw from './draw';
// import loadImage from './load-image';
import changeColors from './colors';
import fillFunction from './fill';

drawStock();
changeTools();
penDraw();
changeColors();
fillFunction();
// loadImage.loadImage();
// loadImage.saveImage();
const canvas = document.querySelector('.canvas-main');
const ctx = canvas.getContext('2d');

canvas.width = 4;
canvas.height = 4;

const image = document.querySelector('.source-image');
image.src = localStorage.getItem('img');

// const imgDefault = localStorage.getItem('img');
// const imgNode = new Image();
// imgNode.src = imgDefault;
image.addEventListener('load', () => {
  ctx.drawImage(image, 0, 0, 4, 4);
});


document.addEventListener('click', () => {
  localStorage.setItem('img', canvas.toDataURL());
});
