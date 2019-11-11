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

  let activeTool = 'pencil';

  function changeTools() {
    const pencil = document.querySelector('.pencil');
    const fillBucket = document.querySelector('.fill');
    const colorPicker = document.querySelector('.color');

    pencil.addEventListener('click', () => {
      activeTool = 'pencil';
      document.querySelector('.selected').classList.remove('selected');
      document.querySelector(`.${activeTool}`).classList.add('selected');
    });

    colorPicker.addEventListener('click', () => {
      activeTool = 'color';
      document.querySelector('.selected').classList.remove('selected');
      document.querySelector(`.${activeTool}`).classList.add('selected');
    });

    fillBucket.addEventListener('click', () => {
      activeTool = 'fill';
      document.querySelector('.selected').classList.remove('selected');
      document.querySelector(`.${activeTool}`).classList.add('selected');
    });

    document.addEventListener('keydown', (evt) => {
      switch (evt.code) {
        case 'KeyP':
          activeTool = 'pencil';
          document.querySelector('.selected').classList.remove('selected');
          document.querySelector(`.${activeTool}`).classList.add('selected');
          break;

        case 'KeyF':
          activeTool = 'fill';
          document.querySelector('.selected').classList.remove('selected');
          document.querySelector(`.${activeTool}`).classList.add('selected');
          break;
        case 'KeyC':
          activeTool = 'color';
          document.querySelector('.selected').classList.remove('selected');
          document.querySelector(`.${activeTool}`).classList.add('selected');
          break;
        default:
      }
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
      if ((!isDrawing) || (document.querySelector('.selected').classList[0] !== 'pencil')) return;
      ctx.fillRect(calculateCord(evt.offsetX), calculateCord(evt.offsetY), PIXEL_SIZE$1, PIXEL_SIZE$1);
    }

    canvas.addEventListener('mousedown', (evt) => {
      if (document.querySelector('.selected').classList[0] === 'pencil') {
        ctx.fillStyle = document.querySelector('.current-color').value;
        isDrawing = true;
        draw(evt);
      }
    });

    canvas.addEventListener('mouseup', () => {
      if (document.querySelector('.selected').classList[0] === 'pencil') {
        isDrawing = false;
      }
    });
    canvas.addEventListener('mouseout', () => {
      if (document.querySelector('.selected').classList[0] === 'pencil') {
        isDrawing = false;
      }
    });
    canvas.addEventListener('mousemove', draw);
  }

  function updateColors() {
    const colorInputs = document.querySelectorAll('.color-select');
    for (const color of colorInputs) {
      const parent = color.classList[1];
      document.querySelector(`.${parent}-label .color-circle`).style['background-color'] = color.value;
    }
  }

  function toHex(n) {
    n = parseInt(n, 10);
    if (isNaN(n)) return '00';
    n = Math.max(0, Math.min(n, 255)); return '0123456789ABCDEF'.charAt((n - n % 16) / 16) + '0123456789ABCDEF'.charAt(n % 16);
  }

  function rgbToHex(data) {
    return `#${toHex(data[0])}${toHex(data[1])}${toHex(data[2])}`;
  }

  function changeColors() {
    const colorInputs = document.querySelectorAll('.color-select');
    const colorContainers = document.querySelectorAll('.colors-palette label');
    const currentColor = document.querySelector('.current-color');
    const previousColor = document.querySelector('.previous-color');
    const canvas = document.querySelector('.canvas-main');
    const ctx = canvas.getContext('2d');

    updateColors();

    for (const color of colorInputs) {
      color.addEventListener('change', () => {
        updateColors();
        ctx.fillStyle = color.value;
      });
    }

    for (const color of colorContainers) {
      color.addEventListener('click', () => {
        const temp = currentColor.value;
        currentColor.value = color.querySelector('input').value;
        previousColor.value = temp;
        updateColors();
        ctx.fillStyle = color.querySelector('input').value;
      });
    }

    canvas.addEventListener('click', (evt) => {
      if (document.querySelector('.selected').classList[0] === 'color') {
        const imgData = ctx.getImageData(evt.offsetX, evt.offsetY, 1, 1).data;
        const newColor = rgbToHex(imgData);
        if (newColor.toUpperCase() !== currentColor.value.toUpperCase()) {
          previousColor.value = currentColor.value;
          currentColor.value = newColor;
          updateColors();
        }
      }
    });
  }

  const CANVAS_SIZE = 512;

  const canvas = document.querySelector('.canvas-main');
  const ctx = canvas.getContext('2d');

  const around = [{ dx: -1, dy: 0 }, { dx: 1, dy: 0 }, { dx: 0, dy: -1 }, { dx: 0, dy: 1 }];

  function fill({ x, y }, targetColor, fillColor) {
    const drawn = [{ x, y, color: targetColor }];
    for (let done = 0; done < 4; done += 1) {
      for (const { dx, dy } of around) {
        const x = drawn[done].x + dx;
        const y = drawn[done].y + dy;
        if ((x >= 0) && (x < CANVAS_SIZE)
            && (y >= 0) && (y < CANVAS_SIZE)
            && (JSON.stringify(ctx.getImageData(x, y, 1, 1).data) == JSON.stringify(targetColor)) &&
          (!drawn.some(p => p.x == x && p.y == y))) {
          drawn.push({ x: x, y: y, color: targetColor });
          ctx.fillStyle = fillColor;
          ctx.fillRect(x, y, 1, 1);
          console.log(drawn);
        }
      }
    }

  }

  function fillFunction() {
    canvas.addEventListener('click', (evt) => {
      if (document.querySelector('.selected').classList[0] === 'fill') {
        const colorData = ctx.getImageData(evt.offsetX, evt.offsetY, 1, 1).data;
        const fillCol = document.querySelector('.current-color').value;
        fill({ x: evt.offsetX, y: evt.offsetY }, colorData, fillCol);
      }
    });
  }

  drawStock();
  changeTools();
  penDraw();
  changeColors();
  fillFunction();
  // loadImage.loadImage();
  // loadImage.saveImage();
  const canvas$1 = document.querySelector('.canvas-main');
  const ctx$1 = canvas$1.getContext('2d');
  const image = document.querySelector('.source-image');

  image.src = localStorage.getItem('img');

  ctx$1.drawImage(image, 0, 0, 511, 511);


  document.addEventListener('click', () => {
    localStorage.setItem('img', canvas$1.toDataURL());
  });

}());

//# sourceMappingURL=main.js.map
