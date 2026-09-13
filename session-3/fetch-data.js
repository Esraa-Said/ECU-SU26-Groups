function fetchDataWithCallback(callback) {
    setTimeout(() => {
        const data = { id: 1, name: "Data Loaded" };
        callback(data);
    }, 2000);
}