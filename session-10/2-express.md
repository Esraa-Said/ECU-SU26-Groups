# 🚀 Express.js

## 📌 What is Express.js?

**Express.js** is a web framework built on top of Node.js that makes it easier to create web applications and APIs.

Instead of using Node's low-level `http` module and manually handling routes, requests, and responses, Express provides a simpler and cleaner way to build servers.

```text
Node.js
   ↓
Express.js
   ↓
Your Application
```

---

# 🤔 Why Do We Need Express?

Using the native `http` module often requires a lot of repetitive code.

### Using `http`

```js
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Home Page");
  } else if (req.url === "/about") {
    res.end("About Page");
  } else {
    res.end("404 Not Found");
  }
});

server.listen(3000);
```

As the application grows, this becomes difficult to maintain.

---

### Using Express

```js
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.listen(3000);
```

Much cleaner and easier to read.

---

# 📦 Installation

Install Express:

```bash
npm install express
```

Import it into your application:

```js
const express = require("express");
```

Create an Express application:

```js
const app = express();
```

---

# 🏃 Starting a Server

```js
const express = require("express");

const app = express();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

Open:

```text
http://localhost:3000
```

---

# 🛣️ Routes

A route determines what should happen when a specific URL is requested.

```js
app.get("/", (req, res) => {
  res.send("Home Page");
});
```

```js
app.get("/about", (req, res) => {
  res.send("About Page");
});
```

```text
GET /
GET /about
```

Each URL can have its own logic.

---

# HTTP Methods

Express provides methods for handling different HTTP requests.

## GET

Used to retrieve data.

```js
app.get("/users", (req, res) => {
  res.send("All Users");
});
```

---

## POST

Used to create data.

```js
app.post("/users", (req, res) => {
  res.send("User Created");
});
```

---

## PUT

Used to update data.

```js
app.put("/users/1", (req, res) => {
  res.send("User Updated");
});
```

---

## DELETE

Used to delete data.

```js
app.delete("/users/1", (req, res) => {
  res.send("User Deleted");
});
```

---

# Request Object (req)

The request object contains information about the incoming request.

```js
app.get("/test", (req, res) => {
  console.log(req.method);
  console.log(req.url);
});
```

Useful properties:

| Property   | Description      |
| ---------- | ---------------- |
| req.url    | Requested URL    |
| req.method | HTTP Method      |
| req.params | Route Parameters |
| req.query  | Query Parameters |
| req.body   | Request Body     |

---

# Response Object (res)

The response object is used to send data back to the client.

```js
res.send("Hello");
```

```js
res.json({ name: "Esraa" });
```

```js
res.status(404).send("Not Found");
```

---

# Route Parameters

Route parameters allow dynamic values inside URLs.

```js
app.get("/users/:id", (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});
```

Request:

```text
/users/10
```

Output:

```text
User ID: 10
```

---

# Query Parameters

Query parameters are values sent after `?`.

```js
app.get("/search", (req, res) => {
  res.send(req.query.q);
});
```

Request:

```text
/search?q=nodejs
```

Output:

```text
nodejs
```

---

# Parsing JSON Data

When sending JSON from the client, Express needs middleware to parse it.

```js
app.use(express.json());
```

Example:

```js
app.post("/users", (req, res) => {
  console.log(req.body);
  res.send("Received");
});
```

Request Body:

```json
{
  "name": "Esraa",
  "age": 24
}
```

Now Express automatically converts the JSON into a JavaScript object.

---

# Middleware

Middleware is a function that runs before the request reaches the route handler.

```js
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
```

Every request will pass through this middleware first.

### Flow

```text
Request
   ↓
Middleware
   ↓
Route Handler
   ↓
Response
```

---

# Serving Static Files

Static files include:

* HTML
* CSS
* JavaScript
* Images

Folder structure:

```text
project
│
├── public
│   ├── style.css
│   └── logo.png
```

Serve them:

```js
app.use(express.static("public"));
```

Now:

```text
http://localhost:3000/style.css
```

returns the CSS file directly.

---

# Sending Different Types of Responses

## Text

```js
res.send("Hello World");
```

---

## JSON

```js
res.json({
  name: "Esraa",
  age: 24
});
```

---

## HTML

```js
res.send("<h1>Hello</h1>");
```

---

## Status Code

```js
res.status(404).send("Page Not Found");
```

---

# Simple REST API Example

```js
const express = require("express");

const app = express();

app.use(express.json());

let users = [
  { id: 1, name: "Esraa" }
];
```

---

## Get All Users

```js
app.get("/users", (req, res) => {
  res.json(users);
});
```

---

## Create User

```js
app.post("/users", (req, res) => {
  users.push(req.body);

  res.status(201).json({
    message: "User Added"
  });
});
```

---

## Start Server

```js
app.listen(3000, () => {
  console.log("API Running");
});
```

---

# Express vs HTTP Module

| Feature           | http Module | Express          |
| ----------------- | ----------- | ---------------- |
| Routing           | Manual      | Built-in         |
| JSON Parsing      | Manual      | express.json()   |
| Middleware        | Manual      | Built-in         |
| Static Files      | Manual      | express.static() |
| Readability       | Lower       | Higher           |
| Development Speed | Slower      | Faster           |

---

# When Should You Use Express?

Express is commonly used for:

* REST APIs
* Authentication Systems
* Admin Dashboards
* E-Commerce Backends
* Chat Applications
* File Upload Systems

Most Node.js backend applications use Express because it significantly reduces boilerplate code.

---

# Summary

* Express.js is a web framework built on top of Node.js.
* It simplifies routing, request handling, and response handling.
* Routes are defined using methods such as `get()`, `post()`, `put()`, and `delete()`.
* `req` contains information about the request.
* `res` is used to send responses.
* Middleware runs before route handlers.
* `express.json()` parses incoming JSON data.
* `express.static()` serves static files.
* Express is widely used for building REST APIs and backend applications.
