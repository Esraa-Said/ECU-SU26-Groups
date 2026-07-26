# 📁 Node.js File System (`fs`) Module

## 📚 What is the `fs` Module?

The **File System (`fs`) module** is a built-in Node.js module that allows your application to interact with the operating system's file system.

Using the `fs` module, you can:

- Read files
- Create files
- Write to files
- Append data to files
- Delete files
- Rename files
- Create folders
- Read folder contents
- Check if files or folders exist

Unlike browser JavaScript, Node.js can access files on your computer because it runs outside the browser.

---

# 🤔 Why Do We Need the `fs` Module?

Imagine you're building a real-world application such as:

- A note-taking application
- A blog system
- A student management system
- A banking application
- A medical system

All these applications need to save and retrieve data from files.

For example:

- Save user information
- Read configuration files
- Store logs
- Upload files
- Read reports

Without the `fs` module, your Node.js application wouldn't be able to interact with the file system.

---

# 📥 Importing the `fs` Module

Since `fs` is a built-in Node.js module, you don't need to install it.

Simply import it using:

```javascript
const fs = require("fs");
```

Now all file system methods are available through the `fs` object.

---

# ⚡ Synchronous vs Asynchronous Methods

The `fs` module provides two versions of most operations:

| Type | Description |
|------|-------------|
| Synchronous | Waits until the operation finishes before executing the next line of code. |
| Asynchronous | Starts the operation and continues executing the rest of the program without waiting. |

---

## Synchronous Methods

Synchronous methods block the execution of the program until the operation is complete.

Example:

```javascript
const fs = require("fs");

console.log("Start");

const data = fs.readFileSync("example.txt", "utf8");

console.log(data);

console.log("End");
```

Suppose the file contains:

```text
Hello Node.js
```

Output:

```text
Start
Hello Node.js
End
```

Notice that JavaScript waits until the file is completely read before printing `"End"`.

---

## Asynchronous Methods

Asynchronous methods don't block the program.

Instead, they execute a callback function after the operation finishes.

Example:

```javascript
const fs = require("fs");

console.log("Start");

fs.readFile("example.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err.message);
    return;
  }

  console.log(data);
});

console.log("End");
```

Output:

```text
Start
End
Hello Node.js
```

Notice that `"End"` appears before the file content because JavaScript doesn't wait for the file to finish reading.

---

# 📖 Reading Files

Reading a file means loading its contents into your program.

---

## Reading a File Synchronously

```javascript
const fs = require("fs");

const data = fs.readFileSync("example.txt", "utf8");

console.log(data);
```

Suppose `example.txt` contains:

```text
Welcome to Node.js!
```

Output:

```text
Welcome to Node.js!
```

### Parameters

```javascript
fs.readFileSync(path, encoding)
```

- `path` → file path
- `encoding` → converts the file into a readable string

Without `"utf8"`:

```javascript
const data = fs.readFileSync("example.txt");

console.log(data);
```

Output:

```text
<Buffer 57 65 6c ...>
```

Because Node.js returns a Buffer instead of text.

---

## Reading a File Asynchronously

```javascript
const fs = require("fs");

fs.readFile("example.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err.message);
    return;
  }

  console.log(data);
});
```

Output:

```text
Welcome to Node.js!
```

---

# ✍️ Writing Files

Writing creates a new file or replaces the contents of an existing file.

---

## Writing Synchronously

```javascript
const fs = require("fs");

fs.writeFileSync("notes.txt", "Learning Node.js");

console.log("File created successfully!");
```

If the file doesn't exist:

```text
notes.txt
```

is created.

If it already exists, its previous contents are replaced.

---

## Writing Asynchronously

```javascript
const fs = require("fs");

fs.writeFile("notes.txt", "Learning Async", (err) => {
  if (err) {
    console.log(err.message);
    return;
  }

  console.log("File saved successfully!");
});
```

---

# ➕ Appending to Files

Appending adds new content to the end of a file without removing the existing data.

---

## Synchronous Append

```javascript
const fs = require("fs");

fs.appendFileSync("notes.txt", "\nSecond Line");
```

Suppose the file contains:

```text
Learning Node.js
```

After appending:

```text
Learning Node.js
Second Line
```

---

## Asynchronous Append

```javascript
const fs = require("fs");

fs.appendFile("notes.txt", "\nThird Line", (err) => {
  if (err) {
    console.log(err.message);
    return;
  }

  console.log("Text appended!");
});
```

---

# 🗑️ Deleting Files

Delete a file using `unlink`.

---

## Synchronous Delete

```javascript
const fs = require("fs");

fs.unlinkSync("notes.txt");

console.log("File deleted");
```

---

## Asynchronous Delete

```javascript
const fs = require("fs");

fs.unlink("notes.txt", (err) => {
  if (err) {
    console.log(err.message);
    return;
  }

  console.log("File deleted");
});
```

---

# 🔄 Renaming Files

Rename a file by providing the old name and the new name.

---

## Synchronous Rename

```javascript
const fs = require("fs");

fs.renameSync("old.txt", "new.txt");

console.log("Renamed successfully");
```

---

## Asynchronous Rename

```javascript
const fs = require("fs");

fs.rename("old.txt", "new.txt", (err) => {
  if (err) {
    console.log(err.message);
    return;
  }

  console.log("Renamed successfully");
});
```

---

# 📂 Creating Folders

Create a new directory using `mkdir`.

---

## Synchronous

```javascript
const fs = require("fs");

fs.mkdirSync("Students");
```

A folder named:

```text
Students
```

is created.

---

## Asynchronous

```javascript
const fs = require("fs");

fs.mkdir("Students", (err) => {
  if (err) {
    console.log(err.message);
    return;
  }

  console.log("Folder created");
});
```

---

# 📁 Reading Directory Contents

You can retrieve all files and folders inside a directory.

---

## Synchronous

```javascript
const fs = require("fs");

const files = fs.readdirSync(".");

console.log(files);
```

Example Output:

```text
[
  "app.js",
  "package.json",
  "Students",
  "notes.txt"
]
```

The dot (`.`) refers to the current directory.

---

## Asynchronous

```javascript
const fs = require("fs");

fs.readdir(".", (err, files) => {
  if (err) {
    console.log(err.message);
    return;
  }

  console.log(files);
});
```

---

# ✅ Checking if a File Exists

Sometimes you need to verify that a file exists before reading or deleting it.

---

## Using `existsSync()`

```javascript
const fs = require("fs");

if (fs.existsSync("notes.txt")) {
  console.log("File exists");
} else {
  console.log("File not found");
}
```

Output:

```text
File exists
```

---

# 🔄 Modern Asynchronous Programming with `fs.promises`

Instead of callbacks, modern Node.js supports Promises and `async/await`.

Import:

```javascript
const fs = require("fs").promises;
```

---

## Reading a File with `async/await`

```javascript
const fs = require("fs").promises;

async function readMyFile() {
  try {
    const data = await fs.readFile("notes.txt", "utf8");

    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
}

readMyFile();
```

This version is easier to read and avoids nested callbacks.

---

# 🏫 Real-World Example

Suppose you're building a student management system.

### Step 1: Save student information

```javascript
const fs = require("fs");

const student = {
  name: "Esraa",
  age: 22,
  grade: "A"
};

fs.writeFileSync(
  "student.json",
  JSON.stringify(student, null, 2)
);

console.log("Student saved");
```

The file becomes:

```json
{
  "name": "Esraa",
  "age": 22,
  "grade": "A"
}
```

---

### Step 2: Read the student information

```javascript
const fs = require("fs");

const data = fs.readFileSync("student.json", "utf8");

const student = JSON.parse(data);

console.log(student);
```

Output:

```javascript
{
  name: "Esraa",
  age: 22,
  grade: "A"
}
```

---

# 📝 When Should You Use Sync or Async?

### Use Synchronous Methods

- Small scripts
- Learning
- Configuration files loaded once
- Startup operations

Example:

```javascript
const config = fs.readFileSync("config.json", "utf8");
```

---

### Use Asynchronous Methods

- Web servers
- APIs
- Applications handling many users
- Large file operations

Example:

```javascript
fs.readFile("users.json", "utf8", callback);
```

or

```javascript
await fs.readFile("users.json", "utf8");
```

---

# 📊 Common `fs` Methods

| Task | Synchronous | Asynchronous |
|------|-------------|--------------|
| Read File | `readFileSync()` | `readFile()` |
| Write File | `writeFileSync()` | `writeFile()` |
| Append File | `appendFileSync()` | `appendFile()` |
| Delete File | `unlinkSync()` | `unlink()` |
| Rename File | `renameSync()` | `rename()` |
| Create Folder | `mkdirSync()` | `mkdir()` |
| Read Directory | `readdirSync()` | `readdir()` |
| Check File Exists | `existsSync()` | `fs.access()` |
| Promise-based Methods | ❌ | `fs.promises` |

---

# 🎯 Best Practices

- Prefer asynchronous methods for production applications.
- Use `async/await` with `fs.promises` for cleaner code.
- Always handle errors when working with files.
- Use `existsSync()` (or `fs.access()`) before performing operations that depend on a file's existence.
- Use `appendFile()` when you want to preserve existing data.
- Use `writeFile()` when you want to replace the file contents.

---

# 📝 Summary

- The **`fs` module** is a built-in Node.js module used to interact with the file system.
- It allows you to create, read, update, delete, rename, and manage files and folders.
- Most operations have both **synchronous** and **asynchronous** versions.
- **Synchronous methods** block the program until the operation completes.
- **Asynchronous methods** allow the program to continue running while the operation executes.
- Modern Node.js applications commonly use **`fs.promises`** with **`async/await`** for cleaner and more maintainable code.
- Always handle errors when performing file operations to make your application more reliable.