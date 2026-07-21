# 🎓 JavaScript Object-Oriented Programming (OOP)

# 📚 What is Object-Oriented Programming (OOP)?

**Object-Oriented Programming (OOP)** is a programming paradigm that organizes code around **objects**.

An **object** represents a real-world entity and contains:

* **Properties** → Data that describes the object.
* **Methods** → Functions that define the object's behavior.

Objects are usually created from **classes**, which act as templates (blueprints).

---

## Why Do We Need OOP?

As applications grow larger, writing repeated objects becomes difficult to maintain.

OOP helps us:

* 🧩 Organize code into logical units.
* 🔁 Reuse code instead of rewriting it.
* 🛠 Make applications easier to maintain.
* ➕ Easily extend existing code with new features.
* 🌍 Represent real-world objects such as Cars, Students, Employees, Products, and Bank Accounts.

---

# Without OOP

Imagine we are creating multiple cars.

```javascript
const car1 = {
  make: "Toyota",
  year: 2020,

  drive() {
    console.log("Driving...");
  }
};

const car2 = {
  make: "Honda",
  year: 2022,

  drive() {
    console.log("Driving...");
  }
};

const car3 = {
  make: "BMW",
  year: 2024,

  drive() {
    console.log("Driving...");
  }
};
```

---

## What's the Problem?

Notice that every object contains the same `drive()` method.

If we decide to change it:

```javascript
drive() {
    console.log("The car is moving...");
}
```

We must update **every object manually**.

As the number of cars grows, the code becomes repetitive and difficult to maintain.

This is where OOP becomes useful.

---

# Classes

## What is a Class?

A **Class** is a blueprint used to create objects.

Instead of writing every object manually, we define the structure once.

Then we create as many objects as we need.

---

## Relationship

```text
Class
   │
   ▼
Create Object (Instance)
```

or

```text
Class
   │
Instantiate
   │
   ▼
Object (Instance)
```

A **Class** describes how an object should look.

An **Object (Instance)** is an actual object created from that class.

---

# Creating a Class

## Syntax

```javascript
class ClassName {

}
```

---

## Example: Car Class

```javascript
class Car {
  constructor(make, year) {
    this.make = make;
    this.year = year;
  }

  drive() {
    console.log(`${this.make} is driving.`);
  }
}
```

---

## Creating Objects (Instances)

```javascript
const car1 = new Car("Toyota", 2020);
const car2 = new Car("BMW", 2024);
const car3 = new Car("Honda", 2022);
```

---

## Calling Methods

```javascript
car1.drive();
car2.drive();
car3.drive();
```

Output

```text
Toyota is driving.
BMW is driving.
Honda is driving.
```

---

## What Happened?

The class contains only **one copy** of the `drive()` method.

Every object created from the class can use it.

This avoids code duplication.

---

# Constructor

## What is a Constructor?

A **constructor** is a special method that runs automatically whenever a new object is created.

Its main purpose is to initialize the object's properties.

---

## Syntax

```javascript
constructor(parameters) {

}
```

---

## Example

```javascript
class Student {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const student = new Student("Esraa", 22);

console.log(student);
```

Output

```text
Student { name: 'Esraa', age: 22 }
```

---

# Properties vs Methods

A class usually contains:

## Properties

Store information about the object.

Example

```javascript
this.name
this.age
this.salary
```

---

## Methods

Functions that perform actions.

Example

```javascript
displayInfo()
drive()
study()
```

---

## Example

```javascript
class Phone {
  constructor(brand, price) {
    this.brand = brand;
    this.price = price;
  }

  call() {
    console.log(`${this.brand} is calling...`);
  }
}

const phone = new Phone("Samsung", 30000);

phone.call();
```

Output

```text
Samsung is calling...
```

---


# Advantages of OOP

* Reduces code duplication.
* Makes code easier to organize.
* Encourages reusable components.
* Simplifies maintenance.
* Models real-world objects naturally.
* Makes large applications easier to manage.

---
