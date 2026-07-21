# 🎓 Understanding `this` in JavaScript

## 📚 What is `this`?

`this` is a special keyword in JavaScript that refers to an object.


> **Who called the function?**

For regular functions, the object that calls the function usually becomes the value of `this`.

For arrow functions, the behavior is different, as we'll see later.

---

# Why Do We Need `this`?

Imagine you have an object representing a user.

```javascript
const user = {
  firstName: "Esraa",
  lastName: "Said",

  fullName() {
    console.log(this.firstName + " " + this.lastName);
  },
};

user.fullName();
```

Output:

```text
Esraa Said
```

Inside `fullName()`, the keyword `this` refers to the `user` object, allowing the method to access its own properties.

Without `this`, the method wouldn't know which object's data to use.

---

# How is `this` Determined?

For **regular functions**, `this` depends on **how the function is called**, not where it is defined.

Let's look at the different cases.

---

# 1. `this` in a Regular Function

When a regular function is called directly:

```javascript
function greet() {
  console.log(this);
}

greet();
```

there is **no object** calling the function.

The value of `this` depends on whether JavaScript is running in **non-strict mode** or **strict mode**.

---

## Non-Strict Mode

```javascript
function greet() {
  console.log(this);
}

greet();
```

Output (Browser):

```text
Window {...}
```

Why?

JavaScript behaves as if the function was called like this:

```javascript
window.greet();
```

Therefore:

```javascript
this === window
```

---

### Example

```javascript
window.language = "JavaScript";

function showLanguage() {
  console.log(this.language);
}

showLanguage();
```

Output

```text
JavaScript
```

Because:

```javascript
this === window
```

---

## Strict Mode

Strict mode changes this behavior.

```javascript
"use strict";

function greet() {
  console.log(this);
}

greet();
```

Output

```text
undefined
```

Since there is no object calling the function, JavaScript does **not** assign `window` to `this`.

Instead:

```javascript
this === undefined
```

---

### Example

```javascript
"use strict";

window.language = "JavaScript";

function showLanguage() {
  console.log(this.language);
}

showLanguage();
```

Output

```text
TypeError
```

Why?

Because:

```javascript
this === undefined
```

Trying to access:

```javascript
undefined.language
```

causes an error.

---

# 2. `this` When a Function is Called by an Object

Whenever a function is called using dot notation:

```javascript
object.method();
```

`this` refers to that object.

---

## Example

```javascript
const user = {
  name: "Esraa",

  sayHello() {
    console.log("Hello " + this.name);
  },
};

user.sayHello();
```

Output

```text
Hello Esraa
```

Because

```javascript
this === user
```

---

## Another Example

```javascript
const car = {
  brand: "Toyota",
  model: "Corolla",

  start() {
    console.log(`${this.brand} ${this.model} is starting...`);
  },
};

car.start();
```

Output

```text
Toyota Corolla is starting...
```

Again,

```javascript
this === car
```

---

# 3. Reusing the Same Function

The value of `this` depends on the caller, even if the same function is shared between multiple objects.

```javascript
function introduce() {
  console.log(`Hi, I'm ${this.name}`);
}

const student = {
  name: "Sara",
  introduce,
};

const teacher = {
  name: "Ahmed",
  introduce,
};

student.introduce();
teacher.introduce();
```

Output

```text
Hi, I'm Sara
Hi, I'm Ahmed
```

The function is the same.

Only the caller changes.

---

# 4. Arrow Functions and `this`

Arrow functions behave differently.

They **do not create their own `this`**.

Instead, they inherit `this` from the surrounding scope.

---

## Example

```javascript
window.message = "Hello";

const showMessage = () => {
  console.log(this.message);
};

showMessage();
```

Output (Browser)

```text
Hello
```

The arrow function uses the `this` value from the outer scope.

At the top level of a browser script:

```javascript
this === window
```

---

# Arrow Function Inside an Object

Many beginners expect this to work:

```javascript
const user = {
  name: "Esraa",

  greet: () => {
    console.log(this.name);
  },
};

user.greet();
```

Expected

```text
Esraa
```

Actual

```text
undefined
```

---

## Why?

The arrow function ignores the object.

It doesn't create its own `this`.

Instead, it inherits `this` from outside the object.

At the top level:

```javascript
this === window
```

So JavaScript tries to access:

```javascript
window.name
```

which is usually `undefined`.

---

# Correct Way

Use a regular function when creating object methods.

```javascript
const user = {
  name: "Esraa",

  greet() {
    console.log(this.name);
  },
};

user.greet();
```

Output

```text
Esraa
```

---

# Real-Life Example

```javascript
const bankAccount = {
  owner: "Ali",
  balance: 5000,

  deposit(amount) {
    this.balance += amount;
    console.log(`New Balance: ${this.balance}`);
  },

  withdraw(amount) {
    this.balance -= amount;
    console.log(`New Balance: ${this.balance}`);
  },
};

bankAccount.deposit(1000);
bankAccount.withdraw(500);
```

Output

```text
New Balance: 6000
New Balance: 5500
```

Here, `this.balance` always refers to the balance of the current bank account object.

---

# Regular Function vs Arrow Function

## Regular Function

```javascript
const person = {
  name: "Esraa",

  greet() {
    console.log(this.name);
  },
};

person.greet();
```

Output

```text
Esraa
```

`this` refers to the object that called the method.

---

## Arrow Function

```javascript
const person = {
  name: "Esraa",

  greet: () => {
    console.log(this.name);
  },
};

person.greet();
```

Output

```text
undefined
```

Arrow functions inherit `this` from the surrounding scope instead of the object.

---

# Tricky Example

```javascript
const person1 = {
  name: "Esraa",

  greet() {
    console.log(this.name);
  },
};

const person2 = {
  name: "Ahmed",
};

person2.greet = person1.greet;

person1.greet();
person2.greet();
```

Output

```text
Esraa
Ahmed
```

Although both objects use the same function, the value of `this` changes depending on the caller.

---

# When Should You Use Arrow Functions?

Arrow functions are great for:

* Callback functions
* Array methods (`map`, `filter`, `forEach`)
* Functions that don't need their own `this`

Example:

```javascript
const numbers = [1, 2, 3];

const doubled = numbers.map((num) => num * 2);

console.log(doubled);
```

Output

```text
[2, 4, 6]
```

Avoid using arrow functions as object methods if you need to access object properties with `this`.

---

# Key Differences

| Regular Function             | Arrow Function                          |
| ---------------------------- | --------------------------------------- |
| Creates its own `this`       | Does not create its own `this`          |
| `this` depends on the caller | `this` comes from the surrounding scope |
| Best for object methods      | Best for callbacks and array methods    |

---

# 📝 Summary

* `this` refers to an object.
* The value of `this` is determined when a function is called.
* In a regular function, `this` depends on the caller.
* In non-strict mode, calling a function directly makes `this` refer to `window` (in browsers).
* In strict mode, calling a function directly makes `this` equal `undefined`.
* When an object calls a method, `this` refers to that object.
* Arrow functions do not have their own `this`; they inherit it from the surrounding scope.
* Use **regular functions** for object methods and **arrow functions** mainly for callbacks and array methods.
