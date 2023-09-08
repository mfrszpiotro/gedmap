const leftSide = document.getElementById("left-side");
const rightSide = document.getElementById("right-side");
const container = document.getElementById("sides-container");
const topLeft = leftSide.style.top;
const topRight = rightSide.style.top;
const classListDefault = 'svg-triangle'

function isSmallScreen() {
    return window.matchMedia("(max-width: 1600px)").matches;
}

//todo: function isMobile

function checkScroll() {
    let vertScroll = window.scrollY;
    let isSmall = isSmallScreen()
    //todo: let isMobile
    if(vertScroll >= (isSmall ? 400 : 600)) {
        leftSide.classList = classListDefault;
        rightSide.classList = classListDefault;
        leftSide.classList.add('sides-show');
        rightSide.classList.add('sides-show');
    }
    else {
        leftSide.classList = classListDefault;
        rightSide.classList = classListDefault;
        leftSide.classList.add('sides-hide');
        rightSide.classList.add('sides-hide');
    }
}

function init() {
    ['scroll', 'resize'].forEach(event =>
        window.addEventListener(event, checkScroll)
    );
}

window.addEventListener('DOMContentLoaded', init);