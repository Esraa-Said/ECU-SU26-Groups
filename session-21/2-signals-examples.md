# Angular Signals - Basic Todo List Example

---

## Project Structure

```text
src/app/
├── app.component.ts
└── app.component.html
```

---

## 1. App Component (TypeScript)

**`src/app/app.component.ts`**
```ts
import { Component, signal, computed, effect } from '@angular/core';

interface Todo {
  id: number;
  title: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent {
  // 1. Writable Signals for state management
  newTodoTitle = signal('');
  todos = signal<Todo[]>([
    { id: 1, title: 'Learn Signals' },
    { id: 2, title: 'Build a basic example' }
  ]);

  // 2. Computed Signal (automatically updates when `todos` changes)
  totalTodos = computed(() => this.todos().length);

  constructor() {
    // 3. Effect (runs automatically whenever `todos` updates)
    effect(() => {
      console.log(`Current todo count: ${this.totalTodos()}`);
    });
  }

  // 4. Input event handler using standard DOM event (replaces ngModel)
  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.newTodoTitle.set(input.value);
  }

  // 5. Add a new item using update() & reset input using set()
  addTodo() {
    const title = this.newTodoTitle().trim();
    if (!title) return;

    const newTodo: Todo = {
      id: Date.now(),
      title: title
    };

    this.todos.update(items => [...items, newTodo]);
    this.newTodoTitle.set(''); // Clear input value in signal
  }

  // 6. Delete item by filtering using update()
  deleteTodo(id: number) {
    this.todos.update(items => items.filter(todo => todo.id !== id));
  }

  // 7. Clear all items using set()
  clearAll() {
    this.todos.set([]);
  }
}
```

---

## 2. App Component Template (HTML)

**`src/app/app.component.html`**
```html
<div style="padding: 20px; font-family: sans-serif;">
  <h1>📝 Simple Todo List (Signals Only)</h1>

  <!-- Standard input using HTML value binding & input event -->
  <input 
    type="text" 
    placeholder="Enter a new todo..." 
    [value]="newTodoTitle()" 
    (input)="onInputChange($event)" 
  />
  <button (click)="addTodo()">Add Todo</button>

  <hr />

  <!-- Displaying computed total -->
  <h3>Total Todos: {{ totalTodos() }}</h3>

  <!-- Render Todo Items -->
  <ul>
    @for (item of todos(); track item.id) {
      <li style="margin-bottom: 8px;">
        <span>{{ item.title }}</span>
        <button (click)="deleteTodo(item.id)" style="margin-left: 10px;">
          Delete
        </button>
      </li>
    } @empty {
      <p>No todos available!</p>
    }
  </ul>

  @if (todos().length > 0) {
    <button (click)="clearAll()">Clear All</button>
  }
</div>
```

---

## Summary of Signals Applied Here

* **`signal(value)`**: Holds state for `newTodoTitle` and the `todos` array.
* **`set(newValue)`**: Replaces a signal's state entirely (e.g., clearing the input field or resetting the array).
* **`update(fn)`**: Updates state based on the previous value (e.g., adding or filtering items).
* **`computed(fn)`**: Computes the total count dynamically (`totalTodos`).
* **`effect(fn)`**: Executes side-effects automatically when tracked signals change (logging to console).
* **Standard DOM Events**: Uses native `[value]` and `(input)` bindings instead of `ngModel`.