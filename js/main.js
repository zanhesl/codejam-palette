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
    return Math.round(cord / PIXEL_SIZE$1 - MATH_ERROR);
  }

  function penDraw() {
    const canvas = document.querySelector('.canvas-main');
    const ctx = canvas.getContext('2d');

    let isDrawing = false;

    function draw(evt) {
      if ((!isDrawing) || (document.querySelector('.selected').classList[0] !== 'pencil')) return;
      ctx.fillRect(calculateCord(evt.offsetX), calculateCord(evt.offsetY), 1, 1);
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

  const PIXEL_SIZE$2 = 128;
  const MATH_ERROR$1 = 0.5;

  function updateColors() {
    const colorInputs = document.querySelectorAll('.color-select');
    for (const color of colorInputs) {
      const parent = color.classList[1];
      document.querySelector(`.${parent}-label .color-circle`).style['background-color'] = color.value;
    }
  }

  function calculateCord$1(cord) {
    return Math.round(cord / PIXEL_SIZE$2 - MATH_ERROR$1);
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
        const imgData = ctx.getImageData(calculateCord$1(evt.offsetX), calculateCord$1(evt.offsetY), 1, 1).data;
        const newColor = rgbToHex(imgData);
        if (newColor.toUpperCase() !== currentColor.value.toUpperCase()) {
          previousColor.value = currentColor.value;
          currentColor.value = newColor;
          updateColors();
        }
      }
    });
  }

  const CANVAS_SIZE = 4;
  const PIXEL_SIZE$3 = 128;
  const MATH_ERROR$2 = 0.5;

  function calculateCord$2(cord) {
    return Math.round(cord / PIXEL_SIZE$3 - MATH_ERROR$2);
  }


  const canvas = document.querySelector('.canvas-main');
  const ctx = canvas.getContext('2d');

  const around = [{ dx: -1, dy: 0 }, { dx: 1, dy: 0 }, { dx: 0, dy: -1 }, { dx: 0, dy: 1 }];

  function fill({ x, y }, targetColor, fillColor) {
    const drawn = [{ x, y, color: targetColor }];
    for (let done = 0; done < drawn.length; done += 1) {
      for (const { dx, dy } of around) {
        const x = drawn[done].x + dx;
        const y = drawn[done].y + dy;
        if ((x >= 0) && (x < CANVAS_SIZE)
            && (y >= 0) && (y < CANVAS_SIZE)
            && (JSON.stringify(ctx.getImageData(x, y, 1, 1).data) == JSON.stringify(targetColor))
          && (!drawn.some((p) => p.x == x && p.y == y))) {
          drawn.push({ x, y, color: targetColor });
          ctx.fillStyle = fillColor;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
    ctx.fillRect(x, y, 1, 1);
  }

  function fillFunction() {
    canvas.addEventListener('click', (evt) => {
      if (document.querySelector('.selected').classList[0] === 'fill') {
        const colorData = ctx.getImageData(calculateCord$2(evt.offsetX), calculateCord$2(evt.offsetY), 1, 1).data;
        const fillCol = document.querySelector('.current-color').value;
        fill({ x: calculateCord$2(evt.offsetX), y: calculateCord$2(evt.offsetY) }, colorData, fillCol);
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

  canvas$1.width = 4;
  canvas$1.height = 4;

  const image = document.querySelector('.source-image');
  image.src = localStorage.getItem('img');

  // const imgDefault = localStorage.getItem('img');
  // const imgNode = new Image();
  // imgNode.src = imgDefault;
  image.addEventListener('load', () => {
    ctx$1.drawImage(image, 0, 0, 4, 4);
  });


  document.addEventListener('click', () => {
    localStorage.setItem('img', canvas$1.toDataURL());
  });

}());

//# sourceMappingURL=main.js.map
