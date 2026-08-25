# Team Manager Application

## 📌 Project Overview

The **Team Manager** application demonstrates several important Angular concepts in a practical example:

* Two-Way Data Binding (`ngModel`)
* Event Binding
* Control Flow (`@if`, `@for`, `@switch`)
* Dynamic Forms
* Filtering Data
* Conditional Rendering
* Updating State Dynamically

The application allows users to:

* Add new team members
* Filter members by department
* Switch between Card View and List View
* Toggle member availability

---

# Component Logic

## TypeScript Code

```ts
export class TeamManagerComponent {

  viewMode: 'card' | 'list' = 'card';

  departments = [
    'Development',
    'Marketing',
    'Design'
  ];

  selectedDept = 'All';

  newMember = {
    name: '',
    age: 0,
    department: this.departments[0],
    isAvailable: true
  };

  team = [
    {
      name: 'Esraa',
      age: 24,
      department: 'Development',
      isAvailable: true
    },
    {
      name: 'Ahmed',
      age: 29,
      department: 'Marketing',
      isAvailable: false
    },
    {
      name: 'Laila',
      age: 31,
      department: 'Design',
      isAvailable: true
    }
  ];

  addMember() {
    if (
      this.newMember.name &&
      this.newMember.age &&
      this.newMember.department
    ) {
      this.team.push({ ...this.newMember });

      this.newMember = {
        name: '',
        age: 0,
        department: this.departments[0],
        isAvailable: true
      };
    }
  }

  toggleAvailability(member: any) {
    member.isAvailable = !member.isAvailable;
  }

}
```

---

# Understanding the Component State

## View Mode

Controls how team members are displayed.

```ts
viewMode: 'card' | 'list' = 'card';
```

Possible values:

* `card`
* `list`

Default view:

```ts
'card'
```

---

## Departments

Stores available departments.

```ts
departments = [
  'Development',
  'Marketing',
  'Design'
];
```

Used for:

* Dropdown lists
* Filtering members
* Selecting department while adding a member

---

## Selected Department

Stores the currently selected filter.

```ts
selectedDept = 'All';
```

Examples:

```ts
'All'
'Development'
'Marketing'
'Design'
```

---

## New Member Object

Represents the form data.

```ts
newMember = {
  name: '',
  age: 0,
  department: this.departments[0],
  isAvailable: true
};
```

As the user types in the form, Angular updates this object automatically through `ngModel`.

---

## Team Array

Stores all team members.

```ts
team = [
  {
    name: 'Esraa',
    age: 24,
    department: 'Development',
    isAvailable: true
  }
];
```

Each member contains:

| Property    | Description         |
| ----------- | ------------------- |
| name        | Member name         |
| age         | Member age          |
| department  | Member department   |
| isAvailable | Availability status |

---

# Methods

## addMember()

Adds a new member to the team.

```ts
addMember() {
  if (
    this.newMember.name &&
    this.newMember.age &&
    this.newMember.department
  ) {
    this.team.push({ ...this.newMember });

    this.newMember = {
      name: '',
      age: 0,
      department: this.departments[0],
      isAvailable: true
    };
  }
}
```

### What happens?

1. Validate form data.
2. Add member to the team array.
3. Reset form fields.

### Example

Before:

```ts
team.length = 3
```

After clicking Add:

```ts
team.length = 4
```

---

## toggleAvailability()

Changes member availability.

```ts
toggleAvailability(member: any) {
  member.isAvailable = !member.isAvailable;
}
```

### Example

Before:

```ts
isAvailable = true
```

After clicking Toggle:

```ts
isAvailable = false
```

---

# Template

## Page Title

```html
<h1>👩‍💻 Team Manager</h1>
```

Displays the application title.

---

# View Mode Selection

```html
<select [(ngModel)]="viewMode">
  <option value="card">Card View</option>
  <option value="list">List View</option>
</select>
```

### Concept Used

* Two-Way Binding (`ngModel`)

Updates:

```ts
viewMode
```

automatically whenever the user changes the dropdown.

---

# Department Filter

```html
<select [(ngModel)]="selectedDept">
  <option value="All">All</option>

  @for (dept of departments; track dept) {
    <option [value]="dept">
      {{ dept }}
    </option>
  }
</select>
```

### Concepts Used

* Two-Way Binding
* `@for`
* Property Binding

The selected department is stored in:

```ts
selectedDept
```

---

# Add Member Form

## Name

```html
<input
  [(ngModel)]="newMember.name"
  placeholder="Name">
```

---

## Age

```html
<input
  [(ngModel)]="newMember.age"
  type="number"
  placeholder="Age">
```

---

## Department

```html
<select [(ngModel)]="newMember.department">
  @for (dept of departments; track dept) {
    <option [value]="dept">
      {{ dept }}
    </option>
  }
</select>
```

---

## Availability

```html
<label>
  <input
    type="checkbox"
    [(ngModel)]="newMember.isAvailable">

  Available
</label>
```

---

## Add Button

```html
<button (click)="addMember()">
  Add
</button>
```

### Concept Used

Event Binding

```html
(click)
```

When clicked:

```ts
addMember()
```

is executed.

---

# Display Team Members

```html
<h2>Team Members</h2>
```

---

# Loop Through Members

```html
@for (member of team; track member) {
}
```

### Concept Used

Control Flow

```html
@for
```

Loops through every member inside the team array.

---

# Filtering Members

```html
@if (
  selectedDept === 'All' ||
  member.department === selectedDept
) {
}
```

### Concept Used

Control Flow

```html
@if
```

Shows only members belonging to the selected department.

---

# Switch Between Views

```html
@switch (viewMode) {
}
```

### Concept Used

Control Flow

```html
@switch
```

Changes the layout based on the selected view mode.

---

# Card View

```html
@case ('card') {
  <div class="card">

    <h4>{{ member.name }}</h4>

    <p>Age: {{ member.age }}</p>

    <p>Department: {{ member.department }}</p>

    <p>
      Status:
      {{ member.isAvailable
          ? 'Available'
          : 'Unavailable' }}
    </p>

    <button
      (click)="toggleAvailability(member)">
      Toggle
    </button>

  </div>
}
```

Displays each member inside a styled card.

---

# List View

```html
@case ('list') {
  <ul>
    <li>
      {{ member.name }}
      -
      {{ member.department }}
      -
      <strong>
        {{ member.isAvailable ? '✔️' : '❌' }}
      </strong>

      <button
        (click)="toggleAvailability(member)">
        Toggle
      </button>
    </li>
  </ul>
}
```

Displays members as a simple list.

---

# Styling

## Card Design

```css
.card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 10px;
  background: #f9f9f9;
}
```

### Result

* Rounded corners
* Light background
* Padding around content
* Visual separation between cards

---

# Angular Concepts Used

| Concept            | Example                                 |
| ------------------ | --------------------------------------- |
| Interpolation      | `{{ member.name }}`                     |
| Property Binding   | `[value]="dept"`                        |
| Event Binding      | `(click)="addMember()"`                 |
| Two-Way Binding    | `[(ngModel)]`                           |
| @for               | Looping through departments and members |
| @if                | Filtering members                       |
| @switch            | Switching between Card and List view    |
| Component State    | `team`, `newMember`, `viewMode`         |
| Dynamic UI Updates | Availability Toggle                     |

---

# Learning Outcome

After completing this project, you should understand how to:

* Create and manage component state.
* Use two-way binding with forms.
* Handle user events.
* Add data dynamically.
* Update existing data.
* Filter displayed data.
* Use Angular 22 Control Flow (`@if`, `@for`, `@switch`).
* Build a small real-world CRUD-style interface.