let tasks = require("../data/tasks");


function listTasks() {
    console.log(
        "============================ Tasks ============================"
    );
    if (!tasks.length) {
      console.log(`======================== 📝 No Tasks ==========================`);
      return;
    }
    tasks.forEach((task) => {
    console.log(
      `Task id: ${task.id} \t Task Title: ${task.title} \t Task Status: ${task.status}`
    );
  });
}

module.exports = listTasks;
