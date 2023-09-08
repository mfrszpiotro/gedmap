const navbar = document.getElementById("navbar");
const hamburg = document.getElementById("trigger-mobile-nav")
const hamburgIcon = document.getElementById("hamburg-icon")
let isHamburg = true;

function hideNav() {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > 50) {
        navbar.classList = ("all-hide");
    }
    else {
        navbar.classList.remove("all-hide");
    }
}

function overlayNav() {
    if (isHamburg) {
        navbar.classList.add('mobile-show');
        hamburgIcon.textContent = "X";
        isHamburg = false;
    }
    else {
        navbar.classList.remove('mobile-show');
        hamburgIcon.textContent = "\u2630";
        isHamburg = true;
    }
}

function fixOverlayNav() {
    navbar.classList.remove('mobile-show');
    hamburgIcon.textContent = "\u2630";
    isHamburg = true;
}

function init() {
    window.addEventListener('scroll', hideNav);
    window.addEventListener('resize', fixOverlayNav);
    hamburg.addEventListener('click', overlayNav);
}

window.addEventListener('DOMContentLoaded', init);