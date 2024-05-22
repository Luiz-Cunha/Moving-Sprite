document.addEventListener('DOMContentLoaded', () => {

  const movingSprite = document.getElementById('myCanvas');

  movingSprite.addEventListener('transitionstart', () => {
    startAnimation();
  });

  movingSprite.addEventListener('transitionend', () => {
    stopAnimation();
  });

  movingSprite.addEventListener('mousemove', (event) => {
      const randomCoords = getRndInteger(getSizes());
      performAction(movingSprite, randomCoords);
    });
  });

const getSizes = () => {
  const body = document.querySelector('body');
  const bodyWidth = body.offsetWidth;
  const bodyHeight = body.offsetHeight;
  return [bodyWidth, bodyHeight];
};

const getRndInteger = (array, min = 125) => {
  const valueXCoord = Math.floor(Math.random() * (array[0] - min) ) + min;
  const valueYCoord = Math.floor(Math.random() * (array[1] - min) ) + min;
  return [valueXCoord, valueYCoord];
};

const performAction = (sprite, randomCoordArray) => {
  sprite.style.left = `${randomCoordArray[0]}px`;
  sprite.style.top = `${randomCoordArray[1]}px`;
};
