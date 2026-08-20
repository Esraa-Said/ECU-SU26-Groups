
# 🔧 Functions in TypeScript 

Functions are at the heart of any JavaScript/TypeScript program.  
In TypeScript, we add **type safety** to the parameters and return values.

---

## ✅ Basic Function Syntax

```ts
function greet(name: string): string {
  return "Hello, " + name;
}
console.log(greet("Esraa"));
```

- `name: string` → parameter type
- `: string` → return type

---

## ✅ Function Type Annotations

You can also define the **type of the whole function**:

```ts
let sayHi: (name: string) => string;

sayHi = function(name) {
  return "Hi " + name;
};
```

---

## ✅ Optional Parameters

Use `?` to mark a parameter as optional:

```ts
function log(message: string, user?: string): void {
  if (user) {
    console.log(`[${user}]: ${message}`);
  } else {
    console.log(`[Guest]: ${message}`);
  }
}

log("Logged in");           // [Guest]: Logged in
log("Updated profile", "Ali"); // [Ali]: Updated profile
```

---

## ✅ Default Parameters

You can assign a default value to parameters:

```ts
function multiply(a: number, b: number = 2): number {
  return a * b;
}

console.log(multiply(5));    // 10
console.log(multiply(5, 3)); // 15
```

---

## ✅ Rest Parameters

When you don't know how many arguments will be passed:

```ts
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}
```

---

## ✅ Void vs Undefined

```ts
function logMessage(): void {
  console.log("Logging...");
}
```

- `void`: Function returns nothing (ignores return).
- `undefined`: Can still return `undefined` **explicitly**.

---



## ✅ Anonymous Functions and Arrow Functions

```ts
const add = (x: number, y: number): number => x + y;
const welcome = (): void => console.log("Welcome!");
```

Arrow functions inherit `this` from the parent scope.

---



---



---

## ✅ Callback Functions

```ts
function processUser(input: string, callback: (name: string) => void): void {
  callback(input.toUpperCase());
}
```

---

## Returning Arrays from Functions

```ts
function getNumbers(count: number): number[] {
  let arr: number[] = [];
  for (let i = 0; i < count; i++) {
    arr.push(i);
  }
  return arr;
}

console.log(getNumbers(5)); // [0,1,2,3,4]
```
---

## ✅ Function inside Interface

```ts
interface Logger {
  log: (msg: string) => void;
}

const consoleLogger: Logger = {
  log(message) {
    console.log(message);
  }
};
```

---

## 💡 Mini Project: Grade Tracker App

```ts 
let grades: number[] = [];

function addGrade(grade: number): void {
  grades.push(grade);
}

function average(): number {
  let total = 0;
  for (let i = 0; i < grades.length; i++) {
    total += grades[i];
  }
  return grades.length ? total / grades.length : 0;
}

function minMax(): { min: number; max: number } {
  if (grades.length === 0) return { min: 0, max: 0 };

  let min = Math.min(...grades);
  let max = Math.max(...grades);

  return { min, max };
}

function showReport(): void {
  console.log("Grades:", grades);
  console.log("Average:", average());
  const { min, max } = minMax();
  console.log("Lowest:", min, "Highest:", max);
}

// Testing:
addGrade(85);
addGrade(70);
addGrade(95);
addGrade(60);
showReport();
```
