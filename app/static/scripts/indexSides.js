const leftSide = document.getElementById("left-side-svg");
const rightSide = document.getElementById("right-side-svg");
const textLeft = document.getElementById("left-side-text");
const textRight = document.getElementById("right-side-text");
const sideDefault = 'svg-triangle';
const textContDefault = 'sides-hide';

function checkScroll() {
    let vertScroll = window.scrollY;
    if(vertScroll >= 400) {
        leftSide.classList = sideDefault;
        rightSide.classList = sideDefault;
        leftSide.classList.add('sides-show');
        rightSide.classList.add('sides-show');
        textLeft.classList = textContDefault;
        textRight.classList = textContDefault;
        textLeft.classList.add('show');
        textRight.classList.add('show');
    }
    else {
        leftSide.classList = sideDefault;
        rightSide.classList = sideDefault;
        leftSide.classList.add('sides-hide');
        rightSide.classList.add('sides-hide');
        textLeft.classList = textContDefault;
        textRight.classList = textContDefault;
    }
}

function init() {
    ['scroll', 'resize'].forEach(event =>
        window.addEventListener(event, checkScroll)
    );
}

window.addEventListener('DOMContentLoaded', init);