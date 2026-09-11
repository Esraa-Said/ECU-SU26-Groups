# Angular Routing & Route Guards

## Introduction

Routing is one of the most important features in Angular. It allows users to navigate between different views without reloading the entire page.

Angular Router:

- Maps URLs to components.
- Supports navigation between pages.
- Supports route parameters.
- Supports nested routes.
- Supports route protection using Guards.

---

# Defining Routes

Routes are configured inside `app.routes.ts`.

A route is simply an object that tells Angular:

> When the URL matches this path, render this component.

```ts
import { Routes } from "@angular/router";
import { SigninForm } from "./signin-form/signin-form";
import { SignupForm } from "./signup-form/signup-form";

export const routes: Routes = [
  { path: "signin", component: SigninForm, title: "SignIn" },
  { path: "signup", component: SignupForm, title: "SignUp" },
];
```

---

## Understanding Route

### Normal Route

```ts
{ path: "signin", component: SigninForm,  title: 'SignIn' }
```

When the URL becomes:

```text
/signin
```

Angular displays:

```ts
SigninForm;
```

---

# Router Outlet

Routes alone are not enough.

Angular needs a place where routed components will appear.

That place is:

```html
<router-outlet></router-outlet>
```

---

## Import RouterOutlet

```ts
import { RouterOutlet } from "@angular/router";

@Component({
  imports: [RouterOutlet]
})
```

---

## Place It in the Root Component

```html
<router-outlet></router-outlet>
```

---

## How It Works

Current URL:

```text
/courses
```

Angular looks inside routes:

```ts
{ path: "signin", component: SigninForm,  title: 'SignIn' }
```

Then renders:

```html
<app-signin-form></app-signin-form>
```

inside:

```html
<router-outlet></router-outlet>
```

---

# Home Page

## 1- Courses-List Component

```bash
ng g c courses-list
```

```html
<main class="content-area">
  <div class="section-header">
    <h2>Explore Our Popular Courses</h2>
    <p>
      Start your learning journey today with industry experts and engineers.
    </p>
  </div>

  <div class="courses-grid">
    @for (course of courses(); track course._id) {
    <div class="course-card">
      <div class="course-image-container">
        <img
          [src]="'http://localhost:5000/api/v1/uploads/courses/' + course.imageUrl"
          [alt]="course.title"
          class="course-image"
        />
        <div class="course-badge" [class.free]="course.price === 0">
          {{ course.level }}
        </div>
      </div>

      <div class="course-content">
        <h3 class="course-title">{{ course.title }}</h3>
        <p class="instructor">Instructor: {{ course.instructor }}</p>

        <div class="course-footer">
          @if (course.price === 0) {
          <span class="price free-text">Free</span>
          } @else {
          <span class="price">{{ course.price }}</span>
          }
          <span class="duration">⏱️ {{ course.duration }}</span>
        </div>

        <button class="btn-add-course" (click)="enroll(course._id)">
          Enroll
        </button>
      </div>
    </div>
    } @empty {
    <p class="no-data">No courses are available right now.</p>
    }
  </div>
</main>
```

```css
.content-area {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-header h2 {
  color: #111827;
  font-size: 2rem;
  margin-bottom: 10px;
}

.section-header p {
  color: #6b7280;
  font-size: 1.1rem;
  margin: 0;
}
.courses-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  max-width: 1000px;
  margin: 0 auto;
}

.course-card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.course-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.course-image-container {
  position: relative;
  width: 100%;
  height: 200px;
  background-color: #f3f4f6;
}

.course-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.course-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: #2563eb;
  color: white;
  padding: 6px 14px;
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.course-badge.free {
  background: #10b981;
}

.course-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.course-title {
  color: #1f2937;
  font-size: 1.3rem;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.instructor {
  color: #6b7280;
  font-size: 0.95rem;
  margin: 0 0 20px 0;
}

.course-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f3f4f6;
  padding-top: 15px;
  margin-top: auto;
  font-weight: bold;
}

.price {
  color: #1e3a8a;
  font-size: 1.2rem;
}

.free-text {
  color: #10b981;
}

.duration {
  color: #4b5563;
  font-size: 0.9rem;
  font-weight: normal;
}

.btn-add-course {
  width: 100%;
  margin-top: 20px;
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-add-course:hover {
  background-color: #1d4ed8;
}

@media (max-width: 768px) {
  .courses-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
```

```ts
import { Component, inject, OnInit, signal } from "@angular/core";
import { CourseInterface } from "../interfaces/course-interface";
import { CoursesService } from "../services/courses-service";

@Component({
  selector: "app-course-list",
  imports: [],
  templateUrl: "./courses-list.html",
  styleUrl: "./courses-list.css",
})
export class CoursesList implements OnInit {
  courses = signal<CourseInterface[]>([]);

  courseService = inject(CoursesService);

  errorMessage = signal("");

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        this.courses.set(data);
      },
      error: (err) => {
        this.errorMessage.set(
          "Failed to load courses. Please try again later.",
        );
        console.error(err);
      },
    });
  }

  enroll(courseId: string) {}
}
```

- in `app.routes.ts` file

```ts
import { Routes } from "@angular/router";
import { SigninForm } from "./signin-form/signin-form";
import { SignupForm } from "./signup-form/signup-form";
import { CoursesList } from "./courses-list/courses-list";

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: CoursesList, title: "Home" },
  { path: "signin", component: SigninForm, title: "SignIn" },
  { path: "signup", component: SignupForm, title: "SignUp" },
];
```

If the user visits:

```text
http://localhost:4200/
```

Angular redirects to:

```text
http://localhost:4200/home
```

# Navigation Using RouterLink

## 1- Header Component

### Generate Component

```bash
ng g c header
```

```html
<header class="main-header">
  <div class="header-brand">
    <a href="/home" class="logo">🎓 CoursePlatform</a>
  </div>

  <nav class="navigation">
    <ul class="nav-links">
      <li>
        <a href="/home" class="active-link">Home</a>
      </li>
    </ul>

    <div class="auth-buttons">
      <a href="/signin" class="btn btn-login">Sign In</a>
      <a href="/signup" class="btn btn-signup">Sign Up</a>
    </div>
  </nav>
</header>
```

```css
.main-header {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  padding: 15px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo {
  font-size: 1.4rem;
  font-weight: bold;
  color: #1e3a8a;
  text-decoration: none;
}

.navigation {
  display: flex;
  align-items: center;
  gap: 40px;
}

.nav-links {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover,
.active-link {
  color: #2563eb !important;
}

.auth-buttons {
  display: flex;
  gap: 12px;
  align-items: center;
}

.btn {
  padding: 8px 18px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: all 0.2s;
}

.btn-login {
  background-color: transparent;
  color: #2563eb;
  border: 1px solid #2563eb;
}

.btn-login:hover {
  background-color: #eff6ff;
}

.btn-signup {
  background-color: #2563eb;
  color: white;
  border: 1px solid #2563eb;
}

.btn-signup:hover {
  background-color: #1d4ed8;
}
```

- in `app.ts`

```ts
  imports: [RouterOutlet, Header],
```

- in `app.html`

```html
<app-header></app-header> <router-outlet></router-outlet>
```

## Wrong Way

```html
<a href="/signin">Sign In</a>
```

Problem:

- Reloads entire application.
- Loses state.
- Slower.

---

## Correct Way

```html
<a routerLink="/signin">Sign In</a>
```

Angular changes routes without reloading the page.

---

## Import RouterLink

```ts
import { RouterLink } from "@angular/router";

@Component({
  imports: [RouterLink]
})
```

---

## Example

```html
<header class="main-header">
  <div class="header-brand">
    <a routerLink="/home" class="logo"> 🎓 CoursePlatform </a>
  </div>

  <nav>
    <a routerLink="/home">Home</a>

    <a routerLink="/signin"> Sign In </a>

    <a routerLink="/signup"> Sign Up </a>
  </nav>
</header>
```

---

# 5. Programmatic Navigation

Sometimes navigation happens because of logic.

Examples:

- Login success
- Logout
- Add to cart
- Authorization checks

Use Router service.

---

## Inject Router

```ts
router = inject(Router);
```

---

## navigate()

```ts
this.router.navigate(["/signin"]);
```

Uses path segments.

---

## navigateByUrl()

```ts
this.router.navigateByUrl("/signin");
```

Uses a full URL string.

---

## Example

- in `courses-list.ts` Component

```ts
  authService = inject(AuthService);
  userService = inject(UserService);
  router = inject(Router);

  enroll(courseId: string) {
    if (this.authService.isLoggedIn()) {
this.userService.addCourseToUser(courseId).subscribe({
        next: (courses) => {
          console.log(courses);
          alert("Course added successfully")
        },
        error: (err)=>{
          this.errorMessage.set('Cannot enroll in the course');
          alert(this.errorMessage())
          console.log(err);

        }
      });
    } else {
      this.router.navigateByUrl('/signin');
    }
  }
```

---

## Example

- in `auth-service.ts`
  add `isLoggedInSignal`

```ts
import { HttpClient } from "@angular/common/http";
import { inject, Service, signal } from "@angular/core";
import { tap } from "rxjs";
import { jwtDecode } from "jwt-decode";

@Service()
export class AuthService {
  private baseUrl = "http://localhost:5000/api/v1/auth";

  private httpClient = inject(HttpClient);

  isLoggedInSignal = signal(false);

  isLoggedIn() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.isLoggedInSignal.set(false);
      return false;
    }

    try {
      const decode = jwtDecode<any>(token);

      const expirationDate = new Date(decode.exp * 1000);

      if (expirationDate < new Date()) {
        localStorage.removeItem("token");
        this.isLoggedInSignal.set(false);
        return false;
      }

      this.isLoggedInSignal.set(true);
      return true;
    } catch {
      localStorage.removeItem("token");
      this.isLoggedInSignal.set(false);
      return false;
    }
  }

  signin(credentials: { email: string; password: string }) {
    return this.httpClient
      .post<any>(`${this.baseUrl}/signin`, credentials)
      .pipe(
        tap((res) => {
          this.isLoggedInSignal.set(true);
          localStorage.setItem("token", res.token);
          console.log(localStorage);
        }),
      );
  }

  signup(userDate: FormData) {
    return this.httpClient.post<any>(`${this.baseUrl}/signup`, userDate).pipe(
      tap((res) => {
        this.isLoggedInSignal.set(true);
        localStorage.setItem("token", res.token);
      }),
    );
  }

  logout() {
    this.isLoggedInSignal.set(false);
    localStorage.removeItem("token");
  }
}
```

- in `header.ts` Component

```ts
import { Component, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../services/auth-service";

@Component({
  imports: [RouterLink],
  selector: "app-header",
  styleUrl: "./header.css",
  templateUrl: "./header.html",
})
export class Header {
  authService = inject(AuthService);
  router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/home");
  }
}
```

- in `header.html`

```html
<header class="main-header">
  <div class="header-brand">
    <a routerLink="/home" class="logo">🎓 CoursePlatform</a>
  </div>

  <nav class="navigation">
    <ul class="nav-links">
      <li>
        <a routerLink="/home" class="active-link">Home</a>
      </li>
    </ul>

    @if (authService.isLoggedInSignal()) {
    <button class="btn btn-logout" (click)="logout()">Logout</button>
    } @else{
    <div class="auth-buttons">
      <a routerLink="/signin" class="btn btn-login">Sign In</a>
      <a routerLink="/signup" class="btn btn-signup">Sign Up</a>
    </div>
    }
  </nav>
</header>
```

- in `header.css`

```css
.btn-logout {
  background-color: #eb2525;
  color: white;
  border: 1px solid #f00505;
}
```

---

# 6. Route Parameters

Sometimes routes need dynamic values.

Example:

```text
/course-details/123
```

Here:

```text
123
```

is a route parameter.

---

## Define Route

```bash
ng g c course-details
```

```ts
{
  path: "course-details/:id",
  component: CourseDetails,
  title: 'Course Details'
}
```

`:id` means dynamic value.

---

## Navigate With Parameter

- in `courses-list.html` component

```html
<div class="course-card" (click)="showCourse(course._id)">...</div>
```

- in `courses-list.ts` component

```ts
  showCourse(courseId: string){
    this.router.navigateByUrl(`course-details/${courseId}`);
  }
```

Example:

```text
course-details/123
```

### Reading Route Parameters

- in `course-details.ts`

```ts
import { Component, inject, OnInit, signal } from "@angular/core";
import { CourseInterface } from "../interfaces/course-interface";
import { CoursesService } from "../services/courses-service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-course-details",
  imports: [],
  templateUrl: "./course-details.html",
  styleUrl: "./course-details.css",
})
export class CourseDetails implements OnInit {
  course = signal<CourseInterface | undefined>(undefined);
  courseId = signal("");

  courseService = inject(CoursesService);

  activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.courseId.set(params["id"]);
    });
  }

  ngOnInit(): void {
    this.courseService.getCourseById(this.courseId()).subscribe({
      next: (course) => {
        this.course.set(course);
      },
    });
  }
}
```

- in `course-details.html`

```html
<div class="simple-details-container">
  <div class="simple-banner">
    <img
      [src]="'http://localhost:5000/api/v1/uploads/courses/' + course()?.imageUrl"
      [alt]="course()?.title"
    />
  </div>

  <div class="simple-header">
    <span class="category-tag">{{ course()?.category }}</span>
    <h1>{{ course()?.title }}</h1>
    <p class="instructor-name">
      Course Instructor: <strong>{{ course()?.instructor }}</strong>
    </p>

    <div class="quick-meta">
      <span>⏱️ {{ course()?.duration }}</span>
      <span>•</span>
      <span>📊 {{ course()?.level }}</span>
      <span>•</span>
      <span>⭐ {{ course()?.rating }} Rating</span>
    </div>
  </div>

  <div class="cta-action-bar">
    <div class="price-tag">
      @if (course()?.price === 0) {
      <span class="free-text">Free</span>
      } @else {
      <span>{{ course()?.price }}</span>
      }
    </div>
  </div>

  <section class="details-section">
    <h2>Description</h2>
    <p class="desc-text">{{ course()?.description }}</p>
  </section>
</div>
```

```css
.simple-details-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  color: #1f2937;
  direction: ltr;
}

.simple-banner {
  width: 100%;
  height: 350px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.simple-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-tag {
  color: #2563eb;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.simple-header h1 {
  font-size: 2.2rem;
  margin: 10px 0;
  color: #111827;
}

.instructor-name {
  color: #4b5563;
  margin: 0 0 15px 0;
}

.quick-meta {
  display: flex;
  gap: 15px;
  color: #6b7280;
  font-size: 0.95rem;
  margin-bottom: 30px;
}

.cta-action-bar {
  background-color: #f3f4f6;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.price-tag {
  font-size: 1.8rem;
  font-weight: 800;
  color: #111827;
}

.price-tag .free-text {
  color: #10b981;
}

.simple-enroll-btn {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.simple-enroll-btn:hover {
  background-color: #1d4ed8;
}

.details-section {
  margin-bottom: 35px;
}

.details-section h2 {
  font-size: 1.4rem;
  color: #111827;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 8px;
  margin-bottom: 15px;
}

.desc-text {
  line-height: 1.7;
  color: #374151;
  font-size: 1.05rem;
}

.simple-syllabus {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.simple-syllabus li {
  color: #4b5563;
  font-size: 1.05rem;
}

.loading-box {
  text-align: center;
  padding: 80px;
  color: #6b7280;
}
```

---

# 7. Child Routes

Large applications often have sections.

Example:

```text
Admin Dashboard
```

contains:

- Course Management
- Add Course
- Course Details

---

## Admin Dashboard

Create parent dashboard component.

```bash
ng g c admin-dashboard
```

```html
<router-outlet></router-outlet>
```

```ts
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  imports: [RouterOutlet],
  selector: "app-admin-dashboard",
  styleUrl: "./admin-dashboard.css",
  templateUrl: "./admin-dashboard.html",
})
export class AdminDashboard {}
```

---

### Admin Dashboard Route

- in `app.routes.ts`

```ts
{
  path: "admin-dashboard",
  component: AdminDashboard,

  children: [
    {
      path: "",
      component: CourseManagement
    },

    {
      path: "add-course",
      component: AddCourseForm
    }
  ]
}
```

---

### URL Examples

```text
/admin-dashboard
```

Displays:

```ts
CourseManagement;
```

---

- in `course-management.ts`

```ts
router = inject(Router);
onAddCourse() {
   this.router.navigateByUrl('/admin-dashboard/add-course');
  }
```

```text
/admin-dashboard/add-course
```

Displays:

```ts
AddCourseForm;
```

---

## Student Dashboard

Create parent dashboard component.

```bash
ng g c student-dashboard
ng g c student-courses
```

- in `student-dashboard` component

```html
<router-outlet></router-outlet>
```

```ts
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  imports: [RouterOutlet],
  selector: "app-student-dashboard",
  styleUrl: "./student-dashboard.css",
  templateUrl: "./student-dashboard.html",
})
export class StudentDashboard {}
```

- in `app.routes.ts`

```ts
   {
    path: 'student-dashboard',
    component: StudentDashboard,
    title: 'Student Dashboard',
    children: [{ path: '', component: StudentCourses, title: 'Student Courses' }],
  }
```

- in `student-courses.ts`

```ts
import { Component, inject, OnInit, signal } from "@angular/core";
import { UserService } from "../services/user-service";
import { CourseInterface } from "../interfaces/course-interface";

@Component({
  imports: [],
  selector: "app-student-courses",
  styleUrl: "./student-courses.css",
  templateUrl: "./student-courses.html",
})
export class StudentCourses implements OnInit {
  userService = inject(UserService);

  errorMessage = signal("");

  courses = signal<CourseInterface[]>([]);

  ngOnInit(): void {
    this.userService.getUserCourses().subscribe({
      next: (data) => {
        this.courses.set(data);
      },
      error: (err) => {
        this.errorMessage.set("Failed to load courses");
        console.log(err);
      },
    });
  }
}
```

- in `student-courses.html`

```html
<div class="dashboard-container">
  <div class="dashboard-header">
    <h2>My Enrolled Courses</h2>
    <p>Track your learning progress and continue where you left off.</p>
  </div>

  <div class="user-courses-grid">
    @for (course of courses(); track course._id) {
    <div class="user-course-card">
      <div class="course-image-wrapper">
        <img
          [src]=" 'http://localhost:5000/api/v1/uploads/courses/' + course.imageUrl"
          [alt]="course.title"
          class="course-img"
        />
      </div>

      <div class="course-info">
        <h3 class="course-title">{{ course.title }}</h3>
        <p class="instructor">By {{ course.instructor }}</p>
      </div>
    </div>
    } @empty {
    <div class="empty-state">
      <p>You haven't enrolled in any courses yet.</p>
      <a href="/courses" class="browse-btn">Browse Courses</a>
    </div>
    }
  </div>
</div>
```

- in `student-courses.css`

```css
.dashboard-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 20px;
}

.dashboard-header {
  margin-bottom: 30px;
}

.dashboard-header h2 {
  color: #111827;
  font-size: 1.8rem;
  margin-bottom: 6px;
}

.dashboard-header p {
  color: #6b7280;
  margin: 0;
}

.user-courses-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.user-course-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  display: flex;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s;
}

.user-course-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.course-image-wrapper {
  width: 240px;
  min-width: 240px;
  height: 160px;
  background-color: #f3f4f6;
}

.course-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.course-info {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.course-title {
  margin: 0 0 4px 0;
  color: #1f2937;
  font-size: 1.25rem;
}

.instructor {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0 0 15px 0;
}

.empty-state {
  text-align: center;
  padding: 60px;
  background: white;
  border-radius: 12px;
  border: 1px dashed #d1d5db;
}

.empty-state p {
  color: #6b7280;
  margin-bottom: 20px;
}

.browse-btn {
  display: inline-block;
  background: #2563eb;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
}

@media (max-width: 640px) {
  .user-course-card {
    flex-direction: column;
  }
  .course-image-wrapper {
    width: 100%;
    height: 180px;
  }
}
```

# Route Guards

## What Are Guards?

Guards control whether navigation is allowed.

Without guards:

```text
User can access any page
```

With guards:

```text
Only authorized users can access pages
```

---

# Types Used in This Project

### CanActivate

Controls access to a route.

Example:

```text
/admin-dashboard
```

---

### CanActivateChild

Controls access to child routes.

Example:

```text
/admin-dashboard/add-course
```

---

### CanDeactivate

Prevents leaving a page with unsaved changes.

---

# 9. Authentication Helpers

- in `auth-service.ts`

## Decode JWT Once

```ts
private getDecodedToken() {

  const token =
    localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    return jwtDecode<any>(token);
  } catch {
    return null;
  }
}
```

---

## isLoggedIn()

```ts
 isLoggedIn() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.isLoggedInSignal.set(false);
      return false;
    }

    try {
      const decoded = this.getDecodedToken();
      const expirationDate = new Date(decoded.exp * 1000);

      if (expirationDate < new Date()) {
        localStorage.removeItem('token');
        this.isLoggedInSignal.set(false);
        return false;
      }

      this.isLoggedInSignal.set(true);
      return true;
    } catch {
      localStorage.removeItem('token');
      this.isLoggedInSignal.set(false);
      return false;
    }
  }
```

---

## getRole()

```ts
getRole(): string | null {

  const decoded =
    this.getDecodedToken();

  if (!decoded) {
    return null;
  }

  return decoded.role;
}
```

---

# 10. Admin Guard

Generate:

```bash
ng g guard guards/admin
```

Choose:

```text
CanActivate
```

---

## Admin Guard

```ts
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

import { AuthService } from "../services/auth-service";

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return router.createUrlTree(["/signin"]);
  }

  if (authService.getRole() !== "admin") {
    return router.createUrlTree(["/home"]);
  }

  return true;
};
```

---

## Why UrlTree?

Instead of:

```ts
router.navigate(...)
```

Guards should return:

```ts
UrlTree;
```

because Angular decides the navigation.

---

# 11. Student Guard

Generate:

```bash
ng g guard guards/student
```

Choose:

```text
CanActivate
```

```ts
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth-service";

export const studentGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return router.createUrlTree(["/signin"]);
  }

  if (authService.getRole() !== "student") {
    return router.createUrlTree(["/home"]);
  }

  return true;
};
```

---

# 12. Applying Guards

```ts
{
  path: "admin-dashboard",

  component: AdminDashboard,

  canActivate: [adminGuard]
}
```

---

```ts
{
  path: "student-dashboard",

  component: StudentDashboard,

  canActivate: [studentGuard]
}
```

---

# 13. Redirect After Login

After receiving token:

```ts
signin(credentials) {

  return this.httpClient
    .post<any>(...)
    .pipe(

      tap((res) => {

        localStorage.setItem(
          "token",
          res.token
        );

        const role =
          this.getRole();

        if (role === "admin") {

          this.router.navigate([
            "/admin-dashboard"
          ]);

        } else if (
          role === "student"
        ) {

          this.router.navigate([
            "/student-dashboard"
          ]);

        }

      })
    );
}
```

- Sign up

```ts
 signup(userDate: FormData) {
    return this.httpClient.post<any>(`${this.baseUrl}/signup`, userDate).pipe(
      tap((res) => {
        this.isLoggedInSignal.set(true);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/student-dashboard']);
      }),
    );
  }
```
