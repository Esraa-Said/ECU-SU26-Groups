# 🎌 TypeScript Enums 

Enums (short for "enumerations") are a feature in TypeScript that allow you to define a **set of named constants**.  
They make your code more readable and meaningful.

---

## ✅ Basic Numeric Enum

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right
}

let move: Direction = Direction.Left;
console.log(move); // 2
```

- By default, enums start at 0 and increment.
- So: `Up = 0`, `Down = 1`, `Left = 2`, `Right = 3`

---

## ✅ Custom Numeric Enum

```ts
enum StatusCode {
  OK = 200,
  NotFound = 404,
  ServerError = 500
}

let response: StatusCode = StatusCode.OK;
console.log(response); // 200
```

Useful when you want to assign meaningful numbers like HTTP status codes.

---

## ✅ String Enum

```ts
enum LogLevel {
  Info = "INFO",
  Warn = "WARN",
  Error = "ERROR"
}

function log(level: LogLevel, message: string) {
  console.log(`[${level}]: ${message}`);
}

log(LogLevel.Warn, "This is a warning.");
```

String enums are more readable and useful for logging, configuration, etc.

---

## ✅ Heterogeneous Enum (Mixed Types)

```ts
enum Result {
  Success = "SUCCESS",
  Failure = 0
}
```

Not recommended unless you really need it. It mixes strings and numbers.

---

## ✅ Enums in Functions (e.g. User Roles)

```ts
enum Role {
  Admin,
  Editor,
  Viewer
}

function checkAccess(role: Role): void {
  if (role === Role.Admin) {
    console.log("Full access granted.");
  } else if (role === Role.Editor) {
    console.log("Limited edit access.");
  } else {
    console.log("Read-only access.");
  }
}

checkAccess(Role.Editor); // Limited edit access.
```

---

## ✅ Reverse Mapping (only for numeric enums)

```ts
enum Color {
  Red,
  Green,
  Blue
}

console.log(Color[0]); // "Red"
console.log(Color["Red"]); // 0
```

This only works for numeric enums, not string enums.

