function hideNav() {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    if(scrollTop > 150) {
        navbar.style.top = '-400px';
    }
    else {
        navbar.style.top='-100px';
    }
}

function init() {
    const navbar = document.getElementById("navbar");
    window.addEventListener('scroll', hideNav);
}

window.addEventListener('DOMContentLoaded', init);