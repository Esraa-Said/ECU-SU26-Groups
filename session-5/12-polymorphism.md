# 🎭 Polymorphism in JavaScript

# 📚 What is Polymorphism?

**Polymorphism** is one of the four fundamental principles of **Object-Oriented Programming (OOP)**.

The word comes from two Greek words:

```text
Poly  = Many
Morph = Forms
```

So, **Polymorphism** literally means:

> **"Many Forms"**

In programming, polymorphism means that **the same method name can have different behaviors depending on the object that calls it.**

Instead of writing different method names for similar actions, every object can use the same method name while providing its own implementation.

---

# 💡 Real-Life Analogy

Imagine a remote control with a **Power** button.

You can use the same button on different devices:

* TV → Turns the TV on.
* Air Conditioner → Turns the AC on.
* Projector → Turns the projector on.

Although you press the same button, each device performs a different action.

This is exactly how polymorphism works.

```text
Power Button
      ↓
TV           → Turn TV On
AC           → Turn AC On
Projector    → Turn Projector On
```

The interface is the same, but the behavior is different.

---

# 🤔 Why Do We Need Polymorphism?

Without polymorphism, applications usually become filled with condition statements.

For example, imagine a medical system where each user type performs a different action.

```javascript
if (userType === "Admin") {
  // Admin logic
} else if (userType === "Doctor") {
  // Doctor logic
} else if (userType === "Patient") {
  // Patient logic
}
```

### Problems

* The code becomes longer as new user types are added.
* Every time a new type is introduced, existing code must be modified.
* The application becomes harder to maintain.
* Violates the **Open/Closed Principle** (software should be open for extension but closed for modification).

Instead, each object should decide how it behaves.

That's exactly what polymorphism allows.

---

# 🎯 Main Idea

Different objects respond differently to the **same method**.

For example:

```javascript
animal.speak();
```

The method name is always:

```javascript
speak()
```

But each object provides its own implementation.

```text
Animal  → Generic animal sound
Cat     → Meow
Cow     → Moo
Dog     → Bark
```

Same method name.

Different behavior.

---

# 🐾 Basic Example

```javascript
class Animal {
  speak() {
    console.log("Generic animal sound");
  }
}

class Cat extends Animal {
  speak() {
    console.log("Meow");
  }
}

class Cow extends Animal {
  speak() {
    console.log("Moo");
  }
}

const animal = new Animal();
const cat = new Cat();
const cow = new Cow();

animal.speak();
cat.speak();
cow.speak();
```

### Output

```text
Generic animal sound
Meow
Moo
```

Notice:

Every object uses:

```javascript
speak()
```

But each object executes its own version.

This is **polymorphism**.

---

# 🔄 How Does It Work?

When JavaScript executes:

```javascript
cat.speak();
```

It first looks inside the `Cat` class.

```
Cat
 │
 └── speak() ✅
```

Since it finds the method there, it executes it.

When JavaScript executes:

```javascript
cow.speak();
```

It finds:

```
Cow
 │
 └── speak() ✅
```

Each class overrides the parent implementation.

---

# 🔄 Polymorphism with Arrays

One of the biggest advantages of polymorphism is that different objects can be treated in exactly the same way.

```javascript
class Animal {
  speak() {
    console.log("Generic animal sound");
  }
}

class Cat extends Animal {
  speak() {
    console.log("Meow");
  }
}

class Cow extends Animal {
  speak() {
    console.log("Moo");
  }
}

const animals = [
  new Animal(),
  new Cat(),
  new Cow()
];

animals.forEach((animal) => {
  animal.speak();
});
```

### Output

```text
Generic animal sound
Meow
Moo
```

Notice that we never check:

```javascript
if (animal instanceof Cat)
```

or

```javascript
if (animal instanceof Cow)
```

We simply write:

```javascript
animal.speak();
```

Each object knows how to respond.

---

# 👨‍💼 Real-World Example: User Roles

Suppose we're building a hospital management system.

Different users exist:

* Admin
* Doctor
* Patient

Each performs a different action.

---

## Parent Class

```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  performAction() {
    console.log(`${this.name} is performing a general action.`);
  }
}
```

---

## Admin

```javascript
class Admin extends User {
  performAction() {
    console.log(`🛠️ Admin ${this.name} is managing users.`);
  }
}
```

---

## Doctor

```javascript
class Doctor extends User {
  performAction() {
    console.log(`🩺 Doctor ${this.name} is diagnosing patients.`);
  }
}
```

---

## Patient

```javascript
class Patient extends User {
  performAction() {
    console.log(`📅 Patient ${this.name} is booking an appointment.`);
  }
}
```

---

## Usage

```javascript
const users = [
  new Admin("Mona"),
  new Doctor("Esraa"),
  new Patient("Ali")
];

users.forEach((user) => {
  user.performAction();
});
```

### Output

```text
🛠️ Admin Mona is managing users.
🩺 Doctor Esraa is diagnosing patients.
📅 Patient Ali is booking an appointment.
```

Every object receives exactly the same method call:

```javascript
user.performAction();
```

Yet each produces different behavior.

---

# 🔄 Method Overriding

Polymorphism is commonly achieved using **method overriding**.

Method overriding means that a child class provides its own implementation of a method inherited from the parent.

## Parent Class

```javascript
class User {
  login() {
    console.log("User logged in");
  }
}
```

## Child Class

```javascript
class Admin extends User {
  login() {
    console.log("Admin logged in");
  }
}
```

## Usage

```javascript
const admin = new Admin();

admin.login();
```

### Output

```text
Admin logged in
```

The parent's version is replaced by the child's version.

---

# 🏦 Another Example: Payment System

Different payment methods share the same action:

```javascript
pay()
```

But each payment type processes the payment differently.

```javascript
class Payment {
  pay(amount) {
    console.log(`Paying ${amount}`);
  }
}

class CreditCardPayment extends Payment {
  pay(amount) {
    console.log(`💳 Paid ${amount} using Credit Card`);
  }
}

class PayPalPayment extends Payment {
  pay(amount) {
    console.log(`🅿️ Paid ${amount} using PayPal`);
  }
}

class CashPayment extends Payment {
  pay(amount) {
    console.log(`💵 Paid ${amount} using Cash`);
  }
}
```

---

## Usage

```javascript
const payments = [
  new CreditCardPayment(),
  new PayPalPayment(),
  new CashPayment()
];

payments.forEach((payment) => {
  payment.pay(500);
});
```

### Output

```text
💳 Paid 500 using Credit Card
🅿️ Paid 500 using PayPal
💵 Paid 500 using Cash
```

Again, the same method:

```javascript
payment.pay(500);
```

Different behavior depending on the object.

---

# 🚀 Benefits of Polymorphism

Polymorphism provides several advantages:

* ✅ Reduces large `if/else` and `switch` statements.
* ✅ Makes code easier to extend.
* ✅ Encourages reusable code.
* ✅ Improves readability.
* ✅ Allows different objects to be treated uniformly.
* ✅ Makes applications easier to maintain.

---

# ❌ Without Polymorphism

```javascript
if (paymentType === "credit") {
  // Credit Card logic
}

if (paymentType === "paypal") {
  // PayPal logic
}

if (paymentType === "cash") {
  // Cash logic
}
```

Every time a new payment method is added, existing code must be modified.

---

# ✅ With Polymorphism

```javascript
payment.pay(amount);
```

Need a new payment type?

Simply create another class.

```javascript
class ApplePayPayment extends Payment {
  pay(amount) {
    console.log(`🍎 Paid ${amount} using Apple Pay`);
  }
}
```

The rest of the application remains unchanged.

---

# 📊 Inheritance vs Polymorphism

| Inheritance                        | Polymorphism                                  |
| ---------------------------------- | --------------------------------------------- |
| Creates parent-child relationships | Allows different behavior for the same method |
| Focuses on code reuse              | Focuses on flexibility                        |
| Uses `extends`                     | Uses method overriding                        |
| Shares common functionality        | Customizes inherited functionality            |

---

# 📝 Summary

* Polymorphism means **"many forms."**
* Different objects can respond differently to the same method.
* It is usually achieved through **method overriding**.
* It works together with **inheritance**.
* It allows us to treat different objects in a uniform way.
* It reduces long conditional statements.
* It makes applications easier to maintain and extend.

## Quick Memory Trick

```text
Same Method Name
        ↓
Different Objects
        ↓
Different Behaviors
```

Think of polymorphism as giving every object the freedom to decide **how** it performs the same action.
