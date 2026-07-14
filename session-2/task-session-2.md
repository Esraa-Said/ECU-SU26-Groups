# 🧾 Section 1: Mini Projects

---

## 🛒 Project 1: Online Store Order Processing System

### 🎯 Goal

Simulate processing customer orders in an online store system.

---

### 📦 Input

An array of orders:

Each order has:

* `id`
* `status` → `"valid" | "cancelled" | "invalid"`
* `stockAvailable` → `true | false`
* `amount`

---

### ⚙️ Processing Rules

Process orders **one by one in order**:

#### 1. Skip order if:

* status is `"cancelled"` or `"invalid"`
* OR stock is not available

#### 2. Process order if:

* status is `"valid"`
* AND stock is available

When processing:

* Add `amount` to `totalRevenue`
* Increase `successfulOrders` count

---

### 🚨 Stop Conditions

Stop processing completely if:

* You get **3 skipped orders in a row**
* OR total stock failures reach **3 times**

When stopping:

```
"System stopped due to critical failure"
```

---

### 📤 Output

Return:

* totalRevenue
* successfulOrders
* processed orders count
* stop message (if system stopped early)

---

---


# 💻 Section 2: Coding Problems

Solve the following using **loops and arrays only**:

---

## 1️⃣ Check if Array is Sorted

Write a function that checks if an array is sorted in ascending order.

---

## 2️⃣ Return Numbers Greater Than a Value

Write a function that returns all numbers greater than a given value.

---


