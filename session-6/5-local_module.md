# ✅ What Is a Local Module?

A **local module** is a **JavaScript file** that you create in your project to encapsulate and reuse your own code.
Unlike core modules (`fs`, `http`) or npm packages (`express`, `chalk`), a **local module** is **written by you** and imported into other files using `require()`.

---

## 🧠 Why Use Local Modules?

- ✅ Keep code **organized** and **modular**
- ✅ **Separate concerns** (e.g., math logic, validation, DB config)
- ✅ Makes large projects easier to maintain
- ✅ Reuse code across multiple files

---

## 📁 Folder Structure Example

```lua
project/
│
├── app.js
├── utils/
│   ├── math.js
│   └── greet.js
```

---

## 🔹 1. Create a Local Module

### 📄 `math.js`

```js
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

// Export functions
module.exports = {
  add,
  multiply,
};
```

## 🔹 2. Import and Use the Module

### 📄 `app.js`

```js
const math = require("./utils/math");

console.log(math.add(5, 3)); // 8
console.log(math.multiply(4, 6)); // 24
```

## 🔸 3. How `require()` Works

When you write:

```js
require("./utils/math");
```

### Node.js does:

1. Resolves the path
2. Loads the module only **once**
3. Executes the file
4. Caches the result
5. Returns whatever is in `module.exports`

## User Management System

### 🎯 Goal: Build a small backend app that:

- Manages a list of users (add, remove, list)
- Uses **local modules** to separate logic
- Uses only **Node.js core + local modules**
