const animRegion = document.getElementById('anim');
const workRegion = document.getElementById('work');

const button_play = document.getElementById('play');
const button_close = document.getElementById('close');

button_play.onclick = function() {
    workRegion.style.display = 'block';
}
button_close.onclick = function(){
    workRegion.style.display = 'none';
}

workRegion.style.display = 'none';