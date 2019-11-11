const PIXEL_SIZE = 128;
const MATH_ERROR = 0.5;

function calculateCord(cord) {
  return Math.round(cord / PIXEL_SIZE - MATH_ERROR) * PIXEL_SIZE;
}

function penDraw() {
  const canvas = document.querySelector('.canvas-main');
  const ctx = canvas.getContext('2d');

  let isDrawing = false;

  function draw(evt) {
    if ((!isDrawing) || (document.querySelector('.selected').classList[0] !== 'pencil')) return;
    ctx.fillRect(calculateCord(evt.offsetX), calculateCord(evt.offsetY), PIXEL_SIZE, PIXEL_SIZE);
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

export default penDraw;
