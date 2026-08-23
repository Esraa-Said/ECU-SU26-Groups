# 🧩 Angular Components

## 📖 Overview

A **Component** is the fundamental building block of an Angular application.

Everything you see on the screen—such as a navigation bar, sidebar, login form, course card, or footer—is typically implemented as a separate component.

By splitting the UI into reusable components, Angular applications become easier to develop, maintain, and test.

For example, a home page might be composed of multiple components:

```text
Home Page
│
├── Header Component
├── Hero Component
├── Courses Component
├── Testimonials Component
└── Footer Component
```

Each component is responsible for its own logic, template, and styling.

---

# 🎯 What is a Component?

An Angular component is a self-contained piece of the user interface that controls a specific part of the application.

Every component consists of three main parts:

1. **Template (HTML)** – Defines what is displayed to the user.
2. **Class (TypeScript)** – Contains the data and application logic.
3. **Styles (CSS/SCSS)** – Controls the appearance of the component.

Together, these files create an encapsulated and reusable UI element.

---

# 🚀 Creating a Component

Angular CLI can automatically generate all required files.

## Generate a component

```bash
ng generate component my-component
```

Shortcut:

```bash
ng g c my-component
```

For example:

```bash
ng g c navbar
```

Angular creates a complete component named `navbar`.

---

# 📁 Generated Component Structure

When Angular CLI generates a component, it creates several files:

```text
my-component/
│
├── my-component.ts
├── my-component.html
├── my-component.css
└── my-component.spec.ts
```

### Purpose of each file

| File                   | Purpose                                         |
| ---------------------- | ----------------------------------------------- |
| `my-component.ts`      | Contains the component logic and metadata       |
| `my-component.html`    | Defines the HTML template displayed to the user |
| `my-component.css`     | Contains styles scoped to this component        |
| `my-component.spec.ts` | Unit tests for the component                    |

> **Note:** The `.spec.ts` file is used for testing and can be ignored while learning the basics.

---

# 🏗️ Understanding the Component Class

The TypeScript file defines the component's behavior.

Example:

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-my-component",
  templateUrl: "./my-component.html",
  styleUrls: ["./my-component.css"],
})
export class MyComponent {
  title: string = "Hello Angular!";
}
```

Let's understand each part.

---

## `@Component`

`@Component` is a **decorator** that tells Angular this class should behave as a component.

It also provides metadata describing how Angular should create and render the component.

```ts
@Component({
  ...
})
```

Without this decorator, Angular would treat the class as a normal TypeScript class.

---

## `selector`

The `selector` defines the custom HTML tag used to display the component.

```ts
selector: "app-my-component";
```

You can use it inside another template:

```html
<app-my-component></app-my-component>
```

When Angular encounters this tag, it renders the component's template.

---

## `templateUrl`

Specifies the HTML file associated with the component.

```ts
templateUrl: "./my-component.html";
```

Angular loads this file and inserts its contents into the DOM.

---

## `styleUrls`

Specifies one or more CSS files used to style the component.

```ts
styleUrls: ["./my-component.css"];
```

These styles are scoped to the component by default, preventing unintended effects on other parts of the application.

---

# 🖼️ The HTML Template

The template defines the user interface displayed in the browser.

Example:

```html
<h1>{{ title }}</h1>

<p>This is my first Angular component!</p>
```

The expression:

```html
{{ title }}
```

uses **Interpolation**, allowing Angular to display data from the TypeScript class.

Since `title` equals `"Hello Angular!"`, the rendered output becomes:

```html
<h1>Hello Angular!</h1>

<p>This is my first Angular component!</p>
```

---

# 🎨 Component Styles

Each component can have its own CSS file.

Example:

```css
h1 {
  color: #1976d2;
}
```

These styles only affect elements inside the component, helping avoid CSS conflicts across the application.

---

# 🔗 Using a Component

After creating a component, render it by placing its selector inside another component's template.

Example:

```html
<app-my-component></app-my-component>
```

You could also compose multiple components together:

```html
<app-header></app-header>

<app-sidebar></app-sidebar>

<app-home></app-home>

<app-footer></app-footer>
```

This modular structure keeps applications organized and reusable.

---

# 📌 Example: Complete Component

## TypeScript

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-my-component",
  templateUrl: "./my-component.html",
  styleUrls: ["./my-component.css"],
})
export class MyComponent {
  title = "Hello Angular!";
}
```

## HTML

```html
<h1>{{ title }}</h1>

<p>Welcome to Angular Components.</p>
```

## CSS

```css
h1 {
  color: blue;
}
```

Using the selector:

```html
<app-my-component></app-my-component>
```

Produces output similar to:

```text
Hello Angular!

Welcome to Angular Components.
```

---

# 💡 Why Use Components?

Using components provides many benefits:

* ✅ Reusable UI elements
* ✅ Better code organization
* ✅ Easier maintenance
* ✅ Separation of concerns (logic, template, and styles)
* ✅ Improved scalability for large applications
* ✅ Easier testing and debugging

---

# 📝 Best Practices

* Keep each component focused on a single responsibility.
* Use meaningful names such as `navbar`, `login`, `course-card`, or `user-profile`.
* Split large pages into smaller reusable components.
* Store business logic in the TypeScript class and presentation in the HTML template.
* Keep styles local to the component whenever possible.

---

# ✅ Summary

* A **Component** is the basic building block of an Angular application.
* Every component typically consists of:

  * A **TypeScript class** (`.ts`)
  * An **HTML template** (`.html`)
  * A **CSS/SCSS stylesheet** (`.css`)
* Create components using:

  ```bash
  ng g c component-name
  ```
* The `@Component` decorator provides Angular with the component's metadata.
* The `selector` is the custom HTML element used to render the component.
* The `templateUrl` links to the component's HTML file.
* The `styleUrls` property links to the component's styles.
* Components encourage modular, reusable, and maintainable application design.
