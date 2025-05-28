document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('budgetForm');
  const descriptionInput = document.getElementById('description');
  const amountInput = document.getElementById('amount');
  const typeSelect = document.getElementById('type');

  const totalIncomeEl = document.getElementById('totalIncome');
  const totalExpensesEl = document.getElementById('totalExpenses');
  const balanceEl = document.getElementById('balance');
  const entryTable = document.getElementById('entryTable');

  let entries = JSON.parse(localStorage.getItem('budgetEntries')) || [];

  function updateTotals() {
    let income = 0;
    let expenses = 0;

    entries.forEach(entry => {
      if (entry.type === 'income') {
        income += entry.amount;
      } else {
        expenses += entry.amount;
      }
    });

    const balance = income - expenses;
    totalIncomeEl.textContent = income.toFixed(2);
    totalExpensesEl.textContent = expenses.toFixed(2);
    balanceEl.textContent = balance.toFixed(2);
  }

  function renderEntries() {
    entryTable.innerHTML = '';
    entries.forEach((entry, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${entry.description}</td>
        <td>R ${entry.amount.toFixed(2)}</td>
        <td>${entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}</td>
        <td><button class="delete-btn" data-index="${index}">Delete</button></td>
      `;
      entryTable.appendChild(row);
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        entries.splice(index, 1);
        saveAndRender();
      });
    });
  }

  function saveAndRender() {
    localStorage.setItem('budgetEntries', JSON.stringify(entries));
    renderEntries();
    updateTotals();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;

    if (!description || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid description and positive amount.');
      return;
    }

    entries.push({ description, amount, type });
    saveAndRender();
    form.reset();
  });

  // Load data on page load
  saveAndRender();
});

  
  
  