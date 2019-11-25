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


export default changeTools;
