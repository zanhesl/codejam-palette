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
const image = document.querySelector('.source-image');

image.src = localStorage.getItem('img');

ctx.drawImage(image, 0, 0, 511, 511);


document.addEventListener('click', () => {
  localStorage.setItem('img', canvas.toDataURL());
});
