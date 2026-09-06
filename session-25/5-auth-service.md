# Angular Authentication with HttpClient, JWT, Interceptors and File Upload

# Introduction

Most Angular applications communicate with a backend API to:

* Register users
* Login users
* Upload files
* Fetch protected data
* Manage authentication

The typical authentication flow looks like this:

```text
User Login
    ↓
Angular Sends Request
    ↓
Backend Verifies Credentials
    ↓
Backend Returns JWT Token
    ↓
Token Stored In Browser
    ↓
Token Sent With Future Requests
    ↓
Backend Verifies Token
    ↓
Protected Data Returned
```

---

# Step 1: Enable HttpClient

Angular does not provide HttpClient automatically.

It must be registered inside `app.config.ts`.

```ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};
```

Why?

Without `provideHttpClient()` Angular cannot inject:

```ts
HttpClient
```

and any HTTP request will fail.

---

# Step 2: Understanding CORS

Sometimes Angular shows:

```text
Access to XMLHttpRequest has been blocked by CORS policy
```

Example:

```text
Angular:
http://localhost:4200

Backend:
http://localhost:5000
```

The browser considers these different origins.

For security reasons the backend must explicitly allow Angular.

---

## Fixing CORS in Express

Install:

```bash
npm install cors
```

Import:

```js
const cors = require('cors');
```

Enable:

```js
app.use(
  cors({
    origin: 'http://localhost:4200'
  })
);
```

Now requests coming from Angular are allowed.

---

# Step 3: Creating AuthService

Generate:

```bash
ng g s services/auth-service
```

The AuthService becomes responsible for:

* Login
* Register
* Logout
* Authentication checks

---

## Injecting HttpClient

```ts
private httpClient = inject(HttpClient);
```

Modern Angular allows dependency injection using:

```ts
inject()
```

instead of constructor injection.

---

# Step 4: Sign In Request

```ts
export class AuthService {

  private baseUrl =
    'http://localhost:5000/api/v1/auth';

  private httpClient =
    inject(HttpClient);

  signin(credentials: {
    email: string;
    password: string;
  }) {

    return this.httpClient
      .post<any>(
        `${this.baseUrl}/signin`,
        credentials
      )
      .pipe(
        tap((res) => {
          localStorage.setItem(
            'token',
            res.token
          );
        }),
        catchError(this.handleError)
      );
  }
}
```

---

## What Happens Here?

User enters:

```ts
{
  email: 'john@gmail.com',
  password: '123456'
}
```

Angular sends:

```http
POST /signin
```

with:

```json
{
  "email": "john@gmail.com",
  "password": "123456"
}
```

Backend verifies credentials.

If successful:

```json
{
  "token": "JWT_TOKEN"
}
```

The token is stored:

```ts
localStorage.setItem(
  'token',
  res.token
);
```

---

# Understanding tap()

`tap()` allows executing side effects.

```ts
tap((res) => {
  localStorage.setItem(
    'token',
    res.token
  );
})
```

The response continues unchanged.

It is commonly used for:

* Saving tokens
* Logging
* Analytics

---

# Step 5: Handling Errors

Example:

```ts
private handleError = (
  error: HttpErrorResponse
) => {

  let errorMessage =
    'An unknown error occurred!';

  if (
    error.error instanceof ErrorEvent
  ) {

    errorMessage =
      `Error: ${error.error.message}`;

  } else {

    errorMessage =
      error.error?.message ||
      `Error Code: ${error.status}
Message: ${error.message}`;

  }

  return throwError(
    () => new Error(errorMessage)
  );
};
```

---

## Client Error

Example:

```text
No Internet Connection
```

or

```text
Network Failure
```

Handled by:

```ts
error.error instanceof ErrorEvent
```

---

## Server Error

Example:

```json
{
  "message": "Invalid Password"
}
```

Handled by:

```ts
error.error?.message
```

---

# Why Move Error Handling to an Interceptor?

Imagine:

```ts
signin()
signup()
getCourses()
deleteCourse()
updateCourse()
```

Every method contains:

```ts
catchError(...)
```

This becomes repetitive.

Instead we use an interceptor.

---

# Step 6: Error Interceptor

Generate:

```bash
ng g interceptor interceptors/errorHandle
```

```ts
import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import {
  catchError,
  throwError
} from 'rxjs';

export const errorHandleInterceptor:
HttpInterceptorFn =
(req, next) => {

  return next(req).pipe(

    catchError(
      (error: HttpErrorResponse) => {

        let errorMessage =
          'An unknown error occurred!';

        if (
          error.error instanceof ErrorEvent
        ) {

          errorMessage =
            `Error: ${error.error.message}`;

        } else {

          errorMessage =
            error.error?.message ||
            `Error Code: ${error.status}
Message: ${error.message}`;

        }

        return throwError(
          () => new Error(errorMessage)
        );
      }
    )

  );
};
```

Register:

```ts
provideHttpClient(
  withInterceptors([
    errorHandleInterceptor
  ])
);
```

Now every HTTP request automatically uses this interceptor.

---

# Step 7: Sign In Component

```ts
export class SigninForm {

  @ViewChild('loginForm')
  login!: NgForm;

  authService =
    inject(AuthService);

  errorMessage =
    signal('');

  onSubmit() {

    this.errorMessage.set('');

    this.authService
      .signin(this.login.value)
      .subscribe({

        next: (res) => {

          console.log(res);

          this.login.reset();

        },

        error: (err) => {

          this.errorMessage.set(
            'Failed to login, Please try again later.'
          );

          console.error(err);
        }

      });
  }
}
```

---

## Display Error

```html
@if(errorMessage()) {
  <div class="error-message">
    *{{errorMessage()}}
  </div>
}
```

---

# Step 8: Checking Login Status

Install:

```bash
npm i jwt-decode
```

Import:

```ts
import { jwtDecode } from 'jwt-decode';
```

---

## Why Decode JWT?

A JWT contains:

```json
{
  "id": "123",
  "email": "john@gmail.com",
  "exp": 1750000000
}
```

The `exp` value is the expiration date.

---

## isLoggedIn()

```ts
isLoggedIn() {

  const token =
    localStorage.getItem('token');

  if (!token) {
    return false;
  }

  try {

    const decoded =
      jwtDecode<any>(token);

    const expirationDate =
      new Date(decoded.exp * 1000);

    if (
      expirationDate <
      new Date()
    ) {

      localStorage.removeItem(
        'token'
      );

      return false;
    }

    return true;

  } catch {

    localStorage.removeItem(
      'token'
    );

    return false;
  }
}
```

---

## Using It

```ts
authService =
  inject(AuthService);

ngOnInit() {

  console.log(
    this.authService.isLoggedIn()
  );

}
```

---

# Step 9: Logout

```ts
logout() {
  localStorage.removeItem(
    'token'
  );
}
```

The user becomes unauthenticated immediately.

---

# Step 10: Sign Up

Unlike login, registration often includes images.

For files we use:

```ts
FormData
```

instead of JSON.

---

## Service Method

```ts
signup(userData: FormData) {

  return this.httpClient
    .post<any>(
      `${this.baseUrl}/signup`,
      userData
    )
    .pipe(

      tap((res) => {

        localStorage.setItem(
          'token',
          res.token
        );

      })

    );
}
```

---

# Step 11: Selecting a File

HTML:

```html
<input
  type="file"
  accept="image/*"
  (change)="onFileSelected($event)"
>
```

---

## Why This Fails?

```ts
event.target?.files[0]
```

TypeScript knows:

```ts
event.target
```

could be many element types.

Not all elements contain:

```ts
files
```

---

## Correct Solution

```ts
fileSelected: File | null = null;

onFileSelected(event: Event) {

  const input =
    event.target as HTMLInputElement;

  if (
    input.files &&
    input.files.length > 0
  ) {

    this.fileSelected =
      input.files[0];

  }
}
```

---

# Step 12: Creating FormData

```ts
const formData =
  new FormData();
```

Append text:

```ts
formData.append(
  'firstName',
  formValues.firstName
);
```

Append image:

```ts
formData.append(
  'imageUrl',
  this.fileSelected
);
```

Result:

```text
Multipart Form Data
├── firstName
├── lastName
├── email
├── password
├── phone
└── imageUrl
```

---

# Step 13: Resetting File Inputs

Unlike normal inputs:

```ts
form.reset()
```

does not clear:

```html
<input type="file">
```

So we manually clear it.

```ts
this.fileInput.nativeElement.value = '';
```

---

# Step 14: Sending JWT With Every Request

After login:

```ts
localStorage
  .getItem('token');
```

returns:

```text
eyJhbGciOi...
```

Protected routes require:

```http
Authorization: Bearer TOKEN
```

Instead of manually adding it everywhere, use an interceptor.

---

# Step 15: Authentication Interceptor

Generate:

```bash
ng g interceptor interceptors/auth
```

```ts
import {
  HttpInterceptorFn
} from '@angular/common/http';

export const authInterceptor:
HttpInterceptorFn =
(req, next) => {

  const token =
    localStorage.getItem('token');

  if (!token) {
    return next(req);
  }

  const clonedReq =
    req.clone({

      setHeaders: {
        Authorization:
          `Bearer ${token}`
      }

    });

  return next(clonedReq);
};
```

---

# Register Interceptors

```ts
provideHttpClient(
  withInterceptors([
    authInterceptor,
    errorHandleInterceptor
  ])
);
```

---

# Complete Authentication Flow

```text
User Login
      │
      ▼
POST /signin
      │
      ▼
Backend Returns JWT
      │
      ▼
Token Saved In LocalStorage
      │
      ▼
User Requests Protected Data
      │
      ▼
Auth Interceptor Reads Token
      │
      ▼
Authorization Header Added
      │
      ▼
Request Sent To Backend
      │
      ▼
Backend Verifies Token
      │
      ▼
Data Returned
```

# Summary

You learned how to:

* Configure HttpClient
* Fix CORS errors
* Create an AuthService
* Handle HTTP errors
* Use HTTP Interceptors
* Implement Login
* Store JWT tokens
* Check authentication status
* Logout users
* Upload files with FormData
* Send tokens automatically with requests
* Build a complete authentication flow in Angular
