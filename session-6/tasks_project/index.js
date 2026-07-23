const addTask = require("./modules/add.task");
const listTasks = require("./modules/list.tasks");
const removeTask = require("./modules/remove.task");
const updateTask = require("./modules/update.task");

console.log(`📝 Welcome To Our Task Manager`);

listTasks();

addTask("");
addTask("study mongodb");
listTasks();

removeTask(400);
removeTask(2);
listTasks();


updateTask(300, "");
updateTask(3, "");
updateTask(30, "Complete");
updateTask(3, "Complete");
listTasks();
