
# 🧱 Objects, Type Aliases, and Interfaces in TypeScript


## 🔹 1. Objects in TypeScript

In JavaScript, an object is a collection of key-value pairs.  
In TypeScript, we add **type safety** to these keys and values.

### ✅ Basic Object Type

```ts
let user: { name: string; age: number } = {
  name: "Alice",
  age: 25
};
```

- `name` must be a string
- `age` must be a number

---

### ✅ Optional Properties

Use `?` to mark a property as optional:

```ts
let product: { name: string; price?: number } = {
  name: "Laptop"
};
```

- `price` is optional and can be left undefined.

---

### ✅ Readonly Properties

Use `readonly` to prevent modifications:

```ts
let point: { readonly x: number; readonly y: number } = { x: 0, y: 0 };
// point.x = 10; // ❌ Error: Cannot assign to 'x'
```

---

### ✅ Index Signatures

When you don't know all the property names in advance:

```ts
let settings: { [key: string]: string } = {
  theme: "dark",
  layout: "grid"
};
```

---

## 🔸 2. Type Alias (`type`)

You can create reusable object structures using `type`.

```ts
type User = {
  name: string;
  age: number;
  isAdmin?: boolean;
};

let admin: User = {
  name: "John",
  age: 30,
  isAdmin: true
};
```

---

### ✅ Type Aliases Can Also Be:

- Unions:

```ts
type Status = "success" | "error" | "loading";
```

- Intersections:

```ts
type Circle = { radius: number };
type Color = { color: string };

type ColoredCircle = Circle & Color;
```

---

### ❗ You CANNOT reopen or extend a `type` later like you can with `interface`.

---

## 🔹 3. Interfaces

An `interface` is very similar to a `type` but is extendable and preferred when describing **object shapes**.

```ts
interface Product {
  name: string;
  price: number;
}

let item: Product = {
  name: "Book",
  price: 15
};
```

---

### ✅ Optional, Readonly, and Index

```ts
interface Config {
  readonly id: number;
  title: string;
  optionalNote?: string;
  [key: string]: any; // index signature
}
```

---

### ✅ Extending Interfaces

```ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

let myDog: Dog = {
  name: "Max",
  breed: "Labrador"
};
```

---

### ✅ Implementing Interfaces with Classes

```ts
interface Person {
  name: string;
  greet(): void;
}

class Teacher implements Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  greet() {
    console.log("Hello, I am " + this.name);
  }
}
```

---

## 🔄 Interface vs Type Alias

| Feature              | `interface`      | `type`                 |
|----------------------|------------------|------------------------|
| Extensible           | ✅ Yes            | ❌ No                  |
| Use with objects     | ✅ Best use case  | ✅ Also supported      |
| Unions & Intersections | ❌ No           | ✅ Yes                 |
| Class Implementation | ✅ Yes            | ✅ Yes                 |
| React Props (common) | ✅ Yes            | ✅ Yes                 |

---

