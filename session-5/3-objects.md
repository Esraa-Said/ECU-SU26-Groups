# 🎓 JavaScript Objects

# 📚 What is an Object?

An **Object** is a data structure used to store **related information** in the form of **key-value pairs**.

Each key-value pair is called a **property**.

An object can also contain **functions**, called **methods**, that describe the behavior of the object.

Objects are used to represent real-world entities such as:

* Users
* Students
* Cars
* Products
* Employees

For example, instead of storing a person's information in separate variables:

```javascript
const name = "Ali";
const age = 30;
const isStudent = false;
```

We can group them together inside one object.

```javascript
const person = {
  name: "Ali",
  age: 30,
  isStudent: false,
};
```

This makes the code cleaner and easier to organize.

---

# Object Structure

An object consists of:

* **Properties** → Store data.
* **Methods** → Functions that perform actions.

Example:

```javascript
const person = {
  // Properties
  name: "Ali",
  age: 30,
  isStudent: false,

  // Method
  greet() {
    console.log("Hello!");
  },
};
```

---

# Creating Objects

JavaScript provides two common ways to create objects.

---

## 1️⃣ Object Literal (Recommended)

The object literal syntax is the simplest and most commonly used way.

```javascript
const person = {
  name: "Ali",
  age: 30,
  isStudent: false,

  greet() {
    console.log("Hello!");
  },
};

console.log(person.name);

person.greet();
```

Output

```text
Ali
Hello!
```

---

## 2️⃣ Using the `new Object()` Constructor

Objects can also be created using the `Object` constructor.

```javascript
const person = new Object({
  name: "Ali",
  age: 30,
  isStudent: false,

  greet() {
    console.log("Hello!");
  },
});

console.log(person.name);

person.greet();
```

Output

```text
Ali
Hello!
```

Although both approaches work, object literals are shorter and preferred in modern JavaScript.

---

# Accessing Object Properties

There are two ways to access properties.

---

## 1️⃣ Dot Notation

Use a dot followed by the property name.

```javascript
const person = {
  name: "Ali",
  age: 30,
  isStudent: false,
};

console.log(person.name);
console.log(person.age);
console.log(person.isStudent);
```

Output

```text
Ali
30
false
```

---

## 2️⃣ Bracket Notation

Use square brackets with the property name as a string.

```javascript
const person = {
  name: "Ali",
  age: 30,
};

console.log(person["name"]);
console.log(person["age"]);
```

Output

```text
Ali
30
```

---

## When Should You Use Bracket Notation?

Bracket notation is useful when the property name is stored inside a variable.

```javascript
const key = "country";

const user = {
  username: "Ali",
  country: "Egypt",
};

console.log(user[key]);
```

Output

```text
Egypt
```

Using dot notation here would look for a property literally named `key`.

```javascript
console.log(user.key);
```

Output

```text
undefined
```

---

## Properties with Spaces

If a property contains spaces, bracket notation must be used.

```javascript
const user = {
  "my age": 45,
};

console.log(user["my age"]);
```

Output

```text
45
```

The following is invalid:

```javascript
user.my age
```

---

# Adding and Updating Properties

Objects are mutable, meaning their properties can be changed after creation.

---

## Updating a Property

```javascript
const user = {
  username: "Ali",
};

user.username = "Mohamed";

console.log(user.username);
```

Output

```text
Mohamed
```

---

## Adding a New Property

```javascript
const user = {
  username: "Ali",
};

user.age = 40;

console.log(user);
```

Output

```text
{
  username: "Ali",
  age: 40
}
```

---

# Adding and Updating Methods

Methods can also be changed or added after the object is created.

---

## Updating a Method

```javascript
const user = {
  username: "Ali",

  sayHi() {
    console.log("Hi!");
  },
};

user.sayHi = function () {
  console.log("Hi from the updated method!");
};

user.sayHi();
```

Output

```text
Hi from the updated method!
```

---

## Adding a New Method

```javascript
user.sayBye = function () {
  console.log("Goodbye!");
};

user.sayBye();
```

Output

```text
Goodbye!
```

---

# Nested Objects

Objects can contain other objects.

This allows us to represent more complex data.

```javascript
const student = {
  name: "Sara",

  contact: {
    email: "sara@example.com",

    phone: {
      mobile: "01000000000",
      home: "023456789",
    },
  },

  grades: {
    math: 90,
    science: 85,
  },
};

console.log(student.name);
console.log(student.contact.email);
console.log(student.contact.phone.mobile);
console.log(student.grades.math);
```

Output

```text
Sara
sara@example.com
01000000000
90
```

---

# Real-Life Example

Objects are commonly used to model real-world entities.

```javascript
const product = {
  name: "Headphones",
  price: 100,
  taxRate: 0.15,

  getTotalPrice() {
    return this.price + this.price * this.taxRate;
  },
};

console.log(product.getTotalPrice());
```

Output

```text
115
```

Here:

* `name`, `price`, and `taxRate` are properties.
* `getTotalPrice()` is a method that calculates the final price.

---

