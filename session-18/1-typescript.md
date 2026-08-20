# 🚀 TypeScript Basics

## 📖 Overview

**TypeScript (TS)** is an open-source programming language developed by Microsoft. It is built on top of JavaScript and adds **static typing** and many powerful features that make applications easier to develop and maintain.

A simple way to think about it is:

> **TypeScript = JavaScript + Types**

Since TypeScript compiles to plain JavaScript, it can run anywhere JavaScript runs, including browsers and Node.js.

---

# 1️⃣ What is TypeScript?

TypeScript is:

* A **strongly typed** programming language.
* A **superset of JavaScript**, meaning every valid JavaScript program is also valid TypeScript.
* Designed to improve developer productivity by catching errors during development instead of at runtime.

Example:

```ts
let message: string = "Hello TypeScript";
console.log(message);
```

After compilation, it becomes regular JavaScript that browsers can execute.

---

# 2️⃣ Why Use TypeScript?

TypeScript provides several advantages over plain JavaScript.

## ✅ Detect errors before running the code

One of the biggest benefits is that many mistakes are discovered during compilation.

```ts
let age: number = 25;
age = "Ahmed"; // ❌ Error
```

The compiler reports the error immediately without running the application.

---

## ✅ Better support for large projects

As applications grow, managing variables and function parameters becomes difficult. TypeScript's type system makes code easier to understand and maintain.

---

## ✅ Essential for Angular

Angular is built with TypeScript and relies heavily on its features such as decorators, interfaces, and strong typing.

---

## ✅ Includes features not available in JavaScript

Examples include:

* Interfaces
* Generics
* Enums
* Access modifiers
* Advanced type checking

These features help create cleaner and more scalable applications.

---

# 3️⃣ How TypeScript Works

Browsers cannot execute TypeScript directly.

Instead, the TypeScript Compiler (**tsc**) converts TypeScript code into JavaScript.

This conversion process is called **Transpilation**.

```text
TypeScript (.ts)
        │
        │  TypeScript Compiler (tsc)
        ▼
JavaScript (.js)
        │
        ▼
 Browser / Node.js
```

---

# 4️⃣ Installing TypeScript

Before installing TypeScript, make sure **Node.js** is installed.

Install TypeScript globally:

```bash
npm install -g typescript
```

Verify the installation:

```bash
tsc -v
```

Example output:

```text
Version 5.x.x
```

---

# 5️⃣ Your First TypeScript File

Create a file named:

```text
index.ts
```

```ts
console.log(Math.floor(5.9));
```

Compile it:

```bash
tsc index.ts
```

The compiler generates:

```text
index.js
```

Running `index.js` executes the JavaScript version of your code.

---

# 6️⃣ Type Checking Example

Suppose you write:

```ts
console.log(Math.floor());
```

TypeScript reports an error because `Math.floor()` expects a number argument.

This helps catch bugs before the code is executed.

---

# 7️⃣ Automatically Recompile on Changes

Normally, after modifying your `.ts` file, you need to compile it again:

```bash
tsc index.ts
```

To automatically watch for changes and recompile whenever you save:

```bash
tsc index.ts -w
```

or

```bash
tsc --watch
```

This is much more convenient during development.

---

# 8️⃣ Initialize a TypeScript Project

Instead of compiling individual files, initialize a TypeScript project:

```bash
tsc --init
```

This creates a `tsconfig.json` file containing the project's compiler settings.

---

# 9️⃣ Important `tsconfig.json` Options

## `target`

Specifies the JavaScript version to generate.

```json
{
  "target": "ES2022"
}
```

Examples include:

* ES5
* ES6 (ES2015)
* ES2017
* ES2020
* ES2022

---

## `rootDir`

Defines where your source TypeScript files are located.

```json
{
  "rootDir": "./src"
}
```

---

## `outDir`

Specifies where compiled JavaScript files should be generated.

```json
{
  "outDir": "./dist"
}
```

---

## `removeComments`

Determines whether comments should be removed from the generated JavaScript.

```json
{
  "removeComments": true
}
```

---

## `sourceMap`

Controls whether source map files are generated.

```json
{
  "sourceMap": false
}
```

Source maps help debugging by linking compiled JavaScript back to the original TypeScript.

---

## `declaration`

Determines whether `.d.ts` declaration files should be generated.

```json
{
  "declaration": false
}
```

These files describe the types exposed by your code and are commonly used when publishing libraries.

---

## `declarationMap`

Creates source maps for declaration files.

```json
{
  "declarationMap": false
}
```

---

# 🔟 Recommended Project Structure

```
project/
│
├── src/
│   ├── index.ts
│   └── test.ts
│
├── dist/
│   ├── index.js
│   └── test.js
│
├── tsconfig.json
├── package.json
└── node_modules/
```

Compile the entire project with:

```bash
tsc
```

The compiler reads `tsconfig.json` and outputs JavaScript files into the `dist` folder.

---

# 1️⃣1️⃣ Dynamic Typing vs Strong Typing

## JavaScript (Dynamic Typing)

JavaScript allows variables to change types at runtime.

```js
let num = 5;

num = "Ahmed";

console.log(num);
```

This runs successfully even though `num` changed from a number to a string.

---

## TypeScript (Strong Typing)

TypeScript prevents assigning incompatible types.

```ts
let num: number = 5;

num = "Ahmed"; // ❌ Compilation Error
```

Error:

```text
Type 'string' is not assignable to type 'number'.
```

This reduces bugs and makes code more predictable.

---

# 1️⃣2️⃣ Type Annotations

Type annotations explicitly specify the expected type of a variable.

```ts
let firstName: string = "Esraa";
let age: number = 22;
let isStudent: boolean = true;
```

You can also annotate arrays:

```ts
let scores: number[] = [95, 88, 76];
```

And functions:

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

Providing type annotations improves code readability, editor autocompletion, and compile-time error detection.

---

# ✅ Summary

* TypeScript is a **superset of JavaScript** that adds **static typing**.

* It helps detect errors **before running the application**.

* TypeScript code is converted into JavaScript through **transpilation** using the `tsc` compiler.

* Install it with:

  ```bash
  npm install -g typescript
  ```

* Create a project configuration with:

  ```bash
  tsc --init
  ```

* Useful `tsconfig.json` options include:

  * `target`
  * `rootDir`
  * `outDir`
  * `removeComments`
  * `sourceMap`
  * `declaration`
  * `declarationMap`

* Use `tsc --watch` (or `tsc index.ts -w`) to automatically recompile files when they change.

* Type annotations (`string`, `number`, `boolean`, etc.) make your code safer and easier to maintain.
