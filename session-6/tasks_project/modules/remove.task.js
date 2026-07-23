let tasks = require("../data/tasks");

function removeTask(id) {
  const index = tasks.findIndex((task) => {
    return task.id == id;
  });
  if (index === -1) {
    console.log(`❌  Can Not Delete Invalid task Id.`);
    return;
  }

  tasks.splice(index, 1);
  console.log(`✅ Task Deleted Successfully.`);
}

module.exports = removeTask;
