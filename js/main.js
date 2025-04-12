navToggleBtn = document.querySelector(".nav-toggle-btn");
navBar = document.getElementsByTagName("nav")[0];
collapsedItems = document.getElementById("collapsedItems");
openLogoutBtn = document.getElementById("openLogout");
signUpLink = document.getElementById("signUpLink");
forgotPasswordLink = document.getElementById("forgotPasswordLink");
ReturnToLoginLink = document.getElementById("ReturnToLoginLink");
nameInputDisplay = document.getElementById("nameInputDisplay");
signUpText = document.getElementById("signUpText");
signInText = document.getElementById("signInText");
loginMainBtn = document.getElementById("loginMainBtn");
signUpMainBtn = document.getElementById("signUpMainBtn");
inputSystem = document.getElementById("inputSystem");
nameInput = document.getElementById("nameInput");
emailInput = document.getElementById("emailInput");
passwordInput = document.getElementById("passwordInput");
emailAuthenticationInput = document.getElementById("emailAuthenticationInput");
incorrectText = document.getElementById("incorrectText");
emailValidText = document.getElementById("emailValidText");
emailExistsText = document.getElementById("emailExistsText");
authenticationExistsText = document.getElementById("authenticationExistsText");
successText = document.getElementById("successText");
header = document.getElementsByTagName("h1")[0];
pleaseEnterNameText = document.getElementById("pleaseEnterNameText");
pleaseEnterEmailText = document.getElementById("pleaseEnterEmailText");
pleaseEnterPassText = document.getElementById("pleaseEnterPassText");
passwordShowText = document.getElementById("passwordShowText");
ReturnToLoginText = document.getElementById("ReturnToLoginText");
showPasswordBtn = document.getElementById("showPasswordBtn");

var list = [];
if (JSON.parse(window.localStorage.getItem("list")) != null) {
  list = JSON.parse(window.localStorage.getItem("list"));
}

var emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;

var currentIndex = 0;

showToggleBtn();

navToggleBtn.addEventListener("click", showCollapse);
window.addEventListener("resize", showToggleBtn);
signUpLink.addEventListener("click", signUpWindowShow);
signInLink.addEventListener("click", signInWindowShow);
loginMainBtn.addEventListener("click", login);
signUpMainBtn.addEventListener("click", add);
openLogoutBtn.addEventListener("click", signInWindowShow);
emailInput.addEventListener("input", function () {
  emailValid("email");
});
emailAuthenticationInput.addEventListener("input", function () {
  emailValid("authentication");
});
forgotPasswordLink.addEventListener("click", forgotPassword);
showPasswordBtn.addEventListener("click", showPassword);
ReturnToLoginLink.addEventListener("click", signInWindowShow);

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
  nameInput.classList.remove("d-none");
  signUpMainBtn.classList.remove("d-none");
  signUpText.classList.add("d-none");
  signInText.classList.remove("d-none");
  loginMainBtn.classList.add("d-none");
  navBar.classList.add("d-none");
  emailAuthenticationInput.classList.remove("d-none");
}

function signInWindowShow() {
  clearInput();
  header.innerHTML = "Smart Login System";
  passwordShowText.classList.add("d-none");
  showPasswordBtn.classList.add("d-none");
  inputSystem.classList.remove("d-none");
  ReturnToLoginText.classList.add("d-none");
  nameInputDisplay.classList.add("d-none");
  passwordInput.classList.remove("d-none");
  emailInput.classList.remove("d-none");
  signUpMainBtn.classList.add("d-none");
  signUpText.classList.remove("d-none");
  signInText.classList.add("d-none");
  loginMainBtn.classList.remove("d-none");
  navBar.classList.add("d-none");
  emailAuthenticationInput.classList.add("d-none");
}

function welcomeWindowShow(currentIndex) {
  inputSystem.classList.add("d-none");
  navBar.classList.remove("d-none");
  header.innerHTML = "Welcome " + list[currentIndex].name;
}

function add() {
  pleaseEnterNameText.classList.add("d-none");
  pleaseEnterPassText.classList.add("d-none");
  pleaseEnterEmailText.classList.add("d-none");
  successText.classList.add("d-none");
  inputObject = {
    name: nameInput.value,
    email: emailInput.value,
    authentication: emailAuthenticationInput.value,
    password: passwordInput.value,
  };

  if (inputObject.name == "") {
    pleaseEnterNameText.classList.remove("d-none");

    return 0;
  } else {
    pleaseEnterNameText.classList.add("d-none");
  }
  if (inputObject.email == "") {
    pleaseEnterEmailText.classList.remove("d-none");
    return 0;
  } else {
    pleaseEnterEmailText.classList.add("d-none");
  }
  if (inputObject.password == "") {
    pleaseEnterPassText.classList.remove("d-none");
    return 0;
  } else {
    pleaseEnterPassText.classList.add("d-none");
  }
  if (!emailValid("email") || !emailValid("authentication")) {
    emailValidText.classList.remove("d-none");
  } else {
    if (
      emailValidate(inputObject.email, "email") &&
      emailValidate(inputObject.authentication, "authentication")
    ) {
      list.push(inputObject);
      window.localStorage.setItem("list", JSON.stringify(list));
      successText.classList.remove("d-none");
      emailExistsText.classList.add("d-none");
      authenticationExistsText.classList.add("d-none");
      emailValidText.classList.add("d-none");
    }
  }
  return 1;
}

function clearInput() {
  nameInput.value = "";
  emailInput.value = "";
  emailAuthenticationInput.value = "";
  passwordInput.value = "";
  emailExistsText.classList.add("d-none");
  authenticationExistsText.classList.add("d-none");
  incorrectText.classList.add("d-none");
  emailAuthenticationInput.classList.remove("is-valid");
  emailAuthenticationInput.classList.remove("is-invalid");
  successText.classList.add("d-none");
  emailInput.classList.remove("is-valid");
  emailInput.classList.remove("is-invalid");
  pleaseEnterNameText.classList.add("d-none");
  pleaseEnterPassText.classList.add("d-none");
  pleaseEnterEmailText.classList.add("d-none");
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

function emailValidate(email, choice) {
  if (choice == "email") {
    for (var i = 0; i < list.length; i++) {
      if (email == list[i].email) {
        emailExistsText.classList.remove("d-none");
        return 0;
      }
    }
  } else if (choice == "authentication") {
    console.log("auuuuu");

    for (var i = 0; i < list.length; i++) {
      if (email == list[i].authentication) {
        authenticationExistsText.classList.remove("d-none");
        return 0;
      }
    }
  }
  return 1;
}

function emailValid(choice) {
  var testMail, testInput;

  if (choice == "email") {
    testMail = emailInput.value;
    testInput = emailInput;
  } else if (choice == "authentication") {
    testMail = emailAuthenticationInput.value;
    testInput = emailAuthenticationInput;
  }

  if (choice == "authentication" && testMail == "") {
    testInput.classList.remove("is-valid");
    return 1;
  } else if (!emailRegex.test(testMail)) {
    testInput.classList.add("is-invalid");
    testInput.classList.remove("is-valid");
    return 0;
  } else {
    testInput.classList.remove("is-invalid");
    testInput.classList.add("is-valid");
    return 1;
  }
}

function forgotPassword() {
  clearInput();
  ReturnToLoginText.classList.remove("d-none");
  signUpText.classList.add("d-none");
  signInText.classList.add("d-none");
  loginMainBtn.classList.add("d-none");
  nameInput.classList.add("d-none");
  emailInput.classList.add("d-none");
  emailAuthenticationInput.classList.remove("d-none");
  emailAuthenticationInput.placeholder = "Enter your authentication email";
  passwordInput.classList.add("d-none");
  showPasswordBtn.classList.remove("d-none");
}

function showPassword() {
  passwordShowText.classList.add("d-none");
  if (emailAuthenticationInput.value == "") {
    pleaseEnterEmailText.classList.remove("d-none");
  } else {
    passwordShowText.classList.remove("d-none");
    pleaseEnterEmailText.classList.add("d-none");
    if (emailValid("authentication")) {
      emailValidText.classList.add("d-none");
      for (var i = 0; i < list.length; i++) {
        if (list[i].authentication == emailAuthenticationInput.value) {
          passwordShowText.innerHTML = "Your password is: " + list[i].password;
          emailValidText.classList.add("d-none");
          return 0;
        }
      }
    } else {
      emailValidText.classList.remove("d-none");
    }
    passwordShowText.innerHTML = "Authentication mail doesn't exist.";
  }
}
