# 📚 What is Control Flow?

Every JavaScript program contains multiple statements.

By default, JavaScript executes these statements **from top to bottom**, one after another, in the order they appear.

This default execution order is called **Sequential Execution**.

---

## Example

```javascript
console.log("Step 1");
console.log("Step 2");
console.log("Step 3");
````

---

## Output

```text id="cf_step_output"
Step 1
Step 2
Step 3
```

---

## Execution Order

```text id="cf_execution_order"
Start
   │
   ▼
Step 1
   │
   ▼
Step 2
   │
   ▼
Step 3
   │
   ▼
 End
```

---

# ❓ Why Do We Need Control Flow?

In real applications, programs rarely execute every line.

Sometimes we need to:

* Execute code only if a condition is true
* Execute one block instead of another
* Repeat code multiple times
* Stop a loop early
* Skip certain iterations

Instead of executing every statement sequentially, we can **control the flow of execution**.

This is why JavaScript provides **Control Flow Statements**.

---

# 🧭 Types of Control Flow Statements

JavaScript control flow statements are divided into two main categories.

---

## 1. Conditional Statements

Used to make decisions.

### Examples:

* if
* if...else
* if...else if
* switch
* ternary operator

---

## 2. Loop Statements

Used to repeat code.

### Examples:

* for
* while
* do...while
* for...of
* for...in

---

## Loop Control Statements

Used inside loops.

### Examples:

* break
* continue

---

# 🧠 Conditional Statements

Conditional statements execute code depending on whether a condition is **true** or **false**.

---

## Real-Life Example

> If it is raining, take an umbrella.

Otherwise,

> Continue walking.

Programming works exactly the same way.

---

# 1. if Statement

---

## 📌 What is an if Statement?

The `if` statement executes a block of code **only if a condition is true**.

If the condition is false, JavaScript skips that block completely.

---

## Syntax

```javascript id="if_syntax_full"
if (condition) {
    // code
}
```

---

## How it Works

JavaScript follows these steps:

1. Evaluate the condition
2. Check if result is `true`
3. If true → execute block
4. If false → skip block

---

## Flow

```text id="if_flow_full"
          Condition
              │
      ┌───────┴────────┐
      │                │
    true            false
      │                │
Execute Block      Skip Block
      │                │
      └───────► Continue
```

---

## Example 1

```javascript id="if_ex1_full"
let age = 20;

if (age >= 18) {
    console.log("You can vote.");
}

console.log("Program Finished");
```

---

### Step-by-Step Execution

#### Step 1

```javascript
let age = 20;
```

Memory:

```text
age → 20
```

---

#### Step 2

Evaluate condition:

```javascript
age >= 18
```

Becomes:

```javascript
20 >= 18
```

Result:

```javascript
true
```

---

#### Step 3

Since condition is true:

```javascript
console.log("You can vote.");
```

Output:

```text
You can vote.
```

---

#### Step 4

Continue execution:

```javascript
console.log("Program Finished");
```

Output:

```text
Program Finished
```

---

### Final Output

```text
You can vote.
Program Finished
```

---

## Example 2

```javascript id="if_ex2_full"
let age = 15;

if (age >= 18) {
    console.log("You can vote.");
}

console.log("Program Finished");
```

---

### Condition

```javascript
15 >= 18 → false
```

---

### Result

Block is skipped completely.

---

### Output

```text
Program Finished
```

---

## Important Notes

* Condition must return `true` or `false`
* If false → block is ignored
* Always use `{}` even for one line

---

# 2. if...else Statement

---

## 📌 What is if...else?

Used when there are **two possible outcomes**.

* if → condition is true
* else → condition is false

---

## Syntax

```javascript id="if_else_syntax_full"
if (condition) {
    // runs if true
} else {
    // runs if false
}
```

---

## Flow

```text id="if_else_flow_full"
         Condition
             │
      ┌──────┴──────┐
      │             │
    true         false
      │             │
 if block      else block
      │             │
      └──────► Continue
```

---

## Example

```javascript id="if_else_ex_full"
let age = 16;

if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}

console.log("Done");
```

---

### Execution

```text
16 >= 18 → false
```

---

### Output

```text
Minor
Done
```

---

## Another Example

```javascript id="if_else_ex2_full"
let isLoggedIn = true;

if (isLoggedIn) {
    console.log("Welcome!");
} else {
    console.log("Please login.");
}
```

---

### Output

```text
Welcome!
```

---

## Notes

* Only ONE block runs
* Either `if` OR `else`
* Never both

---

# 3. if...else if...else

---

## 📌 What is it?

Used when there are **multiple conditions**.

---

## Example (Grades)

* 90–100 → Excellent
* 75–89 → Very Good
* 50–74 → Pass
* Below 50 → Fail

---

## Syntax

```javascript id="if_elseif_syntax_full"
if (condition1) {

}
else if (condition2) {

}
else if (condition3) {

}
else {

}
```

---

## Example

```javascript id="if_elseif_ex_full"
let score = 82;

if (score >= 90) {
    console.log("Excellent");
}
else if (score >= 75) {
    console.log("Very Good");
}
else if (score >= 50) {
    console.log("Pass");
}
else {
    console.log("Fail");
}
```

---

### Execution

```text
82 >= 90 → false
82 >= 75 → true → STOP
```

---

### Output

```text
Very Good
```

---

## Important Rule

JavaScript stops at the **first true condition**.

---

# 4. Nested if

---

## 📌 What is Nested if?

An `if` inside another `if`.

---

## Example

```javascript id="nested_if_full"
let age = 20;
let hasLicense = true;

if (age >= 18) {

    if (hasLicense) {
        console.log("Can drive");
    }

}
```

---

### Execution

```text
age >= 18 → true
hasLicense → true
```

---

### Output

```text
Can drive
```

---

# 🔀 Ternary Operator

---

## 📌 What is it?

A shorter way to write `if...else`.

---

## Syntax

```javascript id="ternary_syntax_full"
condition ? valueIfTrue : valueIfFalse;
```

---

## Example

```javascript id="ternary_ex_full"
let age = 20;

let result = age >= 18 ? "Adult" : "Minor";

console.log(result);
```

---

### Output

```text
Adult
```

---

## Equivalent if...else

```javascript id="ternary_equiv_full"
let age = 20;
let result;

if (age >= 18) {
    result = "Adult";
} else {
    result = "Minor";
}
```

---

# 🔁 Loop Statements

Loops are used to **repeat code multiple times**.

---

## Why loops?

Without loops:

```javascript id="loop_bad_example"
console.log(1);
console.log(2);
console.log(3);
```

With loops:

```javascript id="loop_good_example"
for (let i = 1; i <= 3; i++) {
    console.log(i);
}
```

---

# 1. for Loop

---

## 📌 Definition

Used when number of iterations is known.

---

## Syntax

```javascript id="for_syntax_full"
for (initialization; condition; update) {
    // code
}
```

---

## Example

```javascript id="for_ex_full"
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
```

---

### Output

```text
1
2
3
4
5
```

---

# 2. while Loop

---

## 📌 Definition

Runs while condition is true.

---

## Syntax

```javascript id="while_syntax_full"
while (condition) {
    // code
}
```

---

## Example

```javascript id="while_ex_full"
let i = 1;

while (i <= 5) {
    console.log(i);
    i++;
}
```

---

## Infinite Loop Risk

```javascript id="infinite_loop_full"
while (true) {
    console.log("This never stops");
}
```

---

# 3. do...while Loop

---

## 📌 Definition

Runs at least once before checking condition.

---

## Syntax

```javascript id="do_while_syntax_full"
do {
    // code
} while (condition);
```

---

## Example

```javascript id="do_while_ex_full"
let i = 1;

do {
    console.log(i);
    i++;
} while (i <= 5);
```

---

## Example with false condition

```javascript id="do_while_false_full"
let i = 10;

do {
    console.log(i);
    i++;
} while (i <= 5);
```

---

### Output

```text
10
```

---

# 4. for...of Loop

---

## 📌 Definition

Used for **values** of iterable objects (arrays, strings).

---

## Example (Array)

```javascript id="for_of_array_full"
let colors = ["red", "green", "blue"];

for (let color of colors) {
    console.log(color);
}
```

---

### Output

```text
red
green
blue
```

---

## Example (String)

```javascript id="for_of_string_full"
let word = "Hi";

for (let char of word) {
    console.log(char);
}
```

---

### Output

```text
H
i
```

---

# 5. for...in Loop

---

## 📌 Definition

Used for **object keys**.

---

## Example

```javascript id="for_in_ex_full"
let user = {
    name: "Esraa",
    age: 25,
    city: "Cairo"
};

for (let key in user) {
    console.log(key, user[key]);
}
```

---

### Output

```text
name Esraa
age 25
city Cairo
```

---

# ⛔ Loop Control Statements

Used to control loop execution.

---

# 1. break

Stops the loop completely.

```javascript id="break_full"
for (let i = 1; i <= 5; i++) {
    if (i === 3) break;
    console.log(i);
}
```

### Output

```text
1
2
```

---

# 2. continue

Skips current iteration only.

```javascript id="continue_full"
for (let i = 1; i <= 5; i++) {
    if (i === 3) continue;
    console.log(i);
}
```

### Output

```text
1
2
4
5
```

---

# 🆚 break vs continue

| Keyword  | Behavior                |
| -------- | ----------------------- |
| break    | stops loop completely   |
| continue | skips current iteration |

---

# 🎯 FINAL SUMMARY

---

## Conditional Statements

* if → one condition
* if...else → two outcomes
* if...else if → multiple conditions
* nested if → dependent conditions
* ternary → short if...else

---

## Loop Statements

* for → known iterations
* while → condition-based
* do...while → runs at least once
* for...of → values
* for...in → object keys

---

## Loop Control

* break → stop loop
* continue → skip iteration

---
