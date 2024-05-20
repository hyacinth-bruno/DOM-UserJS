const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double-money');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortRichestBtn = document.getElementById('sort-richest');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api/');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    balance: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);
}

function addData(obj) {
  data.push(obj);
  updateDOM();
}

function doubleMoney() {
  data = data.map(user => {
    return { ...user, balance: user.balance * 2 };
  });
  updateDOM();
}

function showMillionaires() {
  data = data.filter(user => user.balance >= 1000000);
  updateDOM();
}

function sortByRichest() {
  data.sort((a, b) => b.balance - a.balance);
  updateDOM();
}

function calculateWealth() {
  const wealth = data.reduce((acc, user) => acc + user.balance, 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>$${formatMoney(wealth)}</strong></h3>`;
  main.appendChild(wealthEl);
}

function updateDOM(providedData = data) {
  main.innerHTML = '<h2><strong>Person</strong> Balance($)</h2>';

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('user');
    element.innerHTML = `<strong>${item.name}</strong> $${formatMoney(item.balance)}`;
    main.appendChild(element);
  });
}

function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

addUserBtn.addEventListener('click', getRandomUser);
doubleMoneyBtn.addEventListener('click', doubleMoney);
showMillionairesBtn.addEventListener('click', showMillionaires);
sortRichestBtn.addEventListener('click', sortByRichest);
calculateWealthBtn.addEventListener('click', calculateWealth);

