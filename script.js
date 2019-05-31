document.addEventListener("DOMContentLoaded", function(){
    document.querySelector("#header-container").style.height = window.innerHeight + "px";
    document.querySelector("#background").style.height = window.innerHeight + "px";
    // document.querySelector(".section").style.height = window.innerHeight + "px";
    window.document.addEventListener("scroll", function(){
        if(window.scrollY != 0){
            document.querySelector("#background").style.filter = "blur(10px) brightness(85%) saturate(50%)";
        } else {
            document.querySelector("#background").style.filter = "blur(.5px) brightness(85%)";
        }
    })
})