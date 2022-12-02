
function CreateNotificationBar()
{
    const notif = document.querySelector(".notificaton");
    if (notif != null)
        {
            notif.remove();
        }
    var content = document.getElementById("notification_content").value;
    var notificationBar = '<div class="notificaton"> <p> '+content+ '</p> <p id="ok"> ✔ </p>' + '</div>';
    
    document.body.insertAdjacentHTML('afterbegin', notificationBar);

    let formData = new FormData();
    formData.append("content", content);
       f(formData);
   

    // var elem = document.querySelector(".notificaton");
    // var tick = 0;
    // var timer = setInterval(function() {
    //     if (tick < 100) {
    //     //elem.style.position = "absolute";
    //     elem.style.height = tick + 'px';
    //     tick++;
    //     } else {
    //     clearInterval(timer)
    //     }
    // }, 10)

}

async function f(formData)
{
     let response = await fetch('https://norilanda.github.io/WEB-LABS-3', {
        method: 'POST',
        body: formData
      });
    //   let result = await response.json();
    // //   alert(result.message);
    // console.log(result);  
    // https://jsonplaceholder.typicode.com/posts
}


document.getElementById("submit_creation").onclick = function() {CreateNotificationBar();}

// $(function(){setTimeout(function(){return $(".bar").animate({height:"toggle"},"slow")},450);return $("#ok").on("click",function(){$("#barwrap").css("margin-bottom","0px");$(".bar").animate({height:"toggle"},"slow");return!1})});