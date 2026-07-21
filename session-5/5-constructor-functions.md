# 🎓 JavaScript Constructor Functions

## 📚 Why Do We Need Constructor Functions?

Imagine you're building an application that stores information about users.

Without constructor functions, you would have to create each object manually.

```javascript
const user1 = {
  firstName: "Esraa",
  lastName: "Said",

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};

const user2 = {
  firstName: "Ahmed",
  lastName: "Ali",

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};

const user3 = {
  firstName: "Sara",
  lastName: "Mohamed",

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};
```

### The Problem

Notice that every object has exactly the same structure.

The only thing that changes is the data.

This leads to:

* Repeated code
* Difficult maintenance
* Poor scalability

Instead of rewriting the same object over and over, we can define a **blueprint** once and create as many objects as we need.

---

# 🏗 What is a Constructor Function?

A **constructor function** is a regular JavaScript function that acts as a blueprint for creating multiple similar objects.

By convention:

* Constructor function names start with a capital letter.
* They are called using the **`new`** keyword.

## Syntax

```javascript
function User(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}
```

Here:

* `User` is the constructor.
* `firstName` and `lastName` are parameters.
* `this` refers to the new object being created.

---

# 🚀 Creating Objects

Once the constructor is defined, creating new objects becomes simple.

```javascript
function User(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const user1 = new User("Esraa", "Said");
const user2 = new User("Ahmed", "Ali");
const user3 = new User("Sara", "Mohamed");

console.log(user1);
console.log(user2);
console.log(user3);
```

Output

```javascript
User {
  firstName: "Esraa",
  lastName: "Said"
}

User {
  firstName: "Ahmed",
  lastName: "Ali"
}

User {
  firstName: "Sara",
  lastName: "Mohamed"
}
```

Each object has the same structure but different values.

---

# 🔍 What Does the `new` Keyword Do?

When JavaScript sees:

```javascript
const user = new User("Esraa", "Said");
```

it performs several steps automatically.

## Step 1: Create an Empty Object

```javascript
const obj = {};
```

---

## Step 2: Bind `this` to the New Object

Inside the constructor:

```javascript
this === obj;
```

---

## Step 3: Execute the Constructor Code

```javascript
this.firstName = "Esraa";
this.lastName = "Said";
```

The object becomes:

```javascript
{
  firstName: "Esraa",
  lastName: "Said"
}
```

---

## Step 4: Return the Object

Finally, JavaScript returns the newly created object.

So this:

```javascript
const user = new User("Esraa", "Said");
```

is conceptually similar to:

```javascript
const user = {
  firstName: "Esraa",
  lastName: "Said",
};
```

except that JavaScript performs these steps automatically.

---

# 🎯 Understanding `this` Inside Constructor Functions

Inside a constructor function, `this` always refers to the object currently being created.

```javascript
function User(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const user1 = new User("Esraa", "Said");
const user2 = new User("Ahmed", "Ali");
```

During the first call:

```text
this → user1
```

During the second call:

```text
this → user2
```

This allows the same constructor to initialize different objects.

---

# ➕ Adding Methods

Objects usually contain both data and behavior.

Methods can be added inside the constructor.

```javascript
function User(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;

  this.getFullName = function () {
    return `${this.firstName} ${this.lastName}`;
  };
}

const user = new User("Esraa", "Said");

console.log(user.getFullName());
```

Output

```text
Esraa Said
```

---

# 🌍 Real-Life Example: Employee System

```javascript
function Employee(name, position, salary) {
  this.name = name;
  this.position = position;
  this.salary = salary;

  this.showInfo = function () {
    console.log(`${this.name} works as ${this.position}`);
  };
}

const employee1 = new Employee("Ali", "Frontend Developer", 12000);
const employee2 = new Employee("Sara", "Backend Developer", 15000);

employee1.showInfo();
employee2.showInfo();
```

Output

```text
Ali works as Frontend Developer
Sara works as Backend Developer
```

---

# ⚠️ What Happens If We Forget `new`?

Suppose we forget to write `new`.

```javascript
function User(name) {
  this.name = name;
}

const user = User("Esraa");
```

This is incorrect.

---

## Non-Strict Mode

In non-strict mode:

```javascript
this === window
```

So JavaScript executes:

```javascript
window.name = "Esraa";
```

instead of creating a new object.

---

## Strict Mode

```javascript
"use strict";

function User(name) {
  this.name = name;
}

User("Esraa");
```

Output

```text
TypeError
```

Because:

```javascript
this === undefined
```

and JavaScript cannot assign properties to `undefined`.

---




# ⚠️ The Memory Problem

Consider the following constructor.

```javascript
function User(name) {
  this.name = name;

  this.sayHello = function () {
    console.log(`Hello ${this.name}`);
  };
}

const user1 = new User("Esraa");
const user2 = new User("Ahmed");
const user3 = new User("Sara");
```

Although the objects share the same behavior, JavaScript creates a separate copy of `sayHello()` for every object.

Conceptually:

```text
user1 → sayHello()
user2 → sayHello()
user3 → sayHello()
```

This wastes memory when many objects are created.

---

# 💡 Looking Ahead: Prototype

JavaScript solves this problem using **Prototypes**.

Instead of storing the same method inside every object, all objects can share a single copy of the method.

```text
Constructor
        │
        ▼
   Prototype
        ▲
        │
user1  user2  user3
```

This improves memory usage and makes applications more efficient.

The Prototype system is the next important concept to learn after constructor functions.

---

# 📝 Summary

A constructor function is a blueprint used to create multiple similar objects.

### Rules

* Constructor names usually start with a capital letter.
* Always call constructor functions using `new`.

### What `new` Does

1. Creates an empty object.
2. Binds `this` to the new object.
3. Executes the constructor code.
4. Returns the new object.

### Important Notes

* `this` refers to the object being created.
* Forgetting `new` can cause unexpected behavior.
* `new.target` detects whether the constructor was called correctly.
* Methods defined inside constructors are duplicated for every object.
* Prototypes solve this duplication problem by allowing objects to share methods.
