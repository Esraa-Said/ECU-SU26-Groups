const students = require('../data/students');
const calculateAverage = require('./calculateAverage');

function filterPassed() {
    return students.filter(student => calculateAverage(student.grades) >= 60);
}

module.exports = filterPassed;