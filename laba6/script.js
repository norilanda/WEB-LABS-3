
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
    // setTimeout(function(){return document.querySelector(".notificaton").animate({height:"toggle"},"slow")},450);
   
}

document.getElementById("submit_creation").onclick = function() {CreateNotificationBar();}

// $(function(){setTimeout(function(){return $(".bar").animate({height:"toggle"},"slow")},450);return $("#ok").on("click",function(){$("#barwrap").css("margin-bottom","0px");$(".bar").animate({height:"toggle"},"slow");return!1})});