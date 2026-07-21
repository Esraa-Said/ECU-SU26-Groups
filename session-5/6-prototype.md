# 🎓 JavaScript Prototype

## 📚 Why Do We Need Prototypes?

In the previous lesson, we learned how to use **Constructor Functions** to create multiple objects.

Consider the following example:

```javascript
function User(name) {
  this.name = name;

  this.login = function () {
    console.log(`${this.name} logged in`);
  };
}

const user1 = new User("Esraa");
const user2 = new User("Ahmed");

user1.login();
user2.login();
```

Everything works correctly.

However, there is an important problem hidden inside this code.

---

# ❌ The Memory Problem

Every time a new object is created, JavaScript creates a **new copy** of the `login()` function.

```javascript
console.log(user1.login === user2.login);
```

Output

```text
false
```

Each object owns its own version of the function.

```text
user1
 ├── name
 └── login()  ← Copy #1

user2
 ├── name
 └── login()  ← Copy #2

user3
 ├── name
 └── login()  ← Copy #3
```

Imagine creating **10,000 users**.

JavaScript would create **10,000 identical functions**.

This wastes memory unnecessarily.

---

# 💡 The Solution: Prototype

Instead of storing methods inside every object, we store them **once** inside the constructor's prototype.

```javascript
function User(name) {
  this.name = name;
}

User.prototype.login = function () {
  console.log(`${this.name} logged in`);
};
```

Now every object shares the same function.

---

# 🚀 Creating Objects

```javascript
const user1 = new User("Esraa");
const user2 = new User("Ahmed");

user1.login();
user2.login();
```

Output

```text
Esraa logged in
Ahmed logged in
```

---

# ✅ Shared Method

```javascript
console.log(user1.login === user2.login);
```

Output

```text
true
```

Now both objects reference the exact same function.

```text
               User.prototype
                     │
             login() │
                     │
        ┌────────────┼────────────┐
        │            │            │
      user1        user2        user3
```

Only **one copy** exists in memory.

---

# 📌 What is a Prototype?

Every function in JavaScript automatically has a property called:

```javascript
prototype
```

Example

```javascript
function User(name) {
  this.name = name;
}

console.log(User.prototype);
```

Output

```javascript
{
  constructor: User
}
```

We can add shared properties and methods to it.

```javascript
User.prototype.login = function () {
  console.log("Login");
};

User.prototype.role = "Student";
```

Now every object can access both.

```javascript
const user = new User("Esraa");

console.log(user.role);
user.login();
```

Output

```text
Student
Login
```

---

# 🔍 How JavaScript Finds Properties

When you write:

```javascript
user.login();
```

JavaScript searches in order.

### Step 1

Does the object itself contain `login`?

```text
user ❌
```

No.

---

### Step 2

Go to its prototype.

```text
user
  │
  ▼
User.prototype
```

Does it exist there?

```text
User.prototype ✅
```

Yes.

JavaScript executes it.

---

# 🔗 The Prototype Chain

If JavaScript cannot find a property, it continues searching.

```text
user
  │
  ▼
User.prototype
  │
  ▼
Object.prototype
  │
  ▼
null
```

This search path is called the **Prototype Chain**.

---

# Example

```javascript
function User(name) {
  this.name = name;
}

const user = new User("Esraa");

console.log(user.toString());
```

JavaScript searches like this:

```text
user
 ↓
User.prototype
 ↓
Object.prototype
```

Finally it finds:

```javascript
Object.prototype.toString()
```

---

# prototype vs **proto**

These two names are often confused.

They are **not** the same thing.

---

## prototype

`prototype` belongs to **functions**.

```javascript
function User() {}

console.log(User.prototype);
```

---

## **proto**

`__proto__` belongs to **objects**.

```javascript
const user = new User();

console.log(user.__proto__);
```

Output

```text
User.prototype
```

---

## Relationship

```javascript
console.log(user.__proto__ === User.prototype);
```

Output

```text
true
```

---

## Visualization

```text
Function

User
 │
 │ prototype
 ▼
{
   login()
}

 ▲
 │
 │ __proto__
 │
user
```

---

# hasOwnProperty()

Sometimes it's useful to know whether a property belongs directly to the object or comes from the prototype.

```javascript
function User(name) {
  this.name = name;
}

User.prototype.login = function () {};

const user = new User("Esraa");

console.log(user.hasOwnProperty("name"));
console.log(user.hasOwnProperty("login"));
```

Output

```text
true
false
```

Why?

* `name` exists inside the object.
* `login` exists on the prototype.

---

# Adding Methods After Objects Exist

One great feature of prototypes is that existing objects automatically gain new methods.

```javascript
function User(name) {
  this.name = name;
}

const user1 = new User("Esraa");
const user2 = new User("Ahmed");

User.prototype.sayHello = function () {
  console.log(`Hello ${this.name}`);
};

user1.sayHello();
user2.sayHello();
```

Output

```text
Hello Esraa
Hello Ahmed
```

No need to recreate the objects.

---

# Shadowing

What happens if both the object and the prototype contain the same property?

```javascript
function User(name) {
  this.name = name;
}

User.prototype.sayHi = function () {
  console.log("Hi from Prototype");
};

const user = new User("Esraa");

user.sayHi = function () {
  console.log("Hi from Object");
};

user.sayHi();
```

Output

```text
Hi from Object
```

JavaScript always searches the object first.

Only if it doesn't find the property does it continue to the prototype.

This behavior is called **Shadowing**.

---

# Constructor + Prototype Pattern

A common ES5 design pattern is:

### Store Properties in the Constructor

```javascript
function User(name, age) {
  this.name = name;
  this.age = age;
}
```

### Store Methods in the Prototype

```javascript
User.prototype.login = function () {
  console.log(`${this.name} logged in`);
};

User.prototype.logout = function () {
  console.log(`${this.name} logged out`);
};
```

Usage

```javascript
const user1 = new User("Esraa", 24);
const user2 = new User("Ahmed", 22);

user1.login();
user2.logout();
```

---

# Relation to ES6 Classes

When you write:

```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  login() {
    console.log(`${this.name} logged in`);
  }
}
```

JavaScript internally creates something very similar to:

```javascript
function User(name) {
  this.name = name;
}

User.prototype.login = function () {
  console.log(`${this.name} logged in`);
};
```

Classes are simply **cleaner syntax** built on top of JavaScript's prototype system.

---

# 📝 Summary

## Prototype

* Every function has a `prototype` property.
* Objects created using `new` are linked to that prototype.
* Methods stored on the prototype are shared by all instances.

---

## Prototype Chain

When JavaScript cannot find a property:

1. Search the object.
2. Search its prototype.
3. Search `Object.prototype`.
4. Stop at `null`.

---

## prototype vs **proto**

| prototype            | **proto**                        |
| -------------------- | -------------------------------- |
| Belongs to functions | Belongs to objects               |
| Used as a blueprint  | Points to the object's prototype |

---

## Benefits of Prototypes

* Prevent duplicate methods.
* Save memory.
* Improve performance.
* Allow all instances to share behavior.
* Form the foundation of ES6 classes.
