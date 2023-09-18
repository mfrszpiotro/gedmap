const leftSide = document.getElementById("left-side-svg");
const rightSide = document.getElementById("right-side-svg");
const container = document.getElementById("sides-container");
const mobileContainer = document.getElementById("sides-section-mobile");
const topLeft = leftSide.style.top;
const topRight = rightSide.style.top;
const startButton = document.getElementById("btn-start")
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
    startButton.addEventListener("click", () => window.scrollTo(0, 1000))
    mobileContainer.scrollTo(mobileContainer.offsetWidth/2 - 50 , 0);
    ['scroll', 'resize'].forEach(event =>
        window.addEventListener(event, checkScroll)
    );
}

window.addEventListener('DOMContentLoaded', init);