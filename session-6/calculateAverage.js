function calculateAverage(grades) {
    if (grades.length === 0) return 0;
    const sum = grades.reduce((total, g) => total + g, 0);
    return sum / grades.length;
}

module.exports = calculateAverage;