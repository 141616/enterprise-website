var newsApi =
  "https://www.fastmock.site/mock/9c9cc0b93e4842bfe955a940d4bb0322/api/news";

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
          const newsItem = document.createElement("div");
          newsItem.className = "news-item flex-1 w-full px-2 lg:px-3 xl:px-4";

          const newImage = document.createElement("img");
          newImage.className = "news-image";
          newImage.src = item.image;
          newImage.alt = item.title;
          newsItem.appendChild(newImage);

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
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

fetchNews();
