function getGreaterThan(arr, targetValue) {
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > targetValue) {
            result.push(arr[i]);
        }
    }

    return result;
}