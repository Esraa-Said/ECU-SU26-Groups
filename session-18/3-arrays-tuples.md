
# Arrays and Tuples in TypeScript

TypeScript gives you strong typing when working with arrays and tuples, making your code safer and more predictable.

---

## 📦 Arrays with Specific Types

In JavaScript, arrays can hold any type of value.  
But in TypeScript, you can **specify the type of items inside the array**.

### ✅ Example 1: Basic Array

```ts
let numbers: number[] = [1, 2, 3];
let names: string[] = ["Alice", "Bob", "Charlie"];
```

### ✅ Example 2: Using `Array<T>` Syntax

```ts
let isActive: Array<boolean> = [true, false];
let users: Array<string> = ["user1", "user2"];
```

### ❌ Invalid Values Will Cause Errors

```ts
let ids: number[] = [1, "two", 3]; // Error: "two" is not a number
```

### ✅ Array Operations with Type Safety

```ts
let fruits: string[] = ["apple", "banana"];
fruits.push("orange");     // ✅ OK
fruits.push(42);           // ❌ Error: 42 is not a string
```

---

## 📌 Tuples in TypeScript 

A **tuple** is a special type of array where:
- You define the **number of elements**.
- You define the **type of each element by its position**.

### ✅ Basic Tuple

```ts
let person: [string, number] = ["Alice", 30];
```

- `person[0]` must always be a `string`
- `person[1]` must always be a `number`

### ❌ Wrong Order = Error

```ts
person = [30, "Alice"]; // ❌ Error: incorrect types in positions
```

---

### 🛠 Accessing Tuple Values

```ts
console.log(person[0].toUpperCase()); // Alice
console.log(person[1].toFixed(2));    // 30.00
```

---

### ✅ Optional Elements in Tuple

```ts
let result: [boolean, string?] = [true];
```

- The second element is optional.
- Tuple still enforces the order and types.
- optional elements must be at the end.
---

### ✅ Rest Elements in Tuple

```ts
let numbers: [number, ...number[]] = [1, 2, 3, 4];
```

- First element is `number`
- The rest are also numbers

---

### ✅ Named Tuple (for clarity)

```ts
type Point = [x: number, y: number];
let location: Point = [100, 200];
```

---

### ✅ Destructuring Tuples

```ts
let user: [string, number] = ["Ahmed", 22];
let [name, age] = user;

console.log(`${name} is ${age} years old`);
```

---

### ⚠️ Tuples are Arrays Under the Hood

TypeScript enforces tuple rules at **compile time** only.
But at **runtime**, it's just an array — so it's possible to break it.

```ts
person.push("unexpected"); // ⚠️ Technically allowed, but unsafe
```

➡️ Use `"strict": true` in `tsconfig.json` to minimize unsafe operations.

---

## ✅ Summary Table

| Feature               | Array                  | Tuple                        |
|-----------------------|------------------------|-------------------------------|
| Length                | Dynamic                | Fixed (or partially fixed)   |
| Same Type Elements    | ✅ Yes                 | ❌ No (types vary per position) |
| Optional Elements     | ❌ Not directly         | ✅ Supported                  |
| Rest Elements         | ❌ Not directly         | ✅ Supported                  |
| Named Fields          | ❌ No                   | ✅ Yes (using `type`)         |
| Destructuring         | ✅ Yes                 | ✅ Yes                        |

---

## 👏 Use Cases

- Arrays → when you want multiple values of the **same type**
- Tuples → when you want to group **related but different types** of fixed-size data

---

## 🧠 Pro Tip

Avoid using tuples for large structures with too many elements — use interfaces or types instead.

```ts
type User = {
  name: string;
  age: number;
  isActive: boolean;
};
```

