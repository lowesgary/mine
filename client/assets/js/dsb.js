"use strict";

import details from "./details.js";

// Go Back if not logged in
window.onload = () => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    window.location = "/";
  }
};

// Menu and menu controls
let menuBtn = document.getElementById("menuButton");
const menu = document.querySelector(".menu");
const closeBtn = document.querySelector(".close");
menuBtn.onclick = () => {
  menu.classList.add("open-menu");
  menu.classList.remove("close-menu");
};

closeBtn.onclick = () => {
  menu.classList.add("close-menu");
  menu.classList.remove("open-menu");
};

// Accounts
let allAccountIDs = [];
let allUserAccountsTransactions = [];
let trxOnly = [];
let allTransactionsByEachAccount = [];
let sumOfallTransactionsByEachAccount = [];
let accContainerDOM = document.querySelector(".acc-container");

for (let i in details) {
  let account = details[i];
  allUserAccountsTransactions.push(account.transactions);
  trxOnly.push(Object.values(account.transactions));
  allAccountIDs.push(account.accountID);
}

for (let k of trxOnly) {
  let m = [];
  k.map((r) => r.forEach((l) => m.push(Number(l.amount))));
  allTransactionsByEachAccount.push(m);
}

for (let t of allTransactionsByEachAccount) {
  sumOfallTransactionsByEachAccount.push(t.reduce((a, b) => a + b));
}

function formatNumberWithCommas(inputNumber) {
  inputNumber < 0 ? (inputNumber = -inputNumber) : inputNumber;
  return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

allAccountIDs.forEach((a, i) => {
  let amount = sumOfallTransactionsByEachAccount[i].toString();
  let accountName = details[i].accountName;
  let formattedNumber = formatNumberWithCommas(amount);

  accContainerDOM.innerHTML += `
    <div id=${i} class="acc">
        <div class="acc-head">
          <h1>${accountName}</h1>
          <div
            class="numbs">
            <p class="cm title">Current</p>
            <div class="dots"></div>
            <p class="am current">$${formattedNumber}</p>
          </div>
          <div class="numbs">
            <p class="cm title">Available</p>
            <div class="dots"></div>
            <p class="am available">$${formattedNumber}</p>
          </div>

        </div>
        <div class="history">
          <h1 class="hd">Account history</h1>
          <div class='hcon'>
            <div class="hs"></div>
          </div>
        </div>
      </div>
      `;
});

let accounts = [...document.querySelectorAll(".acc")];
let allHistoryDOM = [...document.querySelectorAll(".hs")];

function clearAllHistoryDOM() {
  allHistoryDOM.forEach((h) => (h.innerHTML = ""));
}

accounts.forEach((account) => {
  account.onclick = ({ target }) => {
    console.log(target);
    let getID = Number(target.id);
    let historyDOM = target.children[1].children[1].children[0];

    if (target.classList.value.includes("open")) {
      target.classList.remove("open");
      return;
    }

    accounts.forEach((f) => f.classList.remove("open"));
    target.classList.add("open");
    openAccount(getID, historyDOM);
  };
});

// Accounts

function generateTransactionID() {
  return parseInt(Math.random(1) * 9999999);
}

function openAccount(x, historyDOM) {
  const account = details[x].transactions;
  const transStatusDate = Object.keys(account);
  const transDetails = Object.values(account);

  clearAllHistoryDOM();

  transStatusDate.forEach((d) => {
    historyDOM.innerHTML += `
      <div class="t-sec">
          <h2 class="date">${d}</h2>
          <div class="t-group"></div>
      </div>
    `;
  });

  transDetails.forEach((d, i) => {
    let allTransactionGroups = [...document.querySelectorAll(".t-group")];
    if (d.length === 0) {
      allTransactionGroups[
        i
      ].innerHTML += `<p class='pending'>No pending transactions</p>`;
    }
    d.forEach((D) => {
      var formattedNumber = formatNumberWithCommas(D.amount);
      allTransactionGroups[i].innerHTML += `
        <div class="transaction">
          <p class="memo">${
            D.title
          } <span class='transid'>TrxID : bgr_inv${generateTransactionID()}</span></p>
          <h1 class=${D.type === "credit" ? "credit" : "debit"} >
          ${D.type === "debit" ? "-" : "+"}$${formattedNumber}</h1>
        </div>`;
    });
  });
}

// Notice

setTimeout(() => (notice.style.display = "flex"), 30000);

const notice = document.querySelector(".stop");
const closeNoticeBtn = document.querySelector(".close_notice");
closeNoticeBtn.onclick = () => (notice.style.display = "none");

// const allItemsAmount = details.
