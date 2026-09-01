# Angular 22 Signal Forms

## Introduction

Signal Forms is the new form system introduced in Angular that is built on top of Angular Signals.

Instead of managing form state through `FormControl`, `FormGroup`, and subscriptions, Signal Forms use signals as the single source of truth for form data.

### Why Signal Forms?

Traditional Angular forms often require:

* FormGroup creation
* FormControl management
* Subscriptions to value changes
* Additional synchronization code

Signal Forms simplify this by:

* Using Signals for reactive state
* Automatically synchronizing UI and data
* Providing strong type safety
* Reducing boilerplate code
* Improving performance

---

# Signal Forms Workflow

```text
1. Create model with signal()
          ↓
2. Create form using form()
          ↓
3. Bind fields with [formField]
          ↓
4. Read and update values
          ↓
5. Add validation rules
          ↓
6. Display validation errors
          ↓
7. Configure form submission
          ↓
8. Handle loading and server errors
```

---

# Step 1: Import Required APIs

```ts
import { signal } from '@angular/core';

import {
  form,
  FormField
} from '@angular/forms/signals';
```

For validation and submission:

```ts
import {
  form,
  FormField,
  FormRoot,
  required,
  email
} from '@angular/forms/signals';
```

---

# Step 2: Create a Form Model

The model is a writable signal that stores the form data.

```ts
loginModel = signal({
  email: '',
  password: ''
});
```

The model becomes the single source of truth.

---

# Step 3: Create the Form

```ts
loginForm = form(this.loginModel);
```

The form creates a Field Tree that mirrors the model structure.

```ts
loginForm.email
loginForm.password
```

---

# Step 4: Bind Fields in the Template

```html
<input
  type="email"
  [formField]="loginForm.email"
/>

<input
  type="password"
  [formField]="loginForm.password"
/>
```

Signal Forms automatically synchronizes:

```text
User Input
    ↓
Field State
    ↓
Model Signal
```

and

```text
Model Signal
    ↓
Field State
    ↓
UI
```

No subscriptions are required.

---

# Reading Form Values

## Entire Form

```ts
const data = this.loginModel();

console.log(data);
```

Output:

```ts
{
  email: 'user@example.com',
  password: '123456'
}
```

---

## Single Field

```ts
this.loginForm.email().value()
```

Example:

```ts
console.log(
  this.loginForm.email().value()
);
```

---

# Updating Values

## Replace Entire Form

```ts
this.loginModel.set({
  email: 'john@mail.com',
  password: '123456'
});
```

---

## Update One Field

```ts
this.loginForm.email()
  .value
  .set('john@mail.com');
```

---

## Update with update()

```ts
this.loginForm.age()
  .value
  .update(age => age + 1);
```

---

# Using Interfaces

```ts
interface LoginData {
  email: string;
  password: string;
}
```

```ts
loginModel = signal<LoginData>({
  email: '',
  password: ''
});
```

Benefits:

* Better IntelliSense
* Compile-time checking
* Easier maintenance

---

# Nested Objects

```ts
userModel = signal({
  profile: {
    firstName: '',
    lastName: ''
  }
});
```

```ts
userForm.profile.firstName
userForm.profile.lastName
```

---

# Arrays

```ts
orderModel = signal({
  items: [
    {
      product: '',
      quantity: 0
    }
  ]
});
```

```ts
orderForm.items[0].product
orderForm.items[0].quantity
```

---

# Field State

Every field returns a FieldState object.

```ts
loginForm.email()
```

Useful signals:

## Value

```ts
loginForm.email().value()
```

## Valid

```ts
loginForm.email().valid()
```

## Invalid

```ts
loginForm.email().invalid()
```

## Errors

```ts
loginForm.email().errors()
```

## Touched

```ts
loginForm.email().touched()
```

## Dirty

```ts
loginForm.email().dirty()
```

## Disabled

```ts
loginForm.email().disabled()
```

## Hidden

```ts
loginForm.email().hidden()
```

## Readonly

```ts
loginForm.email().readonly()
```

---

# Touched vs Dirty

## Touched

```text
Focus
   ↓
Blur
```

User visited the field.

---

## Dirty

```text
Initial Value
      ↓
Changed Value
```

User modified the value.

---

# Form State

The root form also exposes state.

```ts
loginForm().valid()
```

```ts
loginForm().invalid()
```

```ts
loginForm().dirty()
```

```ts
loginForm().touched()
```

---

# Validation

Validation rules are provided as the second argument of `form()`.

```ts
loginForm = form(
  this.loginModel,
  schema => {

    required(schema.email);

    email(schema.email);

    required(schema.password);

  }
);
```

---

## Required Validator

```ts
required(schema.email);
```

---

## Email Validator

```ts
email(schema.email);
```

---

## Custom Messages

```ts
required(schema.email, {
  message: 'Email is required'
});
```

```ts
email(schema.email, {
  message: 'Invalid email'
});
```

---

# Display Validation Errors

```html
@if (
  loginForm.email().touched() &&
  loginForm.email().invalid()
) {

  <div>

    @for (
      error of loginForm.email().errors();
      track error
    ) {

      <p>{{ error.message }}</p>

    }

  </div>

}
```

---

# Step 5: Form Submission

Signal Forms provides a built-in submission system.

The submission process is:

```text
1. Mark fields as touched
          ↓
2. Run validation
          ↓
3. Execute action
          ↓
4. Handle success or errors
```

---

# Using FormRoot

Import:

```ts
import {
  FormRoot
} from '@angular/forms/signals';
```

---

## Create a Submit Action

```ts
contactForm = form(
  this.contactModel,

  schema => {

    required(schema.name);
    required(schema.email);

  },

  {
    submission: {

      action: async (field) => {

        await saveContact(
          field().value()
        );

      }

    }
  }
);
```

---

## Connect the Form

```html
<form [formRoot]="contactForm">

  <input
    [formField]="contactForm.name">

  <input
    type="email"
    [formField]="contactForm.email">

  <button type="submit">
    Submit
  </button>

</form>
```

---

# What FormRoot Does

Automatically:

* Adds `novalidate`
* Prevents page refresh
* Calls `submit()`

You do not need to write any submit event handler.

---

# Access Submitted Data

Inside the action:

```ts
action: async (field) => {

  console.log(
    field().value()
  );

}
```

Output:

```ts
{
  name: 'John',
  email: 'john@example.com'
}
```

---

# Loading State

While the action is running:

```ts
contactForm().submitting()
```

returns:

```ts
true
```

---

## Disable Submit Button

```html
<button
  type="submit"
  [disabled]="contactForm().submitting()">

  @if (
    contactForm().submitting()
  ) {

    Sending...

  } @else {

    Submit

  }

</button>
```

This prevents duplicate submissions.

---

# Handling Server Errors

Validation may pass while the server rejects the request.

```ts
action: async (field) => {

  const result =
    await saveContact(
      field().value()
    );

  if (result.ok) return;

  return {

    kind: 'serverError',

    message:
      'Failed to submit form'

  };

}
```

---

# Errors on Specific Fields

```ts
return {

  kind: 'taken',

  message:
    'Email already exists',

  fieldTree:
    field.email

};
```

The error appears only on the email field.

---

# Multiple Errors

```ts
return [

  {
    kind: 'serverError',
    message: 'Email already exists',
    fieldTree: field.email
  },

  {
    kind: 'serverError',
    message: 'Invalid username',
    fieldTree: field.username
  }

];
```

---

# Auto-Clearing Server Errors

Server errors disappear automatically when the user changes the field value.

```text
Submit
   ↓
Server Error
   ↓
User Edits Field
   ↓
Error Removed
```

---




# Manual Submission

Instead of FormRoot:

```ts
import {
  submit
} from '@angular/forms/signals';
```

```ts
async onSave() {

  const success =
    await submit(

      this.contactForm,

      async (field) => {

        const result =
          await saveContact(
            field().value()
          );

        if (result.ok) return;

        return {
          kind: 'serverError',
          message: 'Failed to save'
        };
      }
    );

  if (success) {
    console.log('Saved');
  }

}
```

---

## Template

```html
<button (click)="onSave()">
  Save
</button>
```

---

# submit() Return Value

```ts
Promise<boolean>
```

Returns:

```ts
true
```

when successful.

Returns:

```ts
false
```

when:

* Validation fails
* Server errors are returned

---

# Handling Side Effects

```ts
async onSave() {

  const success =
    await submit(
      this.contactForm,

      async (field) => {

        await saveContact(
          field().value()
        );

      }
    );

  if (success) {

    await this.router.navigate(
      ['/confirmation']
    );

  }

}
```

---

# Computed Signals

```ts
passwordLength =
  computed(() =>
    this.loginForm.password()
      .value()
      .length
  );
```

Template:

```html
<p>
  Password Length:
  {{ passwordLength() }}
</p>
```

---

# Best Practices

## Use Interfaces

```ts
interface LoginData {
  email: string;
  password: string;
}
```

---

## Initialize Every Field

```ts
signal({
  email: '',
  password: ''
});
```

---

## Avoid Undefined

Use:

```ts
''
```

or

```ts
null
```

instead.

---

## Keep Models Focused

Good:

```ts
loginModel = signal({
  email: '',
  password: ''
});
```

Avoid:

```ts
signal({
  email: '',
  password: '',
  cartItems: [],
  theme: 'dark'
});
```

---

## Match Types to Controls

```ts
quantity: number
```

```html
<input type="number">
```

---

# Final Summary

```text
Create signal model
          ↓
Create form()
          ↓
Bind fields with formField
          ↓
Read and update values
          ↓
Add validation
          ↓
Show validation errors
          ↓
Configure submission.action
          ↓
Use FormRoot
          ↓
Handle loading with submitting()
          ↓
Handle server errors
          ↓
Submit data to backend
```

Signal Forms provide a modern, signal-based alternative to Reactive Forms with less boilerplate, better type safety, automatic reactivity, and a built-in submission workflow.
