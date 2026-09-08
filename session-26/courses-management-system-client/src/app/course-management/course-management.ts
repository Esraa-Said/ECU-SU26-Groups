import { Component, inject, OnInit, signal } from '@angular/core';
import { CourseInterface } from '../interfaces/course-interface';
import { CoursesService } from '../services/courses-service';

@Component({
  selector: 'app-course-management',
  imports: [],
  templateUrl: './course-management.html',
  styleUrl: './course-management.css',
})
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
        this.errorMessage.set('Failed to load courses. Please try again later.');
        console.error(err);
      },
    });
  }

 onDelete(courseId: string) {
    this.courseService.deleteCourse(courseId).subscribe({
      next: (data) => {
        this.courses.update((courses) => courses.filter((c) => c._id != courseId));
      },
      error: (err) => {
        this.errorMessage.set('Failed to delete course. Please try again later.');
        console.error(err);
      },
    });
  }
  onUpdate(course: any) {
    console.log('Update:', course);
  }

  onShow(course: any) {
    console.log('Show:', course);
  }

  onAddCourse() {
    console.log('Add new course');
  }
}
