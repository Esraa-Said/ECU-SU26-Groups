# 🎓 ES6 Classes in JavaScript

## 📚 Introduction

As applications grow larger, we often need to create many objects that share the same structure and behavior.

For example, imagine building a school management system. You may have hundreds of students, teachers, and courses. Writing every object manually would result in a lot of duplicated code.

ES6 introduced **Classes** to make object creation cleaner and easier.

> **A class is a blueprint used to create multiple objects with the same properties and methods.**

Although classes look like a completely new feature, they are actually **syntactic sugar** built on top of JavaScript's prototype system.

---

# 🤔 Why Do We Need Classes?

Without classes, creating many similar objects requires repeating the same structure.

## Example Without Classes

```javascript
const user1 = {
  name: "Ahmed",
  age: 22,

  greet() {
    console.log(`Hello ${this.name}`);
  },
};

const user2 = {
  name: "Sara",
  age: 25,

  greet() {
    console.log(`Hello ${this.name}`);
  },
};

const user3 = {
  name: "Ali",
  age: 30,

  greet() {
    console.log(`Hello ${this.name}`);
  },
};
```

### Problems

- Lots of repeated code.
- Difficult to maintain.
- If you change the structure, every object must be updated.
- Not scalable for large applications.

Classes solve this by defining the structure once and creating as many objects as needed.

---

# 🏗️ What is a Class?

A class is a template that defines:

- The **properties** (data) each object should have.
- The **methods** (behavior) each object can perform.

Think of it like a blueprint for a building.

```text
Blueprint
      ↓
    Class
      ↓
Objects (Instances)
```

---

# 📝 Basic Class Syntax

```javascript
class Person {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
}
```

A class usually contains:

- Class name
- Constructor
- Methods

---

# 📛 Class Names

By convention, class names begin with a capital letter.

Good examples:

```javascript
class User {}

class Student {}

class Product {}

class Car {}
```

Bad example:

```javascript
class user {}
```

Using PascalCase makes classes easy to recognize.

---

# 🔨 The Constructor Method

The constructor is a special method that runs automatically whenever a new object is created.

```javascript
class Person {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
}
```

The constructor initializes the object's properties.

---

## Example

```javascript
class Student {
  constructor(name, grade) {
    this.name = name;
    this.grade = grade;
  }
}

const student = new Student("Esraa", "A");

console.log(student);
```

Output

```text
Student {
  name: "Esraa",
  grade: "A"
}
```

---

# 🎯 Understanding `this`

Inside a class, `this` refers to the object currently being created or used.

Example:

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
}

const user = new User("Ahmed");

console.log(user.name);
```

Output

```text
Ahmed
```

During construction:

```text
this === user
```

So JavaScript performs something similar to:

```javascript
user.name = "Ahmed";
```

---

# ✨ Creating Objects

Objects are created using the `new` keyword.

```javascript
const person1 = new Person("Ahmed", 2000);
const person2 = new Person("Sara", 1998);
const person3 = new Person("Ali", 2001);
```

Each object stores its own values.

```javascript
console.log(person1.firstName);
console.log(person2.firstName);
console.log(person3.firstName);
```

Output

```text
Ahmed
Sara
Ali
```

---

# ⚙️ Adding Methods

Methods are functions that belong to objects created from the class.

```javascript
class Person {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  greet() {
    console.log(`Hello ${this.firstName}`);
  }
}
```

Using the method:

```javascript
const person = new Person("Ahmed", 2000);

person.greet();
```

Output

```text
Hello Ahmed
```

---

## Another Example

```javascript
class Car {
  constructor(brand, year) {
    this.brand = brand;
    this.year = year;
  }

  drive() {
    console.log(`${this.brand} is driving`);
  }
}

const car = new Car("Toyota", 2025);

car.drive();
```

Output

```text
Toyota is driving
```

---

# 📦 Multiple Objects From One Class

One class can create many different objects.

```javascript
class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }

  showInfo() {
    console.log(`${this.name} earns ${this.salary}`);
  }
}

const emp1 = new Employee("Ahmed", 8000);
const emp2 = new Employee("Sara", 9000);
const emp3 = new Employee("Ali", 7000);

emp1.showInfo();
emp2.showInfo();
emp3.showInfo();
```

Output

```text
Ahmed earns 8000
Sara earns 9000
Ali earns 7000
```

---

# 🚗 Real-Life Example

Let's model a car.

```javascript
class Car {
  constructor(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  start() {
    console.log(`${this.brand} ${this.model} started`);
  }

  stop() {
    console.log(`${this.brand} ${this.model} stopped`);
  }
}

const car1 = new Car("Toyota", "Corolla", 2024);
const car2 = new Car("BMW", "X5", 2023);

car1.start();
car2.stop();
```

Output

```text
Toyota Corolla started
BMW X5 stopped
```

---

# 🎓 Student Example

```javascript
class Student {
  constructor(name, age, grade) {
    this.name = name;
    this.age = age;
    this.grade = grade;
  }

  introduce() {
    console.log(
      `My name is ${this.name}. I am ${this.age} years old.`
    );
  }

  showGrade() {
    console.log(`Grade: ${this.grade}`);
  }
}

const student = new Student("Esraa", 22, "A");

student.introduce();
student.showGrade();
```

Output

```text
My name is Esraa. I am 22 years old.
Grade: A
```

---

# 🧠 Where Are Methods Stored?

One important feature of classes is that methods are **not copied** into every object.

Example:

```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  login() {
    console.log(`${this.name} logged in`);
  }
}

const user1 = new User("Ahmed");
const user2 = new User("Sara");

console.log(user1.login === user2.login);
```

Output

```text
true
```

Both objects share the same method through the prototype.

This saves memory.

---

# 🔍 Classes and Prototypes

Although we write:

```javascript
class User {
  login() {}
}
```

JavaScript internally does something similar to:

```javascript
function User(name) {
  this.name = name;
}

User.prototype.login = function () {};
```

So classes are simply cleaner syntax built on top of prototypes.

---

# 🚫 What Happens If We Forget `new`?

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
}

const user = User("Ahmed");
```

Output

```text
TypeError: Class constructor User cannot be invoked without 'new'
```

Unlike constructor functions, ES6 classes **must** be called using `new`.

Correct usage:

```javascript
const user = new User("Ahmed");
```

---

# 🆚 Constructor Function vs ES6 Class

## Constructor Function

```javascript
function User(name) {
  this.name = name;
}

User.prototype.sayHello = function () {
  console.log(`Hello ${this.name}`);
};
```

---

## ES6 Class

```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`Hello ${this.name}`);
  }
}
```

Both produce almost the same result.

The class version is simply easier to read and write.

---

# 🚗 Complete Example

```javascript
class Car {
  constructor(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  start() {
    console.log(`${this.brand} ${this.model} started`);
  }

  showDetails() {
    console.log(
      `${this.brand} ${this.model} (${this.year})`
    );
  }
}

const car1 = new Car("Toyota", "Corolla", 2024);
const car2 = new Car("BMW", "X5", 2023);

car1.showDetails();
car1.start();

car2.showDetails();
car2.start();
```

Output

```text
Toyota Corolla (2024)
Toyota Corolla started

BMW X5 (2023)
BMW X5 started
```

---

# 🚀 Advantages of ES6 Classes

- Cleaner syntax than constructor functions.
- Easier to organize code.
- Automatically uses prototypes for methods.
- Reduces duplicated code.
- Makes applications easier to read and maintain.
- Familiar syntax for developers coming from languages like Java or C#.

---

