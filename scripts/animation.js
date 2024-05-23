const getSizes = () => {
  const body = document.querySelector('body');
  const bodyWidth = body.offsetWidth;
  const bodyHeight = body.offsetHeight;
  return [bodyWidth, bodyHeight];
};

const getRndInteger = (array) => {
  const valueXCoord = Math.floor(Math.random() * ((array[0] - 125) - 125)) + 125;
  const valueYCoord = Math.floor(Math.random() * ((array[1] - 125) - 125)) + 125;
  return [valueXCoord, valueYCoord];
};

const performAction = (sprite, array) => {
  sprite.style.left = `${array[0]}px`;
  sprite.style.top = `${array[1]}px`;
};

document.addEventListener('DOMContentLoaded', () => {
  const movingSprite = document.getElementById('myCanvas');

  let idleTimeout;
  let cursorPosition = { x: 0, y: 0 };
  let flag = 0;

  const resetIdleTimer = () => {
    if (idleTimeout) {
      clearTimeout(idleTimeout);
      flag=0;
    }
    idleTimeout = setTimeout(runningBackAction, 4000);
  };

  const runningBackAction = () => {
    console.log(cursorPosition.x);
    console.log(cursorPosition.y);
    performAction(movingSprite, [cursorPosition.x, cursorPosition.y]);
    console.log('Mouse has been idle for 4 seconds');
  };

  window.addEventListener('mousemove', (event) => {
    cursorPosition.x = event.clientX;
    cursorPosition.y = event.clientY;
    resetIdleTimer();
  });

  movingSprite.addEventListener('transitionstart', startAnimation);

  movingSprite.addEventListener('transitionend', () => {
    const spriteXCoord = movingSprite.style.left.match(/\d+/)[0];
    const spriteYCoord = movingSprite.style.top.match(/\d+/)[0];
    const spriteXCoordInt = parseInt(spriteXCoord, 10);
    const spriteYCoordInt = parseInt(spriteYCoord, 10);
    console.log(`New X Value: ${cursorPosition.x}`);
    console.log(`New Y Value: ${cursorPosition.y}`);
    if (spriteXCoordInt === cursorPosition.x && spriteYCoordInt === cursorPosition.y && flag === 0) {

      Swal.fire({
        title: 'Warning!',
        text: 'Move away!!!!',
        icon: 'warning',
        confirmButtonText: 'Okay'
      });
      flag = 1;
    }
    stopAnimation();
  });

  movingSprite.addEventListener('mousemove', () => {
    const randomCoords = getRndInteger(getSizes());
    performAction(movingSprite, randomCoords);
  });

  resetIdleTimer();
});
