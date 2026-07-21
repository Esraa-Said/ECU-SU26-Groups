# 📦 Static Properties and Methods in JavaScript

## 📚 What Does `static` Mean?

Normally, when we create a class, its properties and methods belong to the **objects (instances)** created from that class.

Each object has its own properties, and all objects can use the class methods.

```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`Hello ${this.name}`);
  }
}

const user = new User("Esraa");

user.sayHello();
```

### Output

```text
Hello Esraa
```

Here:

- `name` belongs to each object.
- `sayHello()` is an instance method that every object can use.

---

# 🤔 Why Do We Need Static Members?

Sometimes we need data or functionality that belongs to the **class itself**, not to any individual object.

For example:

- Count how many users were created.
- Create utility functions.
- Store application configuration.
- Validate data.

This information doesn't belong to a specific object.

JavaScript provides the **`static`** keyword for this purpose.

---

# 📌 Instance Members vs Static Members

Before learning the syntax, it's important to understand the difference.

## Instance Members

Belong to every object.

```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello ${this.name}`);
  }
}

const user = new User("Esraa");

console.log(user.name);
user.greet();
```

Output

```text
Esraa
Hello Esraa
```

---

## Static Members

Belong to the class itself.

```javascript
class User {
  static company = "OpenAI";
}

console.log(User.company);
```

Output

```text
OpenAI
```

Notice:

```javascript
User.company
```

Not

```javascript
user.company
```

---

# 🏗 Static Properties

A static property stores data shared by the entire class.

Instead of every object having its own copy, there is only **one shared property**.

## Example: Counting Users

```javascript
class User {
  static count = 0;

  constructor(name) {
    this.name = name;

    User.count++;
  }
}

const user1 = new User("Esraa");
const user2 = new User("Ahmed");
const user3 = new User("Sara");

console.log(User.count);
```

Output

```text
3
```

Every time a new object is created:

```javascript
User.count++;
```

increments the shared counter.

---

## Why Isn't `count` an Instance Property?

Imagine if we wrote:

```javascript
this.count = 0;
```

Each object would have its own counter.

```
user1.count = 0
user2.count = 0
user3.count = 0
```

This doesn't tell us the total number of users.

The total count belongs to the **class**, so it should be static.

---

# 🏗 Static Methods

Static methods also belong to the class.

They are called directly from the class without creating an object.

```javascript
class User {
  static sayHello() {
    console.log("Hello from User class");
  }
}

User.sayHello();
```

Output

```text
Hello from User class
```

---

# ❌ Static Methods Cannot Be Called on Objects

```javascript
class User {
  static sayHello() {
    console.log("Hello");
  }
}

const user = new User();

user.sayHello();
```

Output

```text
TypeError: user.sayHello is not a function
```

Because:

- `sayHello()` belongs to the class.
- It does **not** belong to individual objects.

---

# 🔍 Instance vs Static

```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello ${this.name}`);
  }

  static sayHello() {
    console.log("Hello from class");
  }
}

const user = new User("Esraa");

user.greet();

User.sayHello();
```

Output

```text
Hello Esraa
Hello from class
```

Incorrect usage:

```javascript
user.sayHello(); // ❌
User.greet();    // ❌
```

Both produce:

```text
TypeError
```

---

# 🏦 Real Example: Bank Account Counter

Suppose we're building a banking system.

Every account is different:

- owner
- balance

But the bank also wants to know:

> How many accounts have been created?

This belongs to the bank, not to individual accounts.

```javascript
class BankAccount {
  static totalAccounts = 0;

  constructor(owner) {
    this.owner = owner;

    BankAccount.totalAccounts++;
  }
}

new BankAccount("Esraa");
new BankAccount("Ahmed");
new BankAccount("Sara");

console.log(BankAccount.totalAccounts);
```

Output

```text
3
```

---

# 🚗 Real Example: Car Factory

```javascript
class Car {
  static count = 0;

  constructor(brand) {
    this.brand = brand;

    Car.count++;
  }

  static showCount() {
    console.log(`Cars produced: ${Car.count}`);
  }
}

new Car("BMW");
new Car("Audi");
new Car("Mercedes");

Car.showCount();
```

Output

```text
Cars produced: 3
```

---

# 🧮 Real Example: Utility Class

Sometimes we don't need objects at all.

We simply want helper functions.

```javascript
class MathHelper {
  static add(a, b) {
    return a + b;
  }

  static subtract(a, b) {
    return a - b;
  }

  static multiply(a, b) {
    return a * b;
  }

  static divide(a, b) {
    return a / b;
  }
}

console.log(MathHelper.add(5, 3));
console.log(MathHelper.multiply(4, 6));
```

Output

```text
8
24
```

Notice that we never created an object.

```javascript
const math = new MathHelper();
```

is unnecessary.

---

# 📋 Real Example: Validation Helper

```javascript
class Validator {
  static isEmail(email) {
    return email.includes("@");
  }

  static isAdult(age) {
    return age >= 18;
  }
}

console.log(Validator.isEmail("esraa@email.com"));
console.log(Validator.isAdult(20));
```

Output

```text
true
true
```

Again, no object is needed.

---

# 🔍 What Does `this` Mean Inside a Static Method?

Inside a static method, `this` refers to the **class itself**.

```javascript
class User {
  static sayHello() {
    console.log(this);
  }
}

User.sayHello();
```

Output

```text
[class User]
```

So inside a static method:

```javascript
this === User
```

---

## Example

```javascript
class User {
  static company = "OpenAI";

  static printCompany() {
    console.log(this.company);
  }
}

User.printCompany();
```

Output

```text
OpenAI
```

Here:

```javascript
this === User
```

So JavaScript reads:

```javascript
User.company
```

---

# ❌ Can Static Methods Access Instance Properties?

No.

Instance properties belong to objects.

Static methods belong to the class.

```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  static printName() {
    console.log(this.name);
  }
}

User.printName();
```

Output

```text
undefined
```

Because:

```javascript
this === User
```

The class has no property named `name`.

---

## Correct Way

```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(this.name);
  }
}

const user = new User("Esraa");

user.greet();
```

Output

```text
Esraa
```

---

# 🔄 Can Instance Methods Access Static Members?

Not directly.

```javascript
class User {
  static company = "OpenAI";

  showCompany() {
    console.log(this.company);
  }
}

const user = new User();

user.showCompany();
```

Output

```text
undefined
```

Because:

```javascript
this === user
```

The object doesn't have a `company` property.

---

## Correct Way

Use the class name.

```javascript
class User {
  static company = "OpenAI";

  showCompany() {
    console.log(User.company);
  }
}

const user = new User();

user.showCompany();
```

Output

```text
OpenAI
```

---



