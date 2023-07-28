var newsDetailApi =
  "https://www.fastmock.site/mock/9c9cc0b93e4842bfe955a940d4bb0322/api/news";

function getNewsIdFromQueryString() {
  var search = new URLSearchParams(window.location.search);
  return search.get("id");
}

// 发送 API 请求，获取新闻数据
function fetchNewsDetail() {
  const container = document.getElementById("news-detail");
  const id = getNewsIdFromQueryString();
  if (!id) {
    return;
  }

  fetch(`${newsDetailApi}/${id}`)
    .then((response) => response.json())
    .then((res) => {
      if (res && res.data) {
        // 清空loading
        container.innerHTML = "";

        const news = res.data;

        // 插入新闻图片
        const newImage = document.createElement("img");
        newImage.className = "news-image";
        newImage.src = news.image;
        newImage.alt = news.title;
        var width = container.clientWidth;
        var height = (width * 660) / 1560;
        newImage.style.width = `${width}px`;
        newImage.style.height = `${height}px`;
        container.appendChild(newImage);

        window.addEventListener("resize", function () {
          newImage.style.width = `auto`;
        });

        // 插入新闻标题
        const newsTitle = document.createElement("div");
        newsTitle.className =
          "news-title text-black text-center text-xl font-semibold mt-6 md:mt-9";
        newsTitle.textContent = news.title;
        container.appendChild(newsTitle);

        // 插入新闻事件、来源
        const newsTimes = document.createElement("div");
        newsTimes.className =
          "news-content text-black text-center text-sm font-normal mt-6";
        newsTimes.textContent = `${news.createdAt} 来源：${news.source}`;
        container.appendChild(newsTimes);

        // 插入新闻正文
        const newsContent = document.createElement("div");
        newsContent.className =
          "news-content text-black text-sm font-normal mt-6";
        newsContent.textContent = news.desc;
        newsContent.style.textIndent = "2em";
        container.appendChild(newsContent);

        // 插入新闻记者、编辑
        const newsAuthor = document.createElement("div");
        newsAuthor.className =
          "news-content text-black text-sm font-normal mt-6";
        newsAuthor.textContent = `本报记者 ${news.author} 【编辑：${news.editor}】`;
        container.appendChild(newsAuthor);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

fetchNewsDetail();
