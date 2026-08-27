# Angular Signals (Angular v22)

## 📌 Introduction

Before Signals, Angular primarily relied on **Zone.js-based Change Detection**.

Whenever an event occurred (click, HTTP request, timer, input event, promise resolution, etc.), Zone.js notified Angular, and Angular ran change detection to determine what needed updating in the UI.

---

# Traditional Change Detection (Zone.js)

## Example

```ts
export class CounterComponent {
  counter = 0;

  increment() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }
}
```

```html
<h1>{{ counter }}</h1>

<button (click)="increment()">Increment</button>
<button (click)="decrement()">Decrement</button>
```

## What Happens?

1. User clicks a button.
2. Zone.js detects the event.
3. Angular starts a change detection cycle.
4. Angular checks bindings.
5. UI updates.

---

## Drawbacks

### Performance

Angular may check many bindings even when only one value changes.

### Bundle Size

Applications must include the Zone.js library.

### Less Explicit Reactivity

Angular knows something changed, but it doesn't know exactly what changed.

---

# Zoneless Angular

Angular v22 supports running applications without Zone.js.

In Zoneless mode, Angular updates the UI only when it knows something changed.

Examples:

✅ Signal updates

✅ Angular event handlers

✅ Input updates

✅ Output events

✅ Manual change detection

---

## Example Without Signals

```ts
export class AppComponent {
  count = 0;

  ngOnInit() {
    setInterval(() => {
      this.count++;
    }, 1000);
  }
}
```

```html
{{ count }}
```

The UI may not update because Angular does not know that `count` changed.

---

## Example With Signals

```ts
count = signal(0);

ngOnInit() {
  setInterval(() => {
    this.count.update(v => v + 1);
  }, 1000);
}
```

```html
{{ count() }}
```

The UI updates automatically because Angular knows exactly which signal changed.

---

# What are Signals?

A Signal is a reactive wrapper around a value.

Angular tracks where signals are used and updates only consumers that depend on them.

```ts
import { signal } from '@angular/core';

count = signal(0);
```

---

# Benefits of Signals

✅ Fine-grained updates

✅ Better performance

✅ Less unnecessary rendering

✅ Explicit reactivity

✅ Smaller bundle size (without Zone.js)

✅ Excellent state management

---

# Creating Signals

## Basic Signal

```ts
count = signal(0);
```

Read the value:

```ts
count();
```

Output:

```text
0
```

---

# Updating Signals

Signals cannot be modified like normal variables.

❌ Wrong

```ts
count = 5;
```

---

## set()

Replaces the entire value.

```ts
count.set(5);
```

### Example

```ts
counter = signal(0);

increment() {
  this.counter.set(this.counter() + 1);
}
```

---

## update()

Creates a new value based on the previous one.

```ts
count.update(value => value + 1);
```

### Example

```ts
counter = signal(0);

increment() {
  this.counter.update(v => v + 1);
}

decrement() {
  this.counter.update(v => v - 1);
}
```

---

# Using Signals in Templates

```ts
counter = signal(0);
```

```html
<h1>{{ counter() }}</h1>
```

Notice the parentheses:

```html
{{ counter() }}
```

Signals are functions.

---

# Signal Consumers

A consumer is anything that reads a signal.

Common consumers:

* Templates
* computed()
* effect()


Example:

```ts
count = signal(0);

doubleCount = computed(() => count() * 2);
```

Here:

```text
count       -> Producer
doubleCount -> Consumer
```

---

# Readonly Signals

Sometimes consumers should be able to read state but not modify it.

---

## Creating Readonly Signals

```ts
private count = signal(0);

readonlyCount = this.count.asReadonly();
```

---

## Service Example

```ts
@Injectable({
  providedIn: 'root'
})
export class CounterStore {

  private readonly _count = signal(0);

  readonly count = this._count.asReadonly();

  increment() {
    this._count.update(v => v + 1);
  }
}
```

Component:

```ts
store = inject(CounterStore);
```

```html
<p>{{ store.count() }}</p>
```

---

## Important Note

Readonly signals prevent:

```ts
store.count.set(10);
```

But they do NOT prevent deep object mutation.

```ts
readonlyUser().name = 'Ahmed';
```

Always treat signal values as immutable.

---

# Signals with Objects

## Creating Object Signals

```ts
user = signal({
  name: 'Esraa',
  age: 24
});
```

---

## Wrong Way

```ts
this.user().age = 30;
```

Why?

Because Angular tracks signal references.

The object reference never changed.

Consumers are not notified.

---

## Correct Way Using set()

```ts
this.user.set({
  ...this.user(),
  age: 30
});
```

---

## Correct Way Using update()

```ts
this.user.update(user => ({
  ...user,
  age: 30
}));
```

---

# Signals with Arrays

```ts
users = signal(['Ahmed', 'Sara']);
```

---

## Wrong Way

```ts
this.users().push('Esraa');
```

Why?

Because the array reference remains the same.

Angular never receives:

```ts
users.set(...)
```

or

```ts
users.update(...)
```

Therefore consumers are not notified.

---

## Correct Way Using set()

```ts
this.users.set([
  ...this.users(),
  'Esraa'
]);
```

---

## Correct Way Using update()

```ts
this.users.update(users => [
  ...users,
  'Esraa'
]);
```

---

# Computed Signals

Computed signals derive values from other signals.

Characteristics:

* Readonly
* Reactive
* Cached (Memoized)
* Automatically updated

---

## Example

```ts
count = signal(10);

doubleCount = computed(() => count() * 2);
```

```ts
doubleCount();
```

Output:

```text
20
```

If:

```ts
count.set(20);
```

Then:

```text
40
```

---

## Real Example

```ts
price = signal(100);

quantity = signal(2);

total = computed(() => {
  return price() * quantity();
});
```

```html
<p>Total: {{ total() }}</p>
```

---

## Computed Signals are Readonly

❌ Invalid

```ts
doubleCount.set(100);
```

---

# Computed Signals are Lazy

Computed signals execute only when someone reads them.

```ts
const total = computed(() => {
  console.log('Calculating...');
  return count() * 2;
});
```

Nothing runs until:

```ts
total();
```

---

# Dynamic Dependencies

Angular only tracks signals that were actually read.

Example:

```ts
showCount = signal(false);

count = signal(5);

message = computed(() => {
  if (showCount()) {
    return count();
  }

  return 'Hidden';
});
```

Initially:

```ts
showCount() === false
```

Angular tracks:

```text
showCount
```

Only.

It does NOT track:

```text
count
```

because `count()` was never executed.

---

When:

```ts
showCount.set(true);
```

Angular recalculates the computed.

Now:

```ts
count()
```

is executed.

Angular starts tracking:

```text
showCount
count
```

Both become dependencies.

---

# Effect

Effects execute side effects whenever dependencies change.

Use effects for:

* Logging
* Analytics
* LocalStorage
* Third-party libraries

---

## Example

```ts
count = signal(0);

constructor() {
  effect(() => {
    console.log('Count:', this.count());
  });
}
```

Whenever count changes:

```ts
this.count.set(5);
```

Effect runs again.

---

# Effect Dependency Tracking

```ts
effect(() => {
  console.log(this.count());
});
```

Angular automatically tracks:

```text
count
```

No subscriptions needed.

---

# Effects Run Reactively

```ts
count = signal(0);

effect(() => {
  console.log('Effect:', count());
});

count.set(1);

console.log('After Set');
```

Output order may be:

```text
After Set
Effect: 1
```

Effects execute as part of Angular's reactivity system.

---

# Avoid Updating Signals Inside Effects

❌ Bad

```ts
effect(() => {
  count.set(count() + 1);
});
```

This may create an infinite loop.

---

# Cleanup

Effects created inside components are automatically destroyed when the component is destroyed.

---

## Manual Cleanup

```ts
const effectRef = effect(
  () => {
    console.log(count());
  },
  {
    manualCleanup: true
  }
);
```

Destroy manually:

```ts
effectRef.destroy();
```

After destruction:

```ts
count.set(100);
```

The effect no longer runs.

---

# Reading Without Tracking (untracked)

Sometimes you need to read a signal without creating a dependency.

```ts
count = signal(0);
user = signal('Esraa');

effect(() => {
  console.log(
    user(),
    untracked(count)
  );
});
```

Dependencies:

```text
user
```

Only.

Changing:

```ts
count.set(10);
```

does not rerun the effect.

Changing:

```ts
user.set('Ahmed');
```

does rerun it.

---

# Input Signals

Angular v22 supports signal-based inputs.

---

## Child Component

```ts
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user',
  template: `<h2>{{ name() }}</h2>`
})
export class UserComponent {

  name = input('');

}
```

---

## Parent Component

```html
<app-user [name]="userName"></app-user>
```

Instead of:

```ts
@Input() name!: string;
```

you use:

```ts
name = input('');
```

and read it as:

```ts
name()
```

---


# Signal APIs Summary

| API            | Writable | Purpose                    |
| -------------- | -------- | -------------------------- |
| signal()       | ✅        | Create reactive state      |
| set()          | ✅        | Replace value              |
| update()       | ✅        | Update from previous value |
| asReadonly()   | ❌        | Expose readonly state      |
| computed()     | ❌        | Derived state              |
| effect()       | N/A      | Side effects               |
| untracked()    | N/A      | Read without tracking      |
| input()        | ❌        | Signal input               |

---

# Signals vs Normal Properties

| Feature              | Normal Property | Signal    |
| -------------------- | --------------- | --------- |
| Reactive             | ❌               | ✅         |
| Dependency Tracking  | ❌               | ✅         |
| Fine-Grained Updates | ❌               | ✅         |
| Computed Values      | ❌               | ✅         |
| Effects              | ❌               | ✅         |
| Zoneless Friendly    | ❌               | ✅         |
| State Management     | Basic           | Excellent |

---

# When Should You Use Signals?

## Use Signals For

* Component state
* UI state
* Counters
* Filters
* Forms state
* Service state
* Shopping carts

---

## Use Computed For

* Totals
* Filtering
* Derived values
* Aggregations

---

## Use Effects For

* Logging
* Analytics
* LocalStorage
* Third-party integrations

---

## Avoid

Using effects to update other signals whenever possible.

Prefer:

```ts
computed()
```



for derived state.
