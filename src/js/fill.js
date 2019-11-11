const CANVAS_SIZE = 4;
const PIXEL_SIZE = 128;
const MATH_ERROR = 0.5;

function calculateCord(cord) {
  return Math.round(cord / PIXEL_SIZE - MATH_ERROR);
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
      const colorData = ctx.getImageData(calculateCord(evt.offsetX), calculateCord(evt.offsetY), 1, 1).data;
      const fillCol = document.querySelector('.current-color').value;
      fill({ x: calculateCord(evt.offsetX), y: calculateCord(evt.offsetY) }, colorData, fillCol);
    }
  });
}

export default fillFunction;
