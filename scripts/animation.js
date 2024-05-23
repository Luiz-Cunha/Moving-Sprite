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

const performAction = (sprite, array) => {
  sprite.style.left = `${array[0]}px`;
  sprite.style.top = `${array[1]}px`;
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
    idleTimeout = setTimeout(runningBackAction, 4000);
  };

  const runningBackAction = () => {
    console.log(cursorPosition.x);
    console.log(cursorPosition.y);
    performAction(movingSprite, [cursorPosition.x, cursorPosition.y]);
    // Need to remove the PX from the return of the canva element
    const spriteXCoord = movingSprite.style.left.match(/\d+/)[0];
    const spriteYCoord = movingSprite.style.top.match(/\d+/)[0];
    // Convert into number
    const spriteXCoordInt = parseInt(spriteXCoord, 10);
    const spriteYCoordInt = parseInt(spriteYCoord, 10);
    console.log(typeof spriteXCoord);
    console.log(typeof spriteYCoord);
    movingSprite.addEventListener('transitionend', (event) => {
      if (spriteXCoordInt === cursorPosition.x && spriteYCoordInt === cursorPosition.y) {
        alert("Move away");
      }
    });
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
