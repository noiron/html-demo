const imageNode = document.getElementsByClassName('album-image')[0];
const bannerNode = document.getElementsByClassName('banner-text')[0];

const imageSrcList = [
  'images/1.png',
  'images/2.png',
  'images/3.png'
];
const textList = [
  '第一个标题',
  '第二个标题',
  '第三个标题'
];

const fadeLastTime = 300;  // 淡入/淡出需要的时间
const steadyTime = 2000;  // 文字或图片稳定显示的时间

addSlideEffect(imageNode, bannerNode, fadeLastTime, steadyTime);

function addSlideEffect(imageNode, bannerNode, fadeLastTime, steadyTime) {
  let index = 1;
  let textIndex = 0;
  const imageListLen = imageSrcList.length;

  setInterval(() => {
    
    // 图片显示一段时间后，开始隐藏
    setTimeout(() => {
      imageNode.classList.remove('fade-in')
      imageNode.classList.add('fade-out')
    }, steadyTime);
  
    // 替换新的图片地址
    setTimeout(() => {
      imageNode.src = imageSrcList[index];
      index = (index + 1) % imageListLen;
  
      imageNode.classList.remove('fade-out')
      imageNode.classList.add('fade-in')
    }, fadeLastTime + steadyTime);
  
  }, fadeLastTime * 2 + steadyTime)
  
  setInterval(() => {
    // 当前文字正常显示
    bannerNode.style.opacity = 1;
    bannerNode.style.transform = 'translateY(0)';

    // 延迟后文字向下移动的同时隐藏
    setTimeout(() => {
      bannerNode.style.opacity = 0;
      bannerNode.style.transform = 'translateY(100%)';
    }, steadyTime)
    
    // 更换文字内容，并在不可见的情况下将其移动至上方
    setTimeout(() => {
      textIndex = (textIndex + 1) % textList.length; 
      bannerNode.innerHTML = textList[textIndex];
  
    bannerNode.style.opacity = 0;
      bannerNode.style.transform = 'translateY(-100%)';
    }, steadyTime + fadeLastTime)
  
  }, steadyTime + fadeLastTime * 2) 
}

