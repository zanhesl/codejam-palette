(function () {
  'use strict';

  const image4x4 = [
    ['00BCD4', 'FFEB3B', 'FFEB3B', '00BCD4'],
    ['FFEB3B', 'FFC107', 'FFC107', 'FFEB3B'],
    ['FFEB3B', 'FFC107', 'FFC107', 'FFEB3B'],
    ['00BCD4', 'FFEB3B', 'FFEB3B', '00BCD4'],
  ];

  const PIXEL_SIZE = 1;

  function drawStock() {
    const canvas = document.querySelector('.canvas-main');
    const ctx = canvas.getContext('2d');
    const stockImage = document.querySelector('.resize-canvas button');

    function drawBackgroundHash(image) {
      for (let i = 0; i < image.length; i += 1) {
        for (let j = 0; j < image[0].length; j += 1) {
          ctx.fillStyle = `#${image[i][j]}`;
          ctx.fillRect(j, i, PIXEL_SIZE, PIXEL_SIZE);
        }
      }
    }

    stockImage.addEventListener('click', () => {
      drawBackgroundHash(image4x4);
    });
  }

  var drawStock$1 = drawStock();

  drawStock$1();

}());

//# sourceMappingURL=main.js.map
