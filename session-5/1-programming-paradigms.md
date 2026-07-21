# 🎓 JavaScript Programming Paradigms

# 📚 What is a Programming Paradigm?

A **Programming Paradigm** is a style or approach to writing and organizing code.

Different paradigms solve problems in different ways. Each paradigm provides a different way of thinking about how programs should be structured.

JavaScript is a **multi-paradigm language**, which means it supports several programming styles, including:

- Imperative Programming
- Declarative Programming
- Functional Programming
- Object-Oriented Programming (OOP)
- Event-Driven Programming
- Asynchronous Programming

---

# 1️⃣ Imperative Programming

## What is Imperative Programming?

Imperative programming focuses on **how** to solve a problem.

You write every step the computer should perform in the exact order.

This style is similar to giving someone detailed cooking instructions.

### Characteristics

- Step-by-step instructions
- Uses loops and conditions frequently
- The programmer controls every operation

---

## Example: Double Every Number

```javascript
const numbers = [1, 2, 3];

const doubled = [];

for (let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}

console.log(doubled);
```

### Output

```text
[2, 4, 6]
```

In this example, we explicitly tell JavaScript:

1. Create an empty array.
2. Loop through each number.
3. Multiply it by 2.
4. Store the result.
5. Print the new array.

---

# 2️⃣ Declarative Programming

## What is Declarative Programming?

Declarative programming focuses on **what** you want to achieve rather than explaining every step.

Instead of manually writing loops and instructions, you use built-in methods that describe the desired result.

This often makes code shorter, cleaner, and easier to read.

---

## Example: Double Every Number

```javascript
const numbers = [1, 2, 3];

const doubled = numbers.map((num) => num * 2);

console.log(doubled);
```

### Output

```text
[2, 4, 6]
```

Instead of writing the loop yourself, you simply tell JavaScript to create a new array where each value is multiplied by 2.

---

## Imperative vs Declarative

### Imperative

```javascript
const doubled = [];

for (let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}
```

### Declarative

```javascript
const doubled = numbers.map((num) => num * 2);
```

Both produce the same result, but the declarative version is shorter and easier to understand.

---

# 3️⃣ Functional Programming

## What is Functional Programming?

Functional Programming is a paradigm that builds applications by combining functions.

Functions are treated as values, which means they can be:

- Stored in variables
- Passed to other functions
- Returned from functions

JavaScript supports Functional Programming because functions are **first-class citizens**.

---

## Example: Greeting Function

```javascript
const greet = (name) => {
  return `Hello, ${name}`;
};

console.log(greet("Sara"));
```

### Output

```text
Hello, Sara
```

---

## Example: Calculate Discount

```javascript
const calculateDiscount = (price, discount) => {
  return price - (price * discount) / 100;
};

console.log(calculateDiscount(1000, 20));
```

### Output

```text
800
```

This example uses a function to perform a single reusable task.

---

# 4️⃣ Object-Oriented Programming (OOP)

## What is Object-Oriented Programming?

Object-Oriented Programming (OOP) organizes code using **objects**.

An object combines:

- **Properties** (data)
- **Methods** (functions)

Objects allow us to model real-world entities such as students, cars, employees, or bank accounts.

---

## Example: Animal Class

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

const dog = new Animal("Rex");

dog.speak();
```

### Output

```text
Rex makes a sound.
```

Here:

- `name` is a property.
- `speak()` is a method.
- `dog` is an object created from the `Animal` class.

---

## Real-Life Example: Student

```javascript
class Student {
  constructor(name, grade) {
    this.name = name;
    this.grade = grade;
  }

  displayInfo() {
    console.log(`${this.name} scored ${this.grade}`);
  }
}

const student1 = new Student("Esraa", 95);

student1.displayInfo();
```

### Output

```text
Esraa scored 95
```

---

# 5️⃣ Event-Driven Programming

## What is Event-Driven Programming?

Event-Driven Programming executes code **only when a specific event occurs**.

Common events include:

- Button clicks
- Keyboard presses
- Mouse movement
- Form submission

This style is widely used when building web applications.

---

## Example

```javascript
document.getElementById("btn").addEventListener("click", () => {
  alert("Button was clicked!");
});
```

In this example:

1. JavaScript waits for the user to click the button.
2. When the click event happens, the callback function executes.

---

## Another Example

```javascript
const input = document.getElementById("username");

input.addEventListener("input", () => {
  console.log("User is typing...");
});
```

Every time the user types inside the input field, the callback function runs.

---

# 6️⃣ Asynchronous Programming

## What is Asynchronous Programming?

Normally, JavaScript executes code line by line.

Sometimes an operation takes time, such as:

- Fetching data from an API
- Reading a file
- Waiting for a timer

Instead of stopping the entire program, JavaScript lets these operations run in the background.

This is called **Asynchronous Programming**.

---

## Example: Callback

```javascript
setTimeout(() => {
  console.log("Done after 2 seconds");
}, 2000);

console.log("Program continues...");
```

### Output

```text
Program continues...
Done after 2 seconds
```

JavaScript does not wait for the timer to finish before executing the next line.

---

## Example: Promise with Async/Await

```javascript
async function fetchUser() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  const data = await response.json();

  console.log(data);
}

fetchUser();
```

This example demonstrates modern asynchronous programming using `async` and `await`.

JavaScript waits only inside the async function while allowing the rest of the application to continue running.

---

# 📊 Comparison

| Paradigm | Focus | Common Features |
|----------|-------|-----------------|
| Imperative | How to solve the problem | Loops, conditions, step-by-step instructions |
| Declarative | What result is needed | `map()`, `filter()`, `reduce()` |
| Functional | Functions | Pure functions, reusable logic |
| Object-Oriented | Objects | Classes, properties, methods |
| Event-Driven | Events | Clicks, keyboard, forms |
| Asynchronous | Background tasks | Callbacks, Promises, Async/Await |

---

# 📝 Summary

JavaScript supports multiple programming paradigms, allowing developers to choose the most suitable style for different problems.

- **Imperative Programming** tells the computer **how** to perform a task.
- **Declarative Programming** describes **what** result is needed.
- **Functional Programming** builds applications using reusable functions.
- **Object-Oriented Programming** organizes code into objects with properties and methods.
- **Event-Driven Programming** executes code in response to events.
- **Asynchronous Programming** allows long-running tasks to execute without blocking the rest of the program.

Understanding these paradigms helps you write cleaner, more maintainable, and more efficient JavaScript applications.