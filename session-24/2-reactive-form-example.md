# Angular Reactive Forms (Angular v22) – Course Form Example

## 📌 Project Goal

In this example, we will build an **Add Course Form** using **Reactive Forms**.

The form will allow users to enter:

- Course Title
- Instructor Name
- Category
- Level
- Price
- Duration
- Rating
- Students Count
- Course Image
- Description

Along the way we will learn:

- How to create a Reactive Form
- How to connect it to the template
- How to add validation
- How to display validation errors
- How to submit form data

---

# Step 0: Create Constants

Instead of hardcoding categories and levels inside the component, create reusable constants.

### `app/constants/course-constants.ts`

```ts
export const COURSE_CATEGORIES = [
  "frontend",
  "backend",
  "database",
  "programming",
  "devops",
  "mobile",
] as const;

export const COURSE_LEVELS = ["beginner", "intermediate", "advanced"] as const;
```

### Why?

Benefits:

- Reusable
- Easier to maintain
- Cleaner component code

---

# Step 1: Generate the Component

```bash
ng g c add-course-form
```

Angular creates:

```text
add-course-form/
├── add-course-form.ts
├── add-course-form.html
├── add-course-form.css
```

---

# Step 2: Build the UI First

Before creating the Reactive Form, create the HTML structure and styling.

### Component

```ts
import { Component } from "@angular/core";
import {
  COURSE_CATEGORIES,
  COURSE_LEVELS,
} from "../constants/course-constants";
import { TitleCasePipe } from "@angular/common";

@Component({
  selector: "app-add-course-form",
  imports: [TitleCasePipe],
  templateUrl: "./add-course-form.html",
  styleUrl: "./add-course-form.css",
})
export class AddCourseForm {
  categories = COURSE_CATEGORIES;
  levels = COURSE_LEVELS;
}
```

---

### Template

Create the form UI with inputs, selects, textarea, and submit button.

At this stage it is still a normal HTML form.

```html
<div class="form-container">
  <h2>Add New Course</h2>
  <form>
    <div class="form-group">
      <label for="title">Course Title</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="e.g. Angular Advanced Guide"
      />
    </div>
    <div class="form-group">
      <label for="instructor">Instructor Name</label>
      <input
        id="instructor"
        name="instructor"
        type="text"
        placeholder="e.g. John Doe"
      />
    </div>
    <div class="form-row">
      <div class="form-group col">
        <label for="category">Category</label>
        <select id="category" name="category">
          <option value="" disabled selected>Select Category</option>
          @for (cat of categories; track $index) {
          <option [value]="cat">{{ cat | titlecase }}</option>
          }
        </select>
      </div>
      <div class="form-group col">
        <label for="level">Course Level</label>
        <select id="level" name="level">
          <option value="" disabled selected>Select Level</option>
          @for (lev of levels; track $index) {
          <option [value]="lev">{{ lev | titlecase }}</option>
          }
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col">
        <label for="price">Price ($)</label>
        <input
          id="price"
          name="price"
          type="number"
          step="0.01"
          placeholder="0.00"
        />
      </div>
      <div class="form-group col">
        <label for="duration">Duration</label>
        <input
          id="duration"
          name="duration"
          type="text"
          placeholder="e.g. 12 Hours, 4 Weeks"
        />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col">
        <label for="rating">Initial Rating</label>
        <input id="rating" name="rating" type="number" step="0.1" value="0" />
      </div>
      <div class="form-group col">
        <label for="students">Initial Students</label>
        <input id="students" name="students" type="number" value="0" />
      </div>
    </div>
    <div class="form-group">
      <label for="imageUrl">Course Image URL</label>
      <input id="imageUrl" name="imageUrl" type="file" accept="image/*" />
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        id="description"
        name="description"
        rows="4"
        placeholder="Describe the course content..."
      ></textarea>
    </div>
    <button type="submit" class="submit-btn">Create Course</button>
  </form>
</div>
```

No Angular form features exist yet.

---

### CSS

Add styling to improve appearance and responsiveness.

```css
.form-container {
  max-width: 700px;
  margin: 30px auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 25px;
}

.form-group {
  margin-bottom: 20px;
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

input,
select,
textarea {
  padding: 10px 14px;
  border: 1px solid #dcdde1;
  border-radius: 6px;
  font-size: 15px;
  color: #2f3640;
  background-color: #f5f6fa;
  transition: all 0.3s ease;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #3498db;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
}

textarea {
  resize: vertical;
}

.error-msg {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
  font-weight: 500;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.submit-btn:hover {
  background-color: #2980b9;
}

.submit-btn:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }
}
```

---

# Step 3: Import ReactiveFormsModule

Reactive Forms are not available automatically.

Import `ReactiveFormsModule`.

```ts
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-add-course-form",
  imports: [TitleCasePipe, ReactiveFormsModule],
})
export class AddCourseForm {}
```

### Why?

Without it Angular will not recognize:

```html
[formGroup] formControlName
```

---

# Step 4: Create the Form Model

Reactive Forms start in TypeScript.

Create a `FormGroup` containing all form controls.

```ts
import { FormControl, FormGroup } from "@angular/forms";

addCourseForm = new FormGroup({
  title: new FormControl(""),
  instructor: new FormControl(""),
  category: new FormControl(""),
  level: new FormControl(""),
  price: new FormControl(0),
  duration: new FormControl(0),
  rating: new FormControl(0),
  students: new FormControl(0),
  imageUrl: new FormControl(null),
  description: new FormControl(""),
});
```

### Why?

Reactive Forms use a form model.

The form model:

- Stores values
- Stores validation state
- Tracks touched/dirty status
- Controls submission

---

# Step 5: Connect the Form to the Template

Connect the form model to the HTML.

```html
<form [formGroup]="addCourseForm"></form>
```

### What does `[formGroup]` do?

It links:

```ts
addCourseForm;
```

with

```html
<form></form>
```

Now Angular knows this form is managed by Reactive Forms.

---

# Step 6: Connect Form Controls

Every control must be linked using:

```html
formControlName=""
```

Example:

```html
<input type="text" formControlName="title" />
```

Angular connects it to:

```ts
title: new FormControl("");
```

---

### Title

```html
<input type="text" formControlName="title" />
```

---

### Instructor

```html
<input type="text" formControlName="instructor" />
```

---

### Category

```html
<select formControlName="category">
  @for (cat of categories; track $index) {
  <option [value]="cat">{{ cat | titlecase }}</option>
  }
</select>
```

---

### Level

```html
<select formControlName="level">
  @for (lev of levels; track $index) {
  <option [value]="lev">{{ lev | titlecase }}</option>
  }
</select>
```

---

### Other Controls

```html
<input formControlName="price" />
<input formControlName="duration" />
<input formControlName="rating" />
<input formControlName="students" />

<textarea formControlName="description"></textarea>
```

---

# Step 7: Handle Form Submission

Listen for form submission.

```html
<form [formGroup]="addCourseForm" (ngSubmit)="onSubmit()"></form>
```

---

### Component

```ts
onSubmit() {
  console.log(this.addCourseForm.value);
}
```

### Example Output

```js
{
  title: "Angular Masterclass",
  instructor: "John Doe",
  category: "frontend",
  level: "advanced",
  price: 99
}
```

---

# Step 8: Add Validation

Reactive Forms use Angular Validators.

Import:

```ts
import { Validators } from "@angular/forms";
```

---

### Updated Form Model

```ts
addCourseForm = new FormGroup({
  title: new FormControl("", [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100),
  ]),

  instructor: new FormControl("", [Validators.required]),

  category: new FormControl("", [Validators.required]),

  level: new FormControl("", [Validators.required]),

  price: new FormControl(0, [Validators.required, Validators.min(0)]),

  duration: new FormControl(0, [Validators.required, Validators.min(0)]),

  rating: new FormControl(0, [Validators.min(0), Validators.max(5)]),

  students: new FormControl(0, [Validators.min(0)]),

  imageUrl: new FormControl(null),

  description: new FormControl("", [Validators.maxLength(1000)]),
});
```

---

# Step 9: Prevent Invalid Submission

Before sending data, check form validity.

```ts
onSubmit() {

  if (this.addCourseForm.invalid) {
    this.addCourseForm.markAllAsTouched();
    return;
  }

  console.log(this.addCourseForm.value);
}
```

### Why?

If the form is invalid:

- Show all validation messages
- Stop submission

---

# Step 10: Display Validation Errors

Reactive Forms expose:

```ts
invalid;
valid;
touched;
untouched;
dirty;
pristine;
errors;
```

---

### Example: Title Field

```html
@if ( addCourseForm.get('title')?.invalid && addCourseForm.get('title')?.touched
) { @if ( addCourseForm.get('title')?.errors?.['required'] ) {
<div class="error-message">*Course title is required</div>
} @if ( addCourseForm.get('title')?.errors?.['minlength'] ) {
<div class="error-message">*Course title must be at least 3 characters</div>
} @if ( addCourseForm.get('title')?.errors?.['maxlength'] ) {
<div class="error-message">*Course title cannot exceed 100 characters</div>
} }
```

---

### Instructor

```html
@if ( addCourseForm.get('instructor')?.invalid &&
addCourseForm.get('instructor')?.touched ) {
<div class="error-message">*Instructor name is required</div>
}
```

---

### Category

```html
@if ( addCourseForm.get('category')?.invalid &&
addCourseForm.get('category')?.touched ) {
<div class="error-message">*Category is required</div>
}
```

---

### Level

```html
@if ( addCourseForm.get('level')?.invalid && addCourseForm.get('level')?.touched
) {
<div class="error-message">*Course level is required</div>
}
```

---

### Price

```html
@if ( addCourseForm.get('price')?.invalid && addCourseForm.get('price')?.touched
) { @if ( addCourseForm.get('price')?.errors?.['required'] ) {
<div class="error-message">*Price is required</div>
} @if ( addCourseForm.get('price')?.errors?.['min'] ) {
<div class="error-message">*Price cannot be negative</div>
} }
```

---

### Duration

```html
@if ( addCourseForm.get('duration')?.invalid &&
addCourseForm.get('duration')?.touched ) { @if (
addCourseForm.get('duration')?.errors?.['required'] ) {
<div class="error-message">*Duration is required</div>
} @if ( addCourseForm.get('duration')?.errors?.['min'] ) {
<div class="error-message">*Duration cannot be negative</div>
} }
```

---

### Rating

```html
@if ( addCourseForm.get('rating')?.invalid &&
addCourseForm.get('rating')?.touched ) { @if (
addCourseForm.get('rating')?.errors?.['min'] ) {
<div class="error-message">*Rating must be at least 0</div>
} @if ( addCourseForm.get('rating')?.errors?.['max'] ) {
<div class="error-message">*Rating cannot exceed 5</div>
} }
```

---

### Students

```html
@if ( addCourseForm.get('students')?.invalid &&
addCourseForm.get('students')?.touched ) { @if (
addCourseForm.get('students')?.errors?.['min'] ) {
<div class="error-message">*Students count cannot be negative</div>
} }
```

---

### Description

```html
@if ( addCourseForm.get('description')?.invalid &&
addCourseForm.get('description')?.touched ) { @if (
addCourseForm.get('description')?.errors?.['maxlength'] ) {
<div class="error-message">*Description cannot exceed 1000 characters</div>
} }
```

---

# Step 11: Disable Submit Button

Prevent submission while the form is invalid.

```html
<button type="submit" class="submit-btn" [disabled]="addCourseForm.invalid">
  Create Course
</button>
```

---

# Error Message Styling

```css
.error-message {
  color: red;
  font-size: 12px;
}
```

---

# Reactive Forms Workflow

```text
1. Import ReactiveFormsModule
        ↓
2. Create FormGroup
        ↓
3. Create FormControls
        ↓
4. Connect FormGroup to Template
        ↓
5. Connect Controls using formControlName
        ↓
6. Add Validators
        ↓
7. Display Validation Errors
        ↓
8. Handle Submission
```

---

# Key Concepts

| Concept         | Purpose                         |
| --------------- | ------------------------------- |
| FormGroup       | Represents the entire form      |
| FormControl     | Represents a single input       |
| formGroup       | Connects the form model to HTML |
| formControlName | Connects a control to HTML      |
| Validators      | Validates input values          |
| invalid         | Control fails validation        |
| valid           | Control passes validation       |
| touched         | User interacted with field      |
| dirty           | Value changed                   |
| errors          | Contains validation errors      |
| ngSubmit        | Handles form submission         |

---

# When to Use Reactive Forms

Reactive Forms are ideal for:

- Large forms
- Dynamic forms
- Complex validation
- Enterprise applications
- Better testing
- More control over form logic

For small forms, Template-Driven Forms may be simpler. For medium and large applications, Reactive Forms are usually the preferred choice.
