function handleClickMenuButton() {
  openDrawer();
}
function handleClickMask() {
  closeDrawer();
}

function getSrcollBarWidth() {
  return window.innerWidth - document.body.clientWidth;
}

function openDrawer() {
  // hidden之后滚动条消失，页面宽度变化会导致布局变化，这里添加一个padding保证页面布局不变
  const scrollBarWidth = getSrcollBarWidth();
  if (scrollBarWidth > 0) {
    document.body.style.paddingRight = `${scrollBarWidth}px`;
  }
  // 阻止滚动
  document.body.style.overflow = "hidden";

  const drawerContentEle = document.getElementById("drawer-content");
  drawerContentEle.classList.add("slide-in-right-3");
  const drawerEle = document.getElementById("drawer");
  drawerEle.classList.remove("hidden");
}

function closeDrawer() {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
  const drawerEle = document.getElementById("drawer");
  drawerEle.classList.add("hidden");
  const drawerContentEle = document.getElementById("drawer-content");
  drawerContentEle.classList.remove("slide-in-right-3");
}
