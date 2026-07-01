const viewer = document.getElementById("momentViewer");

const closeMoment =
document.getElementById("closeMoment");

document.querySelectorAll(".moment-trigger")
.forEach((avatar,index)=>{

    avatar.addEventListener("click",()=>{

        document.getElementById("momentImage").src =
        `https://picsum.photos/700/500?random=${index+1}`;

        viewer.style.display="flex";

    });

});

closeMoment.addEventListener("click",()=>{

    viewer.style.display="none";

});

viewer.addEventListener("click",(e)=>{

    if(e.target===viewer){

        viewer.style.display="none";

    }

});