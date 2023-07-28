var newsApi =
  "https://www.fastmock.site/mock/9c9cc0b93e4842bfe955a940d4bb0322/api/news";

var total = 0;
var totalPage = 0;
var currentPage = 1;
var pageSize = 8;

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

// 初始化分页数据
function initPageInfoFromSearchParams() {
  var search = new URLSearchParams(window.location.search);
  currentPage = +(search.get("page") || 1);
  pageSize = +(search.get("pageSize") || 8);

  // update select selected option
  const pageSizeSelect = document.getElementById("page-size-select");
  pageSizeSelect.value = pageSize;
}

// 发送 API 请求，获取新闻数据
function fetchNews() {
  fetch(`${newsApi}?page=${currentPage}&pageSize=${pageSize}`)
    .then((response) => response.json())
    .then((res) => {
      // 遍历新闻数据，创建新闻列表项
      var data = res.data;
      total = (res && res.links && res.links.total) || 0;
      totalPage = Math.ceil(total / pageSize);
      if (Array.isArray(data) && data.length > 0) {
        renderNewsList(data);
        generatePageButtons();
      } else {
        renderEmptyData();
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function hideLoading() {
  const loadingEle = document.getElementById("news-loading");
  if (loadingEle) {
    loadingEle.classList.add("hidden");
  }
}

function renderEmptyData() {
  hideLoading();
  const container = document.querySelector(".news-container");
  if (container) {
    container.innerHTML = `
      <div class="col-span-2 md:col-span-4 flex flex-col items-center justify-center">
        <h1 class="text-base text-gray-900">
          找不到数据
        </h1>
      </div>
    `;
  }
}
function renderNewsList(newsList) {
  hideLoading();

  const container = document.querySelector(".news-container");
  newsList.forEach((item) => {
    const newsItem = document.createElement("a");
    newsItem.className = "news-item block flex-1 w-full px-2 lg:px-3 xl:px-4";
    newsItem.href = getNewsDetailPath(item.id);
    newsItem.target = "_blank";

    // 图片：大图和预览图
    const newsImageContainer = document.createElement("div");
    newsImageContainer.style.overflow = "hidden";
    newsImageContainer.classList.add("relative");
    // 预览图
    const newsPreview = document.createElement("img");
    newsPreview.className = "news-preview";
    newsPreview.style.filter = "blur(10px)";
    newsPreview.src = item.preview;
    newsPreview.alt = item.title;
    newsPreview.onload = function () {
      handleNewsImageLoad(newsItem);
    };
    newsImageContainer.appendChild(newsPreview);
    // 大图
    const newsImage = document.createElement("img");
    newsImage.className =
      "news-image opacity-0 absolute top-0 left-0 w-full h-full";
    newsImage.src = item.img;
    newsImage.alt = item.title;
    newsImage.onload = function () {
      // handleNewsImageLoad(newsItem);
      newsImage.classList.remove("opacity-0");
    };
    newsImageContainer.appendChild(newsImage);
    newsItem.appendChild(newsImageContainer);

    // 标题
    const newsTitle = document.createElement("div");
    newsTitle.className =
      "news-title with-2-col text-black text-xl font-semibold mt-6 md:mt-9";
    newsTitle.textContent = item.title;
    newsItem.appendChild(newsTitle);

    // 详情
    const newsContent = document.createElement("div");
    newsContent.className =
      "news-content with-4-col text-black text-sm font-normal mt-6";
    newsContent.textContent = item.desc;
    newsItem.appendChild(newsContent);

    container.appendChild(newsItem);

    // 添加进入视窗监听
    const observer = new IntersectionObserver(handleNewsIntersection);
    observer.observe(newsItem);
  });
}
initPageInfoFromSearchParams();
fetchNews();

function generatePageButtons() {
  const paginationContainer = document.getElementById(
    "news-pagination-contianer"
  );
  if (paginationContainer) {
    paginationContainer.classList.remove("hidden");
  }

  const pageButtons = document.getElementById("page-buttons");
  pageButtons.innerHTML = "";

  const visiblePages = Math.min(totalPage, 5);

  let startPage = currentPage - Math.floor(visiblePages / 2);
  let endPage = startPage + visiblePages - 1;

  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(startPage + visiblePages - 1, totalPage);
  }

  if (endPage > totalPage) {
    endPage = totalPage;
    startPage = Math.max(endPage - visiblePages + 1, 1);
  }

  if (startPage > 1) {
    const firstPageBtn = document.createElement("li");
    firstPageBtn.textContent = "1";
    firstPageBtn.addEventListener("click", () => goToPage(1));
    firstPageBtn.classList.add("pagination-button");
    pageButtons.appendChild(firstPageBtn);

    if (startPage > 2) {
      const ellipsisStart = document.createElement("li");
      ellipsisStart.textContent = "...";
      ellipsisStart.addEventListener("click", () => goToPage(startPage - 1));
      ellipsisStart.classList.add("pagination-button");
      ellipsisStart.classList.add("pb-2");
      pageButtons.appendChild(ellipsisStart);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    const button = document.createElement("li");
    button.textContent = i;
    if (i === currentPage) {
      button.classList.add("pagination-button-active");
    } else {
      button.addEventListener("click", () => goToPage(i));
    }
    button.classList.add("pagination-button");
    pageButtons.appendChild(button);
  }

  if (endPage < totalPage) {
    if (endPage < totalPage - 1) {
      const ellipsisEnd = document.createElement("li");
      ellipsisEnd.textContent = "...";
      ellipsisEnd.addEventListener("click", () => goToPage(endPage + 1));
      ellipsisEnd.classList.add("pagination-button");
      ellipsisEnd.classList.add("pb-2");
      pageButtons.appendChild(ellipsisEnd);
    }

    const lastPageBtn = document.createElement("li");
    lastPageBtn.textContent = totalPage;
    lastPageBtn.addEventListener("click", () => goToPage(totalPage));
    lastPageBtn.classList.add("pagination-button");
    pageButtons.appendChild(lastPageBtn);
  }
}

function goToPage(page) {
  if (page >= 1 && page <= totalPage) {
    currentPage = page;
    generatePageButtons();
    window.location.href = getNewsPathByPageSize(currentPage, pageSize);
    // "/news?page=" + currentPage + "&pageSize=" + pageSize;
    // 在这里你可以添加更新数据的逻辑
  }
}

function prevPage() {
  goToPage(currentPage - 1);
}

function nextPage() {
  goToPage(currentPage + 1);
}

function jumpToPage() {
  const input = document.getElementById("jump-input");
  const page = parseInt(input.value, 10);
  input.value = "";
  goToPage(page);
}

function changePageSize() {
  const pageSizeSelect = document.getElementById("page-size-select");
  const newPageSize = parseInt(pageSizeSelect.value, 10);
  pageSize = newPageSize;
  window.location.href = getNewsPathByPageSize(currentPage, pageSize);
  // 在这里你可以添加每页显示条数改变后的逻辑，比如重新加载数据等
}

// 绑定事件
document.getElementById("prev-btn").addEventListener("click", prevPage);
document.getElementById("next-btn").addEventListener("click", nextPage);
document.getElementById("jump-btn").addEventListener("click", jumpToPage);
document
  .getElementById("page-size-select")
  .addEventListener("change", changePageSize);
