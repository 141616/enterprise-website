var newsApi =
  "https://www.fastmock.site/mock/9c9cc0b93e4842bfe955a940d4bb0322/api/news";

function handleNewsImageLoad(newsContainer) {
  if (!newsContainer) {
    return;
  }
  newsContainer.setAttribute("data-load", "true");
  const isIntoView = newsContainer.getAttribute("data-into-view");
  if (isIntoView === "true") {
    newsContainer.classList.add("fade-in");
  }
}

function handleNewsIntersection(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.setAttribute("data-into-view", "true");

      const isLoad = entry.target.getAttribute("data-load") === "true";
      if (isLoad) {
        entry.target.classList.add("fade-in");
      }
    }
  });
}

function fetchNews() {
  // 发送 API 请求，获取新闻数据
  var page = 1;
  var pageSize = 4;
  const container = document.querySelector(".news-container");

  fetch(`${newsApi}?page=${page}&pageSize=${pageSize}`)
    .then((response) => response.json())
    .then((data) => {
      // 遍历新闻数据，创建新闻列表项
      var data = data.data;
      if (Array.isArray(data) && data.length > 0) {
        container.innerHTML = "";
        data.forEach((item) => {
          const newsItem = document.createElement("a");
          newsItem.className =
            "news-item block flex-1 w-full px-2 lg:px-3 xl:px-4";
          newsItem.href = getNewsDetailPath(item.id);
          newsItem.target = "_blank";

          const newsImageContainer = document.createElement("div");
          newsImageContainer.style.overflow = "hidden";
          const newImage = document.createElement("img");
          newImage.className = "news-image";
          newImage.src = item.img;
          newImage.alt = item.title;
          newImage.width = 350;
          newImage.height = 500;
          newImage.onload = function () {
            handleNewsImageLoad(newsItem);
          };
          newsImageContainer.appendChild(newImage);
          newsItem.appendChild(newsImageContainer);

          const newsTitle = document.createElement("div");
          newsTitle.className =
            "news-title with-2-col text-white text-xl font-semibold mt-6 md:mt-9";
          newsTitle.textContent = item.title;
          newsItem.appendChild(newsTitle);

          const newsContent = document.createElement("div");
          newsContent.className =
            "news-content with-4-col text-white text-sm font-normal mt-6";
          newsContent.textContent = item.desc;
          newsItem.appendChild(newsContent);

          container.appendChild(newsItem);

          // 添加进入视窗监听
          const observer = new IntersectionObserver(handleNewsIntersection);
          observer.observe(newsItem);
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

fetchNews();
