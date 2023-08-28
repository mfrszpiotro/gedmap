const leftSide = document.getElementById("left-side");
const rightSide = document.getElementById("right-side");
const container = document.getElementById("sides-container");
const topLeft = leftSide.style.top;
const topRight = rightSide.style.top;

function isSmallScreen() {
    return window.matchMedia("(max-width: 1600px)").matches;
}

//todo: function isMobile

function checkScroll() {
    //todo: stay on refresh
    let scrollTop = document.documentElement.scrollTop;
    let isSmall = isSmallScreen()
    //todo: let isMobile
    if(scrollTop >= (isSmall ? 400 : 600)) {
        leftSide.classList.remove('sides-stay');
        leftSide.classList.add('sides-show');
        rightSide.classList.remove('sides-stay');
        rightSide.classList.add('sides-show');
    }
    else if(scrollTop >= (isSmall ? 350 : 550)){
        leftSide.classList.remove('sides-fix');
        leftSide.classList.add('sides-stay');
        rightSide.classList.remove('sides-fix');
        rightSide.classList.add('sides-stay');
        leftSide.style.top = '80%';
        rightSide.style.top = '90%';
    }
    else {
        leftSide.classList.remove('sides-show');
        leftSide.classList.add('sides-fix');
        rightSide.classList.remove('sides-show');
        rightSide.classList.add('sides-fix');
        leftSide.style.top = topLeft;
        rightSide.style.top = topRight;
    }
}

function init() {
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll)
}

window.addEventListener('DOMContentLoaded', init);