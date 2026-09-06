# Angular Services & Dependency Injection 


# What is a Service?

A Service is a reusable TypeScript class that contains:

* Business Logic
* Shared Data
* API Calls
* Utility Functions
* State Management

Services help keep components focused on the UI while moving reusable logic into a dedicated place.

> Components display data. Services manage data.

---

# Why Use Services?

Services provide several benefits:

### Reusability

Write logic once and use it anywhere in the application.

### Separation of Concerns

Components handle the UI while services handle the business logic.

### Easier Maintenance

Update logic in one place instead of multiple components.

### Better Testing

Services can be tested independently from components.

---

# Problem Without Services

Imagine a website that contains:

* Header Login Button
* Sidebar Login Button
* Mobile Menu Login Button

Each component contains the same login logic.

```text
HeaderComponent
 └─ login()

SidebarComponent
 └─ login()

MobileMenuComponent
 └─ login()
```

### Problems

* Code duplication
* Difficult maintenance
* Violates the DRY principle
* Increased chance of bugs

---

# Solution: Move Logic to a Service

```ts
import { Service } from '@angular/core';

@Service()
export class AuthService {
  login(email: string, password: string) {
    console.log('User Logged In');
  }
}
```

Now every component can reuse the same login logic.

---

# Creating a Service

Using Angular CLI:

```bash
ng generate service services/auth
```

Angular generates:

```text
auth.service.ts
auth.service.spec.ts
```

---

# Creating a Service with @Service()

Angular v22 introduces the `@Service()` decorator.

```ts
import { Service } from '@angular/core';

@Service()
export class UserService {
  getUsers() {
    return [
      { id: 1, name: 'Ahmed' },
      { id: 2, name: 'Sara' },
    ];
  }
}
```

### What Does @Service() Do?

Angular automatically:

* Registers the service in the root injector.
* Creates a singleton instance.
* Makes it available application-wide.
* Supports tree-shaking.

This behaves similarly to:

```ts
@Injectable({
  providedIn: 'root',
})
export class UserService {}
```

---

# Using a Service

Let's use the service inside a component.

```ts
import { Component, inject } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  template: `
    <button (click)="login()">
      Login
    </button>
  `,
})
export class LoginComponent {
  authService = inject(AuthService);

  login() {
    this.authService.login(
      'test@test.com',
      '123456'
    );
  }
}
```

### Output

```text
User Logged In
```

But where did Angular get the service instance from?

This is where Dependency Injection comes in.

---

# What is Dependency Injection (DI)?

Dependency Injection (DI) is Angular's mechanism for creating and supplying dependencies automatically.

Instead of creating objects manually:

```ts
export class LoginComponent {
  authService = new AuthService();
}
```

Angular creates and provides the service:

```ts
export class LoginComponent {
  authService = inject(AuthService);
}
```

### What Happens Internally?

```text
LoginComponent
       │
       ▼
inject(AuthService)
       │
       ▼
Angular Injector
       │
       ▼
AuthService Instance
```

Angular:

1. Creates the service.
2. Stores it in its injector.
3. Provides it whenever requested.

---

# Why Dependency Injection?

Without DI:

```ts
export class UserComponent {
  authService = new AuthService();
}
```

### Problems

* Tight coupling
* Harder testing
* Manual object creation
* Poor scalability

With DI:

```ts
export class UserComponent {
  authService = inject(AuthService);
}
```

### Benefits

* Loose coupling
* Easier testing
* Better maintainability
* Reusable services
* Angular manages service lifecycle

---

# Constructor Injection vs inject()

Angular supports two ways to inject dependencies.

---

## Constructor Injection

Traditional Angular approach.

```ts
@Component({})
export class LoginComponent {
  constructor(
    private authService: AuthService
  ) {}

  login() {
    this.authService.login(
      'test@test.com',
      '123456'
    );
  }
}
```

### Advantages

* Familiar syntax
* Dependencies are clearly visible

### Limitations

* Requires constructor parameters
* More boilerplate code

---

## inject()

Modern Angular approach.

```ts
import { inject } from '@angular/core';

@Component({})
export class LoginComponent {
  authService = inject(AuthService);

  login() {
    this.authService.login(
      'test@test.com',
      '123456'
    );
  }
}
```

### Advantages

* Cleaner syntax
* No constructor boilerplate
* Works in class fields
* Works in services
* Works in functions
* Recommended in Angular v22

---

# Service Scopes

One of the most important concepts in Angular is understanding service scope.

A service can be:

1. Root Provider
2. Component Provider

---

# Root Provider (Singleton Service)

```ts
import { Service } from '@angular/core';

@Service()
export class CounterService {
  counter = 0;

  increment() {
    this.counter++;
  }
}
```

Angular creates:

```text
ONE INSTANCE
```

for the entire application.

---

## Component A

```ts
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-a',
  template: `
    <button (click)="increment()">
      Increment A
    </button>

    <p>{{ counterService.counter }}</p>
  `,
})
export class ComponentA {
  counterService = inject(CounterService);

  increment() {
    this.counterService.increment();
  }
}
```

---

## Component B

```ts
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-b',
  template: `
    <button (click)="increment()">
      Increment B
    </button>

    <p>{{ counterService.counter }}</p>
  `,
})
export class ComponentB {
  counterService = inject(CounterService);

  increment() {
    this.counterService.increment();
  }
}
```

---

## Result

Initial State:

```text
Component A → 0
Component B → 0
```

Click A:

```text
Component A → 1
Component B → 1
```

Click B:

```text
Component A → 2
Component B → 2
```

### Why?

Because both components use the same service instance.

```text
         CounterService
          counter = 2
               ▲
         ┌─────┴─────┐
         │           │
    ComponentA   ComponentB
```

---

# Component Provider (Separate Service Instance)

Now let's give each component its own service instance.

---

## Component A

```ts
@Component({
  selector: 'app-a',
  providers: [CounterService],
  template: `
    <button (click)="increment()">
      Increment A
    </button>

    <p>{{ counterService.counter }}</p>
  `,
})
export class ComponentA {
  counterService = inject(CounterService);

  increment() {
    this.counterService.increment();
  }
}
```

---

## Component B

```ts
@Component({
  selector: 'app-b',
  providers: [CounterService],
  template: `
    <button (click)="increment()">
      Increment B
    </button>

    <p>{{ counterService.counter }}</p>
  `,
})
export class ComponentB {
  counterService = inject(CounterService);

  increment() {
    this.counterService.increment();
  }
}
```

---

## Result

Initial State:

```text
Component A → 0
Component B → 0
```

Click A:

```text
Component A → 1
Component B → 0
```

Click A Again:

```text
Component A → 2
Component B → 0
```

Click B:

```text
Component A → 2
Component B → 1
```

### Why?

Angular creates a separate service instance for each component.

```text
ComponentA
    │
    ▼
CounterService #1

ComponentB
    │
    ▼
CounterService #2
```

Each component owns its own state.

---

# Real-World Examples

## Root Provider Example

```ts
@Service()
export class AuthService {}
```

Shared by:

```text
Header
Sidebar
Dashboard
Profile
```

All components need access to the same logged-in user.

---

## Component Provider Example

```ts
@Component({
  providers: [WizardService]
})
export class WizardComponent {}
```

Used for:

```text
Multi-step Forms
Wizards
Reusable Widgets
Local State
```

Each component gets independent data.

---

# Summary

## Service

A reusable class that contains business logic and shared data.

---

## Dependency Injection

Angular automatically creates and provides services when requested.

---

## inject()

The recommended Angular v22 approach for injecting dependencies.

---

## Root Provider

```text
One Service Instance
Shared Everywhere
```

Best for:

* Authentication
* User Data
* Shopping Cart
* Application Settings

---

## Component Provider

```text
One Service Instance Per Component
Independent State
```

Best for:

* Wizards
* Multi-step Forms
* Reusable Widgets
* Local Component State

---
