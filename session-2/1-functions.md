# 🎓 JavaScript Functions

# 📚 What is a Function?

As programs grow larger, we often need to perform the same task multiple times.

Imagine writing the same code over and over again whenever you need to greet a user, calculate a total, or validate an email.

Repeating code makes programs:

* Harder to read.
* Harder to maintain.
* More likely to contain bugs.

Instead of rewriting the same code, JavaScript allows us to group related statements into a **function**.

A **function** is a reusable block of code that performs a specific task.

Instead of writing the code many times, we write it **once**, then call it whenever we need it.

---


## Why Do We Need Functions?

Functions provide many advantages.

### 1. Reusability

Write code once.

Use it many times.

Without functions:

```javascript
console.log("Welcome");
console.log("Have a nice day!");

console.log("Welcome");
console.log("Have a nice day!");

console.log("Welcome");
console.log("Have a nice day!");
```

Notice how the same code is repeated.

With functions:

```javascript
function welcome() {
    console.log("Welcome");
    console.log("Have a nice day!");
}

welcome();
welcome();
welcome();
```

Now the code is much shorter and easier to maintain.

---

### 2. Better Organization

Functions divide a large program into smaller pieces.

Instead of having one huge file:

```text
1000 lines of code
```

you organize your program into functions.

```text
login()

register()

calculateTotal()

sendEmail()

logout()
```

Each function has one responsibility.

---

### 3. Easier Maintenance

Suppose you want to change the welcome message.

Without functions:

You must change it everywhere.

With functions:

You change it only once.

---

### 4. Better Readability

Compare these two examples.

Without functions:

```javascript
console.log("Loading...");
console.log("Connecting...");
console.log("Connected");
```

With functions:

```javascript
showLoading();
```

The second version immediately explains what the code is doing.

---



# 1. Function Declaration

## What is a Function Declaration?

A Function Declaration defines a named function using the `function` keyword.

Syntax

```javascript
function functionName() {

}
```

Every function declaration contains:

```javascript
function greet() {

}
```

| Part     | Description                        |
| -------- | ---------------------------------- |
| function | Keyword used to declare a function |
| greet    | Function name                      |
| ()       | Parameter list                     |
| {}       | Function body                      |

---

## Example 1

```javascript
function greet() {
    console.log("Hello!");
}
```

At this point,

nothing is printed.

The function has only been created.

---

To execute it:

```javascript
greet();
```

Output

```text
Hello!
```

---


# Calling a Function Multiple Times

One function can be called as many times as needed.

Example

```javascript
function welcome() {
    console.log("Welcome!");
}

welcome();
welcome();
welcome();
```

Output

```text
Welcome!
Welcome!
Welcome!
```

The function is written once but executed three times.

---

# Function Hoisting

## What is Hoisting?

Function declarations are **hoisted**.

This means JavaScript moves the function declaration to memory before executing the rest of the program.

Because of this,

you can call the function before it appears in the code.

Example

```javascript
greet();

function greet() {
    console.log("Hello!");
}
```

Output

```text
Hello!
```

---

## What JavaScript Sees

Internally,

JavaScript behaves almost like this:

```javascript
function greet() {
    console.log("Hello!");
}

greet();
```

The function exists before execution begins.

---



# Parameters and Arguments

Functions become much more useful when they can work with different values.

Instead of creating:

```javascript
function greetEsraa() {

}

function greetAli() {

}

function greetSara() {

}
```

we create one function.

```javascript
function greet(name) {

}
```

Then we pass different values.

---

## What are Parameters?

Parameters are variables declared inside the function definition.

Example

```javascript
function greet(name) {

}
```

Here,

`name`

is called a **parameter**.

It acts like a placeholder.

---

## What are Arguments?

Arguments are the actual values passed when calling the function.

```javascript
greet("Esraa");
```

Here,

```javascript
"Esraa"
```

is an argument.

---

## Example

```javascript
function greet(name) {
    console.log("Hello " + name);
}

greet("Esraa");
```

---

# Multiple Parameters

Functions may receive more than one parameter.

Example

```javascript
function add(a, b) {
    console.log(a + b);
}

add(5, 3);
```

---

## Another Example

```javascript
function introduce(firstName, lastName) {
    console.log(firstName + " " + lastName);
}

introduce("Esraa", "Said");
```

Output

```text
Esraa Said
```

---

# Default Parameters

Sometimes a function is called without providing all arguments.

Default parameters allow us to specify a value that JavaScript will use automatically if no argument is passed.

Syntax

```javascript
function functionName(parameter = defaultValue) {

}
```

---

## Example

```javascript
function greet(name = "Guest") {
    console.log("Hello " + name);
}

greet();
```

Output

```text
Hello Guest
```

---

## Passing an Argument

```javascript
greet("Esraa");
```

Now JavaScript replaces the default value.

Output

```text
Hello Esraa
```

---


## 📤 Return Statement

### What is the `return` Statement?

So far, our functions have only **performed an action**, such as printing something on the screen.

Example:

```javascript
function greet() {
    console.log("Hello!");
}

greet();
```

Output

```text
Hello!
```

The function prints `"Hello!"`, but it **doesn't give any value back** to the place where it was called.

Sometimes, we don't want a function to simply print something.

Instead, we want it to **calculate a value** and **return** that value so we can use it later.

This is the purpose of the `return` statement.

---

### What Does `return` Do?

The `return` statement has **two jobs**:

1. It sends a value back to the place where the function was called.
2. It immediately stops the execution of the function.

---

### Syntax

```javascript
function functionName() {
    return value;
}
```

---

### Example 1

```javascript
function add() {
    return 10;
}

let result = add();

console.log(result);
```

Output

```text
10
```

---


## Returning Early

Since `return` stops the function immediately,

everything after it is ignored.

Example

```javascript
function test() {
    console.log("A");

    return;

    console.log("B");
}

test();
```

Output

```text
A
```

The second `console.log()` never executes.

---

## Example

```javascript
function checkAge(age) {

    if (age < 18) {
        return "Access Denied";
    }

    return "Access Granted";
}

console.log(checkAge(15));
console.log(checkAge(20));
```

Output

```text
Access Denied
Access Granted
```

Notice that after

```javascript
return "Access Denied";
```

JavaScript immediately leaves the function.

---




# 3. Function Expression

## What is a Function Expression?

A **Function Expression** is a function that is **created and assigned to a variable**.

Unlike a Function Declaration, the function itself becomes the value stored inside the variable.

```javascript
const greet = function () {
    console.log("Hello!");
};
```

Here:

* `greet` is the variable.
* The anonymous function is the value assigned to that variable.

---

## Syntax

```javascript
const variableName = function () {
    // code
};
```

You can also use `let` or `var`, but `const` is preferred when you don't intend to replace the function.

---





## Complete Example

```javascript
const multiply = function (a, b) {
    console.log(a * b);
};

multiply(4, 5);
```

Output

```text
20
```

---

## Function Expression is NOT Hoisted

Unlike Function Declarations,

Function Expressions cannot be called before they are created.

Example

```javascript
sayHello();

const sayHello = function () {
    console.log("Hello");
};
```

Output

```text
ReferenceError
```

---



# 4. Anonymous Functions

## What is an Anonymous Function?

An **Anonymous Function** is simply a function **without a name**.

Example

```javascript
function () {

}
```

This is anonymous because there is no function name.

---

## Why Use Anonymous Functions?

Since anonymous functions have no name,

they are usually:

* Assigned to variables
* Passed as arguments
* Used as callbacks
* Used in event listeners

---

## Example 1

```javascript
const greet = function () {
    console.log("Hello");
};

greet();
```

Output

```text
Hello
```

Notice

The function itself has no name.

Only the variable has one.

---

## Example 2

Passing an anonymous function

```javascript
setTimeout(function () {
    console.log("Executed");
}, 1000);
```

The function doesn't need a name because it is used only once.

---

## Example 3

```javascript
const add = function (a, b) {
    return a + b;
};

console.log(add(5, 2));
```

Output

```text
7
```

---



# 5. Arrow Functions

## What are Arrow Functions?

Arrow Functions were introduced in **ES6**.

They provide a **shorter syntax** for writing functions.

Traditional function

```javascript
function greet(name) {
    return "Hello " + name;
}
```

Arrow function

```javascript
const greet = (name) => {
    return "Hello " + name;
};
```

Both perform the same task.

---

## Basic Syntax

```javascript
const functionName = () => {

};
```

---

## Example 1

```javascript
const sayHello = () => {
    console.log("Hello");
};

sayHello();
```

Output

```text
Hello
```

---

## Example 2

Parameters

```javascript
const multiply = (a, b) => {
    return a * b;
};

console.log(multiply(3, 4));
```

Output

```text
12
```

---

