# 🎓 JavaScript Async / Await

# 📚 What are Async / Await?

`async` and `await` are modern JavaScript features that make working with **asynchronous code** much easier.

They are built on top of **Promises** and provide a syntax that looks similar to synchronous code, making programs easier to read and maintain.

Instead of writing multiple `.then()` and `.catch()` methods, you can write asynchronous code in a more sequential style.

---

## Why Do We Need Async / Await?

Before Async/Await, asynchronous code was commonly written using Promise chains.

Example using Promises:

```javascript
fetchUsers()
  .then((users) => {
    console.log(users);
  })
  .catch((error) => {
    console.log(error);
  });
```

While this works well, long Promise chains can become difficult to read.

Using Async/Await:

```javascript
async function loadUsers() {
  try {
    const users = await fetchUsers();
    console.log(users);
  } catch (error) {
    console.log(error);
  }
}

loadUsers();
```

The second version is easier to understand because it looks like normal sequential code.

---

# The `async` Keyword

The `async` keyword is placed before a function declaration.

It tells JavaScript that this function will work with asynchronous operations.

An **async function always returns a Promise**, even if you return a normal value.

## Syntax

```javascript
async function functionName() {
  // code
}
```

---

## Example 1: Returning a Normal Value

```javascript
async function greet() {
  return "Hello";
}

console.log(greet());
```

Output:

```text
Promise { "Hello" }
```

Although the function returns a string, JavaScript automatically wraps it inside a Promise.

---

## Example 2: Using `.then()`

```javascript
async function greet() {
  return "Hello";
}

greet().then((message) => {
  console.log(message);
});
```

Output

```text
Hello
```

---

## Important Notes

* Every async function returns a Promise.
* Returning a value is equivalent to calling `resolve(value)`.
* Throwing an error inside an async function is equivalent to calling `reject(error)`.

---

# The `await` Keyword

The `await` keyword is used to wait for a Promise to finish.

When JavaScript reaches an `await` statement:

* The current async function pauses.
* Other JavaScript code can continue running.
* When the Promise settles, execution resumes.

## Syntax

```javascript
const result = await promise;
```

---

## Rules for Using `await`

* `await` can only be used inside an async function.
* The value after `await` should be a Promise.
* If the Promise resolves, `await` returns the resolved value.
* If the Promise rejects, an error is thrown.

---

# Example 1: Basic Async / Await

```javascript
function myPromiseFunction() {
  return new Promise((resolve, reject) => {
    let x = 6;

    if (x >= 5) {
      resolve("Success");
    } else {
      reject("Rejected");
    }
  });
}

async function usePromise() {
  const result = await myPromiseFunction();
  console.log(result);
}

usePromise();
```

Output

```text
Success
```

---

# Handling Errors with try...catch

Since `await` throws an error when a Promise is rejected, we usually wrap asynchronous code inside a `try...catch` block.

## Syntax

```javascript
try {
  // successful code
} catch (error) {
  // handle error
}
```

---

## Example

```javascript
function myPromiseFunction() {
  return new Promise((resolve, reject) => {
    let x = 2;

    if (x >= 5) {
      resolve("Success");
    } else {
      reject("Rejected");
    }
  });
}

async function usePromise() {
  try {
    const result = await myPromiseFunction();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

usePromise();
```

Output

```text
Rejected
```

---

# Real-Life Example: User Login

Suppose a user tries to log into a website.

The login request takes some time because the server needs to verify the username and password.

```javascript
function userLogin(username, password) {
  return new Promise((resolve, reject) => {
    if (username === "esraa" && password === 12345) {
      resolve("Successfully Logged In");
    } else {
      reject("Invalid username or password");
    }
  });
}

async function login() {
  try {
    const message = await userLogin("esraa", 12345);
    console.log(message);
  } catch (error) {
    console.log(error);
  }
}

login();
```

Output

```text
Successfully Logged In
```

---

# Example: Sending a Message

```javascript
function sendMessage(phone, message) {
  return new Promise((resolve, reject) => {
    if (!phone || !message) {
      reject("Phone number or message is missing.");
    } else {
      setTimeout(() => {
        resolve(`Message sent to ${phone}`);
      }, 1000);
    }
  });
}

async function send() {
  try {
    const result = await sendMessage(
      "01012345678",
      "Hello!"
    );

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

send();
```

Output

```text
Message sent to 01012345678
```

---

# Async / Await with Fetch API

The `fetch()` function returns a Promise.

Using Async/Await makes working with APIs much cleaner.

```javascript
async function fetchUsers() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    const users = await response.json();

    console.log(users);
  } catch (error) {
    console.log(error);
  }
}

fetchUsers();
```

---

## Why Do We Use `await` Twice?

Both of the following return Promises:

```javascript
fetch(...)
```

and

```javascript
response.json()
```

Therefore, both need `await`.

```javascript
const response = await fetch(url);
const data = await response.json();
```

---

# Sequential Asynchronous Operations

One of the biggest advantages of Async/Await is executing asynchronous tasks one after another.

## Step 1

```javascript
function makeDough() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Step 1: Dough is ready");
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
      console.log("Step 2: Toppings added");
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
      console.log("Step 3: Pizza baked");
      resolve();
    }, 1000);
  });
}
```

---

## Using Async / Await

```javascript
async function preparePizza() {
  await makeDough();
  await addToppings();
  await bakePizza();

  console.log("Step 4: Pizza is ready!");
}

preparePizza();
```

Output

```text
Step 1: Dough is ready
Step 2: Toppings added
Step 3: Pizza baked
Step 4: Pizza is ready!
```

Each step waits until the previous one finishes.

---

# Promise Style vs Async / Await

## Promise Style

```javascript
fetchUsers()
  .then((users) => {
    console.log(users);
  })
  .catch((error) => {
    console.log(error);
  });
```

---

## Async / Await Style

```javascript
async function loadUsers() {
  try {
    const users = await fetchUsers();
    console.log(users);
  } catch (error) {
    console.log(error);
  }
}

loadUsers();
```

The second approach is generally easier to read, especially when multiple asynchronous operations are involved.

---

# Advantages of Async / Await

* Cleaner and more readable syntax.
* Makes asynchronous code look like synchronous code.
* Reduces long Promise chains.
* Works naturally with `try...catch`.
* Makes code easier to debug and maintain.
* Helps organize multiple asynchronous operations.

---

# Important Notes

* `async` always makes a function return a Promise.
* `await` pauses only the current async function, not the entire program.
* `await` can only be used inside an async function.
* Always use `try...catch` when a Promise might be rejected.
* Async/Await is built on top of Promises, not a replacement for them.

---

# Summary

## async

```text
Makes a function return a Promise.
```

---

## await

```text
Waits for a Promise to settle before continuing execution.
```

---

## Error Handling

```text
try...catch
```

Used to handle rejected Promises when using Async/Await.

---

## Common Uses

```text
API Requests
Authentication
Database Operations
File Processing
Timers
```

---

## Key Benefits

```text
Cleaner syntax
Better readability
Sequential asynchronous code
Easier error handling
Less nesting
```

Async/Await is the modern and recommended way to write asynchronous JavaScript because it combines the power of Promises with code that is easier to understand and maintain.
