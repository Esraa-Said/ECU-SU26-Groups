# Angular Directives (Angular 22)

# 📌 What is a Directive?

A **Directive** is a feature in Angular that adds behavior to elements or changes how they are displayed.

Directives allow Angular to:

- Modify the appearance of elements.
- Change element behavior.
- Add or remove elements from the DOM.
- Create reusable functionality.

Almost every Angular application uses directives extensively.

---

# Types of Directives

Angular provides four main types of directives:

1. Component Directives
2. Attribute Directives
3. Structural Directives
4. Custom Directives

---

# 1. Component Directive

A component is actually a directive that has its own template.

Every Angular application is built from components.

```ts
@Component({
  selector: "app-user",
  template: `<h2>User Profile</h2>`
})
export class UserComponent {}
```

Usage:

```html
<app-user></app-user>
```

Components combine:

- HTML template
- TypeScript logic
- CSS styles

---

# 2. Attribute Directives

Attribute directives change the appearance or behavior of an existing element without creating or removing it from the DOM.

They only modify the element they are attached to.

## Built-in Attribute Directives

### ngClass

Adds or removes CSS classes dynamically.

```html
<div [ngClass]="{ active: isActive, disabled: !isActive }">
  User
</div>
```

You can also provide an array:

```html
<div [ngClass]="['active', 'shadow']">
  Content
</div>
```



### ngStyle

Applies multiple inline styles dynamically.

```html
<p [ngStyle]="{
  color: textColor,
  'font-size.px': fontSize
}">
  Hello Angular
</p>
```

---

# Class Binding vs ngClass

For Angular 22, prefer **Class Binding** when possible.

Single class:

```html
<div [class.active]="isActive"></div>
```

Multiple classes:

```html
<div [class]="['active', 'disabled']"></div>
```

or

```html
<div [class]="{
  active: isActive,
  disabled: isDisabled
}"></div>
```

Use `ngClass` only when it makes the template easier to read or when working with more complex conditions.

---

# Style Binding vs ngStyle

Single style:

```html
<p [style.color]="textColor"></p>
```

Multiple styles:

```html
<div [style]="{
  color: textColor,
  background: backgroundColor
}">
</div>
```

`ngStyle` provides similar functionality:

```html
<div [ngStyle]="{
  color: textColor,
  background: backgroundColor
}">
</div>
```

For Angular 22, native style bindings are generally preferred.

---

# 3. Structural Directives

Structural directives change the structure of the DOM by creating or removing elements.

Should import `commonModule` 

Examples include:

- `*ngIf`
- `*ngFor`
- `*ngSwitch`

Starting with Angular 17 and continuing in Angular 22, the recommended syntax is the new **Control Flow**:

- `@if`
- `@for`
- `@switch`

These are covered separately in the Control Flow guide.
---

## *ngIf

```ts
isLoggedIn = true;

  userName = "Esraa";

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }
```

```html
<h2>User Status</h2>

<div *ngIf="isLoggedIn">
  <h3>Welcome {{ userName }}</h3>
  <p>You are logged in.</p>

  <button (click)="logout()">
    Logout
  </button>
</div>


<div *ngIf="!isLoggedIn">
  <h3>Please Login</h3>
  <p>You need to login first.</p>

  <button (click)="login()">
    Login
  </button>
</div>
```

---

## *ngFor

```ts
 products = [
    {
      id: 1,
      name: "Laptop",
      price: 1000
    },
    {
      id: 2,
      name: "Phone",
      price: 500
    },
    {
      id: 3,
      name: "Tablet",
      price: 700
    }
  ];
```

```html
<h2>Products List</h2>


<div *ngFor="let product of products">

  <h3>{{ product.name }}</h3>

  <p>
    ID: {{ product.id }}
  </p>

  <p>
    Price: {{ product.price }}
  </p>

  <hr>

</div>
```

```html
<div *ngFor="let product of products; let i = index">

  <h3>
    {{ i + 1 }} - {{ product.name }}
  </h3>

</div>
```


---

## *ngSwitch

```ts
  role = "doctor";
```

```html
<h2>User Role</h2>


<div [ngSwitch]="role">


  <p *ngSwitchCase="'admin'">
    Welcome Admin.
    You can manage the system.
  </p>


  <p *ngSwitchCase="'doctor'">
    Welcome Doctor.
    You can manage patients.
  </p>


  <p *ngSwitchCase="'patient'">
    Welcome Patient.
    You can book appointments.
  </p>


  <p *ngSwitchDefault>
    Unknown Role.
  </p>


</div>
```


---

# 4. Custom Directives

You can create your own directives using `@Directive`.

Example:

```ts
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {}
```

Custom directives are useful for encapsulating reusable DOM behavior across multiple components.

---

# Summary

| Directive Type | Purpose |
|----------------|---------|
| Component | Defines a reusable UI block with its own template |
| Attribute | Changes the appearance or behavior of an existing element |
| Structural | Adds or removes elements from the DOM |
| Custom | Implements reusable custom behavior |

---

# Best Practices for Angular 22

- ✅ Use components to build reusable UI.
- ✅ Prefer native `class` bindings over `ngClass` when possible.
- ✅ Prefer native `style` bindings over `ngStyle` for simple cases.
- ✅ Use the modern Control Flow syntax (`@if`, `@for`, `@switch`) instead of legacy structural directives in new projects.
- ✅ Create custom directives when the same DOM behavior is reused across multiple places.