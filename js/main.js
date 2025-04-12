navToggleBtn = document.querySelector(".nav-toggle-btn");
navBar = document.getElementsByTagName("nav")[0];
collapsedItems = document.getElementById("collapsedItems");
openLogoutBtn = document.getElementById("openLogout");
signUpLink = document.getElementById("signUpLink");
nameInputDisplay = document.getElementById("nameInputDisplay");
signUpText = document.getElementById("signUpText");
signInText = document.getElementById("signInText");
loginMainBtn = document.getElementById("loginMainBtn");
signUpMainBtn = document.getElementById("signUpMainBtn");
inputSystem = document.getElementById("inputSystem");
nameInput = document.getElementById("nameInput");
emailInput = document.getElementById("emailInput");
passwordInput = document.getElementById("passwordInput");
incorrectText = document.getElementById("incorrectText");
emailExistsText = document.getElementById("emailExistsText");
successText = document.getElementById("successText");
header = document.getElementsByTagName("h1")[0];

var list = [];
if (JSON.parse(window.localStorage.getItem("list")) != null) {
  list = JSON.parse(window.localStorage.getItem("list"));
}

var currentIndex = 0;

showToggleBtn();

navToggleBtn.addEventListener("click", showCollapse);
window.addEventListener("resize", showToggleBtn);
signUpLink.addEventListener("click", signUpWindowShow);
signInLink.addEventListener("click", signInWindowShow);
loginMainBtn.addEventListener("click", login);
signUpMainBtn.addEventListener("click", add);
openLogoutBtn.addEventListener("click", signInWindowShow);

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

function signUpWindowShow() {
  clearInput();
  inputSystem.classList.remove("d-none");
  nameInputDisplay.classList.remove("d-none");
  signUpMainBtn.classList.remove("d-none");
  signUpText.classList.add("d-none");
  signInText.classList.remove("d-none");
  loginMainBtn.classList.add("d-none");
  navBar.classList.add("d-none");
}

function signInWindowShow() {
  clearInput();
  header.innerHTML = "Smart Login System";
  inputSystem.classList.remove("d-none");
  nameInputDisplay.classList.add("d-none");
  signUpMainBtn.classList.add("d-none");
  signUpText.classList.remove("d-none");
  signInText.classList.add("d-none");
  loginMainBtn.classList.remove("d-none");
  navBar.classList.add("d-none");
}

function welcomeWindowShow(currentIndex) {
  inputSystem.classList.add("d-none");
  navBar.classList.remove("d-none");
  header.innerHTML = "Welcome " + list[currentIndex].name;
}

function add() {
  inputObject = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };
  if (emailValidate(inputObject.email)) {
    list.push(inputObject);
    window.localStorage.setItem("list", JSON.stringify(list));
    successText.classList.remove("d-none");
    emailExistsText.classList.add("d-none");
  }
}

function clearInput() {
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  emailExistsText.classList.add("d-none");
  incorrectText.classList.add("d-none");
  successText.classList.add("d-none");
}

function login() {
  for (var i = 0; i < list.length; i++) {
    if (
      emailInput.value == list[i].email &&
      passwordInput.value == list[i].password
    ) {
      console.log("list: " + list[i]);
      console.log(
        "input: " + emailInput.value + "pass: " + passwordInput.value
      );
      welcomeWindowShow(i);
      break;
    }
  }
  incorrectText.classList.remove("d-none");
}

function emailValidate(email) {
  for (var i = 0; i < list.length; i++) {
    if (email == list[i].email) {
      emailExistsText.classList.remove("d-none");
      return 0;
    }
  }
  return 1;
}
