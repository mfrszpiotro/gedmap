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
        leftSide.style.right = (isSmall ? '100.8%' : '75%');
        rightSide.style.left = (isSmall ? '100%' : '83%');
        leftSide.style.top = (isSmall ? '-1000px' : '-2000px');
        rightSide.style.top = (isSmall ? '-1400px' : '-4900px');;
    }
    else {
        leftSide.classList.remove('lay-left')
        rightSide.classList.remove('lay-right')
        leftSide.style.right = (isSmall ? '100%' : '107%');
        rightSide.style.left = (isSmall ? '95%' : '110%');
        leftSide.style.top = (isSmall ? '400px' : '200px');
        rightSide.style.top = (isSmall ? '20px' : '-200px');
    }
}
        // leftSide.style.right = (isSmall ? '40%' : '75%');
        // rightSide.style.left = (isSmall ? '65%' : '83%');

function init() {
    window.addEventListener('scroll', showSides);
    window.addEventListener('resize', showSides)
}

window.addEventListener('DOMContentLoaded', init);