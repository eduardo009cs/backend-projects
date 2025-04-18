const path = require("path")
const fs = require("fs")

const tasksPath = path.join(__dirname,'task.json')
const command = process.argv[2]


if(command === "add"){
    const description = process.argv[3];
    console.log(`Adding task with description: "${description}"`);
    if(!description){
        console.log("Error adding task: description is empty.");
        return;
    }
    addTask(description)
}else if(command === "update"){
    const id = process.argv[3];
    const description = process.argv[4];
    console.log(`Updating task ID: ${id} with new description: "${description}"`);
    if(!id || isNaN(id)){
        console.log("Error updating task: id is not a number or empty.");
        return;
    }
    if (!description) {
        console.log("Error adding task: description is empty.");
        return;
    }
    updateTask(id, description);
}else if( command === "delete"){
    const id = process.argv[3];
    console.log(`Deleting task with ID: ${id}`);
    if(!id || isNaN(id)){
        console.log("Error updating task, id is not a number or id is empty, please write a number.");
        return;
    }
    deleteTask(id)
}else if(command === "mark-in-progress"){
    const id = process.argv[3];
    console.log(`Marking task ${id} as in-progress`);
    if(!id || isNaN(id)){
        console.log("Error updating task, id is not a number or id is empty, please write a number.");
        return;
    }
    markTask(id,"in-progress")
}else if(command === "mark-done"){
    const id = process.argv[3];
    console.log(`Marking task ${id} as done`);
    if(!id || isNaN(id)){
        console.log("Error updating task, id is not a number or id is empty, please write a number.");
        return;
    }
    markTask(id,"done")
}else if(command === "list"){
    const status = process.argv[3];
    console.log(`Listing tasks with status: ${status || "all"}`);
    listTasks(status);
}else {
    console.log("Unknown command. Try: add, update, delete, mark-in-progress, mark-done, list");
}


function addTask(description) {
    
    const tasks = readAllTask();
    const now = new Date()
    const taskObject = {
        id:getNewId(tasks),
        description,
        status: "todo",
        createdAt: now.toLocaleString('es-MX'),
        updateAt: now.toLocaleString('es-MX'),

    }
    tasks.push(taskObject);
    fs.writeFileSync(tasksPath,JSON.stringify(tasks));
    console.log("Task added successfully")
}

function updateTask(id,description) {
    const tasks = readAllTask();
    const now = new Date();
    if(tasks.length === 0){
        console.log("Task list is empty, add a new task first.");
        return;
    }

    const taskUpdated = tasks.find(task => task.id == id);
    if(!taskUpdated){
        console.log("Task not found, try another ID.");
        return;
    }
    taskUpdated.description = description;
    taskUpdated.updateAt = now.toLocaleString('es-MX');
    fs.writeFileSync(tasksPath,JSON.stringify(tasks));
    console.log("Task update successfully")
}

function deleteTask(id) {
    const tasks = readAllTask()
    if(tasks.length === 0){
        console.log("Task list is empty, add a new task first.");
        return;
    }
    const taskFiltered = tasks.filter(task => task.id != id);
    if(taskFiltered.length === tasks.length){
        console.log("No task deleted. ID not found.");
        return;
    }

    fs.writeFileSync(tasksPath,JSON.stringify(taskFiltered));
    console.log(`Task with ID ${id} deleted successfully.`);
}

function markTask(id,status) {
    const tasks = readAllTask();
    const now = new Date();
    if(tasks.length === 0){
        console.log("Task list is empty, add a new task first.");
        return;
    }

    const taskUpdated = tasks.find(task => task.id == id);
    if(!taskUpdated){
        console.log("Task not found, try another ID.");
        return;
    }
    taskUpdated.status = status;
    taskUpdated.updateAt = now.toLocaleString('es-MX');
    fs.writeFileSync(tasksPath,JSON.stringify(tasks));
    console.log(`Task marked with status '${status}'`)
}

function listTasks(status) {
    const tasks = readAllTask();

    if(status === undefined){
        console.log(`------------------------------------TASK LIST------------------------------------`)
        for (const task of tasks) {
            console.log(`ID: ${task.id}\tDescription: ${task.description}\tStatus: ${task.status}\tLast Update: ${task.updateAt}`)
        }
        return;
    }

    const taskFiltered = tasks.filter(task => task.status === status);

    console.log(`------------------------------------TASKS IN ${status.toUpperCase()}------------------------------------`)
    for (const task of taskFiltered) {
        console.log(`ID: ${task.id}\tDescription: ${task.description}\tLast Update: ${task.updateAt}`)
    }
    return;
}

function readAllTask() {
    if(fs.existsSync(tasksPath)){
        const data = fs.readFileSync(tasksPath,'utf8')
        return JSON.parse(data)
    }
    return [];
    
}


function getNewId(tasks) {
    if(tasks.length === 0) return 1;
    const ids = tasks.map((task) => task.id);
    ids.sort((a, b) => a - b);
    return ids[ids.length - 1] + 1;
}