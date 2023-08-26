const leftSide = document.getElementById("left-side");
const rightSide = document.getElementById("right-side");
const container = document.getElementById("sides-container");
//todo: snapback

function isSmallScreen() {
    return window.matchMedia("(max-width: 1600px)").matches;
}

function showSides() {
    let scrollTop = document.documentElement.scrollTop;
    let isSmall = isSmallScreen()
    //todo: let isMobile = isMobileScreen()
    if(scrollTop > (isSmall ? 400 : 600)) {
        rightSide.classList.add('lay-right');
        leftSide.classList.add('lay-left');
        rightSide.classList.add('easy-transition');
        leftSide.classList.add('easy-transition');
        leftSide.classList.remove('slide-from-left');
        rightSide.classList.remove('slide-from-right');
    }
    else {
        leftSide.classList.remove('lay-left')
        rightSide.classList.remove('lay-right')
        leftSide.classList.remove('easy-transition');
        rightSide.classList.remove('easy-transition');
        leftSide.classList.remove('slide-from-left');
        rightSide.classList.remove('slide-from-right');
    }
    if(scrollTop > (isSmall ? 450 : 650)) {
        leftSide.classList.add('slide-from-left');
        rightSide.classList.add('slide-from-right');
    }
}
        // leftSide.style.right = (isSmall ? '40%' : '75%');
        // rightSide.style.left = (isSmall ? '65%' : '83%');

function init() {
    window.addEventListener('scroll', showSides);
    window.addEventListener('resize', showSides)
}

window.addEventListener('DOMContentLoaded', init);