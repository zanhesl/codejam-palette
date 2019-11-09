import {image4x4, image32x32} from 'images.js';

const DEFAULT_SIZE = 512;
const PIXEL_SIZE = 1;
const OPACITY_REFACTOR = 255;
const IMAGE_START = 0;
const IMAGE_SIZE = 256;

const canvas = document.querySelector(`.canvas-main`);
const ctx = canvas.getContext('2d');
const resizeButtons = document.querySelectorAll(`.resize-canvas button`);
const imageSrc = document.querySelector(`.source-image`);

function drawBackgroundHash(image) {
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[0].length; j++) {
      ctx.fillStyle = `#${image[i][j]}`;
      ctx.fillRect(j, i, PIXEL_SIZE, PIXEL_SIZE);
    }
  }
};

function drawBackgroundRGB(image){
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[0].length; j++) {
      ctx.fillStyle = `rgba(${image[i][j][0]}, ${image[i][j][1]}, ${image[i][j][2]}, ${image[i][j][3] / OPACITY_REFACTOR})`;
      ctx.fillRect(j, i, PIXEL_SIZE, PIXEL_SIZE);
    }
  }
};

resizeButtons.forEach(function(element) {
  let resizeValue = element.innerHTML.split(`x`)[0];
  element.addEventListener(`click`, (evt) => {
    [canvas.height, canvas.width] = [resizeValue, resizeValue];
    canvas.style.transform = `scale(${DEFAULT_SIZE / resizeValue})`;
  });
});

resizeButtons[0].addEventListener(`click`, (evt) => {
  drawBackgroundHash(image4x4);
});

resizeButtons[1].addEventListener(`click`, (evt) => {
  drawBackgroundRGB(image32x32);
})


resizeButtons[2].addEventListener(`click`, (evt) => {
  ctx.drawImage(imageSrc, IMAGE_START, IMAGE_START, IMAGE_SIZE, IMAGE_SIZE);
})
