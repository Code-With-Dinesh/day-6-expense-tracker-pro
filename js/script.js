let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");

function updateUI() {
  list.innerHTML = "";

  let income = 0;
  let expense = 0;

  transactions.forEach((t, index) => {
    if (t.type === "income") {
      income += t.amount;
    } else {
      expense += t.amount;
    }

    const li = document.createElement("li");

    li.innerHTML = `
      ${t.text} - ₹${t.amount}
      <button class="delete-btn" onclick="deleteTransaction(${index})">x</button>
    `;

    list.appendChild(li);
  });

  balanceEl.textContent = `₹${income - expense}`;
  incomeEl.textContent = `₹${income}`;
  expenseEl.textContent = `₹${expense}`;

  localStorage.setItem("transactions", JSON.stringify(transactions));
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const text = document.getElementById("text").value;
  const amount = +document.getElementById("amount").value;
  const type = document.getElementById("type").value;

  transactions.push({ text, amount, type });

  form.reset();
  updateUI();
});

function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateUI();
}

updateUI();
