# 🎓 The Complete Guide to Getters & Setters in JavaScript

## 📚 Introduction

When developing real-world applications, we often need to protect an object's data from being modified incorrectly.

For example:

* A user's username should not be empty.
* A product's price should never be negative.
* A bank account balance should not be modified directly.
* An email should always have a valid format.

If anyone can freely modify an object's properties, the application may end up with invalid or inconsistent data.

To solve this problem, JavaScript provides **Getters** and **Setters**.

They allow us to control **how properties are read and modified** while still letting developers use them like normal object properties.

---

# 📖 What are Getters and Setters?

A **Getter** is a special method that automatically runs whenever a property is **read**.

A **Setter** is a special method that automatically runs whenever a property is **assigned a new value**.

Unlike normal methods, getters and setters are used like ordinary properties.

Example:

```javascript
user.name = "Esraa";   // Calls the setter automatically
console.log(user.name); // Calls the getter automatically
```

The developer does not need to write:

```javascript
user.setName("Esraa");
console.log(user.getName());
```

This results in cleaner and more natural code.

---

# 🎯 Why Do We Need Getters and Setters?

Without getters and setters:

* Anyone can modify object data directly.
* Invalid values can easily be stored.
* Validation logic becomes scattered throughout the application.
* Business rules become difficult to maintain.

With getters and setters:

* All validation happens in one place.
* Internal data remains protected.
* Developers can interact with properties naturally.
* Future changes become much easier.

---

# ❌ Traditional Approach

Before getters and setters, developers usually wrote two methods:

* A setter method
* A getter method

Example:

```javascript
class User {
  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

const user = new User();

user.setName("Esraa");

console.log(user.getName());
```

Output

```text
Esraa
```

This works, but it has several problems.

---

## Problems with the Traditional Approach

### 1. Unnatural Syntax

Instead of writing:

```javascript
user.name = "Esraa";
```

you must write:

```javascript
user.setName("Esraa");
```

Reading values also requires another method:

```javascript
console.log(user.getName());
```

This becomes repetitive.

---

### 2. Easy to Bypass

Suppose another developer writes:

```javascript
user.name = "";
```

Now the validation inside `setName()` is completely ignored.

The object's state becomes invalid.

---

### 3. Validation Is Hard to Maintain

Suppose your project later requires usernames to have at least 5 characters.

If validation is not centralized, you'll need to search through the project and update multiple places.

This increases maintenance costs.

---

# ✨ The Smart Solution

JavaScript introduces two special keywords:

```javascript
get
```

and

```javascript
set
```

These create methods that behave like normal properties.

Example syntax:

```javascript
class User {
  set name(value) {
    // validation
  }

  get name() {
    return value;
  }
}
```

Notice that we don't call them like methods.

Instead:

```javascript
user.name = "Esraa";
```

and

```javascript
console.log(user.name);
```

---

# How Setters Work

A setter automatically executes whenever a property receives a new value.

Example:

```javascript
class User {
  #name;

  set name(value) {
    this.#name = value;
  }

  get name() {
    return this.#name;
  }
}

const user = new User();

user.name = "Esraa";

console.log(user.name);
```

Output

```text
Esraa
```

Even though it looks like a normal property assignment, JavaScript actually executes the setter behind the scenes.

---

# How Getters Work

A getter automatically executes whenever a property is read.

Example:

```javascript
class Student {
  #grade = 90;

  get grade() {
    return this.#grade;
  }
}

const student = new Student();

console.log(student.grade);
```

Output

```text
90
```

JavaScript automatically calls the getter.

---

# Example 1: User Profile System

A common real-world use case is validating user information.

```javascript
class User {
  #name;
  #email;

  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  set name(value) {
    if (value.trim().length < 3) {
      console.log("❌ Name must contain at least 3 characters.");
      return;
    }

    this.#name = value;
  }

  get name() {
    return this.#name;
  }

  set email(value) {
    if (!value.includes("@")) {
      console.log("❌ Invalid email address.");
      return;
    }

    this.#email = value;
  }

  get email() {
    return this.#email;
  }
}

const user = new User("Esraa", "esraa@email.com");

console.log(user.name);

user.name = "Ali";

console.log(user.name);

user.name = "Mo";
```

Output

```text
Esraa
Ali
❌ Name must contain at least 3 characters.
```

Notice that the invalid value is rejected and the previous value remains unchanged.

---


# Example 2: Product Pricing System

Getters are also useful for **computed properties**.

Sometimes a value doesn't need to be stored because it can be calculated whenever needed.

Example:

```javascript
class Product {
  #price;

  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  set price(value) {
    if (value <= 0) {
      console.log("❌ Price must be greater than zero.");
      return;
    }

    this.#price = value;
  }

  get price() {
    return this.#price;
  }

  get priceWithTax() {
    return this.#price * 1.14;
  }
}

const phone = new Product("iPhone", 1000);

console.log(phone.price);

console.log(phone.priceWithTax);
```

Output

```text
1000
1140
```

Notice that:

```javascript
priceWithTax
```

is not stored anywhere.

It is calculated every time it is requested.

---


# Example 3: Bank Account System

Some operations represent **actions**, not properties.

Depositing money is an action.

Withdrawing money is an action.

Therefore they should remain regular methods.

```javascript
class BankAccount {
  #balance = 0;

  constructor(owner) {
    this.owner = owner;
  }

  get balance() {
    return this.#balance;
  }

  deposit(amount) {
    if (amount <= 0) {
      console.log("❌ Invalid deposit.");
      return;
    }

    this.#balance += amount;

    console.log(`Deposited $${amount}`);
  }

  withdraw(amount) {
    if (amount > this.#balance) {
      console.log("❌ Insufficient balance.");
      return;
    }

    this.#balance -= amount;

    console.log(`Withdrawn $${amount}`);
  }
}

const account = new BankAccount("Esraa");

account.deposit(500);

account.withdraw(200);

console.log(account.balance);
```

Output

```text
Deposited $500
Withdrawn $200
300
```

---


# Getters for Computed Values

Getters don't have to return stored data.

They can calculate values.

Example:

```javascript
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  get area() {
    return this.width * this.height;
  }
}

const rectangle = new Rectangle(10, 5);

console.log(rectangle.area);
```

Output

```text
50
```

Notice that `area` behaves like a property.

---

# Setters with Validation

A setter can reject invalid data.

Example:

```javascript
class Student {
  #grade = 0;

  set grade(value) {
    if (value >= 0 && value <= 100) {
      this.#grade = value;
    } else {
      console.log("Invalid grade");
    }
  }

  get grade() {
    return this.#grade;
  }
}

const student = new Student();

student.grade = 95;

console.log(student.grade);

student.grade = 150;
```

Output

```text
95
Invalid grade
```

---

# When Should You Use a Getter?

Use a getter when:

* Reading private data.
* Calculating a value.
* Formatting output.
* Hiding implementation details.

Examples:

* Full name
* Total price
* Tax amount
* Rectangle area

---

# When Should You Use a Setter?

Use a setter when:

* Validation is required.
* Data must be protected.
* Additional logic should run before storing data.

Examples:

* Username
* Password
* Email
* Product price
* Student grade

---

# Getter vs Setter

| Getter              | Setter                           |
| ------------------- | -------------------------------- |
| Reads a property    | Writes a property                |
| Uses `get` keyword  | Uses `set` keyword               |
| Takes no parameters | Takes one parameter              |
| Returns a value     | Usually stores or validates data |

---

