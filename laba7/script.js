const animRegion = document.getElementById('anim');
const workRegion = document.getElementById('work');
const ctx = animRegion.getContext('2d');

// buttons
const button_play = document.getElementById('play');
const button_close = document.getElementById('close');

button_play.onclick = function() {
    workRegion.style.display = 'block';
    fillWithTexture();
}
button_close.onclick = function(){
    workRegion.style.display = 'none';
}

workRegion.style.display = 'none';

//initial display
function fillWithTexture()
{
    let squareSide = Math.min(animRegion.height, animRegion.width);
    let littleSquareSide = squareSide/2;

    let startPointX = (animRegion.width - squareSide)/2;
    let startPointY = (animRegion.height - squareSide)/2;
    fillSquareWithImagePattern(startPointX, startPointY, littleSquareSide, './images/image1.jpg');

    startPointX += littleSquareSide;
    fillSquareWithImagePattern(startPointX, startPointY, littleSquareSide, './images/image2.jpg');

    startPointY += littleSquareSide;
    fillSquareWithImagePattern(startPointX, startPointY, littleSquareSide, './images/image3.jpg');

    startPointX -= littleSquareSide;
    fillSquareWithImagePattern(startPointX, startPointY, littleSquareSide, './images/image4.png');
}
function fillSquareWithImagePattern(startX, startY, sideSize, imagePath)
{
    var bg = new Image();
    bg.src = imagePath; 
    bg.onload = function(){
        var pattern = ctx.createPattern(this, "repeat");
        ctx.beginPath();
        ctx.fillStyle = pattern;
        ctx.rect(startX, startY, sideSize, sideSize);
        ctx.fill();
    };
}