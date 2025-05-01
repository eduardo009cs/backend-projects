const { program } = require('commander');
const fs = require('fs');
const path = require("path")

const expenseFile = path.join(__dirname,'expense.json');

program
    .command("add")
    .option("--description <string>", "description")
    .option("--amount <number>", "amount")
    .action(({description,amount}) => {
        if(!description || isNaN(amount)){
            console.log("Error adding expense. Description and amount is empty.")
            process.exit(0)
        }
        addExpense(description,amount);
    });

program
    .command("list")
    .action(()=> {
        listExpenses();
    });

program
    .command("summary")
    .option("--month <number>","month")
    .action(({month}) => {
        if(isNaN(month)){
            console.log(`Showing summary for month: ${month}` )
            showSummary();
        }else{
            showSummaryByMonth(month)
        }
        
    })

program
    .command("delete")
    .option("--id <number>","id")
    .action(({id}) => {
        if(!id){
            console.log("Error deleting expense. Id is not a number or empty, please write a number")
            process.exit(0)
        }
        deleteExpense(id)
        
    })

program
    .command("update")
    .option("--id <number>","id")
    .option("--description <string>", "description")
    .option("--amount <number>", "amount")
    .action(({id,description,amount}) => {
        if(!id){
            console.log("Error updating expense. Id is not a number or empty, please write a number")
            process.exit(0)
        }
        if(!description && isNaN(amount)){
            console.log("Error updating expense. Description and amount is empty.")
            process.exit(0)
        }
        console.log(`Updating expense with id: ${id}`)
        updateExpense(id,description,amount);
        
        
    })
program.parse();




function addExpense(description,amount) {
    const expenses = getExpenses();
    const newId = getNewId(expenses);
    const now = new Date()
    expenses.push({
        id:parseInt(newId),
        date: now.toISOString().split("T")[0],
        description,
        amount:parseInt(amount)
    })
    saveExpenses(expenses)
}

function listExpenses() {
    const expenses = getExpenses();
    console.table(expenses)
}

function showSummary() {
    const expenses = getExpenses();
    let totalExpenses = 0;
    for (const expense of expenses) {
        totalExpenses += expense.amount;
    }
    console.log(`Total expenses: $${totalExpenses}`)
}

function showSummaryByMonth(month) {
    const expenses = getExpenses();
    const stringMonth = new Date(`2025-${month}-01`).toLocaleString('en', {month: 'long'})
    let totalExpenses = 0;
    for (const expense of expenses) {
        if(month == parseInt(expense.date.split("-")[1])){
            totalExpenses += expense.amount;
        }
        
    }
    console.log(`Total expenses for ${stringMonth}: $${totalExpenses}`)
}

function getNewId(expenses) {
    if(expenses.length === 0) return 1;
    const ids = expenses.map((expense) => expense.id);
    ids.sort((a, b) => a - b);
    return ids[ids.length - 1] + 1;
}

function deleteExpense(id) {
    const expenses = getExpenses();
    if(expenses.length === 0){
        console.log("Expense list is empty, add a new expense first.");
        return;
    }
    const newExpenses = expenses.filter((expense) => id != expense.id);
    if(expenses.length === newExpenses.length){
        cconsole.log("No expense deleted. ID not found.");
        return;
    }
    saveExpenses(newExpenses);
}

function updateExpense(id,description,amount) {
    const expenses = getExpenses();
    if(expenses.length === 0){
        console.log("Expense list is empty, add a new expense first.");
        return;
    }
    const updateExpense = expenses.find(expense => id == expense.id)
    if(!updateExpense){
        console.log(`Id ${id} is not found, please write another.`);
        return;
    }
    updateExpense.description =  description || updateExpense.description;
    updateExpense.amount =  parseInt(amount) || updateExpense.amount;
    saveExpenses(expenses)
}

function getExpenses() {
    if(fs.existsSync(expenseFile)){
        const data = fs.readFileSync(expenseFile,'utf8');
        return JSON.parse(data);
    }
    return [];
}

function saveExpenses(expenses){
    try {
        fs.writeFileSync(expenseFile,JSON.stringify(expenses));
    } catch (error) {
        console.log(error)
    }
}