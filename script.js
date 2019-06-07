document.addEventListener("DOMContentLoaded", function(){
    const background = document.querySelector("#background");
    const nav = document.querySelector("nav");
    const hamburger = document.querySelector("button.hamburger");
    const mainContainer = document.querySelector("#main-container");
    const technologies = document.querySelector("#technologies");
    const skills = document.querySelector("#skills");
    const about = document.querySelector("#about");
    const links = document.querySelector("#links");

    const calculatedHeight = window.getComputedStyle(background).getPropertyValue("height");
    const calculatedWidth = window.getComputedStyle(background).getPropertyValue("width");
    background.style.maxHeight = calculatedHeight;
    background.style.maxWidth = calculatedWidth;

    window.addEventListener("orientationchange", () => {
        background.style.maxHeight = calculatedHeight;
        background.style.maxWidth = calculatedWidth;
        background.style.Height = "100%";
        background.style.Width = "100%";
    })

    document.querySelector("#navTop").addEventListener("click", () => window.scroll({top: 0}));
    document.querySelector("#navTechnologies").addEventListener("click", () => window.scroll({top: technologies.offsetTop}));
    document.querySelector("#navSkills").addEventListener("click", () => window.scroll({top: skills.offsetTop}));
    document.querySelector("#navAbout").addEventListener("click", () => window.scroll({top: about.offsetTop}));
    document.querySelector("#navLinks").addEventListener("click", () => window.scroll({top: links.offsetTop}));
    
    window.document.addEventListener("scroll", () => {
        document.querySelector("#arrow-container").style.opacity = 0;
        if(window.scrollY != 0 || hamburger.classList.contains("is-active")){
            background.classList.add("blur");
        } else {
            background.classList.remove("blur");
        }
    })
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("is-active");
        nav.classList.toggle("is-active");;
        if(nav.classList.contains("is-active")) {
            background.classList.add("blur");
            mainContainer.classList.add("blur");
        } else if(!nav.classList.contains("is-active") && window.scrollY != 0) {
            mainContainer.classList.remove("blur");
        } else {
            background.classList.remove("blur");
            mainContainer.classList.remove("blur");
        }
    });
})