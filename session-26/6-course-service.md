# Angular Courses CRUD with HttpClient

# Overview

In this section, we will build a complete Courses Management feature.

The application will be able to:

- Get all courses
- Get a single course
- Add a course
- Update a course
- Delete a course
- Upload course images

The flow looks like this:

```text
Component
    ↓
Course Service
    ↓
HttpClient
    ↓
Backend API
    ↓
Database
```

The component should never communicate directly with the backend.

Instead:

```text
Component
    ↓
Service
    ↓
API
```

This keeps the application organized and maintainable.

---

# Step 1: Create a Course Interface

Before working with data, define its structure.

```ts
export interface CourseInterface {
  _id: string;
  title: string;
  instructor: string;
  description?: string;
  price: number;
  duration: string;
  rating?: number;
  students?: number;
  imageUrl?: string;
  level: "beginner" | "intermediate" | "advanced";
  category:
    | "frontend"
    | "backend"
    | "database"
    | "programming"
    | "devops"
    | "mobile";
}
```

---

## Why Use Interfaces?

Without an interface:

```ts
course.title;
```

could be anything.

With an interface:

```ts
course.title;
```

is guaranteed to be:

```ts
string;
```

Benefits:

- Better IntelliSense
- Compile-time checking
- Easier maintenance
- Fewer bugs

---

# Step 2: Create Courses Service

Generate the service:

```bash
ng g s services/courses-service
```

The service becomes responsible for all course-related API requests.

Examples:

```text
Get Courses
Get Course By Id
Add Course
Update Course
Delete Course
```

---

# Step 3: Inject HttpClient

```ts
httpClient = inject(HttpClient);
```

Angular provides HttpClient through Dependency Injection.

This allows the service to communicate with APIs.

---

# Step 4: Define the Base URL

```ts
baseUrl = "http://localhost:5000/api/v1/courses";
```

Instead of repeating:

```ts
http://localhost:5000/api/v1/courses
```

inside every request, we store it once.

---

# Understanding the Backend Response

Suppose the backend returns:

```json
{
  "status": "success",
  "data": {
    "courses": [...]
  }
}
```

The actual courses array is inside:

```ts
res.data.courses;
```

This is why we use:

```ts
map();
```

to extract only the data we need.

---

# Step 5: Get All Courses

```ts
getAllCourses():
Observable<CourseInterface[]> {

  return this.httpClient
    .get<any>(this.baseUrl)
    .pipe(
      map((res) => res.data.courses)
    );
}
```

---

## What Happens?

```text
Component
      ↓
getAllCourses()
      ↓
GET /courses
      ↓
Backend Response
      ↓
map()
      ↓
courses array returned
```

Example response:

```json
{
  "data": {
    "courses": [
      {
        "_id": "1",
        "title": "Angular"
      }
    ]
  }
}
```

After map():

```ts
[
  {
    _id: "1",
    title: "Angular",
  },
];
```

---

# Step 6: Get Course By ID

```ts
getCourseById(
  courseId: string
): Observable<CourseInterface> {

  return this.httpClient
    .get<any>(
      `${this.baseUrl}/${courseId}`
    )
    .pipe(
      map((res) => res.data.course)
    );
}
```

---

## Example Request

```http
GET /courses/123
```

Backend returns:

```json
{
  "data": {
    "course": {
      "_id": "123",
      "title": "Angular"
    }
  }
}
```

map extracts:

```ts
res.data.course;
```

and returns only the course object.

---

# Step 7: Add Course

```ts
addCourse(
  course: FormData
): Observable<CourseInterface> {

  return this.httpClient
    .post<any>(
      this.baseUrl,
      course
    )
    .pipe(
      map((res) => res.data.course)
    );
}
```

---

## Why FormData?

Because the course contains:

```text
Text Data
+
Image File
```

JSON cannot upload files directly.

Instead:

```ts
FormData;
```

is used.

---

# Step 8: Update Course

```ts
updateCourse(
  course: CourseInterface,
  courseId: string
): Observable<CourseInterface> {

  return this.httpClient
    .patch<any>(
      `${this.baseUrl}/${courseId}`,
      course
    )
    .pipe(
      map((res) => res.data.course)
    );
}
```

---

## Example Request

```http
PATCH /courses/123
```

Body:

```json
{
  "title": "Updated Angular Course"
}
```

The backend updates the course and returns the updated version.

---

# Step 9: Delete Course

```ts
deleteCourse(
  courseId: string
): Observable<CourseInterface> {

  return this.httpClient
    .delete<any>(
      `${this.baseUrl}/${courseId}`
    )
    .pipe(
      map((res) => res.data.course)
    );
}
```

---

## Example Request

```http
DELETE /courses/123
```

The backend removes the course and returns the deleted course.

---

# Step 10: Create Course Management Component

Generate:

```bash
ng g c course-management
```

---

# Step 11: Load Courses

```ts
export class CourseManagement implements OnInit {
  courseService = inject(CoursesService);

  courses = signal<CourseInterface[]>([]);

  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        this.courses.set(data);
      },

      error: (err) => {
        this.errorMessage.set("Failed to load courses.");
        console.error(err);
      },
    });
  }
}
```

---

## Why Use Signals?

Initially:

```ts
courses();
```

returns:

```ts
[];
```

After API success:

```ts
courses();
```

becomes:

```ts
[
  {...},
  {...}
]
```

The UI updates automatically.

---

# Step 12: Display Courses

```html
@for ( course of courses(); track course._id ) { }
```

Angular loops through every course.

Example:

```ts
[Course1, Course2, Course3];
```

Angular creates:

```html
Card 1 Card 2 Card 3
```

---

# Display Course Image

```html
<img
  [src]="'http://localhost:5000/api/v1/uploads/courses/' + course.imageUrl"
/>

" />
```

Example:

```text
course.imageUrl

angular.jpg
```

Final URL:

```text
http://localhost:5000/api/v1/uploads/courses/angular.jpg
```

---

# Step 13: Delete Course

```ts
onDelete(courseId: string) {

  this.courseService
    .deleteCourse(courseId)
    .subscribe({

      next: () => {

        this.courses.update(
          (courses) =>
            courses.filter(
              (c) =>
                c._id !== courseId
            )
        );

      },

      error: (err) => {

        this.errorMessage.set(
          'Failed to delete course.'
        );

        console.error(err);

      }

    });
}
```

---

## Why Update the Signal?

Without this:

```ts
Course Deleted In Database
```

but still appears on the page.

We remove it locally:

```ts
filter();
```

Example:

Before:

```ts
[course1, course2, course3];
```

Delete:

```ts
course2;
```

After:

```ts
[course1, course3];
```

The UI updates immediately.

---

# Step 14: Upload Course Image

HTML:

```html
<input type="file" accept="image/*" (change)="onFileSelected($event)" />
```

---

## Why accept="image/\*"?

It limits file selection to images.

Examples:

```text
jpg
png
jpeg
webp
```

---

# Handle File Selection

```ts
selectedFile:
File | null = null;

onFileSelected(
  event: Event
) {

  const input =
    event.target
    as HTMLInputElement;

  if (
    input.files &&
    input.files.length > 0
  ) {

    this.selectedFile =
      input.files[0];

  }
}
```

---

## What Happens?

User selects:

```text
angular-course.jpg
```

Stored in:

```ts
this.selectedFile;
```

Now Angular can upload it later.

---

# Step 15: Create FormData

Before sending the request:

```ts
const formData = new FormData();
```

Add all form fields:

```ts
Object.keys(formValues).forEach((key) => {
  const value = (formValues as any)[key];

  if (value) {
    formData.append(key, value);
  }
});
```

---

## Add Image

```ts
if (this.selectedFile) {
  formData.append("imageUrl", this.selectedFile, this.selectedFile.name);
}
```

Result:

```text
FormData
│
├── title
├── instructor
├── description
├── price
├── duration
├── level
├── category
└── imageUrl
```

---

# Step 16: Submit New Course

```ts
this.courseService.addCourse(formData).subscribe({
  next: (course) => {
    this.addCourseForm.reset();

    console.log(
      `Course added:
         ${course._id}`,
    );
  },

  error: (error) => {
    this.errorMessage.set("Failed to add course.");

    console.error(error);
  },
});
```

---

# Complete Course Flow

```text
User Fills Form
        ↓
Selects Image
        ↓
FormData Created
        ↓
addCourse()
        ↓
POST /courses
        ↓
Backend Saves Data
        ↓
Database Updated
        ↓
New Course Returned
        ↓
UI Updated
```

# Summary

In this section you learned how to:

- Create a Course Interface
- Build a Courses Service
- Use HttpClient with CRUD operations
- Use map() to extract API data
- Load data inside a component
- Store data using Signals
- Display data using @for
- Delete courses
- Upload images
- Use FormData
- Add new courses
- Build a complete CRUD workflow in Angular
