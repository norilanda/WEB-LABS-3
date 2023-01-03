const animRegion = document.getElementById('anim');
const workRegion = document.getElementById('work');
const ctx = animRegion.getContext('2d');

// buttons
const button_play = document.getElementById('play');
const button_close = document.getElementById('close');
const button_start = document.getElementById('start');

button_play.onclick = function() {
    workRegion.style.display = 'block';
    fillWithTexture();
}
button_close.onclick = function(){
    workRegion.style.display = 'none';
}

workRegion.style.display = 'none';

var cornerIndex = 0;
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

    //place blue square
    let arr = calcSquareCoords(cornerIndex);
    setTimeout(function(){animateSquare(arr[0], arr[1], arr[2], arr[3]);}, 50);
    
    
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

//start animation
button_start.onclick = function() {
    let buttonName = button_start.innerHTML;
    if(buttonName == "start")
    {
        button_start.disabled = true;
        controlSquare(cornerIndex);
        button_start.innerHTML = "reload";
        button_start.disabled = false;
    }
    else
    {
        button_start.innerHTML = "start";
        ctx.clearRect(0, 0, animRegion.width, animRegion.height);
        cornerIndex++;
        fillWithTexture();//clears all
    }
}

function calcSquareCoords(numberOfOuterSquare)
{
    const sideSize = 20;
    //--make a function
    let squareSide = Math.min(animRegion.height, animRegion.width);
    let littleSquareSide = squareSide/2;
    let startPointX = (animRegion.width - squareSide)/2;
    let startPointY = (animRegion.height - squareSide)/2;
    //--make a function
    let startX ;
    let startY ;
    let sideSizeWidth = sideSize;
    let sideSizeHeight = sideSize;
    switch(numberOfOuterSquare%4)
    {
        case 0:{
            startX = startPointX + littleSquareSide - sideSize;
            startY = startPointY + littleSquareSide - sideSize;
            break;
        }
        case 1:
            {
                startX = startPointX + littleSquareSide;
                startY = startPointY + littleSquareSide - sideSize;
                break;
            }
        case 2:
            {
                startX = startPointX + littleSquareSide;
                startY = startPointY + littleSquareSide;
                break;
            }
        case 3:
            {
                startX = startPointX + littleSquareSide - sideSize;
                startY = startPointY + littleSquareSide;
                break;
            }
    }
    return [startX, startY, sideSizeWidth, sideSizeHeight]
    
}
function hasExceed(startX, startY, sideSizeWidth, sideSizeHeight)
{
    if (startX<0||startY<0 || startX + sideSizeWidth > animRegion.width || startY + sideSizeHeight > animRegion.height)
    {return true;}
    return false;
}
function controlSquare(numberOfOuterSquare)
{
    let arr = calcSquareCoords(numberOfOuterSquare);
    startX = arr[0];
    startY=arr[1];
    sideSizeWidth=arr[2];
    sideSizeHeight=arr[3];
    let dirrection = 0;
    let i = 0;
  
    var interval = setInterval(function() {
        animateSquare(startX, startY, sideSizeWidth, sideSizeHeight);
        switch (dirrection%4)
        {
            case 0:{//right
                sideSizeWidth++;
                break;
            }
            case 1:{//up
                startY--;
                sideSizeHeight++;
                break;
            }
            case 2:{//left
                startX--;
                sideSizeWidth++;
                break;
            }
            case 3:{//down
                sideSizeHeight++;
                break;
            }
        }
        dirrection++;
        i++; 
        if (hasExceed(startX, startY, sideSizeWidth, sideSizeHeight)) { clearInterval(interval); }
            }, 20);
}
function animateSquare(startX, startY, sideSizeWidth, sideSizeHeight)
{
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.rect(startX, startY, sideSizeWidth, sideSizeHeight);
    ctx.fill();
}