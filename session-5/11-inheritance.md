# 🧬 Inheritance in JavaScript

## 📚 What is Inheritance?

Inheritance is one of the four fundamental principles of **Object-Oriented Programming (OOP)**.

It allows one class (called the **child class**) to reuse the properties and methods of another class (called the **parent class**).

Instead of rewriting the same code in multiple classes, we can write the shared functionality once in a parent class and let other classes inherit it.

### Benefits of Inheritance

* ✅ Avoids code duplication.
* ✅ Encourages code reuse.
* ✅ Makes applications easier to maintain.
* ✅ Makes code easier to organize.
* ✅ Allows child classes to add or customize functionality.

---

# 🤔 Why Do We Need Inheritance?

Imagine you're building a system with different types of users.

Every user has:

* Username
* ID
* Email
* Login functionality
* Ability to send messages

But administrators have additional permissions.

Without inheritance, we might write:

```javascript
class User {
  constructor(userName, userId, userEmail) {
    this.userName = userName;
    this.userId = userId;
    this.userEmail = userEmail;
  }

  login(password) {
    console.log(`Logging in with ${password}`);
  }

  sendMessage(message) {
    console.log(message);
  }
}
```

```javascript
class Admin {
  constructor(userName, userId, userEmail, permissions) {
    this.userName = userName;
    this.userId = userId;
    this.userEmail = userEmail;
    this.permissions = permissions;
  }

  login(password) {
    console.log(`Logging in with ${password}`);
  }

  sendMessage(message) {
    console.log(message);
  }

  deleteUser() {
    console.log("User deleted");
  }
}
```

Notice the duplication.

Both classes contain:

* `userName`
* `userId`
* `userEmail`
* `login()`
* `sendMessage()`

If we ever change the login logic, we'd need to update both classes.

This violates the **Don't Repeat Yourself (DRY)** principle.

---

# ✅ The Better Solution

Create a parent class that contains the common functionality.

Then let other classes inherit from it.

```
          User
            ▲
            │
     ┌──────┴──────┐
     │             │
   Admin        Doctor
```

---

# 👨‍👩‍👧 Parent Class

The parent class contains everything shared between different types of users.

```javascript
class User {
  constructor(userName, userId, userEmail) {
    this.userName = userName;
    this.userId = userId;
    this.userEmail = userEmail;
  }

  login(password) {
    console.log(`${this.userName} logged in using ${password}`);
  }

  sendMessage(message) {
    console.log(`${this.userName}: ${message}`);
  }
}
```

This class now becomes the blueprint for all user types.

---

# 👨‍💼 Child Class

A child class inherits from another class using the **extends** keyword.

```javascript
class Admin extends User {
  constructor(userName, userId, userEmail, permissions) {
    super(userName, userId, userEmail);

    this.permissions = permissions;
  }

  deleteUser() {
    console.log("User deleted");
  }
}
```

Now the `Admin` class automatically inherits:

* userName
* userId
* userEmail
* login()
* sendMessage()

It only defines what makes an admin unique.

---

# 🔍 Understanding `extends`

The syntax:

```javascript
class Admin extends User
```

means:

> "Admin is a specialized type of User."

Everything inside `User` becomes available inside `Admin`.

```
User
│
├── userName
├── userId
├── userEmail
├── login()
└── sendMessage()

        ↓ extends

Admin
│
├── inherits everything above
└── deleteUser()
```

---

# 🔍 Understanding `super()`

Inside every child constructor, we usually call:

```javascript
super(...)
```

`super()` calls the parent constructor.

Example:

```javascript
super(userName, userId, userEmail);
```

This initializes all properties defined in the parent class.

---

## Why is `super()` Required?

Consider this class:

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
}
```

Now suppose we write:

```javascript
class Admin extends User {
  constructor(name) {
    this.role = "Admin";
  }
}
```

This produces an error.

Why?

Because JavaScript requires the parent constructor to execute before accessing `this`.

Correct version:

```javascript
class Admin extends User {
  constructor(name) {
    super(name);

    this.role = "Admin";
  }
}
```

---

# 📝 Complete Example

```javascript
class User {
  constructor(userName, userId, userEmail) {
    this.userName = userName;
    this.userId = userId;
    this.userEmail = userEmail;
  }

  login(password) {
    console.log(`Login with password ${password}`);
  }

  sendMessage(message) {
    console.log(message);
  }
}

class Admin extends User {
  constructor(userName, userId, userEmail, permissions) {
    super(userName, userId, userEmail);

    this.permissions = permissions;
  }

  deleteUser() {
    console.log("User deleted");
  }
}

const admin = new Admin(
  "Ahmed",
  1,
  "ahmed@gmail.com",
  "Delete"
);

admin.login(12345);
admin.sendMessage("Hello");
admin.deleteUser();
```

### Output

```text
Login with password 12345
Hello
User deleted
```

---

# 🏥 Real-World Example: Medical System

Every person in a hospital system can:

* Log in
* Have a name
* Have an email

But each role has additional responsibilities.

---

## Parent Class

```javascript
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  login() {
    console.log(`${this.name} logged in`);
  }
}
```

---

## Doctor Class

```javascript
class Doctor extends User {
  constructor(name, email, specialty) {
    super(name, email);

    this.specialty = specialty;
  }

  diagnose() {
    console.log(`${this.name} is diagnosing patients`);
  }
}
```

---

## Admin Class

```javascript
class Admin extends User {
  deleteUser(userName) {
    console.log(`${this.name} deleted ${userName}`);
  }
}
```

---

## Usage

```javascript
const doctor = new Doctor(
  "Esraa",
  "esraa@gmail.com",
  "Cardiology"
);

doctor.login();
doctor.diagnose();

const admin = new Admin(
  "Mona",
  "mona@gmail.com"
);

admin.login();
admin.deleteUser("Ahmed");
```

### Output

```text
Esraa logged in
Esraa is diagnosing patients

Mona logged in
Mona deleted Ahmed
```

---

# 🏥 Another Example: Hospital Staff

```javascript
class MedicalStaff {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }

  clockIn() {
    console.log(`${this.name} (${this.role}) clocked in`);
  }
}
```

---

## Nurse

```javascript
class Nurse extends MedicalStaff {
  assist() {
    console.log(`${this.name} is assisting the doctor`);
  }
}
```

---

## Surgeon

```javascript
class Surgeon extends MedicalStaff {
  operate() {
    console.log(`${this.name} is performing surgery`);
  }
}
```

---

## Usage

```javascript
const nurse = new Nurse("Noura", "Nurse");

nurse.clockIn();
nurse.assist();

const surgeon = new Surgeon("Dr. Ali", "Surgeon");

surgeon.clockIn();
surgeon.operate();
```

### Output

```text
Noura (Nurse) clocked in
Noura is assisting the doctor

Dr. Ali (Surgeon) clocked in
Dr. Ali is performing surgery
```

---

# 🔍 How JavaScript Finds Methods

Suppose we call:

```javascript
admin.login();
```

JavaScript searches in the following order:

### Step 1

Look inside the object itself.

```
admin
```

Does it have `login()`?

❌ No.

---

### Step 2

Look inside:

```
Admin.prototype
```

Does it exist?

❌ No.

---

### Step 3

Continue searching in:

```
User.prototype
```

Found?

✅ Yes.

Execute it.

---

## Visualization

```
admin object
      │
      ▼
Admin.prototype
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

This searching process is called the **Prototype Chain**.

---

# 🎯 Method Overriding

Sometimes the child class wants to replace a method inherited from the parent.

This is called **Method Overriding**.

---

## Example

```javascript
class User {
  login() {
    console.log("User login");
  }
}

class Admin extends User {
  login() {
    console.log("Admin login");
  }
}

const admin = new Admin();

admin.login();
```

### Output

```text
Admin login
```

The child method completely replaces the parent method.

---

# 🎯 Calling the Parent Method with `super`

Sometimes we don't want to replace the parent's method completely.

Instead, we want to reuse it and then add extra behavior.

```javascript
class User {
  login() {
    console.log("User logged in");
  }
}

class Admin extends User {
  login() {
    super.login();

    console.log("Loading admin dashboard...");
  }
}

const admin = new Admin();

admin.login();
```

### Output

```text
User logged in
Loading admin dashboard...
```

Here:

```javascript
super.login();
```

calls the parent's implementation.

---

# 📊 Inheritance Keywords

| Keyword          | Purpose                              |
| ---------------- | ------------------------------------ |
| `extends`        | Makes one class inherit from another |
| `super()`        | Calls the parent constructor         |
| `super.method()` | Calls a parent method                |

---

# 📌 Parent vs Child Classes

| Parent Class                  | Child Class                        |
| ----------------------------- | ---------------------------------- |
| Contains shared functionality | Contains specialized functionality |
| Can exist on its own          | Depends on the parent              |
| Reused by many classes        | Extends or customizes the parent   |

---

# 📝 Summary

* Inheritance allows one class to reuse the properties and methods of another class.
* The parent class contains common functionality shared by multiple classes.
* Child classes inherit from the parent using the `extends` keyword.
* `super()` calls the parent constructor and initializes inherited properties.
* `super.method()` allows a child class to call a parent method.
* Child classes can add new properties and methods.
* Child classes can override inherited methods.
* JavaScript searches for inherited methods using the **prototype chain**.
* Inheritance reduces duplication, promotes code reuse, and makes applications easier to maintain.
