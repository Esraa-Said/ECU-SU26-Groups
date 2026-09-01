# 📝 Angular Template-Driven Forms 

## 📌 Introduction

Template-Driven Forms are one of Angular's built-in approaches for handling user input, form validation, and form submission.

In Angular v22, Template-Driven Forms are still fully supported and are ideal for:

* Small forms
* Simple validation requirements
* Quick development
* Learning Angular forms

Angular automatically manages:

* Data binding
* Form state
* Validation
* Form submission

Unlike normal HTML forms, Angular keeps the form synchronized with your component and tracks its state automatically.

---

# Why Use Template-Driven Forms?

Without Angular Forms, you would need to:

* Read input values manually
* Validate fields yourself
* Track form state manually
* Handle error messages with custom logic

Example using plain HTML and JavaScript:

```html
<input type="text" id="name">

<button onclick="submit()">Save</button>
```

```js
function submit() {
  const value = document.getElementById('name').value;

  if (!value) {
    alert('Name is required');
  }
}
```

With Angular Template-Driven Forms:

```html
<input
  type="text"
  name="name"
  ngModel
  required
  #nameCtrl="ngModel"
/>
```

Angular automatically:

* Tracks the value
* Tracks validation
* Tracks touched state
* Tracks dirty state

---

# ✅ Advantages

| Advantage                | Description                             |
| ------------------------ | --------------------------------------- |
| Simplicity               | Easy to learn and implement             |
| Less Code                | Most logic lives in the template        |
| Automatic State Tracking | Angular tracks form state automatically |
| Two-Way Binding          | Synchronizes component data and UI      |
| Fast Setup               | Great for small projects and prototypes |

---

# ❌ Disadvantages

| Disadvantage                | Description                                |
| --------------------------- | ------------------------------------------ |
| Not Ideal for Complex Forms | Difficult to manage large forms            |
| Harder to Test              | Logic is spread across templates           |
| Less Control                | Reactive Forms offer more flexibility      |
| Performance Limitations     | Large forms may incur more template checks |

---

# 🚀 Building a Template-Driven Form

## Step 1: Import FormsModule

Template-Driven Forms require `FormsModule`.

Without it, Angular will not recognize:

* `ngModel`
* `ngForm`

### user-form.component.ts

```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {}
```

---

## Step 2: Create the Form

Angular automatically creates an `NgForm` instance when it finds a form element.

### user-form.component.html

```html
<form #userForm="ngForm">
  <button type="submit">Submit</button>
</form>
```

### Explanation

```html
#userForm="ngForm"
```

Creates a template reference variable pointing to Angular's `NgForm` object.

Without it:

```html
<form>
```

The form behaves like a normal HTML form.

With it:

```html
<form #userForm="ngForm">
```

Angular tracks:

* Form values
* Validation state
* Submission state

---

## Step 3: Handle Form Submission

Use Angular's `ngSubmit` event.

### Template

```html
<form
  #userForm="ngForm"
  (ngSubmit)="onSubmit()"
>
  <button type="submit">
    Submit
  </button>
</form>
```

### Component

```ts
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  @ViewChild('userForm')
  userForm!: NgForm;

  onSubmit() {
    console.log(this.userForm.value);
  }
}
```

### Why use ngSubmit?

Angular intercepts the submission event and prevents the page from reloading.

Unlike traditional HTML forms:

```html
<form action="/save" method="post">
```

Angular applications stay on the same page.

---

## Step 4: Add Form Controls

For Angular to register an input as a form control, it must contain:

### 1. name

```html
<input name="username">
```

Required for Angular to register the control.

---

### 2. ngModel

```html
<input
  name="username"
  ngModel
/>
```

Registers the input with Angular Forms.

---

### 3. Optional Template Reference

```html
<input
  name="username"
  ngModel
  #usernameCtrl="ngModel"
/>
```

Allows access to the control state.

---

## Example: Simple Form Control

```html
<input
  type="text"
  name="username"
  ngModel
  #usernameCtrl="ngModel"
/>

<p>Valid: {{ usernameCtrl.valid }}</p>
<p>Touched: {{ usernameCtrl.touched }}</p>
```

---

## Step 5: Two-Way Binding

Use `[(ngModel)]` when you want to synchronize a form field with a component property.

### Component

```ts
username = '';
```

### Template

```html
<input
  name="username"
  [(ngModel)]="username"
/>
```

```html
<p>{{ username }}</p>
```

Whenever the user types:

* Input updates `username`
* `username` updates the UI

This is called **Two-Way Data Binding**.

---

## Step 6: Add Validation

Angular supports validation directly in the template.

---

### Required Validation

```html
<input
  type="text"
  name="username"
  ngModel
  required
  #usernameCtrl="ngModel"
/>
```

```html
@if(usernameCtrl.invalid && usernameCtrl.touched) {
  <p>Username is required</p>
}
```

---

### Email Validation

```html
<input
  type="email"
  name="email"
  ngModel
  required
  email
  #emailCtrl="ngModel"
/>
```

```html
@if(emailCtrl.invalid && emailCtrl.touched) {
  <p>Please enter a valid email</p>
}
```

---

### Minimum Length

```html
<input
  type="password"
  name="password"
  ngModel
  minlength="6"
  #passwordCtrl="ngModel"
/>
```

```html
@if(passwordCtrl.errors?.['minlength']) {
  <p>Password must be at least 6 characters</p>
}
```

---

## Step 7: Accessing Form Values

You can access submitted values through `NgForm`.

```ts
onSubmit() {
  console.log(this.userForm.value);
}
```

Example output:

```js
{
  username: "Esraa",
  email: "esraa@example.com"
}
```

---

# 📋 Common Form States

Every form control automatically exposes state information.

```html
<input
  name="username"
  ngModel
  #usernameCtrl="ngModel"
/>
```

| State     | Description                          |
| --------- | ------------------------------------ |
| valid     | Control passes validation            |
| invalid   | Control fails validation             |
| touched   | User focused and left the field      |
| untouched | User never interacted with the field |
| dirty     | Value changed                        |
| pristine  | Value never changed                  |

Example:

```html
<p>{{ usernameCtrl.valid }}</p>
<p>{{ usernameCtrl.invalid }}</p>
<p>{{ usernameCtrl.touched }}</p>
<p>{{ usernameCtrl.dirty }}</p>
```

---

# 🧩 Complete Example

## Component

```ts
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  @ViewChild('userForm')
  userForm!: NgForm;

  onSubmit() {
    console.log(this.userForm.value);
  }
}
```

## Template

```html
<form
  #userForm="ngForm"
  (ngSubmit)="onSubmit()"
>
  <div>
    <label>Name</label>

    <input
      type="text"
      name="name"
      ngModel
      required
      #nameCtrl="ngModel"
    />

    @if(nameCtrl.invalid && nameCtrl.touched) {
      <p>Name is required</p>
    }
  </div>

  <div>
    <label>Email</label>

    <input
      type="email"
      name="email"
      ngModel
      required
      email
      #emailCtrl="ngModel"
    />

    @if(emailCtrl.invalid && emailCtrl.touched) {
      <p>Valid email is required</p>
    }
  </div>

  <button
    type="submit"
    [disabled]="userForm.invalid"
  >
    Submit
  </button>
</form>
```

---

# 🔄 Template-Driven Forms Workflow

1. Import `FormsModule`
2. Create a form using `ngForm`
3. Add controls using `ngModel`
4. Give each control a unique `name`
5. Add validation rules
6. Access control states when needed
7. Handle form submission using `ngSubmit`

---

# 📌 Summary

## Important Directives

| Directive   | Purpose                             |
| ----------- | ----------------------------------- |
| ngForm      | Creates and manages an Angular form |
| ngModel     | Creates a form control              |
| [(ngModel)] | Enables two-way data binding        |
| ngSubmit    | Handles form submission             |

---

## When to Use Template-Driven Forms

### ✅ Good For

* Login forms
* Registration forms
* Contact forms
* Search forms
* Small CRUD applications

### ❌ Avoid For

* Large dynamic forms
* Complex validation logic
* Enterprise-level forms

For those scenarios, **Reactive Forms** are usually the better choice in Angular v22.
