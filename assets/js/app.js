
let navOpener = document.getElementById("navToggler");

let mNav = document.getElementById("mobileNav");
let closeNav = document.getElementById("close-btn");


navOpener.addEventListener("click", ()=>{
    mNav.classList.add("active");
});

closeNav.addEventListener("click", ()=>{
    mNav.classList.remove("active");

})