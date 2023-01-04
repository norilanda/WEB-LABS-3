const animRegion = document.getElementById('anim');
const workRegion = document.getElementById('work');

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
    localStorage.setItem(messageCounter + '. work appeared', getCurrTime());
    messageCounter++;   
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



//start animation
button_start.onclick = function() {
    let buttonName = button_start.innerHTML;
    text_messages_container.getElementsByTagName('p')[0].innerHTML = "You've clicked " + buttonName + " button!";
    if(buttonName == "start")
    {
        localStorage.setItem(messageCounter + '. start has been clicked', getCurrTime());
        messageCounter++;
        button_start.disabled = true;
        //
    }
    else
    {
        localStorage.setItem(messageCounter + '. reload has been clicked', getCurrTime());
        messageCounter++;
        button_start.innerHTML = "start";
        text_messages_container.getElementsByTagName('p')[1].innerHTML = "";
        cornerIndex++;
        //
    }
}





function getSpeed()
{
      if(document.getElementById("fastAnimation").checked )
    {
        return 20;
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