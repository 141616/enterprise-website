// 假设总页数为 totalPage，当前页码为 currentPage
const totalPage = 10;
let currentPage = 1;

function generatePageButtons() {
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

function changePerPage() {
  const pageSizeSelect = document.getElementById("page-size-select");
  const newPageSize = parseInt(pageSizeSelect.value, 10);
  console.log(newPageSize);
  // 在这里你可以添加每页显示条数改变后的逻辑，比如重新加载数据等
}

// 初始化分页器
generatePageButtons();

// 绑定事件
document.getElementById("prev-btn").addEventListener("click", prevPage);
document.getElementById("next-btn").addEventListener("click", nextPage);
document.getElementById("jump-btn").addEventListener("click", jumpToPage);
document
  .getElementById("page-size-select")
  .addEventListener("change", changePerPage);
