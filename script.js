document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseName = document.getElementById('expense-name');
    const expenseAmount = document.getElementById('expense-amount');
    const expenseList = document.getElementById('expense-list');
    const expensesListDisplay = document.getElementById('expenses');
    const totalAmountDisplay = document.getElementById('total-amount');

    // Load saved expenses from localStorage or initialize an empty array
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let totalAmount = calculateTotal();


    // Render the saved expenses and update the total amount
    renderExpenses();
    updateTotal();

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = expenseName.value.trim();
        const amount = parseFloat(expenseAmount.value.trim());

        if (name !== "" && !isNaN(amount) && amount > 0) {
            const newExpense = {
                id: Date.now(),
                name: name,
                amount: amount
            };
            expenses.push(newExpense);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses();
            updateTotal();
        }

        expenseName.value = "";
        expenseAmount.value = "";
    });

    function renderExpenses() {
        expenseList.innerHTML = "";
        if(expenses.length > 0){
         expensesListDisplay.classList.remove('hidden')
        }else{
            expensesListDisplay.classList.add('hidden')
        }

        expenses.forEach((expense) => {
            const li = document.createElement('li');
            li.classList.add('list-item')
            li.innerHTML = `
                <span>${expense.name} - Rs.${expense.amount}</span>
                <button data-id=${expense.id}>Delete</button>
            `;
            expenseList.appendChild(li);
        });
    }

    function calculateTotal() {
        return expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }

    function updateTotal() {
        totalAmount = calculateTotal();
        totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }

    expenseList.addEventListener('click', (e) => {
        if (e.target.tagName === "BUTTON") {
            const expenseId = parseInt(e.target.getAttribute('data-id'));
            expenses = expenses.filter((expense) => expense.id !== expenseId);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses();
            updateTotal();
        }
    });
});
