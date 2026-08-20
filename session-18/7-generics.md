# Generics in TypeScript

## 📌 What Are Generics?

Generics allow you to create reusable code components that work with **multiple types** instead of a single one.

Think of Generics as **placeholders for types**.

```ts
function identity<T>(arg: T): T {
    return arg;
}
```

Here, `<T>` is a placeholder type. When you call the function, you can specify what `T` should be.

---

## ✅ Why Use Generics?

- Code **reusability**
- Type **safety**
- Better **autocompletion** and **type inference**

---

## 🧁 Basic Example

```ts
function echo<T>(value: T): T {
    return value;
}

let numberEcho = echo<number>(123);     // numberEcho is number
let stringEcho = echo<string>('Hello'); // stringEcho is string
```

You can also let TypeScript **infer** the type:

```ts
echo(true);  // TypeScript infers T as boolean
```

---

## 🧩 Generic Functions

```ts
function getFirst<T>(arr: T[]): T {
    return arr[0];
}

getFirst<number>([1, 2, 3]); // returns 1
getFirst<string>(['a', 'b']); // returns 'a'
```

---

## 📦 Generic Interfaces

```ts
interface Box<T> {
    value: T;
}

const stringBox: Box<string> = { value: 'hello' };
const numberBox: Box<number> = { value: 42 };
```

---

## 🏗️ Generic Classes

```ts
class Container<T> {
    private _value: T;

    constructor(value: T) {
        this._value = value;
    }

    getValue(): T {
        return this._value;
    }
}

const numContainer = new Container<number>(123);
console.log(numContainer.getValue()); // 123
```

---

## 🧠 Generic Constraints

You can limit what types are allowed using `extends`.

```ts
function lengthOf<T extends { length: number }>(item: T): number {
    return item.length;
}

lengthOf([1, 2, 3]); // OK
lengthOf('hello');  // OK
lengthOf(42);       // Error: number doesn't have length
```

---

## 🎯 Default Type Parameters

```ts
function wrapInArray<T = string>(x: T): T[] {
    return [x];
}

wrapInArray(10);       // number[]
wrapInArray('hello');  // string[]
```

---

## 🛠️ Using Multiple Type Parameters

```ts
function merge<T, U>(a: T, b: U): T & U {
    return { ...a, ...b };
}

const merged = merge({ name: 'Alice' }, { age: 30 });
// merged: { name: string; age: number; }
```

---

## 📋 Generic Utility Types (built-in)

TypeScript provides some generics out-of-the-box:

### Partial

```ts
interface Todo {
    title: string;
    completed: boolean;
}

const todo: Partial<Todo> = { title: 'Write README' };
```

### Readonly

```ts
const user: Readonly<{ name: string }> = { name: 'Bob' };
// user.name = 'Tom'; ❌ Error
```



---

## 📌 Summary

- Generics = flexible, reusable components with type safety
- Can be used in functions, interfaces, classes
- Can add constraints, defaults, and combine multiple generics


