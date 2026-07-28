# 🌐 Node.js HTTP Module

## 📚 What is the HTTP Module?

The **HTTP module** is a built-in module in Node.js that allows you to create web servers and handle HTTP requests and responses **without installing any external packages**.

Since it comes with Node.js, you only need to import it.

```js
const http = require("http");
```

---

## 🌍 What is HTTP?

**HTTP (HyperText Transfer Protocol)** is the protocol used for communication between a client (such as a browser or Postman) and a web server.

Whenever you:

* Open a website
* Submit a form
* Request data from an API

an HTTP request is sent to a server, and the server sends back an HTTP response.

---

## 🤔 Why Do We Need the HTTP Module?

Imagine a user opens your website.

The browser sends a request like:

```text
GET /
```

Your Node.js application must:

1. Receive the request.
2. Understand what the client wants.
3. Process the request.
4. Send a response.

Without the HTTP module, Node.js would not be able to communicate with browsers or API clients.

---

# 🏗️ How an HTTP Server Works

The communication process looks like this:

```text
          Client
(Browser / Postman / Mobile App)
               │
               │ HTTP Request
               ▼
        Node.js HTTP Server
               │
        Process the Request
               │
               ▼
        HTTP Response
               │
               ▼
          Client
```

Example:

```text
Browser requests:

GET /about

↓

Server processes the request

↓

Server responds:

About Page
```

---

# 📦 Importing the HTTP Module

Before creating a server, import the module.

```js
const http = require("http");
```

Now you have access to all HTTP features provided by Node.js.

---

# 🚀 Creating Your First Server

The most basic HTTP server:

```js
const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello World");
});

server.listen(3000, () => {
  console.log("Server is running...");
});
```

Open:

```text
http://localhost:3000
```

Output:

```text
Hello World
```

---

# 🔍 Understanding `createServer()`

The syntax is:

```js
http.createServer((req, res) => {});
```

The callback function runs **every time** a client sends a request.

Node.js automatically provides two objects:

```js
(req, res)
```

* `req` → Request Object
* `res` → Response Object

Think of it like this:

```text
Client Request
      │
      ▼
(req, res) callback executes
      │
      ▼
Server sends a response
```

---

# 📥 The Request Object (`req`)

The request object contains all information sent by the client.

Some common properties are:

| Property      | Description     |
| ------------- | --------------- |
| `req.url`     | Requested URL   |
| `req.method`  | HTTP method     |
| `req.headers` | Request headers |

---

## Example

```js
const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.method);
  console.log(req.url);

  res.end("Done");
});

server.listen(3000);
```

Request:

```text
GET /about
```

Console Output:

```text
GET
/about
```

---

## Reading the URL

```js
const server = http.createServer((req, res) => {
  console.log(req.url);

  res.end("Finished");
});
```

If the browser visits:

```text
http://localhost:3000/products
```

Output:

```text
/products
```

---

## Reading the HTTP Method

```js
const server = http.createServer((req, res) => {
  console.log(req.method);

  res.end();
});
```

Request:

```text
POST /login
```

Output:

```text
POST
```

---

## Reading Request Headers

Headers contain extra information about the request.

```js
const server = http.createServer((req, res) => {
  console.log(req.headers);

  res.end();
});
```

Example Output:

```js
{
  host: "localhost:3000",
  "user-agent": "Mozilla/5.0",
  accept: "*/*"
}
```

---

# 📤 The Response Object (`res`)

The response object is used to send data back to the client.

Common methods include:

| Method        | Purpose                     |
| ------------- | --------------------------- |
| `writeHead()` | Set status code and headers |
| `write()`     | Send part of the response   |
| `end()`       | Finish the response         |

---

# Sending a Simple Response

The simplest response:

```js
const server = http.createServer((req, res) => {
  res.end("Hello Node.js");
});
```

Output:

```text
Hello Node.js
```

---

# Using `write()` and `end()`

Sometimes you want to send the response in multiple parts.

```js
const server = http.createServer((req, res) => {
  res.write("Hello ");
  res.write("Node.js ");
  res.write("Students!");

  res.end();
});
```

Output:

```text
Hello Node.js Students!
```

**Important:**

Always call:

```js
res.end();
```

Otherwise, the browser will continue waiting for more data.

---

# Setting Status Codes and Headers

Use `writeHead()` before sending the response.

```js
res.writeHead(statusCode, headers);
```

Example:

```js
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain",
  });

  res.end("Success");
});
```

---

## Common HTTP Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | OK                    |
| 201  | Created               |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 500  | Internal Server Error |

---

# Sending HTML

The browser can render HTML if you specify the correct content type.

```js
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html",
  });

  res.end(`
    <h1>Welcome</h1>
    <p>This is my website.</p>
  `);
});
```

Browser Output:

```html
Welcome

This is my website.
```

---

# Sending JSON

APIs usually return JSON.

```js
const server = http.createServer((req, res) => {
  const user = {
    name: "Esraa",
    role: "Instructor",
    age: 24,
  };

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(user));
});
```

Response:

```json
{
  "name": "Esraa",
  "role": "Instructor",
  "age": 24
}
```

---

# 🛣️ Manual Routing

Routing means returning different responses based on the URL and HTTP method.

```js
const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (url === "/" && method === "GET") {
    res.end("Home Page");
  } else if (url === "/about" && method === "GET") {
    res.end("About Page");
  } else if (url === "/contact" && method === "GET") {
    res.end("Contact Page");
  } else {
    res.writeHead(404);

    res.end("Page Not Found");
  }
});
```

---

## Example Requests

Request

```text
GET /
```

Response

```text
Home Page
```

---

Request

```text
GET /about
```

Response

```text
About Page
```

---

Request

```text
GET /contact
```

Response

```text
Contact Page
```

---

Request

```text
GET /anything
```

Response

```text
Page Not Found
```

---

# 📄 Serving HTML Files

Instead of writing HTML inside JavaScript, we usually store it in separate HTML files.

Suppose we have:

```text
project/

home.html
server.js
```

**home.html**

```html
<!DOCTYPE html>

<html>
<head>
  <title>Home</title>
</head>

<body>
  <h1>Welcome to Node.js</h1>
</body>
</html>
```

**server.js**

```js
const http = require("http");
const fs = require("fs");

const homePage = fs.readFileSync("./home.html", "utf8");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    res.end(homePage);
  } else {
    res.writeHead(404);

    res.end("Not Found");
  }
});

server.listen(3000);
```

The browser displays the HTML page.

---

# 📦 Receiving Data from the Client

When a client sends data using POST, the data arrives as a stream.

```js
const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      console.log(body);

      res.end("Data Received");
    });
  }
});
```

---

## Why Does Data Arrive in Chunks?

Large requests may not arrive all at once.

Imagine the client sends:

```json
{
  "name": "Esraa",
  "age": 24
}
```

The server may receive:

Chunk 1

```text
{
  "name": "
```

Chunk 2

```text
Esraa",
```

Chunk 3

```text
"age":24
}
```

Node.js combines them:

```js
body += chunk;
```

Until:

```js
req.on("end")
```

fires.

---

# Parsing JSON Request Bodies

Client sends:

```json
{
  "name": "Ahmed",
  "age": 25
}
```

Server:

```js
const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const data = JSON.parse(body);

      console.log(data);

      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          message: "Data received successfully",
        })
      );
    });
  }
});
```

Console Output:

```js
{
  name: "Ahmed",
  age: 25
}
```

---

# 🧪 Testing with Postman

You can test your server without using a browser.

Example:

Request

```text
POST http://localhost:3000
```

Body

```json
{
  "name": "Esraa"
}
```

Server receives:

```js
{
  name: "Esraa"
}
```

Response:

```json
{
  "message": "Data received successfully"
}
```

---

# ⚠️ Limitations of the HTTP Module

For small applications, the HTTP module is excellent.

However, as projects grow, manual routing becomes repetitive.

Example:

```js
if (...) {

} else if (...) {

} else if (...) {

} else if (...) {

} else if (...) {

}
```

Handling:

* Hundreds of routes
* Validation
* Authentication
* Error handling
* Middleware

becomes difficult.

---

# 🌟 Why Developers Use Express

**Express** is built on top of the HTTP module.

It provides:

* Cleaner routing
* Middleware support
* Easier request parsing
* Better error handling
* Faster development

Instead of:

```js
if (req.url === "/users") {

}
```

Express lets you write:

```js
app.get("/users", (req, res) => {
  res.send("Users");
});
```

---

# 📊 HTTP Module vs Express

| Feature               | HTTP Module | Express                     |
| --------------------- | ----------- | --------------------------- |
| Built into Node.js    | ✅ Yes       | ❌ No                        |
| Installation Required | ❌ No        | ✅ Yes                       |
| Routing               | Manual      | Easy                        |
| Middleware            | ❌ No        | ✅ Yes                       |
| Request Body Parsing  | Manual      | Automatic (with middleware) |
| Best for Learning     | ✅ Yes       | ❌ No                        |
| Best for Production   | ⚠️ Limited  | ✅ Yes                       |

---

# 🎯 When Should You Use the HTTP Module?

Use it when you want to:

* Learn how web servers work.
* Understand how HTTP requests and responses are handled.
* Build small servers.
* Understand what frameworks like Express do behind the scenes.

---

# 📝 Summary

* The **HTTP module** is a built-in Node.js module used to create web servers.
* `http.createServer()` creates an HTTP server that listens for incoming requests.
* Every request provides two objects:

  * `req` (Request): Contains information sent by the client.
  * `res` (Response): Used to send data back to the client.
* Common request properties include:

  * `req.url`
  * `req.method`
  * `req.headers`
* Common response methods include:

  * `res.writeHead()`
  * `res.write()`
  * `res.end()`
* You can send different types of responses such as plain text, HTML, and JSON.
* Manual routing is implemented using `req.url` and `req.method`.
* POST request bodies are received as streams using `req.on("data")` and `req.on("end")`.
* Although most real-world applications use **Express**, understanding the HTTP module is essential because Express is built on top of it.
