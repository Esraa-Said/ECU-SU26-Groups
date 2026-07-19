# JavaScript Promises, Async/Await & Fetch Tasks

---

# Task 1: Fetch Product Information

## 📋 Task Description:

Create a function that returns product information from a simulated database.

* Search for a product using its ID.
* If the product exists, return the product name.
* If the product does not exist, reject the Promise and show an error.

## 🧩 Concepts Used:

* Creating a Promise using `new Promise()`
* `.then()`
* `.catch()`
* Object access
* Error handling

## 🔍 Helpful Notes:

Use this simulated database:

```javascript
const products = {
    1: "Laptop",
    2: "Phone",
    3: "Tablet"
};
```

Create a function:

```javascript
getProduct(id)
```

Rules:

* Existing ID → Resolve product name.
* Invalid ID → Reject Promise.

### Example:

```javascript
getProduct(2)
.then(product => console.log(product))
.catch(error => console.log(error));
```

Output:

```
Phone
```

---

# Task 2: Calculate Shipping Cost

## 📋 Task Description:

Create a function that calculates the shipping cost based on package weight.

Rules:

* Shipping cost = weight × 5
* If weight is zero or negative, reject the request.

## 🧩 Concepts Used:

* Creating Promises
* `.then()`
* `.catch()`
* Validation inside Promise

## 🔍 Helpful Notes:

Create:

```javascript
calculateShipping(weight)
```

Examples:

```javascript
calculateShipping(10)
.then(cost => console.log(cost))
.catch(error => console.log(error));
```

Output:

```
Shipping cost: 50
```

Invalid example:

```javascript
calculateShipping(-2)
```

Output:

```
Invalid weight
```

---

# Task 3: Register New User with Email Verification

## 📋 Task Description:

Simulate a user registration process.

* Check if name and email exist.
* If data is valid, send a verification email.
* Simulate email sending delay.
* Display success message after verification email is sent.

## 🧩 Concepts Used:

* `new Promise()`
* `setTimeout()`
* `async / await`
* `try / catch`

## 🔍 Helpful Notes:

Create:

```javascript
sendVerificationEmail(email)
```

* Return a Promise.
* Use `setTimeout()` to simulate sending an email.

Create:

```javascript
registerUser(name, email)
```

Steps:

1. Validate user input.
2. Call:

```javascript
await sendVerificationEmail(email)
```

3. Handle errors using `try/catch`.

### Example:

```javascript
registerUser("Esraa", "esraa@gmail.com")
```

Output:

```
Sending verification email...
Email sent successfully
User registered successfully
```

---

# Task 4: Fetch User Profile From API

## 📋 Task Description:

Fetch user information from an API and display the user's name and email.

If the user does not exist, show an error message.

## 🌐 API:

```
https://jsonplaceholder.typicode.com/users/1
```

## 🧩 Concepts Used:

* `fetch()`
* `async / await`
* `try / catch`
* JSON parsing
* API error handling

## 🔍 Helpful Notes:

Create:

```javascript
getUserProfile(id)
```

Steps:

1. Use `fetch()` to send a request.
2. Convert response to JSON.
3. Display user information.

Example Output:

```
Name: Leanne Graham
Email: Sincere@april.biz
```

---
