
//1
{
function exchangeTitles(id1, id2)
{
    var textUpperH = document.getElementById(id1).innerText;
    var textDownH = document.getElementById(id2).innerText;
    document.getElementById("upperHeading").innerText = textDownH;
    document.getElementById("downHeading").innerText = textUpperH;
}
document.getElementById("task1_change").onclick = function() {exchangeTitles("upperHeading", "downHeading")};
}

//------------------------------------------------------------------------
//2
{
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
document.getElementById("task2_S").onclick = function() {displayS("div3")};
}

//------------------------------------------------------------------------
//3
{
function calcWords(text)
{
    var splitedText = text.split(" "); 
    var wordsNumber = 0;
    for (let i = 0; i < splitedText.length; i++)
    {
        for (let j = 0; j < splitedText[i].length; j++)
        {     
            if (checkIfIsAlphaNum(splitedText[i][j]))
            {
                wordsNumber++;
                break;
            }
        }
    }
    return wordsNumber;
}
function checkIfIsAlphaNum(char)
{
    var code = char.charCodeAt(0);
        if ((code > 47 && code < 58) || // numeric (0-9)
            (code > 64 && code < 91) || // upper alpha (A-Z)
            (code > 96 && code < 123)|| // lower alpha (a-z)
            (/[а-яА-Я]/.test(char)) //cyrillic
            )
            return true;
        return false;
}
function displayCountedWords(id)
{
    var text = document.getElementById(id).value ;
    var wordsNumber = calcWords(text);
    document.cookie = "wordsNumber="+wordsNumber+";";
    alert("Number of words in text = " + wordsNumber);   
}

function changeFormVisibility()//changes form visability and deletes cookies
{
    var cookie = document.cookie;
    if(cookie.length != 0 && cookie != "wordsNumber=")   //if there is cookie
    {
        document.getElementById("form_task3").setAttribute("class", "hide");//hide form 

        setTimeout(function (){ //delaying for a second to load page
        alert("Information in cookies: "+cookie +"\nAfter clicking on OK your cookie will be deleted!"); 
        document.cookie = "wordsNumber=;"; //delete cookie  
        alert("cookies have been deleted!");  
        document.getElementById("form_task3").setAttribute("class", "form"); }, 300);                  
    }         
}    
}
//------------------------------------------------------------------------
//4
{
function changeColor(id, colorId)
{
    var color = document.getElementById(colorId).value
    document.getElementById(id).style.backgroundColor = color;
    localStorage.setItem('color', color);
}
function setColorFromStorage(id)
{
    var color = localStorage.getItem('color');
    document.getElementById(id).style.backgroundColor = color;
}
document.getElementById("task4_color").onmouseout = function() {changeColor("div2", "task4_color")};
if (window.matchMedia("only screen and (max-width: 450px)").matches)//for mobile
{
    document.getElementById("task4_color").onclick = function() {changeColor("div2", "task4_color")};
}
document.body.addEventListener("load", setColorFromStorage("div2"));    
}

//------------------------------------------------------------------------
//5
{
    function AddInput(blockId, blockNumber)// adding buttons
    {
        if (document.getElementById(blockId).querySelector('#task5_add_'+ blockNumber) == null)
        {
        document.getElementById(blockId).insertAdjacentHTML('beforeend', 
        '<button id="task5_add_'+ blockNumber +'" class="buttonSubmit"> SET BACKGROUND </button>'+
        '<button id="task5_delete_'+ blockNumber +'" class="buttonSubmit"> DELETE BACKGROUND </button>');;
        document.getElementById("task5_add_"+ blockNumber).addEventListener("click", function () {setBackgroundForTextNodes(blockId);});
        document.getElementById("task5_delete_"+ blockNumber).addEventListener("click", function () {deleteBackgroundForTextNodes(blockId);});
        }        
    }
    function FindTextNodes(id)//finding all text nodes of the curr container (block)
    {    
        function textNodesOfElement(node)
        {
            if(node.nodeType === Node.TEXT_NODE )
            {            
                let textInNode = node.nodeValue;
                textInNode.replace("\n", "-");
                for (let j = 0; j < textInNode.length; j++)
                    {     
                        if (checkIfIsAlphaNum(textInNode[j]))//function from task3
                        {
                            textNodes.push(node);
                            break;
                        }
                    }
            }
            else{
                var len = node.childNodes.length;
                for (var i = 0;  i < len; i++) {
                    textNodesOfElement(node.childNodes[i]);
                }
            }
        }
        var textNodes = [];
        textNodesOfElement(document.getElementById(id));        
        return textNodes;
        
    }
    function setBackgroundForTextNodes(id)
    {
        textNodes = FindTextNodes(id);
        for (var i =0; i < textNodes.length; i++)
        {
            textNodes[i].parentNode.style.backgroundImage = "url(images/image1.jpg)";
        }
        localStorage.setItem(id, "url(images/image1.jpg)");
    }
    function deleteBackgroundForTextNodes(id)
    {
        textNodes = FindTextNodes(id);
        for (var i =0; i < textNodes.length; i++)
        {
            textNodes[i].parentNode.style.backgroundImage = "none";
        }
        localStorage.removeItem(id);
    }
    document.getElementById('block1').onclick = function() {AddInput('div1', 1);};
    document.getElementById('block2').onclick = function() {AddInput('div2', 2);};
    document.getElementById('block3').onclick = function() {AddInput('div3', 3);};
    document.getElementById('block4').onclick = function() {AddInput('div4', 4);};
    document.getElementById('block5').onclick = function() {AddInput('div5', 5);};

}