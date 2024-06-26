const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 35;
const CANVAS_HEIGHT = canvas.height = 35;

const myImg = document.getElementById('myImg');

const chickenImage = new Image();

chickenImage.src = 'images/Chicken_Sprite_Sheet.png';

const spriteHeight = 32;
const spriteWidth = 32;

let frameX = 0;
let frameY = 0;

let animationFrame = 0;
const staggerFrames = 25;

let isAnimating = false;

const drawFrame = (frameX, frameY) => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(chickenImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
};

const animate = () => {
    if (!isAnimating) return;
    drawFrame(frameX, frameY);
    if (animationFrame % staggerFrames === 0) {
        if (frameX < 3) {
            frameX = (frameX + 1) % 5;
        } else {
            frameX = 0;
        }
    }
    animationFrame++;
    window.requestAnimationFrame(animate);
};

const startAnimation = () => {
    if (!isAnimating) {
        isAnimating = true;
        animate();
    }
};

const stopAnimation = () => {
    isAnimating = false;
};

chickenImage.onload = () => {
    drawFrame(frameX, frameY);
};
