const textFadeInIds = ["service_scope", "service_scope_desc"];

function handleTextIntersection(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // 当目标元素进入视口时执行的 slide-in-left
      entry.target.classList.add("slide-in-left");
    }
  });
}

function handleImgIntersection(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // 当目标元素进入视口时执行的 slide-in
      entry.target.setAttribute("data-into-view", "true");

      const isLoad = entry.target.getAttribute("data-load") === "true";
      if (isLoad) {
        entry.target.classList.add("fade-in");
      }
    }
  });
}

function initTextFadeIn() {
  for (let i = 0; i < textFadeInIds.length; i++) {
    const id = textFadeInIds[i];
    const element = document.getElementById(id);
    if (element) {
      const observer = new IntersectionObserver(handleTextIntersection);
      observer.observe(element);
    }
  }
}

function initImgFadeIn() {
  const imageList = document.querySelectorAll(".service-img");
  for (let i = 0; i < imageList.length; i++) {
    const observer = new IntersectionObserver(handleImgIntersection);
    observer.observe(imageList[i]);
  }
}

initTextFadeIn();
initImgFadeIn();
