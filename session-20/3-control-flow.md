# Angular Control Flow (Angular 22)

# 📌 What is Control Flow?

Control Flow is one of the most important concepts in Angular templates.

It determines **what Angular should display** on the screen depending on:

- A condition
- A collection of data
- The value of a variable

Instead of always rendering every HTML element, Angular can decide:

- Whether to display an element.
- How many times to repeat an element.
- Which section to display from multiple options.

Control Flow makes Angular applications **dynamic** and **interactive**.

---

# 🤔 Why Do We Need Control Flow?

Imagine you're building an E-Commerce application.

Some situations are:

- If the user is logged in, show their profile.
- Otherwise, show the Login button.

---

If there are products:

- Display all products.

Otherwise:

- Display "No Products Found".

---

If an order status is:

- Pending
- Processing
- Shipped
- Delivered

Display a different badge for each status.

Without Control Flow, Angular would render everything, even when it shouldn't.

Control Flow allows Angular to decide what should actually appear on the page.

---

# Real World Examples

Control Flow is used almost everywhere.

### Banking Application

- Show account information only if the user is authenticated.
- Show transaction history.
- Display different account statuses.

---

### Hospital Management System

- Show patient information.
- Display doctors only if available.
- Display appointment status.

---

### E-Commerce Website

- Show products.
- Show "Out of Stock" badge.
- Display cart items.
- Show different order statuses.

---

### School Management System

- Display student grades.
- Show pass/fail status.
- Display enrolled courses.

---

# Angular Control Flow Before Angular 17

For many years Angular used **Structural Directives**.

Examples:

```html
*ngIf
*ngFor
*ngSwitch
```

Example:

```html
<div *ngIf="isLoggedIn">
  Welcome
</div>
```

Although this worked perfectly, the syntax became difficult to read when templates became larger.

---

# Angular Control Flow Starting from Angular 17

Angular introduced a brand new syntax that looks much closer to JavaScript.

Instead of writing:

```html
<div *ngIf="condition"></div>
```

we now write

```html
@if(condition) {

}
```

This syntax is:

- Cleaner
- Easier to read
- Easier to maintain
- Easier for beginners

Angular recommends using this syntax in Angular 22 and newer versions.

---

# Angular 22 Control Flow Blocks

Angular provides three main Control Flow blocks.

| Block | Purpose |
|--------|----------|
| `@if` | Render content conditionally |
| `@for` | Loop through collections |
| `@switch` | Display different content depending on a value |

Later we'll also learn:

- `@else`
- `@else if`
- `@empty`
- `track`

---

# 🎯 @if

## What is `@if`?

`@if` is used to display HTML **only when a condition is true**.

Think about it like JavaScript.

JavaScript:

```javascript
if(condition){

}
```

Angular:

```html
@if(condition){

}
```

If the condition is true,

Angular renders the HTML.

If the condition is false,

Angular completely removes that HTML from the DOM.

---

# Basic Syntax

```html
@if(condition){

    HTML Content

}
```

Example:

```html
@if(isLoggedIn){

    <h2>Welcome Back!</h2>

}
```

If

```ts
isLoggedIn = true;
```

Angular renders

```html
<h2>Welcome Back!</h2>
```

If

```ts
isLoggedIn = false;
```

Nothing is rendered.

---

# Example 1 — Student Dashboard

Suppose we're building an online learning platform.

A student must log in before accessing their dashboard.

If they are logged in:

- Show their profile.
- Show enrolled courses.
- Show GPA.

Otherwise:

- Ask them to log in.

---

## student-dashboard.component.ts

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  templateUrl: './student-dashboard.component.html'
})
export class StudentDashboardComponent {

  isLoggedIn = true;

  student = {
    name: 'Esraa',
    university: 'Faculty of Engineering',
    level: 4,
    gpa: 3.85
  };

}
```

---

## student-dashboard.component.html

```html
@if(isLoggedIn){

<div class="card">

    <h2>Student Dashboard</h2>

    <hr>

    <p>
        Name:
        {{student.name}}
    </p>

    <p>
        University:
        {{student.university}}
    </p>

    <p>
        Level:
        {{student.level}}
    </p>

    <p>
        GPA:
        {{student.gpa}}
    </p>

</div>

}
```

---

## Output

When

```ts
isLoggedIn = true;
```

The page displays

```text
Student Dashboard

Name: Esraa
University: Faculty of Engineering
Level: 4
GPA: 3.85
```

---

When

```ts
isLoggedIn = false;
```

Angular renders absolutely nothing because the condition is false.

---

# Why Doesn't Angular Just Hide the HTML?

Many beginners think Angular only hides the element.

It doesn't.

There is a big difference.

Suppose we have

```html
@if(false){

<h2>Hello</h2>

}
```

Angular removes

```html
<h2>Hello</h2>
```

completely from the DOM.

The browser behaves as if it never existed.

This improves performance because Angular doesn't waste resources rendering unnecessary elements.

---

# Using @else

Usually we want another section to appear when the condition is false.

For that we use

```html
@else
```

---

## Example

```html
@if(isLoggedIn){

<h2>Welcome Back!</h2>

}
@else{

<h2>Please Login</h2>

}
```

---

## Student Dashboard Example

### student-dashboard.component.html

```html
@if(isLoggedIn){

<div>

    <h2>Welcome {{student.name}}</h2>

    <p>Your GPA is {{student.gpa}}</p>

</div>

}
@else{

<div>

    <h2>You are not logged in.</h2>

    <button>Login</button>

</div>

}
```

---

### Output

When

```ts
isLoggedIn = true;
```

```text
Welcome Esraa

Your GPA is 3.85
```

---

When

```ts
isLoggedIn = false;
```

```text
You are not logged in.

[ Login ]
```

---

# Using @else if

Sometimes we need more than two conditions.

Suppose we want to display different messages depending on a student's GPA.

---

## student-dashboard.component.ts

```ts
gpa = 3.9;
```

---

## student-dashboard.component.html

```html
@if(gpa >= 3.7){

<h2>Excellent Student 🏆</h2>

}
@else if(gpa >= 3){

<h2>Very Good Student ⭐</h2>

}
@else if(gpa >= 2){

<h2>Good Student 👍</h2>

}
@else{

<h2>Needs Improvement 📚</h2>

}
```

---

## Output Examples

If

```ts
gpa = 3.9;
```

Output

```text
Excellent Student 🏆
```

---

If

```ts
gpa = 3.2;
```

Output

```text
Very Good Student ⭐
```

---

If

```ts
gpa = 2.3;
```

Output

```text
Good Student 👍
```

---

If

```ts
gpa = 1.5;
```

Output

```text
Needs Improvement 📚
```

---

# Multiple Conditions

Just like JavaScript, Angular supports logical operators.

Example:

```html
@if(isLoggedIn && student.gpa >= 3.5){

<h2>Honor Student 🎖️</h2>

}
```

---

Another example

```html
@if(isLoggedIn || isGuest){

<button>Browse Courses</button>

}
```

---

# Best Practices for @if

✅ Keep conditions simple.

Instead of

```html
@if(student.gpa > 3.5 && student.level > 3 && student.courses.length > 5){

}
```

Prefer moving complex logic into the component.

```ts
get isHonorStudent(){

   return this.student.gpa > 3.5 &&
          this.student.level > 3 &&
          this.student.courses.length > 5;

}
```

Then

```html
@if(isHonorStudent){

<h2>Honor Student</h2>

}
```

This makes templates cleaner and easier to maintain.

---

# Summary

`@if` is used to render HTML conditionally.

It supports:

- `@if`
- `@else`
- `@else if`
- Logical operators
- Complex conditions

Most Angular applications use `@if` extensively for authentication, permissions, dashboards, forms, validation messages, and many other scenarios.


---

---

# 🎯 @for

## What is `@for`?

`@for` is used to repeat a block of HTML for every item in a collection.

Instead of writing the same HTML multiple times, Angular automatically creates it for each element in an array.

Think of it like JavaScript's `for...of` loop.

JavaScript:

```javascript
for (const product of products) {
    console.log(product.name);
}
```

Angular:

```html
@for(product of products; track product.id){

}
```

Angular loops through the collection and creates one HTML block for every item.

---

# Why Do We Need `@for`?

Imagine you're building an online store.

You may have hundreds of products.

Instead of writing:

```html
<div>Product 1</div>

<div>Product 2</div>

<div>Product 3</div>

<div>Product 4</div>

<div>Product 5</div>
```

Angular can generate all of these automatically using a single loop.

---

# Basic Syntax

```html
@for(item of items; track item.id){

    HTML

}
```

- `item` → Current object.
- `items` → Collection (Array).
- `track` → Helps Angular identify each item efficiently.

---

# Example 1 — E-Commerce Products Dashboard

Suppose we're building an online shopping website.

Each product contains:

- ID
- Name
- Category
- Price
- Stock

We want Angular to display every product automatically.

---

## products.component.ts

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html'
})
export class ProductsComponent {

  products = [
    {
      id: 1,
      name: 'Laptop',
      category: 'Electronics',
      price: 25000,
      stock: 8
    },
    {
      id: 2,
      name: 'Smart Watch',
      category: 'Accessories',
      price: 5500,
      stock: 15
    },
    {
      id: 3,
      name: 'Gaming Mouse',
      category: 'Accessories',
      price: 1200,
      stock: 0
    },
    {
      id: 4,
      name: 'Keyboard',
      category: 'Electronics',
      price: 1800,
      stock: 5
    }
  ];

}
```

---

## products.component.html

```html
<h2>Products</h2>

<hr>

@for(product of products; track product.id){

<div class="product-card">

    <h3>{{product.name}}</h3>

    <p>
        Category:
        {{product.category}}
    </p>

    <p>
        Price:
        {{product.price}} EGP
    </p>

    <p>
        Stock:
        {{product.stock}}
    </p>

</div>

<hr>

}
```

---

## Output

```text
Laptop
Category: Electronics
Price: 25000
Stock: 8

------------------------

Smart Watch
Category: Accessories
Price: 5500
Stock: 15

------------------------

Gaming Mouse
Category: Accessories
Price: 1200
Stock: 0

------------------------

Keyboard
Category: Electronics
Price: 1800
Stock: 5
```

Notice that we only wrote **one product card**, but Angular repeated it four times.

---

# Understanding Each Part

```html
@for(product of products; track product.id)
```

### product

Represents the current object.

First iteration

```text
product = Laptop
```

Second iteration

```text
product = Smart Watch
```

Third iteration

```text
product = Gaming Mouse
```

---

### products

The array we're looping through.

```ts
products = [ ... ]
```

Angular loops over this array.

---

### track product.id

Every product has a unique ID.

```ts
id: 1

id: 2

id: 3

id: 4
```

Angular uses these IDs to identify each HTML element.

We'll discuss why this is important shortly.

---

# Using the Loop Index

Sometimes we need the item number.

Angular provides several special variables.

The most commonly used one is

```text
$index
```

---

## Example

```html
@for(product of products; track product.id; let i = $index){

<p>

{{i + 1}}.
{{product.name}}

</p>

}
```

---

## Output

```text
1. Laptop

2. Smart Watch

3. Gaming Mouse

4. Keyboard
```

---

# Other Loop Variables

Angular also provides other useful variables.

| Variable | Description |
|----------|-------------|
| `$index` | Current index |
| `$count` | Total number of items |
| `$first` | True for the first item |
| `$last` | True for the last item |
| `$even` | True if index is even |
| `$odd` | True if index is odd |

---

## Example

```html
@for(product of products; track product.id;
let first = $first;
let last = $last){

<div>

@if(first){

<p>⭐ First Product</p>

}

<h3>{{product.name}}</h3>

@if(last){

<p>🏁 Last Product</p>

}

</div>

}
```

Output

```text
⭐ First Product

Laptop

----------------

Smart Watch

----------------

Gaming Mouse

----------------

Keyboard

🏁 Last Product
```

---

# Why Do We Need `track`?

This is one of the most important concepts.

Suppose we have

```ts
products = [

{id:1,name:"Laptop"},

{id:2,name:"Phone"},

{id:3,name:"Mouse"}

]
```

Angular creates three HTML cards.

Later we add a new product.

```ts
products.unshift({

id:4,

name:"Keyboard"

});
```

Now the array becomes

```text
Keyboard

Laptop

Phone

Mouse
```

Without tracking,

Angular may destroy all existing DOM elements and recreate them.

This is slower.

---

With

```html
track product.id
```

Angular knows:

- Laptop is still Laptop.
- Phone is still Phone.
- Mouse is still Mouse.

Only one new card needs to be added.

This greatly improves performance.

---

# Always Prefer Unique IDs

Recommended

```html
@for(product of products; track product.id){

}
```

Avoid

```html
track $index
```

unless the collection has no unique identifier.

IDs never change.

Indexes change whenever the array changes.

---

# Example — Adding a New Product

Suppose we have

```ts
products = [

{id:1,name:"Laptop"},

{id:2,name:"Phone"}

]
```

Later

```ts
this.products.push({

id:3,

name:"Camera"

});
```

Angular immediately creates one new card.

It does not rebuild every product.

That's why tracking is important.

---

# Using @empty

Sometimes there is no data.

Suppose the database returns

```ts
products = [];
```

Instead of showing a blank page,

we can display a friendly message.

---

## Example

```html
@for(product of products; track product.id){

<div>

<h3>{{product.name}}</h3>

</div>

}
@empty{

<h2>No Products Available</h2>

<p>

Please check again later.

</p>

}
```

---

## Output

If

```ts
products = [];
```

Angular renders

```text
No Products Available

Please check again later.
```

---

If

```ts
products.length > 0
```

Angular ignores the `@empty` block and displays the products.

---

# Real World Uses of @for

`@for` is used everywhere in Angular applications.

Examples

- Products
- Students
- Doctors
- Patients
- Orders
- Categories
- Employees
- Messages
- Notifications
- Shopping Cart
- Comments
- Reviews

Whenever you have an array,

you'll usually use `@for`.

---

# Best Practices

✅ Use

```html
track item.id
```

instead of

```html
track $index
```

whenever possible.

---

✅ Keep the loop template clean.

Avoid putting too much business logic inside the HTML.

---

✅ Combine `@for` with `@if` only when necessary.

---

✅ Always provide an `@empty` block for better user experience.

---

# Summary

`@for` is Angular's modern way of looping through collections.

It supports:

- Looping through arrays.
- Tracking items using IDs.
- Accessing loop variables.
- Handling empty collections.

The next section introduces **`@switch`**, which allows Angular to display different UI based on the value of a variable, followed by a complete project that combines **`@if` + `@for` + `@switch`** in one real-world application.

---

---

# 🔀 @switch

## What is `@switch`?

`@switch` is used to display different blocks of HTML depending on the value of an expression.

It works similarly to JavaScript's `switch` statement.

JavaScript:

```javascript
switch (status) {
  case "Pending":
    console.log("Waiting...");
    break;

  case "Approved":
    console.log("Success");
    break;

  default:
    console.log("Unknown");
}
```

Angular:

```html
@switch(status){

    @case("Pending"){

    }

    @case("Approved"){

    }

    @default{

    }

}
```

Angular checks the value and renders only the matching block.

---

# Why Do We Need `@switch`?

Imagine an Order Management System.

Each order has a status.

```text
Pending

Processing

Shipped

Delivered

Cancelled
```

Each status should display a different color and message.

Without `@switch`, we would write many `@if` statements.

```html
@if(status === "Pending"){

}

@if(status === "Processing"){

}

@if(status === "Delivered"){

}
```

As the number of conditions increases, the template becomes harder to read.

`@switch` provides a cleaner solution.

---

# Basic Syntax

```html
@switch(value){

    @case("Value1"){

    }

    @case("Value2"){

    }

    @default{

    }

}
```

---

# Example 1 — Order Status Dashboard

Suppose we're building an e-commerce dashboard.

Each order has one of five statuses.

---

## orders.component.ts

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.component.html'
})
export class OrdersComponent {

  status = "Processing";

}
```

---

## orders.component.html

```html
<h2>Order Status</h2>

@switch(status){

    @case("Pending"){

        <p>🟡 Waiting for confirmation...</p>

    }

    @case("Processing"){

        <p>🔵 Your order is being prepared.</p>

    }

    @case("Shipped"){

        <p>🚚 Your package is on the way.</p>

    }

    @case("Delivered"){

        <p>✅ Order delivered successfully.</p>

    }

    @case("Cancelled"){

        <p>❌ Order has been cancelled.</p>

    }

    @default{

        <p>Status Unknown.</p>

    }

}
```

---

## Output

If

```ts
status = "Processing";
```

Angular renders

```text
🔵 Your order is being prepared.
```

---

If

```ts
status = "Delivered";
```

Angular renders

```text
✅ Order delivered successfully.
```

---

Only one block appears.

---

# Example 2 — Student Grade System

Suppose a school system assigns letter grades.

---

## grades.component.ts

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-grades',
  standalone: true,
  templateUrl: './grades.component.html'
})
export class GradesComponent {

  grade = "B";

}
```

---

## grades.component.html

```html
<h2>Student Grade</h2>

@switch(grade){

    @case("A"){

        <h3>Excellent 🎉</h3>

    }

    @case("B"){

        <h3>Very Good 👍</h3>

    }

    @case("C"){

        <h3>Good 🙂</h3>

    }

    @case("D"){

        <h3>Needs Improvement ⚠️</h3>

    }

    @default{

        <h3>Invalid Grade</h3>

    }

}
```

---

## Output

```text
Very Good 👍
```

---

# @default

`@default` is optional.

It runs only if none of the cases match.

Example

```html
@default{

<p>

Something went wrong.

</p>

}
```

This prevents empty screens.

---

# Best Practices

✅ Use `@switch` when checking one variable against many possible values.

---

Avoid

```html
@if(status=="Pending"){

}

@else if(status=="Processing"){

}

@else if(status=="Delivered"){

}
```

Instead

```html
@switch(status){

}
```

---

# Nested Control Flow

Angular allows nesting Control Flow blocks.

This means we can place:

- `@if`
- `@for`
- `@switch`

inside one another.

---

# Example

Suppose an admin dashboard displays employees.

Each employee has:

- Name
- Department
- Salary
- Employment Status

---

## employees.component.ts

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-employees',
  standalone: true,
  templateUrl: './employees.component.html'
})
export class EmployeesComponent {

  employees = [

    {
      id:1,
      name:"Ahmed",
      department:"IT",
      salary:15000,
      status:"Active"
    },

    {
      id:2,
      name:"Mona",
      department:"HR",
      salary:9000,
      status:"Vacation"
    },

    {
      id:3,
      name:"Ali",
      department:"Finance",
      salary:12000,
      status:"Inactive"
    }

  ];

}
```

---

## employees.component.html

```html
@if(employees.length > 0){

<h2>Employees</h2>

@for(employee of employees; track employee.id){

<div>

<h3>{{employee.name}}</h3>

<p>{{employee.department}}</p>

<p>{{employee.salary}}</p>

@switch(employee.status){

@case("Active"){

<p>🟢 Active</p>

}

@case("Vacation"){

<p>🌴 On Vacation</p>

}

@case("Inactive"){

<p>🔴 Inactive</p>

}

@default{

<p>Status Unknown</p>

}

}

</div>

<hr>

}

}
@else{

<h2>No Employees Found</h2>

}
```

---

This example combines all three control flow blocks.

- `@if`
- `@for`
- `@switch`

---

# 🚀 Complete Project

# E-Commerce Product Dashboard

This project combines everything learned.

We have:

- Products
- Availability
- Categories
- Stock
- Prices

We'll use

- `@if`
- `@for`
- `@switch`

all together.

---

## products.component.ts

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html'
})
export class ProductsComponent {

  isAdmin = true;

  products = [

    {
      id:1,
      name:"Laptop",
      category:"Electronics",
      price:25000,
      stock:8,
      status:"Available"
    },

    {
      id:2,
      name:"Phone",
      category:"Electronics",
      price:18000,
      stock:0,
      status:"Out of Stock"
    },

    {
      id:3,
      name:"Keyboard",
      category:"Accessories",
      price:900,
      stock:15,
      status:"Available"
    }

  ];

}
```

---

## products.component.html

```html
@if(isAdmin){

<h1>Admin Dashboard</h1>

@for(product of products; track product.id){

<div class="card">

<h2>{{product.name}}</h2>

<p>

Category:
{{product.category}}

</p>

<p>

Price:
{{product.price}} EGP

</p>

<p>

Stock:
{{product.stock}}

</p>

@switch(product.status){

@case("Available"){

<p style="color:green;">

✅ Available

</p>

}

@case("Out of Stock"){

<p style="color:red;">

❌ Out of Stock

</p>

}

@default{

<p>

Unknown Status

</p>

}

}

</div>

<hr>

}
@empty{

<h2>

No Products Found

</h2>

}

}
@else{

<h2>

Access Denied

</h2>

}
```

---

# What Happens Here?

### Step 1

Angular checks

```html
@if(isAdmin)
```

If

```ts
isAdmin = false
```

Output

```text
Access Denied
```

---

### Step 2

If

```ts
isAdmin = true
```

Angular enters the block.

---

### Step 3

Angular loops through

```ts
products
```

using

```html
@for
```

and creates one product card for every product.

---

### Step 4

Inside every product card,

Angular checks

```html
@switch(product.status)
```

Each product displays a different status.

---

# Visual Flow

```text
Is Admin?
      │
      ▼
    @if
      │
      ▼
Loop Products
      │
      ▼
    @for
      │
      ▼
Display Status
      │
      ▼
  @switch
```

---

# Angular Legacy vs Modern Control Flow

| Legacy | Angular 22 |
|---------|------------|
| `*ngIf` | `@if` |
| `*ngFor` | `@for` |
| `*ngSwitch` | `@switch` |

The new syntax is:

- Cleaner
- Easier to read
- Easier to maintain
- Closer to JavaScript syntax

---

# Best Practices

✅ Prefer `@if` over `*ngIf`

✅ Prefer `@for` over `*ngFor`

✅ Prefer `@switch` over `*ngSwitch`

✅ Always use

```html
track item.id
```

instead of

```html
track $index
```

whenever possible.

✅ Use `@empty` for empty collections.

✅ Keep business logic inside TypeScript, not in the template.

---

# Summary

| Feature | Purpose |
|---------|---------|
| `@if` | Conditionally render HTML |
| `@else` | Render alternative content |
| `@else if` | Handle multiple conditions |
| `@for` | Loop through collections |
| `track` | Improve rendering performance |
| `$index` | Current item index |
| `$first` | First element |
| `$last` | Last element |
| `$even` | Even index |
| `$odd` | Odd index |
| `@empty` | Render content for empty collections |
| `@switch` | Display different UI based on a value |
| `@case` | Match a specific value |
| `@default` | Fallback when no case matches |

---

# Final Notes

Angular's modern Control Flow syntax makes templates more expressive and closer to plain JavaScript.

In real Angular applications, these three blocks are often used together:

- `@if` controls whether a section should be displayed.
- `@for` generates repeated UI from arrays.
- `@switch` displays different content based on the current state.

Mastering these three blocks is essential because they are used in almost every Angular application, including dashboards, e-commerce systems, admin panels, booking systems, learning platforms, and enterprise applications.