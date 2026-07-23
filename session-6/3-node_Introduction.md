# 🟩 Introduction to Node.js

## 📌 What is Node.js?

- ✅ Open Source
- ✅ Cross-Platform (Works on Windows, Mac, Linux)
- ✅ A JavaScript Runtime Environment
- ✅ Allows JavaScript to run **outside the browser**

---

## 🧠 How JavaScript Code Works (In Browsers)

- JavaScript is usually run inside the browser.
- Each browser (Chrome, Firefox, etc.) uses a **JavaScript Engine**.
  - For example, Chrome uses the **V8 Engine**.
- The engine **compiles JS code into machine code** that your computer can understand.

---

## ⚙️ How Node.js Works

- Node.js uses Google’s **V8 Engine** under the hood.
- It allows JavaScript to run **outside of the browser**.
- You can use Node.js to build:
  - Web servers
  - APIs
  - Real-time applications
  - Command-line tools

---

## ⬇️ Download Node.js

Download from the official site:

```
https://nodejs.org/en/download
```


---

## ✅ Verify Installation

Open a terminal or command prompt and type:

- On Windows:
  ```bash
  node -v
  ```
- On Mac/Linux:
  ```bash
  node -v
  ```

---

## 🌟 Features of Node.js

- ✅ Use JavaScript for backend development
- ✅ Build backend servers and APIs
- ✅ Supports real-time apps like chats and notifications
- ✅ Non-blocking, event-driven model
- ✅ Built-in modules (e.g., `fs`, `http`, `path`)
- ✅ Comes with **npm** (Node Package Manager)

---

## 💡 Example Use Cases

- Real-time chat apps
- REST APIs for web/mobile apps
- Streaming platforms (e.g., Netflix)
- Task automation scripts (CLI tools)

---

## 🟢 Node.js REPL (Node Shell)

### 📌 What is REPL?

**REPL** stands for:

- **Read** → takes user input
- **Eval** → evaluates the input
- **Print** → prints the result
- **Loop** → repeats the process

It’s an **interactive shell** where you can run JavaScript code **line by line** directly in your terminal.

---

### 🚀 How to Start Node REPL

Open your terminal or command prompt and type `node`:

```bash
node
> 1 + 1
2

> "Hello".toUpperCase()
'HELLO'
```

### 💡 Example

```bash
> const x = 5
> const y = 10
> x * y
50
```

### 🔚 How to Exit REPL

You can exit by typing: `.exit`

```bash
.exit
```

### ✅ REPL Is Useful For:

- Testing small code snippets
- Trying JavaScript methods quickly
- Debugging logic
- Learning or practicing JavaScript basics

### ❌ REPL Is Not Suitable For:

- Large projects
- Long-term scripts
- Full web applications or servers

### ✅ Solution:

- Create `index.js` file.
- How to Run It

```bash
node index.js
```
