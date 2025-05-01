
# Expense Tracker

Sample solution for the [Expense Tracker](https://roadmap.sh/projects/expense-tracker) challenge from [roadmap.sh](https://roadmap.sh/).


## Installation

Clone the repository with the following command

```bash
  git clone https://github.com/eduardo009cs/backend-projects.git
  cd backend-projects/expense-tracker
  npm install
```
    
## Usage/Examples

- Add Expense
```bash
node index.js add --description "Books" --mount 200
```
- Update Expense 
```bash
node index.js update --id 1 --description "School books" --amount 300
```
- Delete Expense
```bash
node index.js delete --id 1
```
- Expenses List
```bash
node index.js list

```
- Summary Expenses
```bash
# Summary All Expenses
node index.js summary

# Summary Expenses for month 
node index.js summary --month 4


```