# 🎯 JavaScript Function Examples

This file contains practical examples for practicing JavaScript functions, conditions, loops, strings, and arrays.

---

# 1. Calculator

Create a function that performs a mathematical operation based on the operator provided.

### Example

```javascript
function calculate(num1, num2, operator) {
  if (operator === "+") return num1 + num2;
  if (operator === "-") return num1 - num2;
  if (operator === "*") return num1 * num2;
  if (operator === "/") {
    return num2 !== 0 ? num1 / num2 : "Can't divide by zero";
  }

  return "Invalid operator";
}

console.log(calculate(10, 5, "+"));
console.log(calculate(20, 4, "/"));
console.log(calculate(10, 0, "/"));
```

### Output

```text
15
5
Can't divide by zero
```

---

# 2. Palindrome Checker

A palindrome is a word or number that reads the same forwards and backwards.

### Example

```javascript
function secret(value) {
  let str = String(value);

  for (let i = 0, j = str.length - 1; i < j; i++, j--) {
    if (str[i] !== str[j]) {
      return "NO";
    }
  }

  return "YES";
}

console.log(secret(1221));
console.log(secret(1234));
```

### Output

```text
YES
NO
```

---

# 3. Reverse a String

Return a new string with all characters reversed.

### Example

```javascript
const reverseString = function (str) {
  let reversed = "";

  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }

  return reversed;
};

console.log(reverseString("JavaScript"));
```

### Output

```text
tpircSavaJ
```

---

# 4. Length of the Last Word

Return the number of characters in the last word of a sentence.

### Example

```javascript
const secret = function (str) {
  let length = 0;

  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i] === " " && length > 0) break;
    if (str[i] === " ") continue;
    length++;
  }

  return length;
};

console.log(secret("Hello World"));
console.log(secret("   fly me   to   the moon  "));
console.log(secret("luffy is still joyboy"));
```

### Output

```text
5
4
6
```

---

# 5. Student Grade Calculator (Real-Life Example)

Given an array of student grades, calculate the average grade and determine whether the class passed.

A class passes if the average grade is **60 or higher**.

### Example

```javascript
function classResult(grades) {
  let sum = 0;

  for (let grade of grades) {
    sum += grade;
  }

  const average = sum / grades.length;

  console.log("Average:", average);

  if (average >= 60) {
    console.log("Class Passed");
  } else {
    console.log("Class Failed");
  }
}

classResult([70, 80, 60, 90, 50]);
classResult([40, 55, 50]);
```

### Output

```text
Average: 70
Class Passed

Average: 48.333333333333336
Class Failed
```

---

