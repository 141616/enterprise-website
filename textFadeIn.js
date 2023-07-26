const textFadeInIds = ["service_scope", "service_scope_desc"];

function handleIntersection(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // 当目标元素进入视口时执行的操作
      entry.target.classList.add("slide-in-left");
    }
  });
}

function initTextFadeIn() {
  for (let i = 0; i < textFadeInIds.length; i++) {
    const id = textFadeInIds[i];
    const element = document.getElementById(id);
    if (element) {
      const observer = new IntersectionObserver(handleIntersection);
      observer.observe(element);
    }
  }
}

initTextFadeIn();
