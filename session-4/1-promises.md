# 🎓 JavaScript Promises

# 📚 Why Do We Need Promises?

In JavaScript, many operations take time to complete. These operations are called **asynchronous operations**.

Examples include:

- Fetching data from an API
- Reading a file
- Accessing a database
- Waiting for a timer using `setTimeout()`

Before Promises were introduced, developers used **callbacks** to handle asynchronous code.

However, when multiple asynchronous operations depended on each other, the code became deeply nested and difficult to read.

Example:

```javascript
login(() => {
    getUser(() => {
        getOrders(() => {
            getPayment(() => {
                console.log("Finished");
            });
        });
    });
});
```

This problem is known as **Callback Hell**.

Promises were introduced to make asynchronous code:

- Easier to read
- Easier to maintain
- Easier to handle errors
- More organized

---

# 📚 What is a Promise?

A **Promise** is an object that represents the result of an asynchronous operation.

Think of a Promise as a guarantee.

Imagine you order food online.

The restaurant promises one of three things:

- Your order is still being prepared.
- Your order has been delivered successfully.
- Your order couldn't be delivered.

JavaScript Promises work in exactly the same way.

A Promise represents a value that may be available:

- Immediately
- Later
- Never (because an error occurred)

---

# Promise States

Every Promise is always in one of three states.

## 1. Pending

The asynchronous operation is still running.

Nothing has finished yet.

```text
Waiting...
```

Examples:

- Waiting for an API response
- Waiting for a timer
- Waiting for a file to load

---

## 2. Fulfilled

The operation completed successfully.

The Promise returns a result.

```text
Success
```

---

## 3. Rejected

The operation failed.

Instead of returning data, it returns an error.

```text
Error
```

---

## Promise Life Cycle

```text
            Pending
           /       \
          /         \
 Fulfilled         Rejected
```

A Promise starts as **Pending**, then becomes either:

- Fulfilled
- Rejected

A Promise can never return to the Pending state after it has been settled.

---

# Creating a Promise

A Promise is created using the `Promise` constructor.

## Syntax

```javascript
const promise = new Promise((resolve, reject) => {

});
```

The constructor receives one function with two parameters:

- `resolve`
- `reject`

---

## resolve()

Call `resolve()` when the asynchronous operation succeeds.

```javascript
resolve(data);
```

The value passed to `resolve()` becomes available inside `.then()`.

---

## reject()

Call `reject()` when something goes wrong.

```javascript
reject(error);
```

The value passed to `reject()` becomes available inside `.catch()`.

---

# Example 1: Creating a Simple Promise

```javascript
const myPromise = new Promise((resolve, reject) => {

    const success = true;

    if (success) {
        resolve("Operation completed successfully.");
    } else {
        reject("Something went wrong.");
    }

});
```

Nothing happens yet because we haven't used the Promise.

---

# Consuming a Promise

To use the result of a Promise, JavaScript provides three methods:

- `.then()`
- `.catch()`
- `.finally()`

We will study each one in detail later.

For now:

```javascript
myPromise
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
```

Output

```text
Operation completed successfully.
```

---

# Example 2: Rejected Promise

```javascript
const myPromise = new Promise((resolve, reject) => {

    const success = false;

    if (success) {
        resolve("Success");
    } else {
        reject("Operation Failed");
    }

});

myPromise
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
```

Output

```text
Operation Failed
```

---

# Returning Promises from Functions

In real applications, we rarely create Promises directly.

Instead, functions return Promises.

This allows the function to perform an asynchronous task and return its result later.

General Syntax

```javascript
function functionName() {

    return new Promise((resolve, reject) => {

    });

}
```

---

# Example: Checking a Number

```javascript
function checkNumber(number) {

    return new Promise((resolve, reject) => {

        if (number >= 0) {
            resolve("Positive Number");
        } else {
            reject("Negative Number");
        }

    });

}

checkNumber(15)
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.log(error);
    });
```

Output

```text
Positive Number
```

---

# Real-Life Example: User Login

Imagine a website checking the username and password.

If the credentials are correct:

- Login succeeds.

Otherwise:

- Login fails.

```javascript
function login(username, password) {

    return new Promise((resolve, reject) => {

        if (username === "esraa" && password === "12345") {
            resolve("Login Successful");
        } else {
            reject("Invalid Username or Password");
        }

    });

}

login("esraa", "12345")
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.log(error);
    });
```

Output

```text
Login Successful
```

---

## Another Example

```javascript
login("Ali", "1111")
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.log(error);
    });
```

Output

```text
Invalid Username or Password
```

---

# Real-Life Example: Checking Product Availability

Suppose an online store wants to check whether a product exists in stock.

```javascript
function checkProduct(product) {

    return new Promise((resolve, reject) => {

        const stock = {
            Laptop: 5,
            Mouse: 0,
            Keyboard: 10
        };

        if (stock[product] > 0) {
            resolve(`${product} is available.`);
        } else {
            reject(`${product} is out of stock.`);
        }

    });

}

checkProduct("Laptop")
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.log(error);
    });
```

Output

```text
Laptop is available.
```

---

## Example

```javascript
checkProduct("Mouse")
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.log(error);
    });
```

Output

```text
Mouse is out of stock.
```

---

# Promise Methods

Once a Promise has been created, we need a way to use its result.

JavaScript provides three main methods for handling Promises:

- `.then()`
- `.catch()`
- `.finally()`

These methods allow us to handle successful operations, errors, and cleanup tasks.

---

# 1. then()

## What is `.then()`?

The `.then()` method is executed **only when the Promise is fulfilled**.

It receives the value passed to `resolve()`.

### Syntax

```javascript
promise.then((result) => {
    // use the result
});
```

---

## Example

```javascript
function getMessage() {

    return new Promise((resolve) => {
        resolve("Welcome to JavaScript!");
    });

}

getMessage().then((message) => {
    console.log(message);
});
```

Output

```text
Welcome to JavaScript!
```

---

## How It Works

1. The Promise starts executing.
2. It calls `resolve()`.
3. The value passed to `resolve()` is sent to `.then()`.
4. The callback inside `.then()` executes.

Flow

```text
Promise
    │
resolve()
    │
    ▼
.then()
```

---

# Another Example

```javascript
function calculateAverage(mark1, mark2) {

    return new Promise((resolve) => {

        const average = (mark1 + mark2) / 2;

        resolve(average);

    });

}

calculateAverage(80, 90)
    .then((average) => {
        console.log("Average =", average);
    });
```

Output

```text
Average = 85
```

---

# 2. catch()

## What is `.catch()`?

The `.catch()` method handles errors.

It executes **only when the Promise is rejected**.

The value passed to `reject()` becomes available inside `.catch()`.

### Syntax

```javascript
promise.catch((error) => {

});
```

---

## Example

```javascript
function divide(a, b) {

    return new Promise((resolve, reject) => {

        if (b === 0) {
            reject("Cannot divide by zero.");
        } else {
            resolve(a / b);
        }

    });

}

divide(20, 0)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
```

Output

```text
Cannot divide by zero.
```

---

## Another Example

```javascript
function login(username, password) {

    return new Promise((resolve, reject) => {

        if (username === "admin" && password === "1234") {
            resolve("Login Successful");
        } else {
            reject("Invalid Username or Password");
        }

    });

}

login("Ahmed", "1111")
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.log(error);
    });
```

Output

```text
Invalid Username or Password
```

---

# 3. finally()

## What is `.finally()`?

The `.finally()` method executes **whether the Promise succeeds or fails**.

It is commonly used for cleanup tasks.

Examples:

- Hide a loading spinner
- Close a database connection
- Stop a loading animation

### Syntax

```javascript
promise.finally(() => {

});
```

---

## Example

```javascript
function checkAge(age) {

    return new Promise((resolve, reject) => {

        if (age >= 18) {
            resolve("Access Granted");
        } else {
            reject("Access Denied");
        }

    });

}

checkAge(25)
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        console.log("Verification Finished");
    });
```

Output

```text
Access Granted
Verification Finished
```

---

## Example (Rejected)

```javascript
checkAge(12)
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        console.log("Verification Finished");
    });
```

Output

```text
Access Denied
Verification Finished
```

---

# Combining Promise Methods

Usually, Promises use all three methods together.

```javascript
promise
    .then((result) => {

    })
    .catch((error) => {

    })
    .finally(() => {

    });
```

This is the most common pattern you'll see in JavaScript projects.

---

# Real-Life Example: Student Exam Result

```javascript
function checkResult(score) {

    return new Promise((resolve, reject) => {

        if (score >= 50) {
            resolve("Congratulations! You Passed.");
        } else {
            reject("Unfortunately, You Failed.");
        }

    });

}

checkResult(65)
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        console.log("Exam Result Checked");
    });
```

Output

```text
Congratulations! You Passed.
Exam Result Checked
```

---

# Real-Life Example: Bank Withdrawal

```javascript
function withdraw(balance, amount) {

    return new Promise((resolve, reject) => {

        if (amount <= balance) {
            resolve(`Withdrawal Successful. Remaining Balance = ${balance - amount}`);
        } else {
            reject("Insufficient Balance");
        }

    });

}

withdraw(5000, 1500)
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        console.log("Transaction Finished");
    });
```

Output

```text
Withdrawal Successful. Remaining Balance = 3500
Transaction Finished
```

---


# Promise Chaining

## What is Promise Chaining?

Promise Chaining is the process of connecting multiple asynchronous operations together using multiple `.then()` methods.

Each `.then()` waits for the previous Promise to finish before executing.

This allows asynchronous tasks to run **one after another** in a clean and readable way.

Instead of nesting callbacks inside callbacks, each step is placed in its own `.then()`.

---

## Why Do We Need Promise Chaining?

Imagine you need to perform several asynchronous tasks in order.

For example:

1. Login to a website.
2. Get the user's profile.
3. Get the user's courses.
4. Display the courses.

Each task depends on the previous one.

Without Promise Chaining, the code would become deeply nested (Callback Hell).

With Promise Chaining, the code becomes much easier to read and maintain.

---

# How Promise Chaining Works

Suppose we have three asynchronous functions:

```text
Task 1
   ↓
Task 2
   ↓
Task 3
```

Each task returns a Promise.

When one Promise is fulfilled, the next `.then()` starts.

Flow

```text
Promise
   │
.then()
   │
.then()
   │
.then()
   │
.catch()
```

---

# Example 1: Student Registration

Suppose a student wants to register for a course.

The process consists of three steps:

1. Register the student.
2. Verify the payment.
3. Enroll the student.

---

## Step 1

```javascript
function registerStudent(name) {

    return new Promise((resolve) => {

        setTimeout(() => {
            console.log(`${name} has been registered.`);
            resolve(name);
        }, 1000);

    });

}
```

---

## Step 2

```javascript
function verifyPayment(student) {

    return new Promise((resolve) => {

        setTimeout(() => {
            console.log("Payment Verified.");
            resolve(student);
        }, 1000);

    });

}
```

---

## Step 3

```javascript
function enrollCourse(student) {

    return new Promise((resolve) => {

        setTimeout(() => {
            console.log(`${student} enrolled successfully.`);
            resolve();
        }, 1000);

    });

}
```

---

## Execute the Steps

```javascript
registerStudent("Ahmed")
    .then(verifyPayment)
    .then(enrollCourse)
    .then(() => {
        console.log("Registration Completed.");
    });
```

---

## Output

```text
Ahmed has been registered.
Payment Verified.
Ahmed enrolled successfully.
Registration Completed.
```

---

# Example 2: Making Pizza 🍕

Promise Chaining is commonly explained using a pizza example because every step depends on the previous one.

---

## Step 1

```javascript
function makeDough() {

    return new Promise((resolve) => {

        setTimeout(() => {
            console.log("Step 1: Dough is ready 🍞");
            resolve();
        }, 1000);

    });

}
```

---

## Step 2

```javascript
function addToppings() {

    return new Promise((resolve) => {

        setTimeout(() => {
            console.log("Step 2: Toppings added 🍅🧀");
            resolve();
        }, 1000);

    });

}
```

---

## Step 3

```javascript
function bakePizza() {

    return new Promise((resolve) => {

        setTimeout(() => {
            console.log("Step 3: Pizza baked 🍕");
            resolve();
        }, 1000);

    });

}
```

---

## Execute the Steps

```javascript
makeDough()
    .then(addToppings)
    .then(bakePizza)
    .then(() => {
        console.log("Pizza is ready to serve! 🎉");
    });
```

---

## Output

```text
Step 1: Dough is ready 🍞
Step 2: Toppings added 🍅🧀
Step 3: Pizza baked 🍕
Pizza is ready to serve! 🎉
```

---

# Returning Values Between .then()

Each `.then()` can return a value.

That value becomes the input of the next `.then()`.

Example

```javascript
Promise.resolve(5)

    .then((number) => {
        return number * 2;
    })

    .then((result) => {
        console.log(result);
    });
```

Output

```text
10
```

---

# Returning Another Promise

A `.then()` can also return another Promise.

The next `.then()` waits until that Promise finishes.

Example

```javascript
Promise.resolve(5)

    .then((number) => {

        return new Promise((resolve) => {

            setTimeout(() => {
                resolve(number * 3);
            }, 1000);

        });

    })

    .then((result) => {
        console.log(result);
    });
```

Output (after 1 second)

```text
15
```

---

# Error Handling in Promise Chaining

If any Promise is rejected, JavaScript skips the remaining `.then()` methods and jumps directly to `.catch()`.

Example

```javascript
function login(success) {

    return new Promise((resolve, reject) => {

        if (success) {
            resolve("Login Successful");
        } else {
            reject("Invalid Login");
        }

    });

}

login(false)

    .then((message) => {
        console.log(message);
    })

    .then(() => {
        console.log("Loading Dashboard...");
    })

    .catch((error) => {
        console.log(error);
    });
```

Output

```text
Invalid Login
```

Notice that:

```text
Loading Dashboard...
```

is never printed because the Promise was rejected.

---

# Fetch API

## What is Fetch?

`fetch()` is a built-in JavaScript function used to send HTTP requests.

It is commonly used to:

- Get data from an API
- Send data to a server
- Update data
- Delete data

Unlike older methods such as `XMLHttpRequest`, `fetch()` returns a Promise.

Syntax

```javascript
fetch(url)
```

---

# Basic Example

```javascript
fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
        console.log(response);
    });
```

The returned value is **not the actual data**.

It is a **Response object**.

---

# Why response.json()?

The server sends data as JSON.

JavaScript cannot use this JSON directly.

We need to convert it into a JavaScript object.

This is done using:

```javascript
response.json()
```

---

## Important Note

`response.json()` also returns a Promise.

That is why another `.then()` is needed.

---

## Example

```javascript
fetch("https://jsonplaceholder.typicode.com/users")

    .then((response) => {
        return response.json();
    })

    .then((users) => {
        console.log(users);
    })

    .catch((error) => {
        console.log(error);
    });
```

---

# Real-Life Example

Suppose we want to display all users.

```javascript
fetch("https://jsonplaceholder.typicode.com/users")

    .then((response) => response.json())

    .then((users) => {

        users.forEach((user) => {
            console.log(user.name);
        });

    })

    .catch((error) => {
        console.log(error);
    });
```

Possible Output

```text
Leanne Graham
Ervin Howell
Clementine Bauch
Patricia Lebsack
Chelsey Dietrich
...
```

---

