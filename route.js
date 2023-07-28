var isGithub = window.location.host.includes("github");
var projectName = "enterprise-website";

function getNewsDetailPath(newsId) {
  if (isGithub) {
    return `/${projectName}/newsDetail?id=${newsId}`;
  } else {
    return `/newsDetail?id=${newsId}`;
  }
}

function replacePathInGithubPages() {
  var aList = document.querySelectorAll("a");
  for (var i = 0; i < aList.length; i++) {
    var a = aList[i];
    var path = a.getAttribute("data-path");
    if (path) {
      if (path === "home") {
        a.setAttribute("href", `/${projectName}`);
      } else {
        a.setAttribute("href", `/${projectName}/${path}`);
      }
    }
  }
}

if (isGithub) {
  replacePathInGithubPages();
}
