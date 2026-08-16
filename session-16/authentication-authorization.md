# 🔐 Authentication & Authorization in Web Applications

## 🧠 Introduction

Many beginners think that **Authentication** is only about logging in, but there is much more happening behind the scenes.

When a user signs in, the server needs a way to recognize that user in future requests without asking for their email and password every time.

This is where **Authentication**, **Authorization**, Sessions, Cookies, and JWT come into play.

---

# 1️⃣ Authentication

**Authentication** is the process of verifying **who the user is**.

In other words, the server checks whether the provided credentials are valid.

For example:

```
Email: esraa@example.com
Password: 12345678
```

If they are correct, the server knows that the user is Esraa.

### Examples

* Logging in with email and password
* Signing in with Google
* Signing in with Facebook
* Logging in using a fingerprint or Face ID

Authentication answers the question:

> **Who are you?**

---

# 2️⃣ Authorization

**Authorization** is the process of determining **what an authenticated user is allowed to do**.

For example, after logging in:

| User Role  | Allowed Actions                          |
| ---------- | ---------------------------------------- |
| Student    | Enroll in courses, view enrolled courses |
| Instructor | Create and update courses                |
| Admin      | Manage users and courses                 |

Authorization answers the question:

> **What are you allowed to do?**

Example middleware:

```js
if (user.role !== "admin") {
  return res.status(403).json({
    message: "Access denied",
  });
}
```

---

# 3️⃣ Why Isn't Login Enough?

A common question is:

> If the user has already logged in, why doesn't the server remember them?

The answer is that **HTTP is stateless**.

Every request is treated as completely independent from previous requests.

For example:

```
POST /login
```

After a successful login:

```
GET /my-courses
```

The server does **not** automatically remember who made the login request.

If we had to send the email and password with every request:

```
GET /my-courses

Email: esraa@example.com
Password: 12345678
```

it would be insecure and inefficient.

So we need a better solution.

---

# 4️⃣ The Solution: Give the User a Token

When the user successfully signs in or signs up, the server generates a **token**.

Think of the token as a digital ID card.

The client stores this token and sends it with future requests.

Example:

```
POST /login

↓

Server verifies credentials

↓

Server generates token

↓

Client stores token

↓

Client sends token with every request
```

When the server receives the token, it identifies the user without asking for the password again.

---

# 5️⃣ Stateful Authentication

In a **Stateful Authentication** system, the server stores user session information.

```
Client
   │
   │ Session ID
   ▼
Server
   │
   ▼
Session Store
```

The server generates a **Session ID** and stores associated user data in memory or a database.

Example:

```
Session ID: abc123
```

Server storage:

```
abc123
 ├── User ID: 25
 ├── Role: Student
 └── My Courses:
     - Node.js
     - MongoDB
```

The browser only stores the Session ID.

### Advantages

* Easy to invalidate sessions
* Server has full control

### Disadvantages

* Requires extra storage
* Consumes server resources
* Less scalable

---

# 6️⃣ Stateless Authentication

In **Stateless Authentication**, the server does **not** store session data.

Instead, the token itself contains the necessary information.

The most common implementation is **JWT (JSON Web Token)**.

```
Client
   │
   │ JWT
   ▼
Server
```

The server verifies the token signature and extracts its data.

No session database is required.

### Advantages

* Scales easily
* No server-side session storage
* Popular for REST APIs and SPAs

### Disadvantages

* Revoking tokens before expiration is harder
* Token size is larger than a session ID

---

# 7️⃣ Where Is the Token Stored?

The token should persist even if the page is refreshed or reopened.

Storing it only in JavaScript memory would lose it when the tab closes.

Common storage options are Cookies and Local Storage.

---

# 8️⃣ Cookies

A Cookie stores small pieces of data as key-value pairs.

Example:

```
token=eyJhbGciOiJIUzI1Ni...
```

Cookies also include metadata such as:

* Domain
* Path
* Expiration time

The browser automatically sends cookies with matching requests.

Example:

```
Cookie: token=eyJhbGc...
```

### Security Features

* `HttpOnly` → JavaScript cannot access the cookie.
* `Secure` → Sent only over HTTPS.
* `SameSite` → Helps protect against CSRF attacks.

### Pros

* Automatically included in requests
* Can be protected with `HttpOnly`
* Good for traditional web applications

### Cons

* Limited storage size
* Requires proper CSRF protection in some scenarios

---

# 9️⃣ Local Storage

Local Storage is another way to store tokens.

Example:

```js
localStorage.setItem("token", jwtToken);
```

Unlike cookies:

* The browser **does not** send Local Storage data automatically.
* JavaScript must manually attach it to requests.

Example:

```js
fetch("/api/v1/courses", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

### Pros

* Larger storage capacity
* Simple to use

### Cons

* Accessible from JavaScript
* Vulnerable to XSS attacks if the application is not secure

---

# 🔟 How Is the Token Sent?

Tokens are typically sent inside HTTP request headers.

## Cookie Header

```
Cookie:
token=eyJhbGc...
```

The browser adds this automatically.

## Authorization Header

```
Authorization:
Bearer eyJhbGc...
```

This is the most common approach for REST APIs.

Express example:

```js
const token = req.headers.authorization;
```

or

```js
const token = req.headers.authorization?.split(" ")[1];
```

if using the `Bearer` format.

---

# 1️⃣1️⃣ What Is JWT?

JWT stands for **JSON Web Token**.

It is a compact string used to identify users after authentication.

A JWT consists of **three parts** separated by dots:

```
xxxxx.yyyyy.zzzzz
```

```
Header.Payload.Signature
```

Example:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.
eyJpZCI6IjEyMyIsInJvbGUiOiJzdHVkZW50In0
.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

## Header

Contains information about the signing algorithm.

Example:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

---

## Payload

Contains application data (claims), such as:

```json
{
  "id": "123",
  "email": "esraa@example.com",
  "role": "student"
}
```

> Do **not** store sensitive information such as passwords in the payload.

---

## Signature

Generated using:

* Encoded Header
* Encoded Payload
* Secret Key

The signature ensures that the token has not been modified.

If someone changes the payload, the signature becomes invalid and verification fails.

---

# 1️⃣2️⃣ Typical Authentication Flow

```
User
 │
 │ Login
 ▼
Server
 │
 │ Verify email & password
 ▼
Generate JWT
 │
 ▼
Return JWT
 │
 ▼
Client stores token
 │
 ▼
Client sends token with every request
 │
 ▼
Server verifies JWT
 │
 ▼
Authenticated user
 │
 ▼
Authorization checks permissions
```

---

# ✅ Summary

* **Authentication** verifies the user's identity.
* **Authorization** determines what the user is allowed to do.
* HTTP is **stateless**, so servers do not remember previous requests automatically.
* After login, the server issues a **token** instead of requiring credentials on every request.
* **Stateful Authentication** stores session data on the server and gives the client a Session ID.
* **Stateless Authentication** stores user information inside a signed token, commonly a **JWT**.
* Tokens can be stored in **Cookies** or **Local Storage**.
* Cookies are sent automatically by the browser, while Local Storage values must be added manually to request headers.
* JWTs consist of **Header**, **Payload**, and **Signature**, allowing the server to verify the token and identify the user securely.
