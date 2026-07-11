# Type Conversion and Type Coercion in JavaScript

# Introduction

JavaScript is a **dynamically typed language**, which means a variable can store values of different data types during its lifetime.

```javascript
let value = 10;

value = "JavaScript";

value = true;
```

Because JavaScript allows different data types to interact with each other, it sometimes needs to convert one type into another.

There are **two ways** this happens:

1. **Type Conversion (Explicit Conversion)** → You tell JavaScript to convert the value.
2. **Type Coercion (Implicit Conversion)** → JavaScript automatically converts the value for you.

Understanding the difference between these two concepts is important because many unexpected JavaScript behaviors are caused by automatic type coercion.

---

# Type Conversion (Explicit Conversion)

## What is Type Conversion?

Type Conversion (also called **Type Casting**) is the process of converting a value from one data type to another **manually**.

In other words:

> **The programmer decides when and how the conversion happens.**

JavaScript provides several built-in functions to perform explicit conversion.

---

# Converting to Number

The `Number()` function converts a value into a number whenever possible.

## String to Number

```javascript
let age = "25";

console.log(typeof age);
```

Output

```text
string
```

Convert it:

```javascript
let age = "25";

let numericAge = Number(age);

console.log(numericAge);
console.log(typeof numericAge);
```

Output

```text
25
number
```

---

## Decimal String

```javascript
let price = "99.95";

console.log(Number(price));
```

Output

```text
99.95
```

---

## Invalid Number

If JavaScript cannot convert the string into a valid number, it returns `NaN`.

```javascript
let value = "Hello";

console.log(Number(value));
```

Output

```text
NaN
```

---

## Empty String

```javascript
console.log(Number(""));
```

Output

```text
0
```

---

## Boolean to Number

Boolean values can also be converted into numbers.

```javascript
console.log(Number(true));
console.log(Number(false));
```

Output

```text
1
0
```

Explanation

* `true` becomes `1`
* `false` becomes `0`

---

## null to Number

```javascript
console.log(Number(null));
```

Output

```text
0
```

---

## undefined to Number

```javascript
console.log(Number(undefined));
```

Output

```text
NaN
```

---

# Converting to String

Use the `String()` function.

## Number to String

```javascript
let age = 25;

let result = String(age);

console.log(result);
console.log(typeof result);
```

Output

```text
25
string
```

---

## Boolean to String

```javascript
console.log(String(true));
console.log(String(false));
```

Output

```text
"true"
"false"
```

---

## null to String

```javascript
console.log(String(null));
```

Output

```text
"null"
```

---

## undefined to String

```javascript
console.log(String(undefined));
```

Output

```text
"undefined"
```

---

# Converting to Boolean

Use the `Boolean()` function.

## Truthy Values

```javascript
console.log(Boolean(100));
console.log(Boolean("JavaScript"));
console.log(Boolean([]));
console.log(Boolean({}));
```

Output

```text
true
true
true
true
```

---

## Falsy Values

```javascript
console.log(Boolean(""));
console.log(Boolean(0));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(NaN));
```

Output

```text
false
false
false
false
false
```

Remember the five most common falsy values:

```text
0
""
null
undefined
NaN
```

Everything else is truthy.

---

# Using parseInt()

`parseInt()` extracts an integer from the beginning of a string.

```javascript
let value = "123.45";

console.log(parseInt(value));
```

Output

```text
123
```

---

## Stops at the First Invalid Character

```javascript
console.log(parseInt("100px"));
```

Output

```text
100
```

---

## Invalid Start

```javascript
console.log(parseInt("abc100"));
```

Output

```text
NaN
```

Because the string does not start with a number.

---

# Using parseFloat()

`parseFloat()` works like `parseInt()`, but keeps the decimal part.

```javascript
let value = "123.45px";

console.log(parseFloat(value));
```

Output

```text
123.45
```

---

# Summary of Explicit Conversion

| Function     | Converts To    |
| ------------ | -------------- |
| Number()     | Number         |
| String()     | String         |
| Boolean()    | Boolean        |
| parseInt()   | Integer        |
| parseFloat() | Decimal Number |

---

# Type Coercion (Implicit Conversion)

## What is Type Coercion?

Type Coercion is the automatic conversion performed by JavaScript.

Instead of the programmer calling `Number()` or `String()`, JavaScript decides that conversion is necessary.

This usually happens during:

* Mathematical operations
* Comparisons
* String concatenation
* Logical operations

---

# String Concatenation

The `+` operator has two meanings:

* Addition
* String concatenation

If one operand is a string, JavaScript converts the other value into a string.

Example

```javascript
console.log("10" + 5);
```

Output

```text
105
```

Behind the scenes

```javascript
"10" + String(5)
```

becomes

```javascript
"10" + "5"
```

Result

```text
"105"
```

---

Another example

```javascript
console.log("Age: " + 25);
```

Output

```text
Age: 25
```

---

# Arithmetic Operators

Operators like

```text
-
*
/
%
```

expect numbers.

Therefore JavaScript converts strings into numbers.

Example

```javascript
console.log("10" - 3);
```

Behind the scenes

```javascript
Number("10") - 3
```

Output

```text
7
```

---

Multiplication

```javascript
console.log("6" * "5");
```

Output

```text
30
```

---

Division

```javascript
console.log("20" / "4");
```

Output

```text
5
```

---

Invalid Conversion

```javascript
console.log("Hello" * 2);
```

Output

```text
NaN
```

---

# Boolean Coercion

Boolean values become numbers in arithmetic expressions.

```javascript
console.log(true + 5);
```

Behind the scenes

```javascript
1 + 5
```

Output

```text
6
```

---

```javascript
console.log(false + 10);
```

Output

```text
10
```

---

# Loose Equality (==)

The `==` operator compares values after performing automatic type conversion.

Example

```javascript
console.log("10" == 10);
```

Output

```text
true
```

Because JavaScript converts

```javascript
"10"
```

into

```javascript
10
```

before comparing.

---

Another example

```javascript
console.log(false == 0);
```

Output

```text
true
```

Because JavaScript compares

```javascript
0 == 0
```

---

Another example

```javascript
console.log(true == 1);
```

Output

```text
true
```

---

# Strict Equality (===)

The strict equality operator never performs type conversion.

It compares:

* Value
* Data type

Both must match.

Example

```javascript
console.log("10" === 10);
```

Output

```text
false
```

Explanation

```text
String
```

is different from

```text
Number
```

---

Another example

```javascript
console.log(false === 0);
```

Output

```text
false
```

---

# == vs ===

| Operator | Converts Types? | Compares               |
| -------- | --------------- | ---------------------- |
| `==`     | Yes             | Value after conversion |
| `===`    | No              | Value and Data Type    |

Example

```javascript
console.log(5 == "5");
```

Output

```text
true
```

---

```javascript
console.log(5 === "5");
```

Output

```text
false
```

---

# Best Practices

## Prefer Explicit Conversion

Instead of relying on automatic coercion:

```javascript
let age = Number(inputValue);
```

is clearer than depending on JavaScript to convert automatically.

---

## Prefer `===` Instead of `==`

Using strict equality avoids unexpected behavior caused by automatic type coercion.

Recommended

```javascript
if (age === 18) {
    console.log("Adult");
}
```

Avoid

```javascript
if (age == 18) {
    console.log("Adult");
}
```

unless you intentionally want coercion.

---

# Summary

## Explicit Conversion

The programmer performs the conversion.

Examples

```javascript
Number()
String()
Boolean()
parseInt()
parseFloat()
```

---

## Implicit Conversion

JavaScript performs the conversion automatically.

Occurs during:

* String concatenation
* Arithmetic operations
* Comparisons with `==`
* Boolean operations

---

## Remember

* `Number()` converts values into numbers.
* `String()` converts values into strings.
* `Boolean()` converts values into booleans.
* `parseInt()` extracts an integer from a string.
* `parseFloat()` extracts a decimal number from a string.
* `+` may concatenate strings instead of adding numbers.
* `-`, `*`, `/`, and `%` usually convert operands to numbers.
* `==` performs type coercion.
* `===` does not perform type coercion and is generally the preferred comparison operator.
