# Task: Build a Shopping Cart Application Using Angular Signals

## Description

In this task, you will build a simple **Shopping Cart application**
using **Angular Signals** for state management.

The goal of this task is to practice using Angular Signals to create a
reactive application where the UI automatically updates whenever the
application state changes.

You will use Angular Signals to manage the cart state and implement
adding products, removing products, calculating totals, and tracking
changes.

The application should demonstrate the usage of:

-   `signal()` to create reactive state.
-   `set()` to replace signal values.
-   `update()` to modify existing state.
-   `computed()` to create derived values.
-   `effect()` to handle side effects when state changes.

------------------------------------------------------------------------

# Requirements

## 1. Create Product Model

Create a Product interface that represents a product item.

Each product should contain:

-   `id`: unique identifier.
-   `name`: product name.
-   `price`: product price.

Example:

``` ts
interface Product {
  id: number;
  name: string;
  price: number;
}
```

------------------------------------------------------------------------

## 2. Create Cart Signal

Create a signal to store the products added to the cart.

Example:

``` ts
cart = signal<Product[]>([]);
```

The cart should initially be empty.

------------------------------------------------------------------------

## 3. Add Products to Cart

Create a list of available products.

Add an **Add To Cart** button beside each product.

When the user clicks the button:

-   Add the selected product to the cart.
-   Use `update()` to modify the cart state.

------------------------------------------------------------------------

## 4. Display Cart Items

Display all products added to the cart.

Each item should display:

-   Product name.
-   Product price.
-   Remove button.

Use Angular `@for` syntax to render the cart items.

Example:

``` html
@for(product of cart(); track product.id) {

}
```

If the cart is empty, display:

    Your cart is empty

------------------------------------------------------------------------

## 5. Remove Product From Cart

Add a **Remove** button for each cart item.

When clicked:

-   Remove the selected product from the cart.
-   Use `update()` to create the new cart array.

------------------------------------------------------------------------

## 6. Calculate Cart Total

Create a computed signal that calculates the total price of all
products.

Example:

``` ts
totalPrice = computed(() =>
  this.cart().reduce((sum, product) => sum + product.price, 0)
);
```

Display the total price in the template.

The value should automatically update when products are added or
removed.

------------------------------------------------------------------------

## 7. Clear Cart

Add a **Clear Cart** button.

When clicked:

-   Remove all products from the cart.
-   Use `set()` to reset the cart state.

Example:

``` ts
this.cart.set([]);
```

------------------------------------------------------------------------

## 8. Add Effect

Create an effect that runs whenever the cart changes.

The effect should print the number of products currently in the cart.

Example output:

    Cart items count: 3

------------------------------------------------------------------------

# UI Requirements

The final application should contain:

-   Products list.
-   Add To Cart buttons.
-   Cart section.
-   Remove buttons.
-   Total price display.
-   Clear Cart button.

------------------------------------------------------------------------

# Learning Objectives

After completing this task, students should understand:

-   How to manage application state using Angular Signals.
-   How to update arrays inside signals using immutable patterns.
-   The difference between `set()` and `update()`.
-   How `computed()` creates reactive derived values.
-   How `effect()` responds to signal changes.
-   How Angular automatically updates the UI using Signals.
