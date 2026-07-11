# JavaScript Fundamentals Assignment

## 📌 Overview

In this assignment, you will apply the JavaScript concepts covered in class by building real-world mini applications and solving algorithmic problems.

The goal is to improve your logical thinking and problem-solving skills rather than simply writing JavaScript syntax.


---

# Challenge 1: ATM Banking System

## Scenario

You are developing the software for an ATM machine. The application should allow users to perform different banking operations after entering the correct PIN.

### Requirements

Store the following information:

- User PIN
- Current Balance
- Selected Operation
- Transaction Amount

The application should allow the user to:

- Withdraw money
- Deposit money
- Check the current balance
- Change the PIN

### Business Rules

- Validate the entered PIN before performing any operation.
- Prevent withdrawing more money than the available balance.
- Deposit amounts must be greater than zero.
- A new PIN must contain exactly four digits.
- Display clear success or error messages for every operation.

### Bonus

Lock the account after three incorrect PIN attempts.

---

# Challenge 2: E-Commerce Checkout System

## Scenario

Build the checkout page for an online shopping website.

The application should calculate the customer's final bill after applying discounts and taxes.

### Requirements

Store the following information:

- Customer Name
- Product Category
- Product Price
- Quantity
- Coupon Code
- Payment Method

### Business Rules

- Calculate the subtotal.
- Apply a discount based on the product category.
- Apply a coupon discount if the coupon is valid.
- Apply an additional discount for eligible payment methods.
- Calculate VAT.
- Display a complete invoice.

### Bonus

If the final price becomes negative after applying discounts, set it to **0**.

---

# Challenge 3: University Student Portal

## Scenario

Develop a simple student grading system for a university portal.

The application should determine whether a student passes or fails based on attendance and grades.

### Requirements

Store the following information:

- Student Name
- Attendance Percentage
- Midterm Score
- Final Exam Score
- Assignment Score
- Tuition Payment Status

### Business Rules

- Students with attendance below the required percentage automatically fail.
- Students with unpaid tuition cannot view their results.
- Calculate the total score.
- Determine the student's letter grade.
- Display the student's academic status.

### Bonus

Display a scholarship eligibility message for outstanding students.

---

# 💻 LeetCode Practice

In addition to the real-world challenges, solve the following LeetCode problems using JavaScript.

## Problem 1: Valid Parentheses

Determine whether a string containing different types of brackets is valid.

🔗 https://leetcode.com/problems/valid-parentheses/

---

## Problem 2: Find the Index of the First Occurrence in a String

Given two strings, return the index of the first occurrence of one string inside the other. If it does not exist, return `-1`.

🔗 https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/

---

# 📤 Submission Instructions

- Write clean and readable JavaScript code.
- Use meaningful variable names.
- Follow the business rules carefully.
- Test your solution with different inputs.
- Print descriptive output using `console.log()`.
- Organize each challenge in a separate file or clearly separate them with comments.