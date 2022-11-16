
//1
function exchangeTitles()
{
    var textUpperH = document.getElementById("upperHeading").innerText;
    var textDownH = document.getElementById("downHeading").innerText;
    document.getElementById("upperHeading").innerText = textDownH;
    document.getElementById("downHeading").innerText = textUpperH;
}
document.getElementById("upperHeading").onclick = function() {exchangeTitles()};
document.getElementById("downHeading").onclick = function() {exchangeTitles()};

//------------------------------------------------------------------------
//2
function calcParallelogramS(a, h)
{    
    return a*h;
}
function checkNumbers(a, h)
{
    var isEverythingOk = true;
    if(!a || !h)
    {
        alert("Enter all numbers!");
        isEverythingOk = false;
    }
    else if (a <= 0 && h <=0)
    {
        alert("numbers should be positive!");
        isEverythingOk = false;
    }
    else if(a <= 0){
        alert("'a' should be positive!");
        isEverythingOk = false;
    }    
    else if (h <=0)
    {
        alert("'h' should be positive!");
        isEverythingOk = false;
    }
    return isEverythingOk;
}
function displayS(elementID)
{
    var a = document.getElementById("task2_a").value ;
    var h = document.getElementById("task2_h").value ;
    console.log("a"+ a);
    if(checkNumbers(a, h))
    {
        S = calcParallelogramS(a, h);
        document.getElementById(elementID).insertAdjacentHTML('beforeend', "Parallelogram with a = " + a + " and h = "+ h + " has Square = "+S + " <br /> ");
    }    
}
elementID = "div3";
document.getElementById("task2_S").onclick = function() {displayS(elementID)};

//------------------------------------------------------------------------
//3
function calcWords(text)
{
    var splitedText = text.split(" "); 
    var wordsNumber = 0;
    for (let i = 0; i < splitedText.length; i++)
    {
        for (let j = 0; j < splitedText[i].length; j++)
        {     
            var code = splitedText[i].charCodeAt(j);
            if ((code > 47 && code < 58) || // numeric (0-9)
                (code > 64 && code < 91) || // upper alpha (A-Z)
                (code > 96 && code < 123))// lower alpha (a-z)
            {
                wordsNumber++;
                break;
            }
        }
    }
    return wordsNumber;
}
function displayCountedWords()
{
    var text = document.getElementById("task3_text").value ;
    var wordsNumber = calcWords(text);
    document.cookie = "wordsNumber="+wordsNumber+";";
    alert("Number of words in text = " + wordsNumber);  
    return false;  
}

var shouldDisplayFormAndMessage = false;
window.addEventListener('load', (event) => {
    var cookie = document.cookie;
    if(cookie.length ==0 || cookie != "wordsNumber=")   //if there is cookie
    {
        
        shouldDisplayFormAndMessage = true; 
        alert("Information in cookies: "+cookie +"\nAfter clicking on OK your cookie will be deleted!"); 
        document.cookie = "wordsNumber=;"; //delete cookie
        return false;              
    }          
});

function changeFormVisibility(){
    if(shouldDisplayFormAndMessage)
    {
        
        document.getElementById("form_task3").setAttribute("class", "hide");
        shouldDisplayFormAndMessage = false;
        alert("cookies have been deleted!");        
        location.reload();
    }        
}


//------------------------------------------------------------------------
//4