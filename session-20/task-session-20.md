# Team Manager Application

# 📝 Task Description

## 🎯 Objective

In this task, you will build a **Team Manager Application** using Angular.

The goal is to practice managing component state, handling user interactions, working with forms, and dynamically updating the UI using Angular Control Flow.

You will create an application that allows users to manage a list of team members.

---

# 📌 Application Requirements

Your application should allow users to:

## 1. Display Team Members

Create a team members list where each member contains:

- Name
- Age
- Department
- Availability status

Example:

```text
Name: Ahmed
Age: 28
Department: Development
Status: Available
```

---

## 2. Add New Team Members

Create a form that allows users to add new members.

The form should contain:

- Member name input
- Age input
- Department selection
- Availability checkbox

When the user clicks **Add Member**:

- Validate the entered data.
- Add the new member to the team list.
- Clear the form after adding.

---

## 3. Filter Team Members

Add a department filter.

The user should be able to filter members by:

- All Departments
- Development
- Marketing
- Design

Only members matching the selected department should be displayed.

---

## 4. Change Display Mode

Add a view selector that allows users to switch between:

### Card View

Display each member inside a card containing:

- Name
- Age
- Department
- Availability status
- Toggle button

Example:

```
--------------------
Name: Esraa
Age: 24
Department: Development
Status: Available
--------------------
```

---

### List View

Display members in a simple list format.

Example:

```
Esraa - Development - ✔️
Ahmed - Marketing - ❌
```

---

## 5. Toggle Member Availability

Each member should have a button that changes their status.

Example:

Before:

```text
Available
```

After clicking:

```text
Unavailable
```

---

# 🛠️ Angular Concepts You Must Use

Your solution must include:

## Component State

Create variables to manage:

- Team members
- Departments
- Selected department
- Form data
- Current view mode

---

## Two-Way Binding

Use:

```html
[(ngModel)]
```

for:

- Form inputs
- Dropdown selections
- Checkbox values

---

## Event Binding

Use events such as:

```html
(click)
```

to:

- Add members
- Toggle availability
- Handle user actions

---

## Angular Control Flow

Use Angular 22 built-in control flow:

### Looping

```html
@for
```

to display:

- Departments
- Team members


### Conditional Rendering

```html
@if
```

to:

- Filter members
- Display conditional messages


### Switching Views

```html
@switch
```

to:

- Display Card View
- Display List View

---

# ⭐ Bonus Requirements

Try to improve your application by adding:

- Empty state message when no members exist.
- Empty state message when no members match the filter.
- Better styling for cards.
- Different styles for available/unavailable members.
- Form validation messages.

---

# ✅ Expected Result

After completing this task, your application should behave like a small team management dashboard where users can:

✔ Add team members  
✔ View team members  
✔ Filter members  
✔ Switch between layouts  
✔ Update member status dynamically  

---
