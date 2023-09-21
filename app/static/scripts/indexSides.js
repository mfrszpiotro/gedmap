const leftSide = document.getElementById("left-side-svg");
const rightSide = document.getElementById("right-side-svg");
const textLeft = document.getElementById("left-side-text");
const textRight = document.getElementById("right-side-text");
const mobileContainer = document.getElementById("sides-section-mobile");
const topLeft = leftSide.style.top;
const topRight = rightSide.style.top;
const startButton = document.getElementById("btn-start");
const sideDefault = 'svg-triangle';
const textContLeftDefault = 'sides-hide';
const textContRightDefault = 'sides-hide';

function checkScroll() {
    let vertScroll = window.scrollY;
    if(vertScroll >= 400) {
        leftSide.classList = sideDefault;
        rightSide.classList = sideDefault;
        leftSide.classList.add('sides-show');
        rightSide.classList.add('sides-show');
        textLeft.classList = textContLeftDefault;
        textRight.classList = textContRightDefault;
    }
    else {
        leftSide.classList = sideDefault;
        rightSide.classList = sideDefault;
        leftSide.classList.add('sides-hide');
        rightSide.classList.add('sides-hide');
        textLeft.classList = textContLeftDefault;
        textRight.classList = textContRightDefault;
        textLeft.classList.add('hidden');
        textRight.classList.add('hidden');
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