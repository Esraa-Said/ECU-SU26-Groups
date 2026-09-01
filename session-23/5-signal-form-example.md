# Angular Signal Forms 

This guide explains how to build a Signup Form using **Angular Signal Forms**, including:

* Creating a form model
* Creating the form instance
* Binding form fields
* Watching form values
* Adding validation
* Displaying validation errors
* Handling form submission
* Showing a loading state

---

# Original HTML Code

```html
<div class="form-container">
  <h2>Create Account</h2>

  <form>
    <div class="form-row">
      <div class="form-group col">
        <label for="firstName">First Name *</label>
        <input id="firstName" type="text" placeholder="John" />
      </div>

      <div class="form-group col">
        <label for="lastName">Last Name *</label>
        <input id="lastName" type="text" placeholder="Doe" />
      </div>
    </div>

    <div class="form-row">
      <div class="form-group col">
        <label for="email">Email Address *</label>
        <input
          id="email"
          type="email"
          placeholder="john.doe@example.com"
        />
      </div>

      <div class="form-group col">
        <label for="phone">Phone Number</label>
        <input
          id="phone"
          type="tel"
          placeholder="0123456789"
        />
      </div>
    </div>

    <div class="form-row">
      <div class="form-group col">
        <label for="password">Password *</label>
        <input
          id="password"
          type="password"
          placeholder="At least 8 characters"
        />
      </div>
    </div>

    <div class="form-group">
      <label for="imageUrl">Profile Image</label>
      <input
        id="imageUrl"
        type="file"
        accept="image/*"
      />
    </div>

    <button type="submit" class="submit-btn">
      Register
    </button>
  </form>
</div>
```


# Original CSS Code

```css
.form-container {
  max-width: 650px;
  margin: 40px auto;
  padding: 35px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box;
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 30px;
  font-size: 24px;
}

.form-group {
  margin-bottom: 22px;
  display: flex;
  flex-direction: column;
}

.form-row {
  display: flex;
  gap: 20px;
}

.col {
  flex: 1;
}

label {
  font-weight: 600;
  margin-bottom: 8px;
  color: #34495e;
  font-size: 14px;
}

input, select {
  padding: 12px 15px;
  border: 1px solid #dcdde1;
  border-radius: 6px;
  font-size: 15px;
  color: #2f3640;
  background-color: #f8f9fa;
  transition: all 0.3s ease;
  box-sizing: border-box;
  width: 100%;
}

input:focus, select:focus {
  outline: none;
  border-color: #2ecc71; /* لون أخضر هادئ للتسجيل */
  background-color: #fff;
  box-shadow: 0 0 5px rgba(46, 204, 113, 0.2);
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background-color: #2ecc71;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 15px;
}

.submit-btn:hover {
  background-color: #27ae60;
}

.submit-btn:active {
  background-color: #219653;
}

@media (max-width: 600px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }
}

```


# 1. Create the Form Model

Start by defining your form data using a Signal.

```ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-signup-form',
  imports: [],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.css',
})
export class SignupForm {
  signupModel = signal({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    imageUrl: null,
  });
}
```

### Why?

The model represents the form state and acts as the single source of truth for all form values.

---

# 2. Create the Form

Generate a Signal Form from the model.

```ts
signupForm = form(this.signupModel);
```

### Why?

The `form()` function creates a reactive form structure that can:

* Track field values
* Handle validation
* Manage submission state
* Provide error messages

---

# 3. Bind Form Fields

Import `FormField` and connect each input to its corresponding form field.

```html
<input
  id="firstName"
  type="text"
  placeholder="John"
  [formField]="signupForm.firstName"
/>

<input
  id="lastName"
  type="text"
  placeholder="Doe"
  [formField]="signupForm.lastName"
/>

<input
  id="email"
  type="email"
  placeholder="john.doe@example.com"
  [formField]="signupForm.email"
/>

<input
  id="phone"
  type="tel"
  placeholder="0123456789"
  [formField]="signupForm.phone"
/>

<input
  id="password"
  type="password"
  placeholder="At least 8 characters"
  [formField]="signupForm.password"
/>
```

### Why?

The `formField` directive automatically:

* Updates the form value
* Tracks touched state
* Tracks dirty state
* Synchronizes UI and form state

---

# 4. Watch Form Values

Use an effect to monitor form changes.

```ts
constructor() {
  effect(() => {
    console.log(this.signupForm().value());
  });
}
```

### Output Example

```ts
{
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  password: "12345678",
  phone: "0123456789",
  imageUrl: null
}
```

### Why?

Useful for:

* Debugging
* Live previews
* Understanding how Signal Forms update data

---

# 5. Add Validation Rules

Extend the form configuration with validators.

```ts
signupForm = form(this.signupModel, (schema) => {
  required(schema.firstName, {
    message: 'First name is required',
  });

  minLength(schema.firstName, 2, {
    message: 'First name minimum length is 2 characters',
  });

  maxLength(schema.firstName, 50, {
    message: 'First name maximum length is 50 characters',
  });

  required(schema.lastName, {
    message: 'Last name is required',
  });

  minLength(schema.lastName, 2, {
    message: 'Last name minimum length is 2 characters',
  });

  maxLength(schema.lastName, 50, {
    message: 'Last name maximum length is 50 characters',
  });

  required(schema.email, {
    message: 'Email is required',
  });

  pattern(
    schema.email,
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    {
      message: 'Invalid Email',
    }
  );

  required(schema.password, {
    message: 'Password is required',
  });

  minLength(schema.password, 8, {
    message: 'Password must be at least 8 characters long',
  });

  pattern(
    schema.phone,
    /^\+?[0-9]{10,15}$/,
    {
      message: 'Please provide a valid phone number',
    }
  );
});
```

### Validation Rules

| Field      | Validation                    |
| ---------- | ----------------------------- |
| First Name | Required, Min 2, Max 50       |
| Last Name  | Required, Min 2, Max 50       |
| Email      | Required, Valid Email Pattern |
| Password   | Required, Min Length 8        |
| Phone      | Valid Phone Number Pattern    |

---

# 6. Display Validation Errors

Show errors only when the field is:

* Invalid
* Touched

Example for First Name:

```html
@if (
  signupForm.firstName().invalid() &&
  signupForm.firstName().touched()
) {
  <div class="error-message">
    @for (
      error of signupForm.firstName().errors();
      track error
    ) {
      <p>{{ error.message }}</p>
    }
  </div>
}
```

### Error Styling

```css
.error-message {
  color: red;
  font-size: 12px;
}
```

### Why?

This improves the user experience by avoiding error messages before the user interacts with the field.

---

# 7. Enable Form Submission

## Import FormRoot

```ts
imports: [FormField, FormRoot];
```

---

## Bind the Form

```html
<form [formRoot]="signupForm">
```

This connects the form instance to the HTML form element.

---

## Add Submission Logic

```ts
signupForm = form(
  this.signupModel,
  (schema) => {
    required(schema.firstName, {
      message: 'First name is required',
    });

    minLength(schema.firstName, 2, {
      message: 'First name minimum length is 2 characters',
    });

    maxLength(schema.firstName, 50, {
      message: 'First name maximum length is 50 characters',
    });

    required(schema.lastName, {
      message: 'Last name is required',
    });

    minLength(schema.lastName, 2, {
      message: 'Last name minimum length is 2 characters',
    });

    maxLength(schema.lastName, 50, {
      message: 'Last name maximum length is 50 characters',
    });

    required(schema.email, {
      message: 'Email is required',
    });

    pattern(
      schema.email,
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      {
        message: 'Invalid Email',
      }
    );

    required(schema.password, {
      message: 'Password is required',
    });

    minLength(schema.password, 8, {
      message: 'Password must be at least 8 characters long',
    });

    pattern(
      schema.phone,
      /^\+?[0-9]{10,15}$/,
      {
        message: 'Please provide a valid phone number',
      }
    );
  },
  {
    submission: {
      action: async (field) => {
        console.log(field().value());
      },
    },
  }
);
```

### Why?

The `action` function runs when the form is submitted successfully and all validations pass.

---

# 8. Add a Loading State

Signal Forms automatically expose a submitting state.

```ts
signupForm().submitting()
```

---

## Disable the Button During Submission

```html
<button
  type="submit"
  class="submit-btn"
  [disabled]="signupForm().submitting()"
>
  @if (signupForm().submitting()) {
    Loading...
  } @else {
    Register
  }
</button>
```

### Benefits

* Prevents duplicate submissions
* Gives visual feedback to users
* Improves user experience

---

# Complete Flow

```text
Signal Model
      ↓
Create Form
      ↓
Bind Fields
      ↓
Add Validation
      ↓
Show Errors
      ↓
Submit Form
      ↓
Handle Loading State
```
