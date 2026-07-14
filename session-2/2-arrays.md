# 🎓 JavaScript Arrays

# 📚 What is an Array?

In programming, we often need to store multiple related values.

Imagine you want to store the names of five students.

Without an array, you would need five separate variables.

```javascript
let student1 = "Esraa";
let student2 = "Ali";
let student3 = "Sara";
let student4 = "Omar";
let student5 = "Mona";
```

Although this works, it quickly becomes difficult to manage if you have hundreds or thousands of students.

Instead, JavaScript provides **Arrays**, which allow us to store multiple values inside a single variable.

```javascript
const students = ["Esraa", "Ali", "Sara", "Omar", "Mona"];
```

Now all student names are grouped together inside one variable.

---

# Why Do We Need Arrays?

Arrays make programs:

* Easier to organize.
* Easier to read.
* Easier to maintain.
* Easier to loop through.
* Easier to search and update.

Real-world examples:

* List of users.
* Products in an online store.
* Student names.
* Course list.
* Messages in a chat application.
* Images in a gallery.

---

# Key Characteristics of Arrays

Arrays have several important characteristics.

* They can store multiple values.
* Elements are stored in order.
* Each element has an index.
* Arrays are mutable (their contents can be changed).
* They can grow or shrink dynamically.
* They can store values of different data types.

Example

```javascript
const data = [
    "Esraa",
    22,
    true,
    null
];

console.log(data);
```

Output

```text
["Esraa", 22, true, null]
```

Although JavaScript allows mixed data types, in real applications arrays usually contain values of the same type.

Example

```javascript
const students = [
    "Esraa",
    "Ali",
    "Sara"
];
```

---

# Creating Arrays

There are two common ways to create arrays.

---

# 1. Array Literal (Recommended)

This is the simplest and most common way.

```javascript
const colors = [
    "Red",
    "Green",
    "Blue"
];
```

Empty array

```javascript
const colors = [];
```

This syntax is shorter, easier to read, and is the recommended approach.

---

# 2. Array Constructor

JavaScript also provides the `Array` constructor.

```javascript
const colors = new Array(
    "Red",
    "Green",
    "Blue"
);
```

Empty array

```javascript
const colors = new Array();
```

Although valid, developers rarely use this syntax because array literals are simpler.

---

# Array Index

Every element inside an array has a position called an **index**.

JavaScript arrays use **Zero-Based Indexing**.

That means counting starts from **0**, not 1.

Example

```javascript
const fruits = [
    "Apple",
    "Banana",
    "Orange",
    "Mango"
];
```

Indexes

```text
Index

0      1       2       3
│      │       │       │
▼      ▼       ▼       ▼

Apple Banana Orange Mango
```

---

# Accessing Elements

To access an element, use its index inside square brackets.

```javascript
const fruits = [
    "Apple",
    "Banana",
    "Orange"
];

console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]);
```

Output

```text
Apple
Banana
Orange
```

---

## Accessing an Invalid Index

```javascript
const fruits = [
    "Apple",
    "Banana"
];

console.log(fruits[10]);
```

Output

```text
undefined
```

If an index does not exist, JavaScript returns `undefined`.

---

# Updating Elements

Arrays are mutable.

This means you can change an existing element.

```javascript
const fruits = [
    "Apple",
    "Banana",
    "Orange"
];

fruits[1] = "Mango";

console.log(fruits);
```

Output

```text
["Apple", "Mango", "Orange"]
```

---

# Array Length

The `.length` property returns the total number of elements.

```javascript
const numbers = [
    10,
    20,
    30,
    40
];

console.log(numbers.length);
```

Output

```text
4
```

---

Example

```javascript
const students = [
    "Esraa",
    "Ali",
    "Sara"
];

console.log(students.length);
```

Output

```text
3
```

---

# Adding Elements

JavaScript provides several methods for adding elements.

---

## push()

Adds one or more elements to the end of the array.

```javascript
const numbers = [1,2,3];

numbers.push(4);

console.log(numbers);
```

Output

```text
[1,2,3,4]
```

Adding multiple values

```javascript
numbers.push(5,6);

console.log(numbers);
```

Output

```text
[1,2,3,4,5,6]
```

---

## unshift()

Adds one or more elements to the beginning.

```javascript
const numbers = [2,3];

numbers.unshift(1);

console.log(numbers);
```

Output

```text
[1,2,3]
```

---

# Removing Elements

---

## pop()

Removes the last element.

```javascript
const numbers = [
    1,
    2,
    3
];

numbers.pop();

console.log(numbers);
```

Output

```text
[1,2]
```

### pop() Returns the Removed Element

```javascript
const numbers = [10,20,30];

let removed = numbers.pop();

console.log(removed);
console.log(numbers);
```

Output

```text
30
[10,20]
```

---

## shift()

Removes the first element.

```javascript
const numbers = [
    1,
    2,
    3
];

numbers.shift();

console.log(numbers);
```

Output

```text
[2,3]
```

---

# Searching Arrays

---

## indexOf()

Returns the index of the first matching element.

```javascript
const students = [
    "Esraa",
    "Ali",
    "Sara"
];

console.log(students.indexOf("Ali"));
```

Output

```text
1
```

If not found

```javascript
console.log(students.indexOf("Omar"));
```

Output

```text
-1
```

---

## includes()

Checks whether an element exists.

```javascript
const students = [
    "Esraa",
    "Ali",
    "Sara"
];

console.log(students.includes("Ali"));
console.log(students.includes("Omar"));
```

Output

```text
true
false
```

Use `includes()` when you only need to know whether an element exists.

Use `indexOf()` when you need its position.

---

# Sorting Arrays

---

## Default sort()

```javascript
const numbers = [
    10,
    5,
    2,
    25
];

numbers.sort();

console.log(numbers);
```

Output

```text
[10,2,25,5]
```

Why?

Because JavaScript converts numbers into strings before sorting.

```
"10"
"2"
"25"
"5"
```

---

## Numeric Sorting

Ascending order

```javascript
const numbers = [
    10,
    5,
    2,
    25
];

numbers.sort((a,b)=>a-b);

console.log(numbers);
```

Output

```text
[2,5,10,25]
```

Descending order

```javascript
numbers.sort((a,b)=>b-a);
```

Output

```text
[25,10,5,2]
```

---

# Looping Through Arrays

---

## for Loop

```javascript
const students = [
    "Esraa",
    "Ali",
    "Sara"
];

for(let i=0;i<students.length;i++){

    console.log(students[i]);

}
```

Output

```text
Esraa
Ali
Sara
```

---

## for...of

```javascript
const students = [
    "Esraa",
    "Ali",
    "Sara"
];

for(const student of students){

    console.log(student);

}
```

Output

```text
Esraa
Ali
Sara
```

Use `for...of` when you only need the values.

---

## forEach()

Executes a callback once for every element.

```javascript
const prices = [
    100,
    200,
    300
];

prices.forEach(price=>{

    console.log(price);

});
```

Output

```text
100
200
300
```

Example

```javascript
prices.forEach(price=>{

    console.log(price*0.9);

});
```

Output

```text
90
180
270
```

---

# Transforming Arrays

---

## map()

Creates a **new array**.

Original array

```javascript
const numbers = [
    1,
    2,
    3
];
```

```javascript
const doubled = numbers.map(number=>number*2);

console.log(doubled);
```

Output

```text
[2,4,6]
```

Original array

```javascript
console.log(numbers);
```

Output

```text
[1,2,3]
```

`map()` never changes the original array.

---

## filter()

Returns only elements that satisfy a condition.

```javascript
const numbers = [
    10,
    15,
    20,
    25,
    30
];

const evenNumbers = numbers.filter(number=>number%2===0);

console.log(evenNumbers);
```

Output

```text
[10,20,30]
```

---

# Difference Between map() and filter()

Example

```javascript
const numbers = [1,2,3];
```

Using `map()`

```javascript
numbers.map(number=>number*2);
```

Result

```text
[2,4,6]
```

Every element remains in the new array.

Using `filter()`

```javascript
numbers.filter(number=>number>1);
```

Result

```text
[2,3]
```

Only matching elements remain.

---

# Important Notes

* Arrays start at index **0**.
* Arrays are mutable.
* `.length` returns the total number of elements.
* `push()` and `unshift()` add elements.
* `pop()` and `shift()` remove elements.
* `indexOf()` returns the element index.
* `includes()` checks whether an element exists.
* `sort()` sorts alphabetically by default.
* Use a compare function for numeric sorting.
* `map()` creates a new transformed array.
* `filter()` creates a new filtered array.
* `forEach()` is mainly used to execute code for every element.

---

# Summary

## Creating Arrays

```text
[]
new Array()
```

---

## Accessing

```text
array[index]
array.length
```

---

## Add

```text
push()
unshift()
```

---

## Remove

```text
pop()
shift()
```

---

## Search

```text
indexOf()
includes()
```

---

## Transform

```text
map()
filter()
```

---

## Loop

```text
for
for...of
forEach()
```

---

## Sorting

```text
sort()
sort((a,b)=>a-b)
sort((a,b)=>b-a)
```

---

