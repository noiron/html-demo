// Change the contents in style and pre tag at the same time.
const initBase = 200;
const initHeight = 100;
const initRotate = 0;
const initColor = '#ADD8E6'; // lightblue
let base = 0, height = 0, rotate = 0, color;

function set() {
  const styleStr = `
  #triangle {
    width: 0px;
    height: 0px;
    border-left: ${base / 2}px solid transparent;
    border-right: ${base / 2}px solid transparent;
    border-bottom: ${height}px solid ${color};
    border-top: none;
    transform: rotate(${rotate}deg);
  }
`;

  // Change the contents in style and pre tag at the same time.
  const $style = document.getElementsByTagName('style')[0];
  const $code = document.getElementsByTagName('pre')[0];
  $style.innerHTML = styleStr;
  $code.innerHTML = styleStr;
}

function init() {
  base = initBase;
  height = initHeight;
  rotate = initRotate;
  color = initColor;

  const $baseInput = document.getElementById('base-input');
  $baseInput.addEventListener('input', (e) => {
    base = e.target.value;
    set();
  });
  
  const $heightInput = document.getElementById('height-input');
  $heightInput.addEventListener('input', (e) => {
    height = e.target.value;
    set();
  });
  
  const $rotateInput = document.getElementById('rotate-degree');
  $rotateInput.addEventListener('input', (e) => {
    rotate = e.target.value;
    set();
  });

  const $colorInput = document.getElementById('color-input');
  $colorInput.addEventListener('input', (e) => {
    color = e.target.value;
    set();
  });

  $baseInput.value = initBase;
  $heightInput.value = initHeight;
  $rotateInput.value = initRotate;

  set();
}

init();
