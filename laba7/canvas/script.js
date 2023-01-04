const animRegion = document.getElementById('anim');
const workRegion = document.getElementById('work');
const ctx = animRegion.getContext('2d');

// buttons
const button_play = document.getElementById('play');
const button_close = document.getElementById('close');
const button_start = document.getElementById('start');
document.getElementById("fastAnimation").checked = true;

const text_messages_container = document.getElementById('messages');
const localStorageValues = document.getElementById('localStorageValues');
var interval;
var messageCounter = 1;
workRegion.style.display = 'none';
///////////////////////////////////////////////
//buttons
button_play.onclick = function() {
    workRegion.style.display = 'block';
    ctx.clearRect(0, 0, animRegion.width, animRegion.height);
    fillWithTexture();
    localStorage.setItem(messageCounter + '. work appeared', getCurrTime());
    text_messages_container.getElementsByTagName('p')[0].innerHTML = "You've clicked play button!";
    messageCounter++;
    clearDiv2();
}
button_close.onclick = function(){
    workRegion.style.display = 'none';
    //clearing everything
    clearInterval(interval);
    button_start.innerHTML = "start";
    button_start.disabled = false;
    text_messages_container.getElementsByTagName('p')[0].innerHTML = "";
    text_messages_container.getElementsByTagName('p')[1].innerHTML = "";
    localStorage.setItem(messageCounter + '. work disappeared', getCurrTime());
    //read local storage
    readFromLocalStorage();
    localStorage.clear();
    messageCounter = 1;
    //...
}

function readFromLocalStorage()
{
    var keys = Object.keys(localStorage),
    i = 0, key;
    var dict = {};;

    for (; key = keys[i]; i++) {
        dict[parseInt(key.split('.')[0])] = key;
        
    }
    let dictLength = Object.keys(dict).length;
    for (let i=1;i<=dictLength;i++)
    {
        let p = document.createElement("p");
        p.innerHTML = dict[i] + ' - ' + localStorage.getItem(dict[i]);
        localStorageValues.append(p);
    }
}
function clearDiv2()
{
    localStorageValues.replaceChildren();
}
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
    text_messages_container.getElementsByTagName('p')[0].innerHTML = "You've clicked " + buttonName + " button!";
    if(buttonName == "start")
    {
        localStorage.setItem(messageCounter + '. start has been clicked', getCurrTime());
        messageCounter++;
        button_start.disabled = true;
        controlSquare(cornerIndex);
    }
    else
    {
        localStorage.setItem(messageCounter + '. reload has been clicked', getCurrTime());
        messageCounter++;
        button_start.innerHTML = "start";
        ctx.clearRect(0, 0, animRegion.width, animRegion.height);
        text_messages_container.getElementsByTagName('p')[1].innerHTML = "";
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
    return [startX, startY, sideSizeWidth, sideSizeHeight, startPointX + littleSquareSide, startPointY + littleSquareSide]
    
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

    let horizontalLine = arr[5];
    let verticalLine = arr[4];

    let dirrection = 0;
    let i = 0;
    let first=false; let second=false; let third=false; let fourth =false;
    
    let timeOfInterval = getSpeed();
    text_messages_container.getElementsByTagName('p')[1].innerHTML = "Squares entered: ";
  
    interval = setInterval(function() {
        animateSquare(startX, startY, sideSizeWidth, sideSizeHeight);
        if(!first && startX < verticalLine && startY < horizontalLine)
        {
            localStorage.setItem(messageCounter+ '. square 1 has been entered', getCurrTime());
            messageCounter++;
            text_messages_container.getElementsByTagName('p')[1].innerHTML += " 1 ";
            first = true;
        }
        if(!second && startX < verticalLine && startY+ sideSizeHeight> horizontalLine)
        {
            localStorage.setItem(messageCounter+'. square 2 has been entered', getCurrTime());
            messageCounter++;
            text_messages_container.getElementsByTagName('p')[1].innerHTML += " 2 ";
            second = true;
        }
        if(!third && startX +sideSizeWidth> verticalLine && startY+ sideSizeHeight> horizontalLine)
        {
            localStorage.setItem(messageCounter+ '. square 3 has been entered', getCurrTime());
            messageCounter++;
            text_messages_container.getElementsByTagName('p')[1].innerHTML += " 3 ";
            third = true;
        }
         if(!fourth && startX +sideSizeWidth> verticalLine && startY < horizontalLine)
        {
            localStorage.setItem(messageCounter+ '. square 4 has been entered', getCurrTime());
            messageCounter++;
            text_messages_container.getElementsByTagName('p')[1].innerHTML += " 4 ";
            fourth = true;
        }
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
        if (hasExceed(startX, startY, sideSizeWidth, sideSizeHeight)) { 
            clearInterval(interval); 
            localStorage.setItem(messageCounter+ '. Animation has been stopped!', getCurrTime());
            messageCounter++;
            text_messages_container.getElementsByTagName('p')[0].innerHTML = "Animation has been stopped!";
            button_start.innerHTML = "reload";
            button_start.disabled = false;
        }
            }, timeOfInterval);
}
function animateSquare(startX, startY, sideSizeWidth, sideSizeHeight)
{
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.rect(startX, startY, sideSizeWidth, sideSizeHeight);
    ctx.fill();
}
function getSpeed()
{
      if(document.getElementById("fastAnimation").checked )
    {
        return 10;
    }
    else if(document.getElementById("slowAnimation").checked){
        return 90;
    }
    else{
        return 500;
    }
}
function getCurrTime()
{    
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    return dateTime;
}