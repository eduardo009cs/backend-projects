
# Task Tracker

Sample solution for the [task-tracker](https://roadmap.sh/projects/task-tracker) challenge from [roadmap.sh](https://roadmap.sh/).


## Installation

Clone the repository with the following command

```bash
  git clone https://github.com/eduardo009cs/backend-projects.git
  cd backend-projects/task-tracker
```
    
## Usage/Examples

- Add Task
```bash
node index.js add "Do Homework"
```
- Update Task
```bash
node index.js update 1 "Read book"
```
- Delete Task
```bash
node index.js delete 1
```
- Mark Task Status
```bash
node index.js mark-in-progress 1

node index.js mark-done 1
```
- List Tasks
```bash
# List All Tasks
node index.js list

# List Tasks with Status 'in-progress'
node index.js list in-progress

# List Tasks with Status 'todo'
node index.js list todo

# List Tasks with Status 'done'
node index.js list done

```