# Angular Lifecycle Hooks 

## 📌 What are Lifecycle Hooks?

Angular Lifecycle Hooks are special methods that allow you to execute code at specific moments during a component's life.

A component goes through several phases:

```text
Create Component
       ↓
Initialize Inputs
       ↓
Render Template
       ↓
Detect Changes
       ↓
Update UI
       ↓
Destroy Component
```

Lifecycle hooks let you run logic during these phases.

Common use cases:

* Fetch data from APIs
* React to input changes
* Access DOM elements
* Work with projected content
* Start and stop timers
* Cleanup subscriptions

---

# Lifecycle Overview

| Phase               | Hook                  | Purpose                       |
| ------------------- | --------------------- | ----------------------------- |
| Creation            | constructor           | Component instance creation   |
| Initialization      | ngOnChanges           | Input values changed          |
| Initialization      | ngOnInit              | Component initialization      |
| Change Detection    | ngDoCheck             | Custom change detection       |
| Content Projection  | ngAfterContentInit    | Projected content initialized |
| Content Projection  | ngAfterContentChecked | Projected content checked     |
| View Initialization | ngAfterViewInit       | Component view initialized    |
| View Initialization | ngAfterViewChecked    | Component view checked        |
| Rendering           | afterNextRender       | Run once after rendering      |
| Rendering           | afterEveryRender      | Run after every render        |
| Destruction         | ngOnDestroy           | Cleanup before destruction    |

---

# Execution Order

## Initial Component Creation

```text
constructor
    ↓
ngOnChanges
    ↓
ngOnInit
    ↓
ngDoCheck
    ↓
ngAfterContentInit
    ↓
ngAfterContentChecked
    ↓
ngAfterViewInit
    ↓
ngAfterViewChecked
    ↓
afterNextRender
    ↓
afterEveryRender
```

---

## After Updates

When Angular detects changes:

```text
ngOnChanges (if inputs changed)
    ↓
ngDoCheck
    ↓
ngAfterContentChecked
    ↓
ngAfterViewChecked
    ↓
afterEveryRender
```

---

# Demo Example

## Parent Component

### app.component.ts

```ts
import { Component } from '@angular/core';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChildComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {

  message = 'Hello From Parent';
  visible = true;

  toggle() {
    this.visible = !this.visible;
  }

  updateMessage() {
    this.message = 'Message Updated';
  }
}
```

### app.component.html

```html
@if (visible) {
  <app-child [message]="message">

    <p #projectedContent>
      Content Projection Example
    </p>

  </app-child>
}

<button (click)="updateMessage()">
  Update Input
</button>

<button (click)="toggle()">
  Destroy Child
</button>
```

---

# Child Component

## child.component.ts

```ts
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  SimpleChanges,
  ContentChild,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  templateUrl: './child.component.html'
})
export class ChildComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy {

  @Input() message = '';

  @ContentChild('projectedContent')
  projectedContent!: ElementRef;

  @ViewChild('paragraph')
  paragraph!: ElementRef;

  constructor() {
    console.log('constructor');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges', changes);
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  ngDoCheck() {
    console.log('ngDoCheck');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit');
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }
}
```

### child.component.html

```html
<h3>{{ message }}</h3>

<ng-content></ng-content>

<p #paragraph>
  Child Template Element
</p>
```

---

# constructor()

## Purpose

Runs when Angular creates the component instance.

```ts
constructor() {
  console.log('Component Created');
}
```

### Use For

* Dependency Injection
* Basic setup

### Avoid

❌ API calls

❌ DOM access

❌ Input-dependent logic

Inputs are not available yet.

---

# ngOnChanges()

## Purpose

Runs whenever an Input changes.

```ts
@Input() message = '';

ngOnChanges(changes: SimpleChanges) {
  console.log(changes);
}
```

### Example

```ts
ngOnChanges(changes: SimpleChanges) {

  if (changes['message']) {

    console.log(
      changes['message'].previousValue
    );

    console.log(
      changes['message'].currentValue
    );
  }
}
```

### Output

```text
Previous: Hello
Current: Welcome
```

### Notes

* Runs before ngOnInit
* Runs every time an input changes

---

# ngOnInit()

## Purpose

Runs once after Angular initializes component inputs.

```ts
ngOnInit() {
  console.log('Initialized');
}
```

### Common Use Cases

* API calls
* Initial data loading
* Form initialization
* Signal setup

Example:

```ts
ngOnInit() {
  this.loadUsers();
}
```

---

# ngDoCheck()

## Purpose

Runs before every change detection cycle.

```ts
ngDoCheck() {
  console.log('Checking...');
}
```

### Use Cases

Rarely needed.

Used for custom change detection logic.

### Warning

Runs very frequently.

Avoid unless necessary.

---

# ngAfterContentInit()

## Purpose

Runs once after projected content is initialized.

Works with:

```html
<ng-content></ng-content>
```

Example:

```ts
@ContentChild('projectedContent')
projectedContent!: ElementRef;

ngAfterContentInit() {
  console.log(
    this.projectedContent.nativeElement
  );
}
```

---

# ngAfterContentChecked()

## Purpose

Runs every time projected content is checked.

```ts
ngAfterContentChecked() {
  console.log('Content Checked');
}
```

### Warning

Runs frequently.

Avoid expensive logic.

---

# ngAfterViewInit()

## Purpose

Runs once after component view initialization.

Works with:

```ts
@ViewChild()
```

Example:

```ts
@ViewChild('paragraph')
paragraph!: ElementRef;

ngAfterViewInit() {

  console.log(
    this.paragraph.nativeElement
  );
}
```

### Common Uses

* DOM access
* Third-party libraries
* Charts
* Canvas initialization

---

# ngAfterViewChecked()

## Purpose

Runs every time the component view is checked.

```ts
ngAfterViewChecked() {
  console.log('View Checked');
}
```

### Warning

Runs frequently.

Avoid heavy logic.

---

# ngOnDestroy()

## Purpose

Runs before Angular destroys the component.

Angular destroys a component when:

* @if removes it
* Route changes
* Parent removes it

Example:

```ts
ngOnDestroy() {
  console.log('Destroyed');
}
```

---

# Cleaning Subscriptions

Without cleanup:

```ts
subscription!: Subscription;

ngOnInit() {
  this.subscription =
    this.userService.getUsers()
      .subscribe();
}
```

With cleanup:

```ts
ngOnDestroy() {
  this.subscription.unsubscribe();
}
```

---

# Cleaning Timers

```ts
timerId!: number;

ngOnInit() {

  this.timerId = window.setInterval(() => {
    console.log('Running');
  }, 1000);

}
```

```ts
ngOnDestroy() {
  clearInterval(this.timerId);
}
```

---

# DestroyRef (Modern Angular)

Angular 22 provides DestroyRef as an alternative to ngOnDestroy.

```ts
import {
  Component,
  DestroyRef,
  inject
} from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  template: ''
})
export class UserComponent {

  destroyRef = inject(DestroyRef);

  constructor() {

    this.destroyRef.onDestroy(() => {
      console.log('Cleanup');
    });

  }
}
```

### Benefits

* Keep setup and cleanup together
* Useful in helper functions
* Cleaner than large ngOnDestroy methods

---

# afterNextRender()

## Purpose

Runs once after Angular finishes rendering.

```ts
import {
  afterNextRender
} from '@angular/core';

constructor() {

  afterNextRender(() => {
    console.log('DOM Rendered');
  });

}
```

### Use Cases

* DOM measurements
* Scroll operations
* Third-party libraries

---

# afterEveryRender()

## Purpose

Runs after every render.

```ts
import {
  afterEveryRender
} from '@angular/core';

constructor() {

  afterEveryRender(() => {
    console.log('Rendered');
  });

}
```

### Use Cases

* DOM synchronization
* Analytics
* Monitoring rendering

---

# Content vs View

Understanding these hooks becomes easier when you know the difference.

## Content

Passed from parent:

```html
<app-card>

  <p>Projected Content</p>

</app-card>
```

Displayed using:

```html
<ng-content></ng-content>
```

Hooks:

```text
ngAfterContentInit
ngAfterContentChecked
```

---

## View

Defined inside the component template.

```html
<p #paragraph>
  Child Content
</p>
```

Hooks:

```text
ngAfterViewInit
ngAfterViewChecked
```

---

# Lifecycle Hooks Summary

| Hook                  | Runs                | Typical Use               |
| --------------------- | ------------------- | ------------------------- |
| constructor           | Creation            | Dependency Injection      |
| ngOnChanges           | Input changes       | React to inputs           |
| ngOnInit              | Once                | API calls, initialization |
| ngDoCheck             | Every check         | Custom detection          |
| ngAfterContentInit    | Once                | Access projected content  |
| ngAfterContentChecked | Every content check | Monitor projected content |
| ngAfterViewInit       | Once                | Access ViewChild          |
| ngAfterViewChecked    | Every view check    | Monitor view changes      |
| afterNextRender       | Once after render   | DOM operations            |
| afterEveryRender      | Every render        | DOM synchronization       |
| ngOnDestroy           | Before destruction  | Cleanup                   |

---

# Best Practices

✅ Use `ngOnInit` for initialization.

✅ Use `ngOnDestroy` or `DestroyRef` for cleanup.

✅ Use `ngAfterViewInit` when working with `ViewChild`.

✅ Use `ngAfterContentInit` when working with `ContentChild`.

✅ Use `afterNextRender()` for DOM operations.

❌ Avoid heavy work in:

* `ngDoCheck`
* `ngAfterContentChecked`
* `ngAfterViewChecked`

because they run very frequently and may affect performance.
