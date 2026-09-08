# 📘 HTTP in Angular (HttpClient Guide)

## 📌 Overview

**HTTP (HyperText Transfer Protocol)** is a communication protocol between a client (browser/app) and a server.

It follows a simple:

> **Request → Response model**

* Client sends an HTTP request
* Server returns an HTTP response

Angular provides a powerful built-in API called **HttpClient** to work with HTTP requests in a reactive way using **RxJS Observables**.

---

# 🌐 HTTP Request Structure

Every HTTP request contains:

## 1. URL (Endpoint)

The server address you are calling:

```
https://api.example.com/users/5
```

---

## 2. HTTP Methods (Verbs)

| Method | Purpose                      |
| ------ | ---------------------------- |
| GET    | Read data                    |
| POST   | Create data                  |
| PUT    | Replace/update full resource |
| PATCH  | Partial update               |
| DELETE | Remove data                  |

---

## 3. Headers

Metadata sent with the request:

```ts
{
  "Content-Type": "application/json",
  "Authorization": "Bearer TOKEN",
  "Accept": "application/json"
}
```

---

## 4. Request Body

Used mainly with POST / PUT / PATCH:

```json
{
  "name": "Ahmed",
  "age": 25
}
```

---

# 📥 HTTP Response Structure

A server response contains:

* **Status Code**

  * `200 OK`
  * `201 Created`
  * `400 Bad Request`
  * `404 Not Found`
  * `500 Server Error`

* **Headers**

* **Body** (JSON / text / blob / etc.)

---

# ⚙️ Setting Up HttpClient (Angular v22)

## ✅ Provide HttpClient (Standalone / Modern Angular)

In `app.config.ts`:

```ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient()
  ]
};
```

---

## 🧠 Using DI (Dependency Injection)

```ts
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Service()
export class ConfigService {
  private http = inject(HttpClient);

  getConfig() {
    return this.http.get('/api/config');
  }
}
```

---

# 🚀 Making HTTP Requests

HttpClient methods return **Observables** → you must subscribe.

---

# 📡 1. GET Request (Read Data)

```ts
this.http.get<any[]>('https://api.example.com/users')
  .subscribe({
    next: (data) => console.log(data),
    error: (err) => console.error(err)
  });
```

---

## Typed GET (Best Practice)

```ts
interface User {
  id: number;
  name: string;
}

this.http.get<User[]>('/api/users')
```

⚠️ Angular does NOT validate the type at runtime.

---

# ✍️ 2. POST Request (Create Data)

```ts
this.http.post('/api/users', {
  name: 'Sara',
  age: 22
}).subscribe(res => {
  console.log('Created:', res);
});
```

---

# 🔁 3. PUT / PATCH / DELETE

```ts
this.http.put('/api/users/1', { name: 'Updated Name' });

this.http.patch('/api/users/1', { age: 30 });

this.http.delete('/api/users/1');
```

---

# ⚙️ Request Options (Important)

## 🔹 Headers

```ts
import { HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders({
  Authorization: 'Bearer TOKEN'
});

this.http.get('/api/data', { headers });
```

---

## 🔹 Query Params

```ts
this.http.get('/api/users', {
  params: {
    page: '1',
    limit: '10'
  }
});
```

---

## 🔹 HttpParams (Advanced)

```ts
import { HttpParams } from '@angular/common/http';

const params = new HttpParams()
  .set('page', '1')
  .set('filter', 'all');

this.http.get('/api/users', { params });
```

---



# ❗ Error Handling

All errors come as:

```ts
HttpErrorResponse
```

## Example:

```ts
this.http.get('/api/users').subscribe({
  next: data => console.log(data),
  error: err => {
    console.log('Status:', err.status);
    console.log('Message:', err.message);
  }
});
```

---

## 🔁 Retry Example (RxJS)

```ts
import { retry } from 'rxjs';

this.http.get('/api/data')
  .pipe(retry(2))
  .subscribe();
```

---


## 🔹 Interceptors

```ts
provideHttpClient(
  withInterceptors([myInterceptor])
);
```

Used for:

* Auth tokens
* Logging
* Error handling
* Request modification

---

