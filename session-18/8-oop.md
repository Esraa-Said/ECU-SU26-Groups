
# 🧠 Object-Oriented Programming in TypeScript


## 1. What is a Class?

A class is a blueprint for creating objects.

```ts
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): void {
    console.log(`Hi, I am ${this.name} and I am ${this.age} years old.`);
  }
}

const user = new Person("Esraa", 25);
user.greet();
```

---

## 2. Access Modifiers

| Modifier    | Description                             |
|-------------|-----------------------------------------|
| `public`    | Accessible anywhere (default)           |
| `private`   | Only within the same class              |
| `protected` | Class and its children                  |

```ts
class Student {
  public name: string;
  private id: number;
  protected grade: string;

  constructor(name: string, id: number, grade: string) {
    this.name = name;
    this.id = id;
    this.grade = grade;
  }

  getId() {
    return this.id;
  }
}
```

---

## 3. Short-hand Property Declaration

```ts
class Product {
  constructor(public name: string, private price: number) {}

  getPrice() {
    return this.price;
  }
}
```

---



## 5. Getters and Setters

```ts
class BankAccount {
  private _balance: number = 0;


  constructor (balance: number){
    this.balance = balance;
  }

  get balance(): number {
    return this._balance;
  }

  set balance(amount: number) {
    if (amount < 0) throw new Error("Invalid amount");
    this._balance = amount;
  }
}

const acc = new BankAccount(-5);
acc.balance = 500;
console.log(acc.balance); 
```

---

## 6. Inheritance

```ts
// Base User class
class User {
  name: string;
  email: string;
  role: string;

  constructor(name: string, email: string, role: string = "user") {
    this.name = name;
    this.email = email;
    this.role = role;
  }

  login(): void {
    console.log(`${this.name} logged in as ${this.role}`);
  }

  logout(): void {
    console.log(`${this.name} logged out`);
  }
}

// Admin class inherits from User
class Admin extends User {
  constructor(name: string, email: string) {
    super(name, email, "admin");
  }

  deleteUser(user: User): void {
    console.log(`${this.name} deleted user: ${user.name}`);
  }
}

// Customer class inherits from User
class Customer extends User {
  shippingAddress: string;

  constructor(name: string, email: string, shippingAddress: string) {
    super(name, email, "customer");
    this.shippingAddress = shippingAddress;
  }

  placeOrder(item: string): void {
    console.log(`${this.name} ordered: ${item}`);
  }
}

// --- Usage

const admin = new Admin("Sara", "sara@company.com");
admin.login();               // Sara logged in as admin

const customer = new Customer("Omar", "omar@mail.com", "Cairo, Egypt");
customer.login();            // Omar logged in as customer
customer.placeOrder("Laptop");

admin.deleteUser(customer);  // Sara deleted user: Omar

```


---

## 8. Interfaces with Classes

```ts
interface Printable {
  print(): void;
}

class Invoice implements Printable {
  print(): void {
    console.log("Invoice printed");
  }
}
```

---
