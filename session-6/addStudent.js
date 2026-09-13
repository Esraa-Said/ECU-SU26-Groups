const students = require('../data/students');

function addStudent(name, grades) {
    students.push({ name, grades });
}

module.exports = addStudent;