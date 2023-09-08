function onHide() {
  this.parentElement.style.display = 'none';
}

if (document.currentScript.getAttribute('filter') === 'tick') {
  document.getElementById('tickbtn' + document.currentScript.getAttribute('name')).addEventListener('click', onHide);
}
else if (document.currentScript.getAttribute('filter') === 'close') {
  document.getElementById('closebtn' + document.currentScript.getAttribute('name')).addEventListener('click', onHide);
}
