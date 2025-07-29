const form = document.getElementById('form-entry');
const descriptionInput = document.getElementById('des');
const amountInput =  document.getElementById('amount');
const typeInput =  document.getElementById('type');
const resetBtn =  document.getElementById('reset-btn');
const entriesList =  document.getElementById('entry-list');
const totalIncomeEl =  document.getElementById('t-income');
const totalExpenseEl =  document.getElementById('t-expense');
const netBalanceEl =  document.getElementById('n-bal');

let entries = JSON.parse(localStorage.getItem('budgetEntries')) || [];

function saveEntries(){
    localStorage.setItem('budgetEntries',JSON.stringify(entries));
}

function renderEntries(filter = 'all') {
    entriesList.innerHTML = '';
    let incomeTotal = 0;
    let expenseTotal = 0;

    entries.filter(entry => filter === 'all' || entry.type === filter)
        .forEach((entry, index) => {
            if (entry.type === 'income') {
                incomeTotal += entry.amount;
            } else {
                expenseTotal += entry.amount;
            }
            const li = document.createElement('li');
            li.innerHTML = `
            <span>${entry.description}-${entry.amount}</span>
            <span>
            <button onclick="editEntry(${index})">Edit</button>
            <button onclick="deleteEntry(${index})">Delete</button>
            </span>
            `;
            entriesList.appendChild(li);
        });
    totalIncomeEl.textContent = incomeTotal;
    totalExpenseEl.textContent = expenseTotal;
    netBalanceEl.textContent = incomeTotal - expenseTotal;
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const desc = descriptionInput.value.trim();
    const amount = +amountInput.value;
    const type = typeInput.value;

    entries.push({description: desc,amount,type});
    saveEntries();
    renderEntries();
    form.reset();
});

resetBtn.addEventListener("click",()=>form.reset());

document.querySelectorAll('input[name="filter"]')
.forEach(radio=>{
    radio.addEventListener("change",(e)=>renderEntries(e.target.value));
});

function editEntry(index){
    const entry = entries[index];
    descriptionInput.value = entry.description;
    amountInput.value = entry.amount;
    typeInput.value = entry.type;
    entries.splice(index,1);
    saveEntries();
    renderEntries();
}

function deleteEntry(index){
    entries.splice(index,1);
    saveEntries();
    renderEntries();
}

renderEntries();
