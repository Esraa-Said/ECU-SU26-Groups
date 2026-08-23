# 🚀 Angular 20+ Introduction (Modern Angular)

## 📖 What is Angular?

Angular is a **TypeScript-based front-end framework** developed and maintained by **Google** for building modern web applications.

It is primarily used to create **Single Page Applications (SPAs)**, where the browser loads a single HTML page and dynamically updates its content without requiring full page reloads.

Angular provides a complete ecosystem for building scalable applications, including routing, dependency injection, forms, HTTP communication, state management, and more.

---

# 🌐 What is a Single Page Application (SPA)?

In a traditional website, navigating between pages causes the browser to request a completely new HTML document from the server.

In a Single Page Application:

* The application loads once.
* JavaScript updates only the necessary parts of the page.
* Navigation feels much faster and smoother.
* Communication with the backend is typically done through APIs.

Examples of SPAs include Gmail, Trello, and many modern dashboards.

---

# ✨ Key Features of Angular

## 1. Component-Based Architecture

Angular applications are built using **components**.

Each component controls a small part of the UI and contains:

* HTML template
* TypeScript logic
* CSS styles

This makes applications modular, reusable, and easier to maintain.

---

## 2. TypeScript Support

Angular is built with TypeScript, providing:

* Static typing
* Better IDE support
* Compile-time error checking
* Modern language features

---

## 3. Dependency Injection (DI)

Angular includes a powerful Dependency Injection system that automatically provides services and shared objects to components.

This improves code organization and testability.

---

## 4. Routing

Angular Router enables navigation between views without refreshing the page.

Example:

```text
Home  →  Courses  →  Course Details  →  Profile
```

---

## 5. Built-in Directives

Directives modify the structure or behavior of the DOM.

Examples include:

* `@if`
* `@for`
* `@switch`
* `ngClass`
* `ngStyle`

Modern Angular versions encourage using the new built-in control flow syntax such as `@if` and `@for`.

---

## 6. Pipes

Pipes transform data before displaying it in templates.

Examples:

* Date formatting
* Currency formatting
* Uppercase/lowercase conversion

---

## 7. Reactive Programming with RxJS

Angular uses RxJS extensively for:

* HTTP requests
* Event streams
* Asynchronous programming

Many Angular APIs return **Observables**.

---

## 8. Signals

Signals are Angular's modern reactive state management system.

They automatically notify Angular when values change, reducing unnecessary updates and simplifying state management.

Example:

```ts
count = signal(0);

count.set(5);
count.update(value => value + 1);
```

Signals are one of the major modern features introduced in recent Angular versions.

---

## 9. Standalone Components

Recent Angular versions allow building applications without `NgModule`.

Components, directives, and pipes can be declared as standalone, simplifying project structure and reducing boilerplate.

Example:

```ts
@Component({
  standalone: true,
  selector: "app-home",
  templateUrl: "./home.html",
})
```

---

# 🛠️ Prerequisites

Before creating an Angular project, install the following tools.

## 1. Install Node.js

Download Node.js from:

https://nodejs.org

Installing Node.js also installs **npm (Node Package Manager)**.

Verify installation:

```bash
node -v
npm -v
```

---

## 2. Install Angular CLI

Angular CLI is the official command-line tool used to create and manage Angular projects.

Install globally:

```bash
npm install -g @angular/cli
```

Verify installation:

```bash
ng version
```

or

```bash
ng v
```

---

# 🚀 Create Your First Angular Project

Create a new project:

```bash
ng new project-name
```

Move into the project folder:

```bash
cd project-name
```

Start the development server:

```bash
ng serve
```

or simply:

```bash
ng s
```

The application will be available at:

```text
http://localhost:4200
```

Whenever you save changes, Angular automatically rebuilds and refreshes the application.

---

# ⚙️ Useful Angular CLI Commands

## Create a Component

```bash
ng generate component component-name
```

Shortcut:

```bash
ng g c component-name
```

---

## Create a Service

```bash
ng generate service service-name
```

Shortcut:

```bash
ng g s service-name
```

---

## Create a Module

```bash
ng generate module module-name
```

Shortcut:

```bash
ng g m module-name
```

Although standalone applications often don't require modules, this command is still useful for existing projects.

---

## Build the Application

```bash
ng build
```

Creates an optimized production build inside the `dist/` folder.

---

## Run the Development Server

```bash
ng serve
```

or

```bash
ng s
```

---

# 📁 Basic Project Structure

A newly created Angular project contains several files and folders. The most important ones are:

```text
project/
│
├── src/
│   ├── app/
│   │   ├── app.ts
│   │   ├── app.html
│   │   ├── app.css
│   │   └── app.config.ts
│   │
│   ├
│   ├── styles.css
│   ├── main.ts
│   └── index.html
│
├── angular.json
├── package.json
├── tsconfig.json
└── node_modules/
```

---

# 📄 Understanding `app.html`

The `app.html` file is the main template for the root component.

When starting a new Angular project, most of the visible UI is rendered from this file.

For example:

```html
<h1>Welcome to Angular</h1>
```

This content will appear immediately when the application loads.

As the application grows, `app.html` often contains other components, such as:

```html
<app-header></app-header>

<app-home></app-home>

<app-footer></app-footer>
```

---

# 📄 Understanding `main.ts`

`main.ts` is the application's entry point.

It bootstraps the root Angular application and starts the app in the browser.

---

# 📄 Understanding `styles.css`

This file contains global styles that apply across the entire application unless overridden by component-specific styles.

---

# 📄 Understanding `assets/`

The `assets` folder stores static files such as:

* Images
* Fonts
* Icons
* JSON files

These files can be referenced directly by the application.

---

# ✅ Summary

* Angular is a front-end framework developed by Google.
* It is built with TypeScript and is designed for creating Single Page Applications (SPAs).
* Modern Angular emphasizes:

  * Standalone Components
  * Signals
  * Dependency Injection
  * Routing
  * RxJS
  * Built-in Directives and Pipes
* Install Angular CLI using:

  ```bash
  npm install -g @angular/cli
  ```
* Create a project with:

  ```bash
  ng new project-name
  ```
* Run the development server with:

  ```bash
  ng serve
  ```
* The application's main UI starts from the root component template (`app.html`), while `main.ts` bootstraps the Angular application.
