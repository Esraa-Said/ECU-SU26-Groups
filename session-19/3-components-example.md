# 🏗️ Building a Page Using Multiple Angular Components

## 📖 Overview

One of Angular's biggest strengths is its **component-based architecture**.

Instead of writing an entire page in a single file, we divide the UI into smaller, reusable components. Each component is responsible for a specific part of the page.

For example, a typical website layout may contain:

* Header
* Navigation Bar
* Main Content
* Sidebar
* Footer

Each of these sections can be implemented as an independent Angular component.

---

# 🎯 Desired Layout

The final page should look similar to the following structure:

![Desired View](3-components-example-view.png)

```text
+---------------------------------------+
|               Header                  |
+---------------------------------------+
|             Navigation                |
+---------------------------------------+
|            |                          |
|  Main      |        Sidebar           |
|  Content   |                          |
|            |                          |
+---------------------------------------+
|               Footer                  |
+---------------------------------------+
```

---

# 🚀 Step 1: Generate the Components

Create the required components using Angular CLI:

```bash
ng g c header
ng g c navigation
ng g c main
ng g c side
ng g c footer
```

Angular will automatically generate the TypeScript, HTML, CSS, and test files for each component.

---

# 🧩 Header Component

## `header.html`

```html
<header>
  <h1>Welcome to MyApp</h1>
</header>
```

The template contains a simple page title displayed at the top of the application.

## `header.css`

```css
header {
  background-color: #fdd;
  padding: 10px;
  text-align: center;
}
```

This stylesheet gives the header a background color, spacing, and centers its content.

---

# 🧭 Navigation Component

## `navigation.html`

```html
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
```

This component represents the application's navigation bar.

## `navigation.css`

```css
nav {
  background-color: #dfd;
  padding: 10px;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 15px;
  justify-content: center;
  padding: 0;
}

nav a {
  text-decoration: none;
  font-weight: bold;
}
```

### Explanation

* `display: flex` arranges menu items horizontally.
* `gap` adds spacing between links.
* `justify-content: center` centers the navigation.
* `list-style: none` removes default bullet points.

---

# 📄 Main Component

## `main.html`

```html
<main>
  <h2>Main Content Area</h2>
  <p>This is the main section where content appears.</p>
</main>
```

This component contains the primary content of the page.

## `main.css`

```css
main {
  background-color: #ddf;
  padding: 20px;
}
```

The padding provides spacing inside the content area, while the background color helps distinguish it visually.

---

# 📌 Sidebar Component

## `side.html`

```html
<aside>
  <h3>Sidebar</h3>
  <p>Some extra information or links.</p>
</aside>
```

The sidebar typically displays additional information, advertisements, or quick links.

## `side.css`

```css
aside {
  background-color: #def;
  padding: 20px;
}
```

The styling separates the sidebar visually from the main content.

---

# 📎 Footer Component

## `footer.html`

```html
<footer>
  <p>&copy; 2025 MyApp. All rights reserved.</p>
</footer>
```

The footer is displayed at the bottom of the page and usually contains copyright or contact information.

## `footer.css`

```css
footer {
  background-color: #e9d1f5;
  text-align: center;
  padding: 10px;
}
```

This centers the footer text and adds spacing around it.

---

# 🏠 Composing the Page in `app.html`

After creating all components, they can be assembled inside the root component (`app.html`).

```html
<div class="layout">
  <app-header></app-header>

  <app-navigation></app-navigation>

  <div class="content">
    <app-main></app-main>

    <app-side></app-side>
  </div>

  <app-footer></app-footer>
</div>
```

## Explanation

Each custom HTML tag corresponds to one Angular component:

* `<app-header>` renders the Header component.
* `<app-navigation>` renders the Navigation component.
* `<app-main>` renders the Main Content component.
* `<app-side>` renders the Sidebar component.
* `<app-footer>` renders the Footer component.

Angular replaces these selectors with the corresponding component templates when rendering the application.

---

# 🎨 Layout Styling (`app.css`)

```css
.layout {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: Arial, sans-serif;
}

.content {
  display: flex;
  gap: 10px;
}

app-main {
  flex: 3;
}

app-side {
  flex: 1;
}
```

## Explanation

### `.layout`

```css
display: flex;
flex-direction: column;
```

Stacks the major sections vertically:

* Header
* Navigation
* Content
* Footer

---

### `.content`

```css
display: flex;
```

Places the Main Content and Sidebar side by side.

---

### `app-main`

```css
flex: 3;
```

Allocates approximately 75% of the horizontal space to the main content.

---

### `app-side`

```css
flex: 1;
```

Allocates approximately 25% of the horizontal space to the sidebar.

---

# 🧠 Why Split the UI into Components?

Creating separate components provides several benefits:

* ✅ Better organization of the project.
* ✅ Reusable UI elements.
* ✅ Easier maintenance and debugging.
* ✅ Separation of concerns.
* ✅ Independent styling and logic for each section.
* ✅ Simpler collaboration in team projects.

For example, the `HeaderComponent` could be reused across multiple pages without duplicating code.

---

# 📁 Example Project Structure

```text
src/
└── app/
    ├── header/
    ├── navigation/
    ├── main/
    ├── side/
    ├── footer/
    ├── app.html
    ├── app.css
    └── app.ts
```

---

# ✅ Summary

* Angular applications are built by combining multiple reusable components.
* Each component encapsulates its own HTML, CSS, and TypeScript logic.
* In this example, the page is divided into five components:

  * `Header`
  * `Navigation`
  * `Main`
  * `Sidebar`
  * `Footer`
* The root template (`app.html`) assembles these components using their selectors.
* CSS Flexbox is used to arrange the layout:

  * `flex-direction: column` stacks sections vertically.
  * `display: flex` places the main content and sidebar side by side.
  * `flex: 3` and `flex: 1` control how much horizontal space each section occupies.
* This modular approach makes Angular applications easier to scale and maintain.
