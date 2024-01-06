"use strict";

const form = document.querySelector("form");
const submitBtn = document.querySelector(".submit");
const errorMsg = document.querySelector(".error");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let getForm = Object.fromEntries(new FormData(e.target));
  let { username, password } = getForm;
  errorMsg.innerText = "";
  setTimeout(() => {
    if (username === "shellie_banking" && password === "@bANkInG%$") {
      window.location = "/dashboard";
      sessionStorage.setItem("isLoggedIn", true);
    } else {
      errorMsg.innerText =
        "Your inputed username and password is incorrect. please double check and try again";
    }
  }, 1500);
});
