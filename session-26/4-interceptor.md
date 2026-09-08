# Angular HTTP Interceptors

# What is an Interceptor?

An interceptor is a function that sits between your Angular application and the backend server.

Whenever an HTTP request is sent or a response is received, the interceptor can inspect, modify, or handle it before it reaches the component or service.

Think of it as a checkpoint for every HTTP request.

```text
Component
    ↓
Service
    ↓
Interceptor
    ↓
Backend API
```

And when the response comes back:

```text
Backend API
    ↓
Interceptor
    ↓
Service
    ↓
Component
```

---

# Why Use Interceptors?

Without interceptors, you may end up repeating the same code in every service.

Example:

```ts
signin() {
  return this.httpClient.post(...).pipe(
    catchError(...)
  );
}
```

```ts
signup() {
  return this.httpClient.post(...).pipe(
    catchError(...)
  );
}
```

```ts
getCourses() {
  return this.httpClient.get(...).pipe(
    catchError(...)
  );
}
```

The same error handling code is repeated everywhere.

Interceptors solve this problem by centralizing common logic.

Common use cases:

- Global error handling
- Adding authentication tokens
- Logging requests
- Showing loading spinners
- Modifying headers
- Request tracking

---

# Types of Interceptors

The two most common interceptors are:

## Error Interceptor

Handles all HTTP errors in one place.

```text
401 Unauthorized
404 Not Found
500 Internal Server Error
Network Errors
```

---

## Authentication Interceptor

Automatically attaches the JWT token to every protected request.

Instead of writing:

```ts
headers: {
  Authorization: `Bearer ${token}`;
}
```

inside every service method, Angular does it automatically.

---

# Creating an Interceptor

Generate an interceptor:

```bash
ng g interceptor interceptors/error-handle
```

Angular creates:

```text
error-handle.interceptor.ts
```

---

# Understanding HttpInterceptorFn

Angular 16+ introduced functional interceptors.

Example:

```ts
export const myInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
```

Parameters:

| Parameter | Description                                  |
| --------- | -------------------------------------------- |
| req       | Current HTTP request                         |
| next      | Sends request to next interceptor or backend |

---

# Request Flow

Suppose we call:

```ts
this.httpClient.get("/courses");
```

Angular executes:

```text
HttpClient
    ↓
Interceptor 1
    ↓
Interceptor 2
    ↓
Backend
```

The response then travels back through the same chain.

---

# Error Handling Interceptor

## Goal

Instead of handling errors inside every service:

```ts
catchError(...)
```

we handle them once globally.

---

# Error Interceptor Code

```ts
import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";

import { catchError, throwError } from "rxjs";

export const errorHandleInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = "An unknown error occurred!";

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage =
          error.error?.message ||
          `Error Code: ${error.status}
             Message: ${error.message}`;
      }

      return throwError(() => new Error(errorMessage));
    }),
  );
};
```

---

# Understanding next(req)

```ts
next(req);
```

means:

```text
Continue sending the request
to the backend.
```

Without it:

```ts
return next(req);
```

the request never leaves Angular.

---

# Understanding catchError()

```ts
catchError(...)
```

runs only if the request fails.

Examples:

```text
404 Not Found
500 Internal Server Error
401 Unauthorized
Network Error
```

---

# Understanding HttpErrorResponse

The error object contains information about the failed request.

Example:

```ts
console.log(error);
```

Output:

```ts
{
  status: 404,
  message: "Not Found"
}
```

---

# Client-Side Errors

Example:

```ts
if (
  error.error instanceof ErrorEvent
)
```

Checks whether the error happened inside the browser.

Examples:

```text
Internet disconnected
DNS failure
Network issue
```

Then:

```ts
error.error.message;
```

provides the browser error message.

---

# Server-Side Errors

If the request reaches the backend:

```ts
else {
  ...
}
```

Examples:

```text
401 Unauthorized
404 Not Found
500 Internal Server Error
```

---

# Building a Custom Error Message

```ts
error.error?.message;
```

Uses the backend error message if it exists.

Example response:

```json
{
  "message": "Course not found"
}
```

Result:

```ts
Course not found
```

---

If the backend does not provide a message:

```ts
`Error Code: ${error.status}
 Message: ${error.message}`;
```

Example:

```ts
Error Code: 404
Message: Not Found
```

---

# Why Use throwError()?

```ts
return throwError(() => new Error(errorMessage));
```

This forwards the error to the component.

Example:

```ts
this.courseService.getAllCourses().subscribe({
  error: (err) => {
    console.log(err.message);
  },
});
```

Output:

```text
Course not found
```

---

# Registering the Error Interceptor

Open:

```ts
app.config.ts;
```

```ts
provideHttpClient(withInterceptors([errorHandleInterceptor]));
```

Now every HTTP request automatically passes through the interceptor.

---

# Authentication Interceptor

## Goal

Automatically attach the JWT token to every request.

Without an interceptor:

```ts
this.httpClient.get(url, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

You would repeat this everywhere.

---

# Authentication Interceptor Code

```ts
import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return next(req);
  }

  const clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(clonedReq);
};
```

---

# Why Read the Token?

```ts
const token = localStorage.getItem("token");
```

Retrieves the JWT token stored after login.

Example:

```text
eyJhbGciOiJIUzI1Ni...
```

---

# Why Check if the Token Exists?

```ts
if (!token)
```

Some requests are public.

Examples:

```text
Login
Register
Public Courses
```

In those cases:

```ts
return next(req);
```

sends the original request unchanged.

---

# Why Clone the Request?

HTTP requests are immutable.

This means:

```ts
req.headers.set(...)
```

is not allowed.

Instead:

```ts
req.clone(...)
```

creates a new modified request.

---

# Adding Authorization Header

```ts
const clonedReq = req.clone({
  setHeaders: {
    Authorization: `Bearer ${token}`,
  },
});
```

Result:

```http
Authorization:
Bearer eyJhbGciOiJIUzI1Ni...
```

---

# Sending the Modified Request

```ts
return next(clonedReq);
```

Now the backend receives:

```http
GET /courses

Authorization:
Bearer eyJhbGciOiJIUzI1Ni...
```

---

# Register Multiple Interceptors

```ts
provideHttpClient(withInterceptors([authInterceptor, errorHandleInterceptor]));
```

---

# Interceptor Execution Order

Requests execute from left to right.

```text
authInterceptor
       ↓
errorHandleInterceptor
       ↓
Backend
```

Response travels back:

```text
Backend
       ↓
errorHandleInterceptor
       ↓
authInterceptor
```

---

# Complete Request Lifecycle

Suppose we call:

```ts
this.courseService.getAllCourses();
```

Flow:

```text
Component
      ↓
Service
      ↓
Auth Interceptor
      ↓
Add JWT Token
      ↓
Error Interceptor
      ↓
Backend API
      ↓
Response
      ↓
Error Interceptor
      ↓
Auth Interceptor
      ↓
Component
```

---

# Benefits of Interceptors

## Error Interceptor

- Centralized error handling
- Less duplicate code
- Cleaner services
- Consistent error messages

---

## Auth Interceptor

- Automatically sends JWT tokens
- No repeated Authorization headers
- Easier maintenance
- Cleaner services

---

# Summary

Interceptors are middleware for HTTP requests and responses.

They run automatically for every request made using HttpClient.

The most common interceptors are:

### Error Interceptor

```ts
errorHandleInterceptor;
```

Responsible for:

- Catching HTTP errors
- Creating friendly messages
- Forwarding errors to components

---

### Auth Interceptor

```ts
authInterceptor;
```

Responsible for:

- Reading JWT tokens
- Adding Authorization headers
- Protecting secured routes

---

Request flow:

```text
Component
    ↓
Service
    ↓
Auth Interceptor
    ↓
Error Interceptor
    ↓
Backend
```
