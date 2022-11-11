function exchangeTitles()
{
    var textUpperH = document.getElementById("upperHeading").innerText;
    var textDownH = document.getElementById("downHeading").innerText;
    document.getElementById("upperHeading").innerText = textDownH;
    document.getElementById("downHeading").innerText = textUpperH;
}
document.getElementById("upperHeading").onclick = function() {exchangeTitles()};
document.getElementById("downHeading").onclick = function() {exchangeTitles()};