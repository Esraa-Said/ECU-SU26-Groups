# Angular Reactive Forms 

## 📌 Introduction

Reactive Forms are Angular's model-driven approach for handling forms.

Unlike Template-Driven Forms, where most of the logic is written in the HTML template, Reactive Forms keep the form structure, validation, and logic inside the TypeScript class.

Reactive Forms are ideal for:

- Medium and large forms
- Forms with complex validation
- Dynamic forms
- Applications that require more control over form data

---

# Why Use Reactive Forms?

Reactive Forms provide:

- Better scalability
- Stronger TypeScript support
- Easier testing
- Centralized form logic
- Better control over validation

Instead of Angular creating form controls automatically, you create them manually in TypeScript.

---

# Advantages

### ✅ More Control

The entire form structure is managed in TypeScript.

```ts
loginForm = new FormGroup({
  email: new FormControl(''),
  password: new FormControl('')
});
```

---

### ✅ Easier Testing

Business logic is located inside the component instead of the template.

---

### ✅ Better for Large Forms

Reactive Forms remain organized even when forms become large.

---

### ✅ Powerful Validation

Validators are configured directly in TypeScript.

```ts
email: new FormControl('', Validators.required)
```

---

### ✅ Better Type Safety

Works naturally with TypeScript.

---

# Disadvantages

### ❌ More Code

Requires more setup than Template-Driven Forms.

---

### ❌ Steeper Learning Curve

You need to learn Angular form classes such as:

- FormGroup
- FormControl
- Validators

---

# Creating a Reactive Form

## Step 1: Import ReactiveFormsModule

Reactive Forms require `ReactiveFormsModule`.

### signin-form.ts

```ts
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signin-form.html',
})
export class SigninForm {}
```

Without this module Angular will not recognize:

```html
formGroup
formControlName
```

---

# Step 2: Create the Form Model

Create a `FormGroup` inside the component.

### signin-form.ts

```ts
import {
  FormControl,
  FormGroup
} from '@angular/forms';

export class SigninForm {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
}
```

### What is FormGroup?

A `FormGroup` represents the entire form.

```text
loginForm
├── email
└── password
```

---

# Step 3: Connect the Form to the Template

Use the `formGroup` directive.

### signin-form.html

```html
<form [formGroup]="loginForm">
</form>
```

Now Angular connects the HTML form to the TypeScript form model.

---

# Step 4: Add Form Controls

Connect each input using `formControlName`.

### signin-form.html

```html
<form [formGroup]="loginForm">

  <input
    type="email"
    formControlName="email"
  />

  <input
    type="password"
    formControlName="password"
  />

</form>
```

### How it works

```text
formControlName="email"
```

connects the input to:

```ts
email: new FormControl('')
```

---

# Step 5: Handle Form Submission

Add Angular's `ngSubmit`.

### Template

```html
<form
  [formGroup]="loginForm"
  (ngSubmit)="onSubmit()"
>
  <button type="submit">
    Login
  </button>
</form>
```

### Component

```ts
onSubmit() {
  console.log(this.loginForm.value);
}
```

Example output:

```js
{
  email: "student@example.com",
  password: "123456"
}
```

---

# Step 6: Access Individual Controls

Reactive Forms allow direct access to controls.

### Component

```ts
get email() {
  return this.loginForm.get('email');
}
```

### Usage

```ts
console.log(this.email?.value);
```

---

# Step 7: Add Validation

Validators are added when creating controls.

### Component

```ts
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

export class SigninForm {

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    password: new FormControl('', [
      Validators.required
    ])
  });

}
```

---

# Step 8: Display Validation Errors

### Template

```html
<input
  type="email"
  formControlName="email"
/>

@if (
  loginForm.get('email')?.invalid &&
  loginForm.get('email')?.touched
) {
  <div class="error-message">
    Valid email is required
  </div>
}
```

Password:

```html
<input
  type="password"
  formControlName="password"
/>

@if (
  loginForm.get('password')?.invalid &&
  loginForm.get('password')?.touched
) {
  <div class="error-message">
    Password is required
  </div>
}
```

---

# Common Validators

## Required

```ts
Validators.required
```

---

## Email

```ts
Validators.email
```

---

## Minimum Length

```ts
Validators.minLength(6)
```

---

## Maximum Length

```ts
Validators.maxLength(20)
```

---

# Common Control States

Every FormControl provides state information.

### Example

```ts
email?.valid
email?.invalid
email?.touched
email?.untouched
email?.dirty
email?.pristine
```

| State | Description |
|---------|-------------|
| valid | Passes validation |
| invalid | Fails validation |
| touched | User focused then left |
| untouched | Never focused |
| dirty | Value changed |
| pristine | Value never changed |

---

# Disable Submit Button

Prevent submission when the form is invalid.

### Template

```html
<button
  type="submit"
  [disabled]="loginForm.invalid"
>
  Login
</button>
```

---

# Complete Example

## signin-form.ts

```ts
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-signin-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signin-form.html',
})
export class SigninForm {

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    password: new FormControl('', [
      Validators.required
    ])
  });

  get email() {
    return this.loginForm.get('email');
  }

  onSubmit() {
    console.log(this.loginForm.value);
  }
}
```

---

## signin-form.html

```html
<form
  [formGroup]="loginForm"
  (ngSubmit)="onSubmit()"
>

  <div>
    <label>Email</label>

    <input
      type="email"
      formControlName="email"
    />

    @if (
      email?.invalid &&
      email?.touched
    ) {
      <div class="error-message">
        Valid email is required
      </div>
    }
  </div>

  <div>
    <label>Password</label>

    <input
      type="password"
      formControlName="password"
    />

    @if (
      loginForm.get('password')?.invalid &&
      loginForm.get('password')?.touched
    ) {
      <div class="error-message">
        Password is required
      </div>
    }
  </div>

  <button
    type="submit"
    [disabled]="loginForm.invalid"
  >
    Login
  </button>

</form>
```

---

# Reactive Forms Workflow

1. Import `ReactiveFormsModule`
2. Create a `FormGroup`
3. Add `FormControl` objects
4. Connect the form using `[formGroup]`
5. Connect inputs using `formControlName`
6. Add validators
7. Show validation errors
8. Handle submission with `ngSubmit`

---

# Template-Driven vs Reactive Forms

| Feature | Template-Driven | Reactive |
|----------|----------|----------|
| Setup Speed | Fast | More Setup |
| Form Logic Location | Template | TypeScript |
| Validation | Template | TypeScript |
| Scalability | Limited | Excellent |
| Testing | Harder | Easier |
| Type Safety | Limited | Better |
| Best For | Small Forms | Medium/Large Forms |

---

# When Should You Use Reactive Forms?

Use Reactive Forms when:

- Building Sign In forms
- Building Sign Up forms
- Working with APIs
- Creating CRUD applications
- Forms contain multiple validations
- You need better control over form data

Reactive Forms are the most commonly used form approach in real-world Angular applications.