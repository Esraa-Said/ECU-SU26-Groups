# Task-1 🎓 School Management System

## 🔹 Step 1: Create a Base Class for All School Members

Define a general class named `Person`.

### 👤 This class should contain:

- Common properties: **name**, **email**, **ID**
- A method that each school role will **customize later**
- Use **private fields** for `email` and `ID`
- Provide **getters and setters** with validation logic for these private fields

---

## 🔹 Step 2: Create the Principal Role

This class should **inherit** from the `Person` class.

### 🧑‍🏫 Principal Responsibilities:

- Can **add** new members (Teachers or Students)
- Can **remove** members
- Can **list** all school members
- Overrides the shared method to describe principal-specific behavior

---

## 🔹 Step 3: Create the Teacher Role

This class should also **inherit** from the `Person` class.

### 📘 Teacher Responsibilities:

- Has a **subject** they teach
- Can **grade students** (store student name and grade)
- Can list all graded students
- Overrides the shared method to describe teacher behavior

---

## 🔹 Step 4: Create the Student Role

This class should **inherit** from the `Person` class.

### 🧑‍🎓 Student Responsibilities:

- Can **enroll** in a subject
- Can **view all enrolled subjects**
- Overrides the shared method to describe student activity

---

## 🔹 Step 5: Create and Use Objects

### 🎯 Actions to Simulate:

- Create instances of **Principal**, **Teacher**, and **Student**
- Principal adds members (Teachers, Students)
- Teacher grades a student
- Student enrolls in subjects
- Store all members in an array and loop through them to call a shared method like `describeRole()`