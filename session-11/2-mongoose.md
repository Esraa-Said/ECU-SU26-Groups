# 🍃 MongoDB & Mongoose Guide

## 📖 What is MongoDB?

**MongoDB** is a **NoSQL (non-relational) database** that stores data as **documents** instead of tables.

Instead of organizing data into rows and columns like SQL databases, MongoDB stores data in **collections** and **documents**.

### Example Document

```json
{
  "_id": "507f191e810c19729de860ea",
  "name": "Esraa",
  "age": 24,
  "city": "Cairo"
}
```

A group of similar documents is stored in a **collection**.

For example:

* `users` collection
* `products` collection
* `orders` collection

---

# 🏗️ MongoDB Structure

| SQL      | MongoDB    |
| -------- | ---------- |
| Database | Database   |
| Table    | Collection |
| Row      | Document   |
| Column   | Field      |

Example:

```
Database
│
├── users (collection)
│     ├── { name: "Ali", age: 25 }
│     └── { name: "Sara", age: 30 }
│
└── products (collection)
      ├── { name: "Laptop", price: 1000 }
      └── { name: "Phone", price: 700 }
```

---

# ✅ Why Use MongoDB?

* Stores data as JSON-like documents.
* Flexible schema (documents don't have to contain exactly the same fields).
* Easy to work with JavaScript applications.
* Scales well for large applications.
* Great choice for modern web applications and REST APIs.

---

# 🧠 What is Mongoose?

**Mongoose** is an **ODM (Object Data Modeling)** library for **Node.js** and **MongoDB**.

It provides a structured way to define your data and interact with MongoDB using JavaScript objects.

Instead of writing low-level database operations, you work with models and documents.

```
Application
      │
      ▼
  Mongoose (ODM)
      │
      ▼
   MongoDB Database
```

---

# ❓ What is an ODM?

ODM stands for **Object Data Modeling**.

It maps JavaScript objects to MongoDB documents, making database operations easier and more organized.

Without Mongoose:

```js
// Work directly with the MongoDB driver
```

With Mongoose:

```js
const User = mongoose.model("User", userSchema);

const users = await User.find();
```

---

# 🚀 Why Use Mongoose?

* Cleaner and easier code.
* Define a structure for your data using schemas.
* Built-in validation.
* Easy CRUD operations.
* Supports relationships with `populate()`.
* Supports middleware (hooks) and many helper methods.

---

# 📦 Installation

```bash
npm install mongoose
```

Import it into your project:

```js
const mongoose = require("mongoose");
```

---

# 🔗 Connecting to MongoDB

```js
const mongoose = require("mongoose");

mongoose
  .connect("YOUR_MONGODB_CONNECTION_STRING")
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });
```

If the connection succeeds, your application can start reading and writing data.

---

# 📝 Schema

A **Schema** defines the structure of your documents.

It specifies:

* Fields
* Data types
* Required values
* Default values
* Validation rules

Example:

```js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  inStock: Boolean,
});
```

You can also add validation:

```js
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
});
```

---

# 🏭 Model

A **Model** is created from a schema.

It represents a MongoDB collection and provides methods to interact with it.

```js
const Product = mongoose.model("Product", productSchema);
```

After creating the model, you can perform CRUD operations.

---

# ➕ Create (Insert)

Insert a new document:

```js
await Product.create({
  name: "Laptop",
  price: 1200,
});
```

Equivalent document in MongoDB:

```json
{
  "name": "Laptop",
  "price": 1200,
  "inStock": true
}
```

---

# 📖 Read

Get all documents:

```js
const products = await Product.find();
```

Get one document by ID:

```js
const product = await Product.findById(id);
```

Filter documents:

```js
const cheapProducts = await Product.find({
  price: { $lt: 500 },
});
```

---

# ✏️ Update

Update by ID:

```js
await Product.findByIdAndUpdate(
  id,
  {
    price: 1500,
  },
  {
    returnDocument: 'after',
    runValidators: true
  }
);
```

`returnDocument: 'after'` returns the updated document instead of the old one.

`runValidators: true` Runs schema validation during updates. Without it, invalid data could be saved.

---

# ❌ Delete

Delete by ID:

```js
await Product.findByIdAndDelete(id);
```

Delete multiple documents:

```js
await Product.deleteMany({
  inStock: false,
});
```

---

# 🔄 CRUD Summary

| Operation | Mongoose Method       |
| --------- | --------------------- |
| Create    | `create()`            |
| Read All  | `find()`              |
| Read One  | `findById()`          |
| Update    | `findByIdAndUpdate()` |
| Delete    | `findByIdAndDelete()` |

---

# 📋 Validation Example

```js
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 18,
  },
});
```

Trying to save invalid data will cause Mongoose to throw a validation error.

---

# 🔗 Relationships with `populate()`

MongoDB documents can reference documents from another collection using `ObjectId`.

### User Schema

```js
const userSchema = new mongoose.Schema({
  name: String,
});
```

### Order Schema

```js
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  total: Number,
});
```

Suppose the database stores:

```json
{
  "user": "685abc12345...",
  "total": 500
}
```

Calling:

```js
const orders = await Order.find().populate("user");
```

returns:

```json
{
  "user": {
    "name": "Esraa"
  },
  "total": 500
}
```

`populate()` automatically replaces the referenced ID with the actual document.

---

# 🛠️ Middleware (Hooks)

Mongoose lets you execute code before or after certain operations.

Example:

```js
userSchema.pre("save", function (next) {
  console.log("Saving user...");
  next();
});
```

This runs automatically before `save()` executes.

---

# 📊 MongoDB vs Mongoose

| MongoDB                 | Mongoose                           |
| ----------------------- | ---------------------------------- |
| Database                | ODM library                        |
| Stores documents        | Defines schemas and models         |
| Native driver available | Built on top of the MongoDB driver |
| Flexible structure      | Adds validation and organization   |
| Raw database operations | Cleaner JavaScript API             |

---

# 🎯 Real Example

```js
const mongoose = require("mongoose");

mongoose.connect("YOUR_URI");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  grade: Number,
});

const Student = mongoose.model("Student", studentSchema);

async function run() {
  await Student.create({
    name: "Ali",
    grade: 95,
  });

  const students = await Student.find();

  console.log(students);
}

run();
```

This code:

1. Connects to MongoDB.
2. Creates a schema.
3. Creates a model.
4. Inserts a new student.
5. Reads all students from the database.

---

# 📝 Summary

* **MongoDB** is a NoSQL database that stores data as documents.
* **Collections** contain documents, similar to tables containing rows in SQL.
* **Mongoose** is an ODM that simplifies working with MongoDB in Node.js.
* A **Schema** defines the structure and validation rules for documents.
* A **Model** is created from a schema and is used to perform CRUD operations.
* Common CRUD methods include `create()`, `find()`, `findById()`, `findByIdAndUpdate()`, and `findByIdAndDelete()`.
* `populate()` is used to load referenced documents from other collections.
* Mongoose also provides validation, middleware, and a clean API for building applications.
