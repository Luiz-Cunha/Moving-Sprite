const getSizes = () => {
  const body = document.querySelector('body');
  const bodyWidth = body.offsetWidth;
  const bodyHeight = body.offsetHeight;
  return [bodyWidth, bodyHeight];
};

const getRndInteger = (array, min = 125) => {
  const valueXCoord = Math.floor(Math.random() * (array[0] - min)) + min;
  const valueYCoord = Math.floor(Math.random() * (array[1] - min)) + min;
  return [valueXCoord, valueYCoord];
};

const performAction = (sprite, randomCoordArray) => {
  sprite.style.left = `${randomCoordArray[0]}px`;
  sprite.style.top = `${randomCoordArray[1]}px`;
};

document.addEventListener('DOMContentLoaded', () => {
  const movingSprite = document.getElementById('myCanvas');
  const bodyQuery = document.querySelector('body');

  let idleTimeout;
  let cursorPosition = { x: 0, y: 0 };

  const resetIdleTimer = (event) => {
    if (idleTimeout) {
      clearTimeout(idleTimeout);
    }
    cursorPosition.x = event.clientX;
    cursorPosition.y = event.clientY;
    idleTimeout = setTimeout(getCursor, 4000);
  };

  const getCursor = () => {
    console.log(cursorPosition.x);
    console.log(cursorPosition.y);
    console.log('Mouse has been idle for 4 seconds');
  };

  movingSprite.addEventListener('transitionstart', startAnimation);

  movingSprite.addEventListener('transitionend', stopAnimation);

  movingSprite.addEventListener('mousemove', (event) => {
    const randomCoords = getRndInteger(getSizes());
    performAction(movingSprite, randomCoords);
  });

  bodyQuery.addEventListener('mousemove', resetIdleTimer);

  resetIdleTimer({ clientX: 0, clientY: 0 });
});
