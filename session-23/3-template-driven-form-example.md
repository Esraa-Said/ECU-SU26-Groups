# Angular Template-Driven Forms 

## 📌 Goal

In this example, we will build a simple **Sign In Form** using **Template-Driven Forms** in Angular v22.

Along the way, we will learn:

- Why a normal HTML form is not enough in Angular
- How Angular prevents page reloads during form submission
- How to create a Template-Driven Form
- How to register form controls
- How to access form values
- How to validate user input
- How to display validation errors

---

# Step 1: Create the Component

Generate a new component:

```bash
ng g c signin-form
```

Angular creates:

```text
signin-form/
├── signin-form.ts
├── signin-form.html
└── signin-form.css
```

---

# Step 2: Build a Normal HTML Form

Before using Angular Forms, let's create a simple HTML form.

## HTML

```html
<div class="login-container">
  <div class="logo">Login</div>

  <form>
    <div class="input-group email">
      <label for="email">Email Address</label>

      <input
        type="email"
        id="email"
        placeholder="student@example.com"
      />
    </div>

    <div class="input-group password">
      <label for="password">Password</label>

      <input
        type="password"
        id="password"
        placeholder="••••••••"
      />
    </div>

    <button
      type="submit"
      class="login-button"
    >
      Log In
    </button>
  </form>

  <p class="signup-link">
    Don't have an account?
    <a href="#">Sign Up Free</a>
  </p>
</div>
```

## CSS

```css
.login-container {
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.logo {
  font-size: 32px;
  font-weight: bold;
  color: #1e3c72;
  margin-bottom: 30px;
}

.input-group {
  position: relative;
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 600;
}

.input-group input {
  width: 100%;
  padding: 12px 15px 12px 20px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box;
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: #1e3c72;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
}

.signup-link {
  margin-top: 20px;
  font-size: 14px;
}
```

---

# Problem with a Normal HTML Form

Open the browser:

```text
Developer Tools → Network Tab
```

Click:

```text
Log In
```

You will notice:

```text
The entire application reloads.
```

Why?

Because a normal HTML form performs an HTTP request when submitted.

This behavior is useful for traditional websites but not for Angular Single Page Applications (SPA).

We want Angular to handle the submission without reloading the page.

---

# Step 3: Import FormsModule

Template-Driven Forms require:

```ts
FormsModule
```

Without it Angular will not recognize:

```text
ngForm
ngModel
```

## signin-form.ts

```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin-form',
  imports: [FormsModule],
  templateUrl: './signin-form.html',
  styleUrl: './signin-form.css',
})
export class SigninForm {}
```

---

# Step 4: Convert the Form into an Angular Form

Add:

```html
#loginForm="ngForm"
```

## HTML

```html
<form #loginForm="ngForm">
</form>
```

## What does this do?

This creates a template reference variable:

```html
loginForm
```

that points to Angular's:

```ts
NgForm
```

instance.

The form is now managed by Angular.

---

# Step 5: Handle Form Submission

Use Angular's:

```html
(ngSubmit)
```

event.

## HTML

```html
<form
  #loginForm="ngForm"
  (ngSubmit)="onSubmit()"
>
  <button
    type="submit"
    class="login-button"
  >
    Log In
  </button>
</form>
```

## Why use ngSubmit?

Instead of:

```text
Browser submits form
→ Page reload
```

Angular does:

```text
Submit form
→ Execute onSubmit()
→ Stay on same page
```

---

# Step 6: Handle Submission in TypeScript

Access the form using:

```ts
@ViewChild()
```

## signin-form.ts

```ts
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin-form',
  imports: [FormsModule],
  templateUrl: './signin-form.html',
  styleUrl: './signin-form.css',
})
export class SigninForm {
  @ViewChild('loginForm')
  login!: NgForm;

  onSubmit() {
    console.log(this.login.value);
  }
}
```

---

# Problem: Form Values Are Empty

If you submit now:

```ts
console.log(this.login.value);
```

Output:

```js
{}
```

Why?

Because Angular does not know which inputs belong to the form yet.

Inputs must be registered as form controls.

---

# Step 7: Add Form Controls

For Angular to track an input, it must contain:

1. `name`
2. `ngModel`

Optional:

3. Template Reference Variable

---

# 7.1 Add name

Every form control needs a unique name.

```html
<input
  type="email"
  name="email"
/>

<input
  type="password"
  name="password"
/>
```

Without `name`, Angular cannot register the control.

---

# 7.2 Add ngModel

`ngModel` tells Angular:

```text
This input is part of the Angular form.
```

```html
<input
  type="email"
  name="email"
  ngModel
/>

<input
  type="password"
  name="password"
  ngModel
/>
```

Now Angular starts tracking:

- Value
- Validity
- State

---

# Result

Submitting now:

```ts
console.log(this.login.value);
```

Outputs:

```js
{
  email: "student@example.com",
  password: "123456"
}
```

---

# 7.3 Add Template References (Optional)

Template references provide direct access to control state.

```html
<input
  type="email"
  name="email"
  ngModel
  #emailRef="ngModel"
/>

<input
  type="password"
  name="password"
  ngModel
  #passwordRef="ngModel"
/>
```

---

# Access Control State

```html
{{ emailRef.valid }}

{{ passwordRef.touched }}
```

Examples:

```text
true
false
```

---

# Alternative Without Template References

You can access controls through the form.

```html
{{ loginForm.controls["email"].valid }}
```

However, template references are usually cleaner and easier to read.

---

# 7.4 Two-Way Binding (Optional)

Use:

```html
[(ngModel)]
```

when you want to synchronize the input value with a component property.

## Component

```ts
email = '';
```

## Template

```html
<input
  type="email"
  name="email"
  [(ngModel)]="email"
/>
```

Now:

```ts
this.email
```

always contains the latest value entered by the user.

---

# Step 8: Add Validation

Angular supports validation using standard HTML attributes.

---

## Required Validation

```html
<input
  type="email"
  name="email"
  ngModel
  #emailRef="ngModel"
  required
  email
/>

<input
  type="password"
  name="password"
  ngModel
  #passwordRef="ngModel"
  required
/>
```

---

## Email Validation

```html
<input
  type="email"
  name="email"
  ngModel
  required
  email
/>
```

The `email` validator ensures:

```text
user@example.com ✅

user ❌
```

---

# Step 9: Display Validation Errors

Show messages only after the user interacts with the field.

## HTML

```html
@if (emailRef.invalid && emailRef.touched) {
  <div class="error-message">
    *Valid email is required
  </div>
}

@if (passwordRef.invalid && passwordRef.touched) {
  <div class="error-message">
    *Password is required
  </div>
}
```


---

## CSS

```css
.error-message {
  font-size: 12px;
  color: red;
}
```

---

# Common Control States

Every control automatically exposes state information.

| State | Description |
|---------|-------------|
| valid | Control passes validation |
| invalid | Control fails validation |
| touched | User focused and left the field |
| untouched | User never interacted with the field |
| dirty | Value changed |
| pristine | Value never changed |

Example:

```html
{{ emailRef.valid }}
{{ emailRef.invalid }}
{{ emailRef.touched }}
{{ emailRef.dirty }}
```

---

# Final Form Structure

```text
1. Import FormsModule
2. Create form using ngForm
3. Handle submission with ngSubmit
4. Access form using ViewChild
5. Register controls using:
   - name
   - ngModel
6. Add validation
7. Show validation errors
8. Submit form data
```

---

# Key Takeaways

✅ Import `FormsModule`

✅ Use `#formRef="ngForm"`

✅ Handle submission with `ngSubmit`

✅ Every control needs:

```html
name
ngModel
```

✅ Template references provide easy access to control state

✅ Angular automatically tracks:

```text
value
valid
invalid
touched
dirty
```

✅ Angular prevents page reloads during form submission

✅ Template-Driven Forms are best for small and simple forms