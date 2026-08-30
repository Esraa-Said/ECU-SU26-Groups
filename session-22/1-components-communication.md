# Component Communication 

## 📌 What is Component Communication?

Angular applications are built using components.

A component often needs to:

* Send data to another component
* Receive data from another component
* Notify another component when something happens
* Display content provided by another component

The most common communication scenarios are:

```text
Parent Component
       │
       ▼
Child Component
```

Angular 22 provides modern APIs for component communication:

1. Input Signals (`input()`)
2. Output Events (`output()`)
3. Content Projection (`ng-content`)

---

# Parent → Child Communication

Used when the parent component wants to pass data to a child component.

Angular 22 recommends using **Input Signals** instead of the old `@Input()` decorator.

---

# 1. Input Signals

## What is `input()`?

An Input Signal allows a child component to receive data from its parent as a signal.

Benefits:

* Reactive
* Signal-based
* Works naturally with computed and effect
* Recommended in Angular 22

---

## Child Component

```ts
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <h3>{{ productName() }}</h3>
  `
})
export class ChildComponent {
  productName = input('');
}
```

---

## Parent Component

```html
<app-child [productName]="selectedProduct"></app-child>
```

```ts
selectedProduct = 'Laptop';
```

---

## How It Works

```text
Parent
   │
   ▼
selectedProduct
   │
   ▼
productName()
   │
   ▼
Child Template
```

Whenever the parent value changes, Angular updates the child automatically.

---

## Example With Object

### Parent

```ts
product = {
  id: 1,
  name: 'Laptop',
  price: 1000
};
```

### Parent Template

```html
<app-product-card [product]="product"></app-product-card>
```

### Child

```ts
import { input } from '@angular/core';

product = input.required<{
  id: number;
  name: string;
  price: number;
}>();
```

### Child Template

```html
<h3>{{ product().name }}</h3>
<p>{{ product().price }}</p>
```

---

# Required Inputs

If an input must always be provided:

```ts
user = input.required<string>();
```

Parent:

```html
<app-user [user]="'Esraa'"></app-user>
```

Angular throws an error if the input is missing.

---

# Old Way: @Input()

Still supported but no longer the preferred approach.

```ts
@Input() productName!: string;
```

Angular 22 projects should prefer:

```ts
productName = input('');
```

---

# Child → Parent Communication

Used when a child component needs to notify its parent about something.

Examples:

* Button clicked
* Item selected
* Form submitted
* User deleted

Angular 22 recommends using `output()`.

---

# 2. Output Events

## What is `output()`?

Creates a custom event that the parent can listen to.

---

## Child Component

```ts
import { Component, output } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <button (click)="notifyParent()">
      Send Event
    </button>
  `
})
export class ChildComponent {

  productClicked = output<string>();

  notifyParent() {
    this.productClicked.emit('Laptop selected');
  }
}
```

---

## Parent Template

```html
<app-child
  (productClicked)="handleClick($event)">
</app-child>
```

---

## Parent Component

```ts
handleClick(message: string) {
  console.log(message);
}
```

---

## Data Flow

```text
Child
   │
emit()
   │
   ▼
Parent Event Handler
```

---

# Example: Delete User

## Child

```ts
deleteUser = output<number>();

removeUser() {
  this.deleteUser.emit(5);
}
```

---

## Parent Template

```html
<app-user
  (deleteUser)="removeUser($event)">
</app-user>
```

---

## Parent Component

```ts
removeUser(id: number) {
  console.log('Delete user', id);
}
```

---

# Event Data ($event)

Any emitted value is available through `$event`.

Child:

```ts
selected = output<string>();

this.selected.emit('Angular');
```

Parent:

```html
<app-child
  (selected)="chooseTechnology($event)">
</app-child>
```

```ts
chooseTechnology(name: string) {
  console.log(name);
}
```

---

# Output Aliases

Sometimes you want a different event name.

```ts
changed = output({
  alias: 'valueChanged'
});
```

Parent:

```html
<app-slider
  (valueChanged)="save()">
</app-slider>
```

---

# Old Way: @Output() + EventEmitter

Still supported.

```ts
@Output()
productClicked =
  new EventEmitter<string>();
```

Modern Angular prefers:

```ts
productClicked = output<string>();
```

---

# Complete Parent ↔ Child Example

## Child Component

```ts
import {
  Component,
  input,
  output
} from '@angular/core';

@Component({
  selector: 'app-product',
  template: `
    <h3>{{ productName() }}</h3>

    <button (click)="buyProduct()">
      Buy
    </button>
  `
})
export class ProductComponent {

  productName = input('');

  buy = output<string>();

  buyProduct() {
    this.buy.emit(this.productName());
  }
}
```

---

## Parent Component

```ts
export class AppComponent {

  selectedProduct = 'Laptop';

  purchase(product: string) {
    alert(`Buying ${product}`);
  }
}
```

---

## Parent Template

```html
<app-product
  [productName]="selectedProduct"
  (buy)="purchase($event)">
</app-product>
```

---

# Content Projection

Sometimes a component should act as a container.

Example:

```html
<app-card>
  <h2>Angular</h2>
  <p>Signal-based framework</p>
</app-card>
```

The card should display whatever content is placed inside it.

This is called Content Projection.

---

# 3. ng-content

## Card Component

```ts
@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent {}
```

---

## Usage

```html
<app-card>
  <h2>Angular 22</h2>
  <p>Content goes here</p>
</app-card>
```

---

## Rendered Result

```html
<div class="card">
  <h2>Angular 22</h2>
  <p>Content goes here</p>
</div>
```

---

# Why Use Content Projection?

Without projection:

```html
<app-card></app-card>
```

The card content would be fixed.

With projection:

```html
<app-card>
  Any HTML
</app-card>
```

The component becomes reusable.

---

# Multiple Content Slots

You can create multiple placeholders.

## Card Component

```html
<div class="card">

  <ng-content
    select="card-title">
  </ng-content>

  <hr>

  <ng-content
    select="card-body">
  </ng-content>

</div>
```

---

## Usage

```html
<app-card>

  <card-title>
    Product Details
  </card-title>

  <card-body>
    Laptop Description
  </card-body>

</app-card>
```

---

## Result

```text
Product Details
-------------------
Laptop Description
```

---

# Default Slot

If Angular finds a plain `ng-content` without `select`, it receives everything that did not match another slot.

```html
<ng-content select="card-title"></ng-content>

<ng-content></ng-content>
```

---

# Fallback Content

You can provide default content.

```html
<ng-content>
  Default Content
</ng-content>
```

If nothing is projected:

```text
Default Content
```

appears automatically.

---

# Communication Summary

| Technique    | Direction                   | Angular 22 Recommendation |
| ------------ | --------------------------- | ------------------------- |
| `input()`    | Parent → Child              | ✅ Recommended             |
| `output()`   | Child → Parent              | ✅ Recommended             |
| `ng-content` | Parent Content → Child View | ✅ Recommended             |
| `@Input()`   | Parent → Child              | ⚠️ Legacy                 |
| `@Output()`  | Child → Parent              | ⚠️ Legacy                 |

---

# When Should You Use Each?

### Use `input()`

When a child needs data from its parent.

```html
<app-user [user]="selectedUser">
```

---

### Use `output()`

When a child needs to notify its parent.

```html
<app-user
  (deleted)="removeUser($event)">
```

---

### Use `ng-content`

When building reusable UI containers.

```html
<app-card>
  Any custom content
</app-card>
```

---

# Angular 22 Best Practice

Prefer:

```ts
user = input<User>();

deleted = output<number>();
```

instead of:

```ts
@Input()
user!: User;

@Output()
deleted =
  new EventEmitter<number>();
```

The signal-based APIs are simpler, more reactive, and align with Angular's modern architecture.
