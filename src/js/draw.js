function penDraw() {
  const canvas = document.querySelector('.canvas-main');
  const ctx = canvas.getContext('2d');

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  function draw(evt) {
    if (!isDrawing) return;
  }

  canvas.addEventListener(`mousedown`, () => isDrawing = true;);
  canvas.addEventListener(`mouseup`, () => isDrawing = false;);
  canvas.addEventListener(`mouseout`, () => isDrawing = false;);
}
