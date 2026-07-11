# JavaScript Data Types

## Introduction

Every value in JavaScript has a **data type**.

The data type tells JavaScript:

* What kind of value it is.
* What operations can be performed on it.
* How it is stored in memory.

For example:

```javascript
let age = 22;
let name = "Esraa";
let isStudent = true;
```

Here:

* `22` is a **Number**
* `"Esraa"` is a **String**
* `true` is a **Boolean**

Although all three values are stored inside variables, each one has a different data type.

---

# JavaScript is Dynamically Typed

JavaScript is a **dynamically typed language**.

This means you **do not specify the type** when declaring a variable.

Instead, JavaScript determines the type automatically at runtime.

For example:

```javascript
let value = 10;

console.log(typeof value);
```

Output

```text
number
```

Later, the same variable can store another type.

```javascript
let value = 10;

value = "Angular";

console.log(typeof value);
```

Output

```text
string
```

It can even become a Boolean.

```javascript
let value = 10;

value = false;

console.log(typeof value);
```

Output

```text
boolean
```

Unlike languages such as Java or C#, variables are **not restricted to one type**.

---

# Checking the Data Type

JavaScript provides the **`typeof` operator** to determine the type of any value.

Syntax:

```javascript
typeof value
```

Example:

```javascript
let age = 22;

console.log(typeof age);
```

Output

```text
number
```

More examples:

```javascript
console.log(typeof "JavaScript");
```

Output

```text
string
```

```javascript
console.log(typeof true);
```

Output

```text
boolean
```

```javascript
console.log(typeof undefined);
```

Output

```text
undefined
```

---

# Categories of Data Types

JavaScript data types are divided into two groups.

## 1. Primitive Types

Primitive values are simple values.

Characteristics:

* Store a single value.
* Immutable.
* Stored by value.
* Lightweight.

There are **7 primitive types**.

```
undefined
null
boolean
number
string
symbol
bigint
```

---

## 2. Non-Primitive Types

Everything that is **not primitive** is an object.

Examples include:

* Objects
* Arrays
* Functions
* Dates
* Maps
* Sets

Objects are:

* Mutable.
* Stored by reference.
* Can contain multiple values.

---

# Why Are There Two Categories?

Suppose you have a student's age.

```javascript
let age = 22;
```

The value is just a single number.

There is no need for a complex structure.

So JavaScript stores it as a **primitive value**.

---

Now consider a student.

```javascript
const student = {
    name: "Esraa",
    age: 22,
    graduated: true
};
```

A student contains multiple pieces of information.

This requires a more complex structure.

Therefore JavaScript stores it as an **object**.

---

# Primitive Data Types

JavaScript has seven primitive data types.

We will study each one separately.

---

# 1. Undefined

## What is Undefined?

`undefined` means:

> A variable exists, but it has not been assigned a value yet.

Example:

```javascript
let username;

console.log(username);
```

Output

```text
undefined
```

JavaScript automatically assigns the value `undefined`.

---

## Checking its Type

```javascript
let username;

console.log(typeof username);
```

Output

```text
undefined
```

---

## Another Example

```javascript
let age;

console.log(age);

age = 22;

console.log(age);
```

Output

```text
undefined

22
```

Initially, the variable has no value.

Later, a number is assigned.

---

## Important Notes

* Default value for uninitialized variables.
* Has only one value: `undefined`.

---

# 2. Null

## What is Null?

`null` means:

> The variable intentionally contains no value.

Unlike `undefined`, **you assign it yourself**.

Example:

```javascript
let currentUser = null;
```

---

## Why Use Null?

Suppose your application has no logged-in user.

```javascript
let currentUser = null;
```

Later:

```javascript
currentUser = {
    name: "Esraa"
};
```

Now the variable contains an object instead of no value.

---

## Checking the Type

```javascript
let value = null;

console.log(typeof value);
```

Output

```text
object
```

This surprises many beginners.

---

## Why Does typeof Return "object"?

This is a historical bug in JavaScript.

It has existed since the first version of JavaScript.

Changing it today would break millions of websites.

So it remains unchanged.

---

## Undefined vs Null

```javascript
let a;
let b = null;

console.log(a);
console.log(b);
```

Output

```text
undefined

null
```

Difference:

| Undefined                | Null                        |
| ------------------------ | --------------------------- |
| Assigned automatically   | Assigned manually           |
| Means "not assigned yet" | Means "intentionally empty" |

---

# 3. Number

## What is Number?

The `number` type stores numeric values.

JavaScript uses **one numeric type** for both integers and decimal numbers.

---

## Integer Numbers

```javascript
let age = 22;
let students = 150;
let score = -10;
```

---

## Floating-Point Numbers

```javascript
let price = 199.99;
let tax = 0.15;
let temperature = -8.5;
```

---

## Checking the Type

```javascript
let price = 150;

console.log(typeof price);
```

Output

```text
number
```

---

## Infinity

Very large calculations produce Infinity.

```javascript
console.log(Number.MAX_VALUE * 2);
```

Output

```text
Infinity
```

---

## Negative Infinity

```javascript
console.log(-Number.MAX_VALUE * 2);
```

Output

```text
-Infinity
```

---

## NaN (Not a Number)

NaN means the calculation produced an invalid numeric result.

Example:

```javascript
console.log("Hello" / 2);
```

Output

```text
NaN
```

Another example:

```javascript
console.log(0 / 0);
```

Output

```text
NaN
```

---

## Interesting Fact

```javascript
console.log(typeof NaN);
```

Output

```text
number
```

Although its name is "Not a Number", its type is still `number`.

---

# 4. String

## What is a String?

A string stores text.

Strings can use:

Double quotes

```javascript
let firstName = "Esraa";
```

Single quotes

```javascript
let lastName = 'Said';
```

---

## Multiple Words

```javascript
let message = "Welcome to JavaScript";
```

---

## Checking the Type

```javascript
console.log(typeof message);
```

Output

```text
string
```

---

## Concatenation

Strings can be combined.

```javascript
let first = "Hello";
let second = "World";

let result = first + " " + second;

console.log(result);
```

Output

```text
Hello World
```

---

## Escaping Quotes

```javascript
let text = "I'm learning JavaScript";

console.log(text);
```

Output

```text
I'm learning JavaScript
```

---

## Strings are Immutable

Strings cannot be modified directly.

```javascript
let language = "JavaScript";

language[0] = "j";

console.log(language);
```

Output

```text
JavaScript
```

The original string remains unchanged.

Instead, JavaScript creates a new string whenever you change it.

---

# 5. Boolean

## What is Boolean?

A Boolean represents one of two values.

```text
true
false
```

These values are commonly used in conditions and comparisons.

---

## Example

```javascript
let isLoggedIn = true;
let isAdmin = false;
```

---

## Checking the Type

```javascript
console.log(typeof isLoggedIn);
```

Output

```text
boolean
```

---

## Practical Example

```javascript
let hasPermission = true;

if (hasPermission) {
    console.log("Access Granted");
}
```

Output

```text
Access Granted
```

---

# 6. Symbol

## What is Symbol?

A Symbol creates a unique identifier.

Even if two symbols look the same, they are always different.

Example:

```javascript
const id1 = Symbol();

const id2 = Symbol();

console.log(id1 === id2);
```

Output

```text
false
```

---

## Symbol with Description

```javascript
const userId = Symbol("id");
```

The description is only for debugging.

It does not affect uniqueness.

---

## Notes

* Always unique.
* Often used as object property keys.

---

# 7. BigInt

## What is BigInt?

BigInt stores extremely large integers.

Example:

```javascript
const views = 900719925474099112345n;
```

Notice the letter **n** at the end.

---

## Checking the Type

```javascript
console.log(typeof views);
```

Output

```text
bigint
```

---

## Notes

* Must end with `n`.
* Used for very large whole numbers.

---

# Non-Primitive Data Types

Everything that is not primitive is an object.

Examples include:

Objects

```javascript
const user = {
    name: "Esraa",
    age: 22
};
```

Arrays

```javascript
const colors = ["Red", "Blue", "Green"];
```

Functions

```javascript
function greet() {
    console.log("Hello");
}
```

All of these are objects in JavaScript.

---

# Primitive vs Object

| Feature   | Primitive               | Object                  |
| --------- | ----------------------- | ----------------------- |
| Stores    | Single value            | Collection of values    |
| Mutable   | No                      | Yes                     |
| Stored By | Value                   | Reference               |
| Examples  | Number, String, Boolean | Object, Array, Function |

---

# Summary

JavaScript has **8 data types**.

## Primitive Types

* Undefined
* Null
* Boolean
* Number
* String
* Symbol
* BigInt

## Non-Primitive Type

* Object

Important points to remember:

* JavaScript is dynamically typed.
* Use `typeof` to check the type of a value.
* `undefined` means a value has not been assigned.
* `null` means no value was intentionally assigned.
* JavaScript has only one numeric type: `number`.
* Strings are immutable.
* Booleans store only `true` or `false`.
* Symbols are always unique.
* BigInt is used for very large integers.
* Objects store collections of related values.
