import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CourseInterface } from '../interfaces/course-interface';

@Service()
export class UserService {
  httpClient = inject(HttpClient);

  baseUrl = 'http://localhost:5000/api/v1/users/courses';

  getUserCourses(): Observable<CourseInterface[]> {
    return this.httpClient.get<any>(this.baseUrl).pipe(map((res) => res.data.myCourses));
  }

  addCourseToUser(courseId: string): Observable<CourseInterface[]> {
    return this.httpClient.post<any>(this.baseUrl, {courseId}).pipe(map((res) => res.data.myCourses));
  }
}
