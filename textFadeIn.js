const textFadeInIds = ["service_scope", "service_scope_desc"];
const textFadeInRightIds = ["team_section_title", "news_section_title"];

function handleTextFadeInLeftIntersection(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // 当目标元素进入视口时执行的 slide-in-left
      entry.target.classList.add("slide-in-left");
    }
  });
}

function handleTextFadeInRightIntersection(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // 当目标元素进入视口时执行的 slide-in-right
      entry.target.classList.add("slide-in-right");
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

function handleTeamCardIntersection(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // 当目标元素进入视口时执行的 slide-in
      entry.target.setAttribute("data-into-view", "true");

      const isLoad = entry.target.getAttribute("data-load") === "true";
      if (isLoad) {
        entry.target.parentNode.classList.add("fade-in");
      }
    }
  });
}

function initTextFadeIn() {
  for (let i = 0; i < textFadeInIds.length; i++) {
    const id = textFadeInIds[i];
    const element = document.getElementById(id);
    if (element) {
      const observer = new IntersectionObserver(
        handleTextFadeInLeftIntersection
      );
      observer.observe(element);
    }
  }
}

function initTextFadeInRight() {
  for (let i = 0; i < textFadeInRightIds.length; i++) {
    const id = textFadeInRightIds[i];
    const element = document.getElementById(id);
    if (element) {
      const observer = new IntersectionObserver(
        handleTextFadeInRightIntersection
      );
      observer.observe(element);
    }
  }
}

function initImgFadeIn() {
  const imageList = document.querySelectorAll(".fade-in-img");
  for (let i = 0; i < imageList.length; i++) {
    const observer = new IntersectionObserver(handleImgIntersection);
    observer.observe(imageList[i]);
  }
}

function initTeamImgCardFadeIn() {
  const eleList = document.querySelectorAll(".fade-in-card");
  for (let i = 0; i < eleList.length; i++) {
    const observer = new IntersectionObserver(handleTeamCardIntersection);
    observer.observe(eleList[i]);
  }
}

initTextFadeIn();
initTextFadeInRight();
initTeamImgCardFadeIn();
initImgFadeIn();
