# # Angular Data Binding (Angular 22)

## 📌 What is Data Binding?

Data Binding is one of the most important features in Angular. It is the mechanism that connects the **component (TypeScript code)** with the **template (HTML)**.

Instead of manually updating the DOM using JavaScript, Angular automatically keeps the UI and your data synchronized.

```text
Component (TypeScript)
          │
          │
   Data Binding
          │
          ▼
    Template (HTML)
```

---

# Types of Data Binding

Angular provides two main types of data binding:

1. **One-Way Data Binding**
2. **Two-Way Data Binding**

---

# 1. One-Way Data Binding

In one-way data binding, data flows in **one direction only**.

There are two possibilities:

- Component ➜ Template
- Template ➜ Component

---

# Component → Template

The component provides data, and the template displays it.

## 1. Text Interpolation

Text interpolation displays component values inside HTML using double curly braces `{{ }}`.

### Component

```ts
export class AppComponent {
  title = "Welcome to Angular";
}
```

### Template

```html
<h1>{{ title }}</h1>
```

### Output

```
Welcome to Angular
```

Text interpolation is commonly used for displaying:

- Text
- Numbers
- Variables
- Function results
- Signal values

For example with Signals:

```ts
theme = signal("dark");
```

```html
<p>Theme: {{ theme() }}</p>
```

Whenever the signal changes, Angular automatically updates the page.

---

## 2. Property Binding

Property binding sets DOM properties using square brackets `[]`.

### Component

```ts
export class AppComponent {
  imageUrl = "assets/logo.png";
}
```

### Template

```html
<img [src]="imageUrl" />
```

Angular updates the `src` property whenever `imageUrl` changes.

Another example:

```html
<button [disabled]="isLoading">Save</button>
```

---

## 3. Class Binding

Class binding dynamically adds or removes CSS classes.

### Single class

```html
<p [class.active]="isActive">User</p>
```

```ts
isActive = true;
```

Output:

```html
<p class="active">User</p>
```

---

### Multiple classes

You can bind an object:

```html
<div [class]="['active', 'rounded']"></div>
```

or

```html
<div
  [class]="{
    active: isActive,
    disabled: !isActive
}"
></div>
```

Note: `ngClass` is another directive that provides similar functionality.

```html
<div
  [ngClass]="{
    active: isActive,
    disabled: !isActive
  }"
></div>
```

---

## 5. Style Binding

Style binding dynamically changes CSS styles.

```html
<p [style.color]="textColor">Hello</p>
```

```ts
textColor = "blue";
```

You can also specify units:

```html
<div [style.fontSize.px]="sizeInPixel">test</div>
```
```ts
  sizeInPixel = 10;
```

Or bind multiple styles:

```html
<div
  [style]="{
    color: color,
    'font-weight': fontWeight
  }"
>
  test
</div>
```
```ts
  color= 'red';
  fontWeight = 'bold';
```

Note: `ngStyle` provides similar functionality.

```html
<div
  [ngStyle]="{
    color: textColor,
    background: backgroundColor
  }"
></div>
```

---

# Template → Component

Sometimes the user interacts with the page and the component needs to react.

This is done using **Event Binding**.

## Event Binding

Event binding uses parentheses `()`.

### Template

```html
<button (click)="showMessage()">Click Me</button>
```

### Component

```ts
showMessage() {
  console.log("Button clicked");
}
```

Whenever the button is clicked, Angular executes the method.

---

## Accessing `$event`

Angular provides the event object through `$event`.

```html
<input (keyup)="onKeyUp($event)" />
```

```ts
onKeyUp(event: KeyboardEvent) {
  console.log(event.key);
}
```

---

## Key Modifiers

Angular lets you listen for specific keys.

Instead of checking manually:

```ts
if (event.key === "Enter") {
}
```

you can simply write:

```html
<input (keyup.enter)="save()" />
```

Other examples:

```html
<input (keyup.escape)="cancel()" />

<input (keyup.shift.enter)="submit()" />
```

---

## Common Events

Some frequently used native events include:

```html
(click) (input) (change) (keyup) (keydown) (mouseover) (mouseleave)
```

---

# 2. Two-Way Data Binding

Two-way data binding synchronizes the component and the template.

```
Component  ⇄  Template
```

Whenever the component changes, the UI updates.

Whenever the user changes the UI, the component updates.

Angular uses the special syntax:

```html
[(ngModel)]
```

This syntax combines:

- Property Binding `[]`
- Event Binding `()`

and is often called **"banana in a box"**.

---

## Example

### Component

```ts
name = "";
ngDoCheck(){
    console.log(this.name); 
  }
```

### Template

```html
<input [(ngModel)]="name" />

<p>Hello {{ name }}</p>
```

As the user types:

```
Ahmed
```

the paragraph automatically becomes:

```
Hello Ahmed
```

No extra event handling is required.

---

# Enabling `ngModel`

To use `[(ngModel)]`, import `FormsModule`.

For standalone components:

```ts
import { FormsModule } from "@angular/forms";

@Component({
  imports: [FormsModule]
})
```

Without `FormsModule`, Angular will not recognize `ngModel`.

---

# Data Binding Summary

| Type               | Syntax              | Direction            | Example                     |
| ------------------ | ------------------- | -------------------- | --------------------------- |
| Text Interpolation | `{{ value }}`       | Component → Template | `{{ title }}`               |
| Property Binding   | `[property]`        | Component → Template | `[src]="imageUrl"`          |
| Attribute Binding  | `[attr.name]`       | Component → Template | `[attr.role]="role"`        |
| Class Binding      | `[class.className]` | Component → Template | `[class.active]="isActive"` |
| `ngClass`          | `[ngClass]`         | Component → Template | Dynamic multiple classes    |
| Style Binding      | `[style.property]`  | Component → Template | `[style.color]="color"`     |
| `ngStyle`          | `[ngStyle]`         | Component → Template | Dynamic multiple styles     |
| Event Binding      | `(event)`           | Template → Component | `(click)="save()"`          |
| Two-Way Binding    | `[(ngModel)]`       | Both directions      | `[(ngModel)]="name"`        |

---

# When Should You Use Each Type?

- **Text Interpolation (`{{ }}`)** → Display text or values.
- **Property Binding (`[]`)** → Set HTML element properties like `src`, `disabled`, or `value`.
- **Attribute Binding (`attr.`)** → Set attributes that don't have DOM properties.
- **Class Binding / `ngClass`** → Dynamically add or remove CSS classes.
- **Style Binding / `ngStyle`** → Dynamically change CSS styles.
- **Event Binding (`()`)** → Respond to user actions like clicks or keyboard input.
- **Two-Way Binding (`[(ngModel)]`)** → Keep form inputs synchronized with component data.

---

# Example Combining Multiple Bindings

### Component

```ts
export class AppComponent {
  title = "Angular";
  imageUrl = "assets/logo.png";
  isDisabled = false;

  greet() {
    console.log("Hello!");
  }
}
```

### Template

```html
<h1>{{ title }}</h1>

<img [src]="imageUrl" />

<button [disabled]="isDisabled" (click)="greet()">Click Me</button>
```

This example demonstrates:

- **Interpolation** to display text.
- **Property Binding** to set the image source.
- **Property Binding** to control the button state.
- **Event Binding** to respond to user interaction.
