# 🌐 API & RESTful API

## 📌 What is an API?

**API** stands for **Application Programming Interface**.

An API is a set of rules that allows different applications to communicate with each other.

Instead of accessing a database or service directly, applications send requests through an API and receive responses.

### Example

- Frontend (Angular, React, Mobile App)
- Backend (Node.js, Java, .NET)
- Database

The frontend communicates with the backend through APIs.

```text
Frontend  --->  API  --->  Backend  ---> Database
Frontend  <--- API  <---  Backend  <--- Database
```

---

## 🍔 Real World Analogy

Imagine you're at a restaurant:

- You are the Client.
- The Kitchen is the Server.
- The Waiter is the API.

```text
Client → Request → API → Server
Client ← Response ← API ← Server
```

You don't go into the kitchen yourself.

You place an order through the waiter, and the waiter returns the result.

---

# Client and Server

## Client

The application that sends requests.

Examples:

- Browser
- Mobile App
- Angular Application
- React Application

---

## Server

The application that receives requests, processes them, and sends responses back.

Examples:

- Node.js Server
- Express Server
- Spring Boot Application

---

# HTTP Request & Response

Communication between client and server happens through HTTP.

## Request

Sent from the client.

Contains:

```text
Method
URL
Headers
Body
```

Example:

```http
POST /users

{
  "name": "Esraa"
}
```

---

## Response

Sent from the server.

Contains:

```text
Status Code
Headers
Body
```

Example:

```http
200 OK

{
  "message": "Success"
}
```

---

# 📦 What is REST?

REST stands for:

**REpresentational State Transfer**

REST is an architectural style used for designing APIs.

When an API follows REST principles, it is called a:

**REST API** or **RESTful API**

---

# 📌 REST Resources

In REST, everything is treated as a resource.

Examples:

```text
/users
/products
/orders
/doctors
/patients
```

Resources should be nouns, not verbs.

✅ Good:

```text
/users
/products
/orders
```

❌ Bad:

```text
/getUsers
/createUser
/deleteUser
```

---

# HTTP Methods in REST

Each HTTP method represents a specific action.

| Method | Purpose | Example |
|----------|----------|----------|
| GET | Read Data | GET /users |
| POST | Create Data | POST /users |
| PUT | Replace Data | PUT /users/1 |
| PATCH | Update Part of Data | PATCH /users/1 |
| DELETE | Delete Data | DELETE /users/1 |

---

## GET

Used to retrieve data.

```http
GET /users
```

Response:

```json
[
  {
    "id": 1,
    "name": "Esraa"
  }
]
```

---

## POST

Used to create new data.

```http
POST /users
```

Body:

```json
{
  "name": "Esraa"
}
```

Response:

```json
{
  "id": 1,
  "name": "Esraa"
}
```

---

## PUT

Used to replace an existing resource.

```http
PUT /users/1
```

Body:

```json
{
  "name": "Ahmed"
}
```

---

## PATCH

Used to partially update a resource.

```http
PATCH /users/1
```

Body:

```json
{
  "name": "Ahmed"
}
```

---

## DELETE

Used to remove a resource.

```http
DELETE /users/1
```

---

# REST Principles

## 1. Client-Server Architecture

Frontend and Backend are independent.

```text
Angular App
React App
Mobile App
        ↓
      REST API
        ↓
     Node.js Server
```

Benefits:

- Easier maintenance
- Better scalability
- Independent development

---

## 2. Stateless

Every request must contain all information needed to process it.

The server does not remember previous requests.

Example:

```http
GET /profile

Authorization: Bearer token123
```

The token must be sent with every request.

---

## 3. Cacheable

Responses can be cached.

Benefits:

- Faster performance
- Reduced server load

Example:

```http
Cache-Control: max-age=3600
```

---

## 4. Uniform Interface

REST APIs should follow a consistent structure.

### Use Resources

```text
/users
/products
/orders
```

### Use Proper HTTP Methods

```text
GET
POST
PUT
PATCH
DELETE
```

### Use Standard Data Formats

Usually JSON.

```json
{
  "name": "Esraa"
}
```

---

## 5. Layered System

A client may communicate through multiple layers.

Example:

```text
Client
   ↓
Load Balancer
   ↓
API Gateway
   ↓
Application Server
   ↓
Database
```

The client doesn't need to know about these layers.

---

## 6. Code on Demand (Optional)

The server may send executable code to the client.

Example:

```js
alert("Hello");
```

This constraint is rarely used in modern REST APIs.

---

# RESTful API Example Using Express

```js
const express = require("express");
const app = express();

app.use(express.json());

let users = [
  { id: 1, name: "Esraa" },
  { id: 2, name: "Ali" }
];
```

---

## GET All Users

```js
app.get("/users", (req, res) => {
  res.json(users);
});
```

---

## GET User By ID

```js
app.get("/users/:id", (req, res) => {
  const user = users.find(
    (u) => u.id === Number(req.params.id)
  );

  if (!user) {
    return res.status(404).send("User not found");
  }

  res.json(user);
});
```

---

## Create User

```js
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };

  users.push(newUser);

  res.status(201).json(newUser);
});
```

---

## Update User

```js
app.put("/users/:id", (req, res) => {
  const user = users.find(
    (u) => u.id === Number(req.params.id)
  );

  if (!user) {
    return res.status(404).send("User not found");
  }

  user.name = req.body.name;

  res.json(user);
});
```

---

## Delete User

```js
app.delete("/users/:id", (req, res) => {
  users = users.filter(
    (u) => u.id !== Number(req.params.id)
  );

  res.status(204).send();
});
```

---

## Start Server

```js
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

# Common HTTP Status Codes

| Code | Meaning |
|--------|----------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

# API vs REST API

| API | REST API |
|---------|---------|
| General concept for communication | Specific API architecture style |
| Can use any protocol | Uses HTTP |
| No specific rules | Follows REST constraints |
| SOAP, GraphQL, REST, RPC | REST only |

---

# Summary

- API allows applications to communicate with each other.
- REST is a popular architectural style for building APIs.
- REST treats data as resources.
- REST APIs use HTTP methods such as GET, POST, PUT, PATCH, and DELETE.
- REST APIs are stateless and follow a uniform interface.
- JSON is the most common format used in REST APIs.
- Express.js is commonly used to build RESTful APIs in Node.js.