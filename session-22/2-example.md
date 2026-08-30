# Angular Component Communication Task

# Task: User Management System

---

# Task Description

You are required to build a simple **User Management System** using Angular.

The main goal of this task is to practice **Component Communication** between a Parent Component and a Child Component.

In this application, we will have:

- `UserPageComponent` → Parent Component
- `UserCardComponent` → Child Component


The Parent Component will be responsible for:

- Managing users data.
- Displaying all users.
- Receiving events from the child component.
- Removing users from the list.


The Child Component will be responsible for:

- Receiving user information from the parent.
- Displaying user details.
- Sending an event to the parent when the user clicks Delete.


---

# Concepts Required

You must use the following Angular concepts:


## 1. Parent → Child Communication

The parent component sends data to the child component.

Use:
```ts
input()
```

Example:

```
UserPageComponent
        |
        |
        ▼
UserCardComponent
```
The parent sends a user object, and the child displays it.

## 2. Child → Parent Communication
The child component sends an event to the parent component.

Example:
When the user clicks Delete:

```
UserCardComponent
        |
        |
        ▼
UserPageComponent
```

Use:
```ts
output()
```
The child should send the deleted user's id to the parent.

## 3. Content Projection
Use:
```html
<ng-content></ng-content>
```
The child component should allow the parent to pass custom content.

Example:
```html
<app-user-card>
    User Information
</app-user-card>
```

---

# Application Scenario
Imagine we are building a small Admin Dashboard.
The dashboard contains users:

```
Users
--------------------
Ahmed
Role: Admin
Delete Button

--------------------
Sara
Role: User
Delete Button
--------------------
```

When the Delete button is clicked:
1. `UserCardComponent` sends the user id.
2. `UserPageComponent` receives the event.
3. The parent removes the user.
4. Angular updates the UI.

---

# Required Components
Create only two components:

```
src/app
├── user-page
│      ├── user-page.component.ts
│      └── user-page.component.html
└── user-card
       ├── user-card.component.ts
       └── user-card.component.html
```

---

# Solution

## Step 1: Create Components
Run:
```bash
ng generate component user-page
ng generate component user-card
```

Angular will create:
- TypeScript file
- HTML file
- CSS file
- Spec file

## Step 2: Create User Model
Create a folder:
`src/app/models`

Create file:
`user.ts`

**`user.ts`**
```ts
export interface User {
  id: number;
  name: string;
  role: string;
}
```

This interface defines the shape of our user object.
Example:
```json
{
 "id": 1,
 "name": "Ahmed",
 "role": "Admin"
}
```

## Step 3: Create UserCardComponent

### Responsibility
`UserCardComponent` is the child component.
It should:
- Receive user data from the parent.
- Display user information.
- Notify parent when Delete is clicked.

**`user-card.component.ts`**
```ts
import { Component, input, output } from '@angular/core';
import { User } from '../models/user';

@Component({
 selector: 'app-user-card',
 templateUrl: './user-card.component.html',
 styleUrl: './user-card.component.css'
})
export class UserCardComponent {

 // Parent --> Child
 user = input.required<User>();

 // Child --> Parent
 deleteUser = output<number>();

 removeUser(){
   this.deleteUser.emit(
      this.user().id
   );
 }

}
```

### Explanation

#### Input Signal
```ts
user = input.required<User>();
```
Means: "The child expects a user object from the parent."
The child reads the value using `user()` because signals are functions.

#### Output Event
```ts
deleteUser = output<number>();
```
Creates a custom event.
When the button is clicked:
```ts
this.deleteUser.emit(this.user().id);
```
The child sends the user id to the parent.

**`user-card.component.html`**
```html
<div class="card">
    <ng-content></ng-content>

    <h3>
        {{user().name}}
    </h3>

    <p>
        Role:
        {{user().role}}
    </p>

    <button (click)="removeUser()">
        Delete
    </button>
</div>
```

## Step 4: Create UserPageComponent

### Responsibility
`UserPageComponent` is the parent component.
It should:
- Store users.
- Send users to child.
- Receive delete event.

**`user-page.component.ts`**
```ts
import { Component } from '@angular/core';
import { User } from '../models/user';

@Component({
 selector: 'app-user-page',
 templateUrl: './user-page.component.html',
 styleUrl: './user-page.component.css'
})
export class UserPageComponent {

 users: User[] = [
  {
   id: 1,
   name: 'Ahmed',
   role: 'Admin'
  },
  {
   id: 2,
   name: 'Sara',
   role: 'User'
  }
 ];

 removeUser(id: number){
  this.users = this.users.filter(
    user => user.id !== id
  );
 }

}
```

### Explanation
The parent owns the data (`users`).
The parent also handles delete via `removeUser()`.

**`user-page.component.html`**
```html
<h1>
Users
</h1>
@for(user of users; trackBy user.id){
<div>
    <app-user-card
        [user]="user"
        (deleteUser)="removeUser($event)"
    >
        <p>
            User Information
        </p>
    </app-user-card>
</div>
}
```

---

# Understanding Key Concepts

## Parent → Child Communication
Parent template:
```html
[user]="user"
```
Sends the user object.

Child:
```ts
user = input.required<User>();
```
Receives it.

**Flow:**
```
UserPageComponent (users array)
       |
       ▼
    [user]
       |
       ▼
UserCardComponent (input())
```

## Child → Parent Communication
Child:
```ts
this.deleteUser.emit(this.user().id);
```
Sends the id.

Parent:
```html
(deleteUser)="removeUser($event)"
```
Receives the event.

**Flow:**
```
UserCardComponent (Delete Button)
       |
       ▼
   output()
       |
       ▼
UserPageComponent (removeUser())
```

## Content Projection
The parent sends custom content:
```html
<app-user-card>
    <p>User Information</p>
</app-user-card>
```

The child displays it using:
```html
<ng-content></ng-content>
```

**Result:**
```
User Information
Ahmed
Role: Admin
[Delete Button]
```

---

# Final Application Flow
```
UserPageComponent 
       |
       |  [user]="user"
       ▼
UserCardComponent
       |
       |  deleteUser.emit(id)
       ▼
UserPageComponent
       |
       |  removeUser()
       ▼
  UI Updated
```

---

# Expected Result

**Initial UI:**
```
Users

Ahmed
Role: Admin
[Delete]

Sara
Role: User
[Delete]
```

**After deleting Ahmed:**
```
Users

Sara
Role: User
[Delete]
```

---

# Student Learning Goals
After completing this task, students should understand:
- ✅ How Parent sends data to Child using `input()`
- ✅ How Child sends events to Parent using `output()`
- ✅ How to create reusable components
- ✅ How to use `<ng-content>` for content projection
- ✅ How Angular components communicate in real projects