function handleClickMenuButton() {
  openDrawer();
}
function handleClickMask() {
  closeDrawer();
}

function openDrawer() {
  // 阻止滚动
  document.body.style.overflow = "hidden";
  // hidden之后滚动条消失，页面宽度变化会导致布局变化，这里添加一个padding保证页面布局不变
  // document.body.style.paddingRight = "15px";
  const drawerContentEle = document.getElementById("drawer-content");
  drawerContentEle.classList.add("slide-in-right");
  const drawerEle = document.getElementById("drawer");
  drawerEle.classList.remove("hidden");
}

function closeDrawer() {
  document.body.style.overflow = "";
  // document.body.style.paddingRight = "";
  const drawerEle = document.getElementById("drawer");
  drawerEle.classList.add("hidden");
  const drawerContentEle = document.getElementById("drawer-content");
  drawerContentEle.classList.remove("slide-in-right");
}
