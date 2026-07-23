let tasks = require("../data/tasks");

function updateTask(id, status) {
  let task = tasks.find((task) => {
    return task.id === id;
  });
  if (!task) {
    console.log(`❌ Can Not Update Invalid Task Id.`);
    return;
  }
  if (!status) {
    console.log(`❌ Can Not Update Invalid Task Statue.`);
    return;
  }
  task.status = status;
  console.log(`✅ Task Updated Successfully`);
}

module.exports = updateTask;
