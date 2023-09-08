// todo: fix for multiple flashes
try {
    document.getElementById("closebtn").addEventListener("click", onHide);
  } catch (e) {
    if (e instanceof TypeError) {}
}
try {
    document.getElementById("tickbtn").addEventListener("click", onHide);
  } catch (e) {
    if (e instanceof TypeError) {}
}

function onHide(){
    this.parentElement.style.display='none';
}