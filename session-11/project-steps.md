# 📦 MongoDB & Mongoose with Express.js (Courses API)

## 🧠 Overview

When building an Express application, storing data in JSON files works only for small demos. For real-world applications, you should use a database.

In this guide, you'll learn how to:

- Install and configure **Mongoose**
- Connect your application to **MongoDB Atlas**
- Use **environment variables** with `.env`
- Protect sensitive files using `.gitignore`
- Create **Schemas** and **Models**
- Perform CRUD operations with Mongoose

---

# 1️⃣ Install Required Packages

Install Mongoose:

```bash
npm install mongoose
```

Install dotenv to load environment variables:

```bash
npm install dotenv
```

---

# 2️⃣ Create a MongoDB Atlas Database

## Step 1: Create an Atlas Account

Sign up for a free MongoDB Atlas account.

## Step 2: Create a Cluster

Create a cluster where your database will be hosted.

## Step 3: Configure Network Access

Allow your IP address (or `0.0.0.0/0` for testing).

## Step 4: Create a Database User

Example:

```text
Username: admin
Password: myPassword123
```

## Step 5: Get the Connection String

MongoDB Atlas provides a URI similar to:

```text
mongodb+srv://<db_username>:<db_password>@cluster.mongodb.net/
```

Replace the placeholders with your credentials.

---

# 3️⃣ Store Configuration in `.env`

Create a `.env` file in the project root:

```env
PORT=5000

MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/

DB_NAME=Your-DB-name
```

Using environment variables keeps sensitive information out of your source code.

---

# 4️⃣ Configure `.gitignore`

Create a `.gitignore` file:

```gitignore
node_modules
.env
```

### Why?

- `node_modules` can always be regenerated using `npm install`.
- `.env` contains secrets like database credentials and should never be uploaded to GitHub.

---

# 5️⃣ Load Environment Variables

At the beginning of `index.js`:

```js
require("dotenv").config();
```

Now environment variables can be accessed through:

```js
process.env.PORT;
process.env.MONGODB_URI;
process.env.DB_NAME;
```
--- 
Put these lines at the top of index.js file
```js
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);
```
---

# 6️⃣ Create the Database Connection

Create:

```
config/db-connect.js
```

```js
const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
    });

    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(`Database Connection Error: ${error.message}`);
  }
};

module.exports = dbConnect;
```

Then call it in `index.js` **before starting the server**:

```js
require("dotenv").config();

const express = require("express");
const dbConnect = require("./config/db-connect");

const app = express();

dbConnect();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
```

---

# 7️⃣ Understanding Schema vs Model

## 📄 Schema

A **Schema** defines the structure of documents inside a collection.

It specifies:

- Field names
- Data types
- Validation rules
- Default values

Think of it as a blueprint.

## 🗂️ Model

A **Model** is created from a schema and provides methods to interact with MongoDB.

Examples:

- `find()`
- `findById()`
- `create()`
- `findByIdAndUpdate()`
- `findByIdAndDelete()`

---

# 8️⃣ Create the Course Model

`models/course-model.js`

```js
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      unique: true,
      trim: true,
      minlength: [3, "Course title must be at least 3 characters long"],
      maxlength: [100, "Course title cannot exceed 100 characters"],
    },

    instructor: {
      type: String,
      required: [true, "Instructor name is required"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Course category is required"],
      trim: true,
      enum: {
        values: [
          "frontend",
          "backend",
          "database",
          "programming",
          "devops",
          "mobile",
        ],
        message: "Please provide a valid category",
      },
    },

    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },

    price: {
      type: Number,
      required: [true, "Course price is required"],
      min: [0, "Price cannot be negative"],
    },

    duration: {
      type: String,
      required: [true, "Course duration is required"],
      trim: true,
    },

    level: {
      type: String,
      required: [true, "Course level is required"],
      enum: {
        values: ["beginner", "intermediate", "advanced"],
        message: "Level must be Beginner, Intermediate, or Advanced",
      },
    },

    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot be greater than 5"],
    },

    students: {
      type: Number,
      default: 0,
      min: [0, "Students count cannot be negative"],
    },

    imageUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
```

---

# 9️⃣ About `timestamps`

When you write:

```js
timestamps: true;
```

Mongoose automatically adds two fields to every document:

```text
createdAt
updatedAt
```

You don't need to create or update them manually.

---

# 🔟 Using the Model in Controllers

Import the model:

```js
const Course = require("../models/course-model");
```

## Get All Courses

```js
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json({
      status: "success",
      count: courses.length,
      data: {
        courses,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to fetch courses: ${error.message}`,
    });
  }
};
```

Returns every course document.

---

## Get Course by ID

```js
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        status: "fail",
        message: "Course not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        course,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
```

Returns one course matching the given MongoDB ObjectId.

---

## Create a Course

```js
const createCourse = async (req, res) => {
  try {
    const category = req.body.category?.toLowerCase();
    const level = req.body.level?.toLowerCase();

    const newCourse = await Course.create({
      ...req.body,
      category,
      level,
    });

    res.status(201).json({
      status: "success",
      message: "Course added successfully",
      data: {
        course: newCourse,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
```

Creates a new document and automatically applies schema validation.

---

## Update a Course

```js
const updateCourse = async (req, res) => {
  try {
    
    if (req.body.category) req.body.category = req.body.category.toLowerCase();
    if (req.body.level) req.body.level = req.body.level.toLowerCase();

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: 'after'
        runValidators: true,
      },
    );

    if (!updatedCourse) {
      return res.status(404).json({
        status: "fail",
        message: "Course not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Course updated successfully",
      data: {
        course: updatedCourse,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
```

### ` returnDocument: 'after'`

Returns the updated document instead of the old one.

### `runValidators: true`

Runs schema validation during updates.

Without it, invalid data could be saved.

---

## Delete a Course

```js
const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
      return res.status(404).json({
        status: "fail",
        message: "Course not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Course deleted successfully",
      data: {
        course: deletedCourse,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
```

Removes the document from the collection.

---

## Export Handlers

```js
module.exports = {
  getAllCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
};
```

# 📚 Common Mongoose Methods

| Method                              | Purpose               |
| ----------------------------------- | --------------------- |
| `Model.find()`                      | Get all documents     |
| `Model.findById(id)`                | Get one document      |
| `Model.create(data)`                | Insert a new document |
| `Model.findByIdAndUpdate(id, data)` | Update a document     |
| `Model.findByIdAndDelete(id)`       | Delete a document     |

---

# 📁 Recommended Project Structure

```text
project/
│
├── config/
│   └── db-connect.js
│
├── controllers/
│   └── course-controllers.js
│
├── models/
│   └── course-model.js
│
├── routes/
│   └── course-routes.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── index.js
└── node_modules/
```

---

# ✅ Summary

- **MongoDB** stores your application data as collections of documents.
- **Mongoose** is an ODM that lets you interact with MongoDB using JavaScript objects.
- Store sensitive configuration in a **`.env`** file.
- Add **`.env`** and **`node_modules/`** to **`.gitignore`**.
- Create a **Schema** to define your document structure and validation rules.
- Create a **Model** from the schema to perform CRUD operations.
- Common methods include:
  - `find()`
  - `findById()`
  - `create()`
  - `findByIdAndUpdate()`
  - `findByIdAndDelete()`
- Enable `timestamps: true` to automatically track `createdAt` and `updatedAt`.
- Use `runValidators: true` when updating documents to enforce schema validation.