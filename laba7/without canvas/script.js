const animRegion = document.getElementById('anim');
const workRegion = document.getElementById('work');
const square1 = document.getElementById('square1');
const square2 = document.getElementById('square2');
const square3 = document.getElementById('square3');
const square4 = document.getElementById('square4');
const blueSquare = document.getElementById('blueSquare');

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
var cornerIndex = 0;
const borderSize = 10; 
var cornerIndex = 0;

///////////////////////////////////////////////
//buttons
button_play.onclick = function() {
    workRegion.style.display = 'block';
    localStorage.setItem(messageCounter + '. work appeared', getCurrTime());
    text_messages_container.getElementsByTagName('p')[0].innerHTML = "You've clicked play button!";
    messageCounter++;   
    clearDiv2();
    fillWithTexture();
    button_start.innerHTML = "start";
    button_start.disabled = false;
}
button_close.onclick = function(){
    workRegion.style.display = 'none';
    //clearing everything
    button_start.innerHTML = "start";
    button_start.disabled = false;
    text_messages_container.getElementsByTagName('p')[0].innerHTML = "";
    text_messages_container.getElementsByTagName('p')[1].innerHTML = "";
    localStorage.setItem(messageCounter + '. work disappeared', getCurrTime());
    //read local storage
    readFromLocalStorage();
    localStorage.clear();
    messageCounter = 1;
}

function fillWithTexture()
{
    const borderSize = 10;
    let squareSide = Math.min(animRegion.offsetHeight, animRegion.offsetWidth) - borderSize;
    let littleSquareSide = squareSide/2;
    let startPointX = (animRegion.offsetWidth - squareSide - borderSize)/2;
    let startPointY = (animRegion.offsetHeight - squareSide - borderSize)/2;

    setupSquare(square1, startPointX, startPointY, littleSquareSide, littleSquareSide);   
    
    startPointX += littleSquareSide;
    setupSquare(square2, startPointX, startPointY, littleSquareSide, littleSquareSide);

    startPointY += littleSquareSide;
    setupSquare(square3, startPointX, startPointY, littleSquareSide, littleSquareSide);

    startPointX -= littleSquareSide;
    setupSquare(square4, startPointX, startPointY, littleSquareSide, littleSquareSide);

    placeBlueSquare(cornerIndex);
}

function placeBlueSquare(numberOfOuterSquare)
{
    let arr = calcSquareCoords(numberOfOuterSquare);
    setupSquare(blueSquare, arr[0], arr[1], arr[2], arr[3]);
}
function calcSquareCoords(numberOfOuterSquare)
{
    const sideSize = 20;
    //--make a function
    let squareSide = Math.min(animRegion.offsetHeight, animRegion.offsetWidth);
    let littleSquareSide = squareSide/2;
    let startPointX = (animRegion.offsetWidth - squareSide-borderSize)/2;
    let startPointY = (animRegion.offsetHeight - squareSide-borderSize)/2;
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
function setupSquare(elem, leftOffset, topOffset, width, height)
{
    elem.style.left = leftOffset + 'px';
    elem.style.top = topOffset + 'px';
    elem.style.width = width+ 'px';
    elem.style.height = height+ 'px';
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
        text_messages_container.getElementsByTagName('p')[1].innerHTML = "";
        cornerIndex++;
        fillWithTexture();
    }
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
        setupSquare(blueSquare, startX, startY, sideSizeWidth, sideSizeHeight);
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

function hasExceed(startX, startY, sideSizeWidth, sideSizeHeight)
{
    if (startX<0||startY<0 || startX + sideSizeWidth > animRegion.offsetWidth - borderSize || startY + sideSizeHeight > animRegion.offsetHeight - borderSize)
    {return true;}
    return false;
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