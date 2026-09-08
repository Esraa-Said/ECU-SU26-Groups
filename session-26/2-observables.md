
# 📘 Observables, RxJS Operators & Services

---



# 🔹 1. What is an Observable?

An **Observable** is a stream of data that:
- emits values over time
- is lazy (does nothing until subscribed)
- can emit multiple values
- is used heavily in Angular for reactive programming

### 💡 Think of it as:
> A pipeline that sends values step by step to whoever is listening.

---

# 🧠 2. Angular Services as Producers (IMPORTANT)

In real Angular apps, **services are the main producers of Observables**.

Instead of creating Observables inside components, we:
✔ Put logic in services  
✔ Return Observables  
✔ Keep components clean  

---

## 📦 Step 1: Create a Service

```ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Service()
export class DataService {

  getNumbers$(): Observable<number> {
    return new Observable(observer => {
      observer.next(1);
      observer.next(2);
      observer.next(3);

      observer.complete();
    });
  }

  getUsers$(): Observable<string[]> {
    return new Observable(observer => {
      observer.next(['Ali', 'Sara', 'Omar']);
      observer.complete();
    });
  }
}
```

---

# 📥 3. Consumer (Component)

## 📦 Step 2: Use Service in Component

```ts
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  numbers: number[] = [];
  users: string[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getNumbers();
    this.getUsers();
  }

  getNumbers() {
    this.dataService.getNumbers$().subscribe({
      next: value => {
        this.numbers.push(value);
        console.log('Number:', value);
      },
      complete: () => console.log('Numbers completed')
    });
  }

  getUsers() {
    this.dataService.getUsers$().subscribe({
      next: value => {
        this.users = value;
        console.log('Users:', value);
      }
    });
  }
}
```

---

# 📡 4. Observable Notifications

## ➤ next → emit value

```ts
observer.next(1);
```

## ❌ error → stop stream

```ts
observer.error('Error happened');
```

## ✅ complete → finish stream

```ts
observer.complete();
```

---

# 🔧 5. RxJS Operators (MOST IMPORTANT PART)

Operators are used to transform data inside **pipe()**

---

# 🔗 5.1 pipe()

```ts
observable$.pipe(
  operator1(),
  operator2()
)
```

---

# 🔄 5.2 map() → transform values

## Service example:

```ts
import { map } from 'rxjs/operators';

getNumbers$(): Observable<number> {
  return new Observable(observer => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
  }).pipe(
    map(value => value * 10)
  );
}
```

### Result:

```
10
20
30
```

---

## 💡 Meaning:

> map = تغيير شكل البيانات

---

# 🎯 5.3 filter() → condition control

```ts
import { filter } from 'rxjs/operators';

getNumbers$(): Observable<number> {
  return new Observable(observer => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.next(4);
    observer.complete();
  }).pipe(
    filter(value => value % 2 === 0)
  );
}
```

### Result:

```
2
4
```

---

## 💡 Meaning:

> filter = اختيار البيانات المناسبة فقط

---

# 🔗 5.4 combine operators

```ts
import { map, filter } from 'rxjs/operators';

getNumbers$(): Observable<number> {
  return new Observable(observer => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.next(4);
    observer.complete();
  }).pipe(
    filter(v => v > 1),
    map(v => v * 100)
  );
}
```

### Step by step:

* filter → 2, 3, 4
* map → 200, 300, 400

---

# ⚙️ 6. Full Practical Example (Service + Component + Operators)

---

## 📦 Service

```ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Service()
export class NumberService {

  getProcessedNumbers$(): Observable<number> {
    return new Observable(observer => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.next(4);
      observer.complete();
    }).pipe(
      filter(v => v >= 2),
      map(v => v * 10)
    );
  }
}
```

---

## 📥 Component

```ts
import { Component, OnInit } from '@angular/core';
import { NumberService } from './number.service';

@Component({
  selector: 'app-root',
  template: `
    <h3>Numbers:</h3>
    <div *ngFor="let n of numbers">
      {{ n }}
    </div>
  `
})
export class AppComponent implements OnInit {

  numbers: number[] = [];

  constructor(private numberService: NumberService) {}

  ngOnInit() {
    this.numberService.getProcessedNumbers$().subscribe({
      next: value => this.numbers.push(value),
      complete: () => console.log('Done')
    });
  }
}
```

---

### Output:

```
20
30
40
```

---

# 🧠 7. Observable Mental Model

```
Service (Producer)
      ↓
Observable Stream
      ↓
pipe( map → filter )
      ↓
Component (Subscriber)
```

---

# 📊 8. Key Differences

| Concept    | Role           |
| ---------- | -------------- |
| Service    | Produces data  |
| Observable | Stream         |
| pipe       | transformation |
| map        | change values  |
| filter     | select values  |
| component  | consumes data  |

---

# 🚀 9. Summary

* Angular services are the **best place for Observables**
* Observables are **streams of data**
* Operators are used inside `pipe()`
* `map` transforms data
* `filter` selects data
* Components should only **subscribe and display**

---

# 🎯 Final Tip

> In real Angular apps:
> 👉 Services = logic + Observables
> 👉 Components = UI + subscribe only

---

```
```
