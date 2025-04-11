navToggleBtn = document.querySelector(".nav-toggle-btn");
collapsedItems = document.getElementById("collapsedItems");
openLogoutBtn = document.getElementById("openLogout");

// showCollapse();
console.log(collapsedItems);

showToggleBtn();

navToggleBtn.addEventListener("click", showCollapse);
window.addEventListener("resize", showToggleBtn);

console.log(navToggleBtn);

function showCollapse() {
  if (collapsedItems.classList.contains("open")) {
    collapsedItems.classList.remove("open");
  } else {
    collapsedItems.classList.add("open");
  }
}

function showToggleBtn() {
  if (window.innerWidth < 992) {
    navToggleBtn.classList.remove("d-none");
    openLogoutBtn.classList.add("d-none");
  } else {
    navToggleBtn.classList.add("d-none");
    openLogoutBtn.classList.remove("d-none");
    collapsedItems.classList.remove("open");
  }
}
