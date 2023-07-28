var bannerLength = 3; // banner数量
var activeIndex = 0; // 当前banner的索引
var isStopProgress = false; // 是否停止轮播
var animateRate = 126.92 / (60 * 5); // 进度条动画速度
var timeout = null; // 计时器
var timeout2 = null; // 计时器2

function onMouseEnterBanner() {
  isStopProgress = true;
}
function onMouseLeaveBanner() {
  isStopProgress = false;
  playProgress(activeIndex);
}

document
  .getElementById("home-banner")
  .addEventListener("mouseenter", onMouseEnterBanner);
document
  .getElementById("home-banner")
  .addEventListener("mouseleave", onMouseLeaveBanner);

function handleClickDot(e, newIndex) {
  if (e.classList.contains("progress-active")) {
    return;
  } else {
    e.classList.add("progress-active");
    activeIndex = newIndex;
    resetInActiveProgress();
    isStopProgress = false;
    play();
  }
}

function getProgressId(index) {
  return `progress-circle-${index}`;
}

function getBannerId(index) {
  return `banner-${index}`;
}

function resetInActiveProgress() {
  for (let i = 0; i < bannerLength; i++) {
    if (i !== activeIndex) {
      var element = document.getElementById(getProgressId(i));
      if (element) {
        element.style.strokeDashoffset = 126.92;
        element.parentNode.parentNode.classList.remove("progress-active");
      }
    }
  }
}

function playProgress(index) {
  // 重置其他小圆点
  resetInActiveProgress();
  // 播放当前小圆点
  var element = document.getElementById(getProgressId(index));
  if (element) {
    element.parentNode.parentNode.classList.add("progress-active");
    if (!element.style.strokeDashoffset) {
      element.style.strokeDashoffset = 126.92;
    }
    var animate = function () {
      element.style.strokeDashoffset =
        element.style.strokeDashoffset - animateRate;

      if (index !== activeIndex) {
        return;
      }

      if (isStopProgress) {
        return;
      }
      if (element.style.strokeDashoffset <= 0) {
        element.style.strokeDashoffset = element.style.strokeDasharray;
        element.parentNode.parentNode.classList.remove("progress-active");
        playNext();
      } else {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }
}

function playNext() {
  activeIndex = (activeIndex + 1) % 3;
  play();
}

function play() {
  // 图片懒加载
  loadImage();

  if (timeout) {
    clearTimeout(timeout);
  }
  handleBannerFade();
  timeout = setTimeout(function () {
    playProgress(activeIndex);
  }, 600);
}

function loadImage() {
  var id = `banner-img-${activeIndex}`;
  var imgEle = document.getElementById(id);
  if (!imgEle) {
    return;
  }

  var src = imgEle.getAttribute("data-src");
  console.log(src);
  if (!src) {
    return;
  }

  imgEle.src = src;
  imgEle.onload = function () {
    imgEle.removeAttribute("data-src");
  };
}

function handleBannerFade() {
  for (let i = 0; i < bannerLength; i++) {
    if (i !== activeIndex) {
      const ele = document.getElementById(getBannerId(i));
      bannerFadeOut(ele);
    }
  }

  if (timeout2) {
    clearTimeout(timeout2);
  }
  timeout2 = setTimeout(function () {
    var ele = document.getElementById(getBannerId(activeIndex));
    bannerFadeIn(ele);
  }, 1000);
}

function bannerFadeOut(ele) {
  if (!ele) {
    return;
  }
  if (ele.classList.contains("fade-in")) {
    ele.classList.remove("fade-in");
    ele.classList.add("fade-out");
  }
}

function bannerFadeIn(ele) {
  if (!ele) {
    return;
  }
  ele.classList.remove("fade-out");
  ele.classList.add("fade-in");
}

playProgress(activeIndex);
