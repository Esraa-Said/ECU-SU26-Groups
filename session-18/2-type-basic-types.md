# TypeScript Basic Types



## 1. `number`
```ts
let age: number = 30;
let price: number = 99.99;
```

## 2. `string`
```ts
let firstName: string = "John";
let greeting: string = `Hello, ${firstName}`;
```

## 3. `boolean`
```ts
let isLoggedIn: boolean = true;
```

## 4. `null` and `undefined`
```ts
let u: undefined = undefined;
let n: null = null;
```

## 5. `any`
```ts
let anyValue;
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;
```

## 6. `unknown`
```ts
let value: unknown = 30;
// value.toFixed(2); ❌ Error until you check its type
if (typeof value === "number") {
  console.log(value.toFixed(2)); // ✅ Safe now
}
```

## 7. `union`
```ts
let x : string | boolean;
x = "esraa";
x = true;
```