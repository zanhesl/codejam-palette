import changeTools from './change-tools';

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

export default changeColors;
