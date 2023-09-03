const navbar = document.getElementById("navbar");

function hideNav() {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    if(scrollTop > 50) {
        navbar.style.top = '-400px';
    }
    else {
        navbar.style.top='-100px';
    }
}

function init() {
    window.addEventListener('scroll', hideNav);
}

window.addEventListener('DOMContentLoaded', init);