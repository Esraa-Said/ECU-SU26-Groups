function delayedGreet(name, delay) {
    setTimeout(() => {
        console.log(`Hello, ${name}!`);
    }, delay);
}