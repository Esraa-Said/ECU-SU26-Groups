# JavaScript Fundamentals

# Variables (`var`, `let`, `const`)

---

# What is a Variable?

A **variable** is a named container used to store data in memory.

Instead of writing the same value many times, you store it in a variable and use its name whenever you need it.

Think of a variable as a labeled box.

```
Name
┌──────────────┐
│ "Esraa"      │
└──────────────┘

Age
┌──────────────┐
│ 23           │
└──────────────┘
```

The label is the variable name, and the value inside the box is the stored data.

---

# Why Do We Need Variables?

Without variables:

```javascript
console.log("Esraa");
console.log("Esraa");
console.log("Esraa");
```

If the value changes, you must update it everywhere.

With variables:

```javascript
let name = "Esraa";

console.log(name);
console.log(name);
console.log(name);
```

Now you only change the value once.

```javascript
name = "Sara";
```

Every place that uses `name` automatically uses the new value.

---

# Declaring Variables

JavaScript provides three ways to declare variables:

* `var`
* `let`
* `const`

```javascript
var city = "Cairo";

let age = 22;

const country = "Egypt";
```

Although all three store data, they behave differently.

---

# Understanding Memory

When JavaScript executes

```javascript
let username = "Ali";
```

It creates a variable in memory.

```
Memory

username
┌──────────────┐
│ "Ali"        │
└──────────────┘
```

Whenever you use

```javascript
console.log(username);
```

JavaScript looks up the value stored in memory.

---

# var

`var` is the oldest way to declare variables.

Before ES6 (2015), developers used `var` everywhere.

Today, it is rarely used because it can easily introduce bugs.

---

## Syntax

```javascript
var city = "Cairo";
```

---

## Reassignment

Allowed.

```javascript
var city = "Cairo";

city = "Alex";

console.log(city);
```

Output

```
Alex
```

---

## Redeclaration

Also allowed.

```javascript
var city = "Cairo";

var city = "Alex";

console.log(city);
```

Output

```
Alex
```

This behavior can accidentally overwrite existing variables.

---

## Scope

`var` is **function scoped**.

```javascript
if (true) {

    var age = 20;

}

console.log(age);
```

Output

```
20
```

Even though `age` was declared inside the `if` block, it is still accessible outside.

---

## Function Scope Example

```javascript
function test() {

    var age = 25;

    console.log(age);

}

test();

console.log(age);
```

Output

```
25

ReferenceError
```

Variables declared with `var` exist only inside the function where they are declared.

---

## Hoisting

`var` is hoisted.

```javascript
console.log(city);

var city = "Cairo";
```

JavaScript internally treats it like this:

```javascript
var city;

console.log(city);

city = "Cairo";
```

Output

```
undefined
```

The variable exists before its declaration, but its value is `undefined`.

---

## Summary of var

* Function scoped
* Can be reassigned
* Can be redeclared
* Hoisted with `undefined`
* Avoid using it in modern JavaScript

---

# let

`let` was introduced in ES6.

It solves many of the problems caused by `var`.

---

## Syntax

```javascript
let age = 20;
```

---

## Reassignment

Allowed.

```javascript
let age = 20;

age = 21;

console.log(age);
```

Output

```
21
```

---

## Redeclaration

Not allowed.

```javascript
let age = 20;

let age = 25;
```

Output

```
SyntaxError
```

---

## Scope

`let` is **block scoped**.

A block is any code surrounded by braces `{}`.

```javascript
if (true) {

    let age = 20;

}

console.log(age);
```

Output

```
ReferenceError
```

The variable only exists inside the block.

---

## Different Blocks

```javascript
let number = 10;

if (true) {

    let number = 20;

    console.log(number);

}

console.log(number);
```

Output

```
20

10
```

Each block has its own variable.

---

## Hoisting

`let` is also hoisted.

However, it cannot be accessed before declaration.

```javascript
console.log(age);

let age = 20;
```

Output

```
ReferenceError
```

This period before initialization is called the **Temporal Dead Zone (TDZ)**.

---

## Summary of let

* Block scoped
* Can be reassigned
* Cannot be redeclared
* Hoisted but inaccessible before declaration
* Best choice for variables whose values change

---

# const

`const` is used for variables that should never be reassigned.

---

## Syntax

```javascript
const PI = 3.14;
```

---

## Initialization

`const` must be initialized immediately.

Correct

```javascript
const country = "Egypt";
```

Wrong

```javascript
const country;
```

Output

```
SyntaxError
```

---

## Reassignment

Not allowed.

```javascript
const age = 20;

age = 25;
```

Output

```
TypeError
```

---

## Redeclaration

Not allowed.

```javascript
const age = 20;

const age = 30;
```

Output

```
SyntaxError
```

---

## Scope

`const` is block scoped.

```javascript
if (true) {

    const country = "Egypt";

}

console.log(country);
```

Output

```
ReferenceError
```

---

# Objects with const

Many beginners think `const` makes objects immutable.

It does not.

You cannot reassign the variable, but you can modify the object's contents.

```javascript
const user = {

    name: "Ali"

};

user.name = "Sara";

console.log(user);
```

Output

```javascript
{
    name: "Sara"
}
```

But this is not allowed:

```javascript
user = {};
```

---

# Scope Comparison

## var

```javascript
if (true) {

    var x = 10;

}

console.log(x);
```

Output

```
10
```

---

## let

```javascript
if (true) {

    let x = 10;

}

console.log(x);
```

Output

```
ReferenceError
```

---

## const

```javascript
if (true) {

    const x = 10;

}

console.log(x);
```

Output

```
ReferenceError
```

---

# Hoisting Comparison

## var

```javascript
console.log(city);

var city = "Cairo";
```

Output

```
undefined
```

---

## let

```javascript
console.log(city);

let city = "Cairo";
```

Output

```
ReferenceError
```

---

## const

```javascript
console.log(city);

const city = "Cairo";
```

Output

```
ReferenceError
```

---

# Comparison Table

| Feature                 | var             | let     | const   |
| ----------------------- | --------------- | ------- | ------- |
| Scope                   | Function        | Block   | Block   |
| Reassignment            | ✅               | ✅       | ❌       |
| Redeclaration           | ✅               | ❌       | ❌       |
| Initialization Required | ❌               | ❌       | ✅       |
| Hoisted                 | ✅ (`undefined`) | ✅ (TDZ) | ✅ (TDZ) |
| Modern Recommendation   | ❌ Avoid         | ✅       | ✅       |

---

# Best Practices

## Use `const` by default

If the value should not change:

```javascript
const apiUrl = "https://example.com";
```

---

## Use `let` when the value changes

```javascript
let counter = 0;

counter++;
```

---

## Avoid `var`

There is almost no reason to use `var` in modern JavaScript.

---





# Summary

* A variable stores data in memory.
* JavaScript provides `var`, `let`, and `const` for declaring variables.
* Prefer `const` whenever the value does not change.
* Use `let` when reassignment is required.
* Avoid `var` because of its function scope and hoisting behavior.
* Understanding scope and hoisting is essential for writing reliable JavaScript code.
