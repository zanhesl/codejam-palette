const canvas = document.querySelector('.canvas-main');
const ctx = canvas.getContext('2d');

function loadImage() {
  const imgDefault = localStorage.getItem('img');
  const imgNode = new Image();
  imgNode.src = imgDefault;
  ctx.drawImage(imgNode, 0, 0, 512, 512);
  document.querySelector('body').appendChild(imgNode);
}
function saveImage() {
  document.addEventListener('click', () => {
    localStorage.setItem('img', canvas.toDataURL());
  });
}

export default { loadImage, saveImage };
