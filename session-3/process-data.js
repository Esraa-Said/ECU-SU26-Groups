function processData(numbers, callback) {
    const result = [];
    for (let i = 0; i < numbers.length; i++) {
        result.push(callback(numbers[i]));
    }
    return result;
}