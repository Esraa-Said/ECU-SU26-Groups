# User Service 

## Overview

The `UserService` is responsible for handling requests related to the authenticated user's enrolled courses.

This service communicates with the backend API and provides methods to:

- Get all courses enrolled by the current user.
- Add a course to the user's enrolled courses.

---

# Generate the Service

Create the service using Angular CLI:

```bash
ng g s services/user-service
```

Angular generates:

```text
src/
└── app/
    └── services/
        ├── user-service.ts
        └── user-service.spec.ts
```

---

# User Service Implementation

```ts
import { HttpClient } from "@angular/common/http";
import { inject, Service } from "@angular/core";
import { map, Observable } from "rxjs";
import { CourseInterface } from "../interfaces/course-interface";

@Service()
export class UserService {

  httpClient = inject(HttpClient);

  baseUrl = "http://localhost:5000/api/v1/users/courses";

  getUserCourses(): Observable<CourseInterface[]> {
    return this.httpClient
      .get<any>(this.baseUrl)
      .pipe(
        map((res) => res.data.myCourses)
      );
  }

  addCourseToUser(courseId: string): Observable<CourseInterface[]> {
    return this.httpClient
      .post<any>(this.baseUrl, { courseId })
      .pipe(
        map((res) => res.data.myCourses)
      );
  }
}
```

---


