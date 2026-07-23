let tasks = require("../data/tasks");

function addTask(title) {
  if (!title) {
    console.log(`❌  Can Not Add Invalid Task Title`);
    return;
  }

  const newTask = {
    id: tasks[tasks.length - 1].id + 1,
    title,
    status: "Active",
  };
  tasks.push(newTask);
  console.log(`✅ Task ${newTask.title} added Successfully.`);
}

module.exports = addTask;
