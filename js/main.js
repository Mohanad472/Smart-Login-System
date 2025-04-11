var navbarCollapse = document.getElementById("navbarSupportedContent");
var searchBtn = document.getElementById("search");

navbarCollapse.addEventListener("shown.bs.collapse", function () {
  console.log("hh");
  searchBtn.classList.add("w-100");
});
navbarCollapse.addEventListener("hidden.bs.collapse", function () {
  console.log("dd");
  searchBtn.classList.remove("w-100");
});
