import { image4x4 } from './images';

const PIXEL_SIZE = 1;

function drawStock() {
  const canvas = document.querySelector('.canvas-main');
  const ctx = canvas.getContext('2d');
  const stockImage = document.querySelector('.resize-canvas button');

  function drawBackgroundHash(image) {
    for (let i = 0; i < image.length; i += 1) {
      for (let j = 0; j < image[0].length; j += 1) {
        ctx.fillStyle = `#${image[i][j]}`;
        ctx.fillRect(j * PIXEL_SIZE, i * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
      }
    }
  }

  stockImage.addEventListener('click', () => {
    drawBackgroundHash(image4x4);
  });
}

export default drawStock;
