document.addEventListener("DOMContentLoaded", function(){
    const background = document.querySelector("#background");
    const nav = document.querySelector("nav");
    const hamburger = document.querySelector("button.hamburger");
    const technologies = document.querySelector("#technologies");
    const skills = document.querySelector("#skills");
    const about = document.querySelector("#about");
    const links = document.querySelector("#links");

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
        nav.classList.toggle("is-active");
        document.querySelector("#main-container").classList.toggle("blur");
    });
    // const calculatedHeight = window.getComputedStyle(background).getPropertyValue("height");
    // const calculatedWidth = window.getComputedStyle(background).getPropertyValue("width");
    // background.style.maxHeight = calculatedHeight;
    // background.style.maxWidth = calculatedWidth;
})