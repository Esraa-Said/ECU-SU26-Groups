# 🎓 Encapsulation in JavaScript

## 📚 What is Encapsulation?

**Encapsulation** is one of the four main principles of **Object-Oriented Programming (OOP)**.

It is the practice of **bundling data (properties) and behavior (methods) inside a class**, while **restricting direct access** to some of the object's internal data.

Instead of allowing anyone to modify an object's data directly, the object controls how its data is read or changed.

> **Simple Definition:**
>
> Encapsulation means **protecting an object's data by allowing access only through controlled methods.**

---

# 🎯 Why Do We Need Encapsulation?

Imagine a bank account.

Should anyone be able to change the account balance directly?

```javascript
account.balance = 1000000;
```

Of course not!

The balance should only change through operations such as:

* Deposit money
* Withdraw money

Encapsulation helps enforce these rules.

---

## Benefits of Encapsulation

Encapsulation provides several important advantages:

* 🔒 Protects sensitive data from direct modification.
* ✅ Validates data before changing it.
* 🛠 Makes code easier to maintain.
* 📦 Hides implementation details.
* 🚫 Prevents objects from entering invalid states.
* 🔄 Makes future changes easier without affecting other code.

---

# ❌ Without Encapsulation

Suppose we create a simple bank account.

```javascript
class Account {
  balance = 0;

  deposit(amount) {
    this.balance += amount;
  }
}

const account = new Account();

account.deposit(500);

console.log(account.balance);
```

Output

```text
500
```

Everything looks fine.

However, because `balance` is public, anyone can modify it.

```javascript
account.balance = -10000;

console.log(account.balance);
```

Output

```text
-10000
```

---

## Why Is This a Problem?

Nothing prevents another developer from writing:

```javascript
account.balance = -999999;
```

or

```javascript
account.balance = "Hello";
```

Now the object contains invalid data.

The class has no control over its own state.

---

# 🔐 Private Fields

Modern JavaScript allows us to create **private properties** using the `#` symbol.

A private field can only be accessed from inside the class.

Syntax:

```javascript
class Example {
  #privateValue = 10;
}
```

Any attempt to access it outside the class will cause an error.

---

# Using Private Fields

Let's improve the Account class.

```javascript
class Account {
  #balance = 0;

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
    }
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
    }
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new Account();

account.deposit(1000);
account.withdraw(300);

console.log(account.getBalance());
```

Output

```text
700
```

---

## What Changed?

Previously:

```javascript
balance
```

was public.

Now:

```javascript
#balance
```

is private.

Only methods inside the class can access it.

---

# Trying to Access a Private Field

Suppose we write:

```javascript
const account = new Account();

console.log(account.#balance);
```

Output

```text
SyntaxError
```

Or:

```javascript
account.#balance = 5000;
```

Output

```text
SyntaxError
```

JavaScript completely prevents access to private fields from outside the class.

---

# Controlled Access Through Methods

Instead of exposing data directly, we provide methods.

```javascript
class Account {
  #balance = 0;

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
    }
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new Account();

account.deposit(500);

console.log(account.getBalance());
```

Output

```text
500
```

The object decides how its data is accessed.

---

# Encapsulation with Validation

One of the biggest benefits of encapsulation is validating data before storing it.

Example:

```javascript
class User {
  #username;
  #password;

  constructor(username, password) {
    this.setUsername(username);
    this.setPassword(password);
  }

  setUsername(name) {
    if (name.length < 3) {
      console.log("Username must contain at least 3 characters.");
      return;
    }

    this.#username = name;
  }

  setPassword(password) {
    if (password.length < 6) {
      console.log("Password must contain at least 6 characters.");
      return;
    }

    this.#password = password;
  }

  getUsername() {
    return this.#username;
  }
}

const user = new User("Esraa", "123456");

console.log(user.getUsername());

user.setPassword("123");
```

Output

```text
Esraa
Password must contain at least 6 characters.
```

---

# Another Example: Student Grades

Suppose a student's grade must always be between **0 and 100**.

Without encapsulation:

```javascript
class Student {
  grade = 90;
}

const student = new Student();

student.grade = 500;

console.log(student.grade);
```

Output

```text
500
```

This is clearly invalid.

---

## Using Encapsulation

```javascript
class Student {
  #grade = 0;

  setGrade(value) {
    if (value >= 0 && value <= 100) {
      this.#grade = value;
    } else {
      console.log("Invalid grade");
    }
  }

  getGrade() {
    return this.#grade;
  }
}

const student = new Student();

student.setGrade(95);

console.log(student.getGrade());

student.setGrade(150);
```

Output

```text
95
Invalid grade
```

The object now protects its own data.

---

# Real-World Example: Car Speed

```javascript
class Car {
  #speed = 0;

  accelerate(amount) {
    if (amount > 0) {
      this.#speed += amount;
    }
  }

  brake(amount) {
    if (amount > 0) {
      this.#speed = Math.max(0, this.#speed - amount);
    }
  }

  getSpeed() {
    return this.#speed;
  }
}

const car = new Car();

car.accelerate(60);
console.log(car.getSpeed());

car.brake(20);
console.log(car.getSpeed());
```

Output

```text
60
40
```

The speed can only change through controlled methods.

---

# Public vs Private Members

| Public                   | Private                                    |
| ------------------------ | ------------------------------------------ |
| Accessible from anywhere | Accessible only inside the class           |
| No `#` prefix            | Uses `#` prefix                            |
| Can be modified directly | Can only be modified through class methods |

Example:

```javascript
class Example {
  publicValue = 10;
  #privateValue = 20;
}
```

---

# When Should You Use Encapsulation?

Encapsulation is useful whenever an object's data should be protected.

Common examples include:

* 💳 Bank accounts
* 👤 User accounts
* 🔐 Passwords
* 🛒 Shopping carts
* 🎓 Student grades
* 📦 Inventory systems
* 🚗 Vehicle speed
* ❤️ Medical records

In all of these cases, data should only be changed through controlled methods.

---

# Advantages of Encapsulation

✅ Protects sensitive data.

✅ Prevents invalid values.

✅ Makes debugging easier.

✅ Keeps implementation details hidden.

✅ Improves code organization.

✅ Makes applications easier to maintain.

---
