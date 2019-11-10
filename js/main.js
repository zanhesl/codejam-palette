(function () {
  'use strict';

  const image4x4 = [
    ['00BCD4', 'FFEB3B', 'FFEB3B', '00BCD4'],
    ['FFEB3B', 'FFC107', 'FFC107', 'FFEB3B'],
    ['FFEB3B', 'FFC107', 'FFC107', 'FFEB3B'],
    ['00BCD4', 'FFEB3B', 'FFEB3B', '00BCD4'],
  ];

  const PIXEL_SIZE = 128;

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

  const PIXEL_SIZE$1 = 128;
  const MATH_ERROR = 0.5;

  function calculateCord(cord) {
    return Math.round(cord / PIXEL_SIZE$1 - MATH_ERROR) * PIXEL_SIZE$1;
  }

  function penDraw() {
    const canvas = document.querySelector('.canvas-main');
    const ctx = canvas.getContext('2d');

    let isDrawing = false;

    function draw(evt) {
      if (!isDrawing) return;
      ctx.fillRect(calculateCord(evt.offsetX), calculateCord(evt.offsetY), PIXEL_SIZE$1, PIXEL_SIZE$1);
    }

    canvas.addEventListener(`mousedown`, (evt) => {
      isDrawing = true;
      draw(evt);
    });

    canvas.addEventListener(`mouseup`, () => isDrawing = false);
    canvas.addEventListener(`mouseout`, () => isDrawing = false);
    canvas.addEventListener(`mousemove`, draw);
  }

  drawStock();
  penDraw();

}());

//# sourceMappingURL=main.js.map
