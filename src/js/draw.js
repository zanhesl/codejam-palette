const PIXEL_SIZE = 128;
const MATH_ERROR = 0.5

function calculateCord(cord) {
  return Math.round(cord / PIXEL_SIZE - MATH_ERROR) * PIXEL_SIZE;
}

function penDraw() {
  const canvas = document.querySelector('.canvas-main');
  const ctx = canvas.getContext('2d');

  let isDrawing = false;

  function draw(evt) {
    if (!isDrawing) return;
    ctx.fillRect(calculateCord(evt.offsetX), calculateCord(evt.offsetY), PIXEL_SIZE, PIXEL_SIZE)
  }

  canvas.addEventListener(`mousedown`, (evt) => {
    isDrawing = true;
    draw(evt);
  });

  canvas.addEventListener(`mouseup`, () => isDrawing = false);
  canvas.addEventListener(`mouseout`, () => isDrawing = false);
  canvas.addEventListener(`mousemove`, draw)
}

export default penDraw;
