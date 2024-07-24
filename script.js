const registerLink = document.querySelector(".register-link");
const loginLink = document.querySelector(".login-link");
const wrapperLogin = document.querySelector(".wrapper-login");
const wrapperRegister = document.querySelector(".wrapper-register");


registerLink.addEventListener("click", function() {
    wrapperLogin.classList.add("hidden");
    wrapperRegister.classList.remove("hidden");
})

loginLink.addEventListener("click", function() {
    wrapperRegister.classList.add("hidden");
    wrapperLogin.classList.remove("hidden");
})

