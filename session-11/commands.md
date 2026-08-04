## ⚙️ 1. Create a New Node.js Project

### Step 1: Create project folder
```bash
mkdir project folder
cd project folder
````

### Step 2: Initialize Node.js project

```bash
npm init -y
```

This will generate a `package.json` file.

---

## 📦 2. Install Dependencies

### 🔹 Main Dependencies (Production)

```bash
npm install express mongoose dotenv
```

### 🔹 Development Dependencies

```bash
npm install --save-dev nodemon
```

---

## 📄 3. package.json Configuration

Make sure your `package.json` includes the following:

```json
{
  "name": "course-management-system-project",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.js"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  },
  "dependencies": {
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "mongoose": "^9.7.0"
  }
}
```

---

## 📚 4. Installed Packages Explanation

### 🔹 Express

* Web framework for Node.js
* Handles routes, requests, and responses

### 🔹 Mongoose

* ODM for MongoDB
* Used to define schemas and models

### 🔹 Dotenv

* Loads environment variables from `.env`
* Keeps sensitive data secure

### 🔹 Nodemon

* Restarts server automatically on file changes
* Used only in development

---

## 📁 5. Recommended Project Structure

```
course-management-system-project/
│
├── index.js
├── .env
├── package.json
│
├── config/
│   └── db.js
│
├── models/
│   ├── User.js
│   ├── Course.js
│
├── routes/
│   ├── userRoutes.js
│   ├── courseRoutes.js
│
├── controllers/
│   ├── userController.js
│   ├── courseController.js
│
└── middlewares/
    └── authMiddleware.js
```

---

## 🔐 6. Environment Variables Setup

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## ▶️ 7. Run the Project

### Start development server

```bash
npm start
```

Because of this script:

```json
"start": "nodemon index.js"
```

---


