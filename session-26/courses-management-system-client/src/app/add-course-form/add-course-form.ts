import { Component, inject, signal } from '@angular/core';
import { COURSE_CATEGORIES, COURSE_LEVELS } from '../constants/course-constants';
import { TitleCasePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoursesService } from '../services/courses-service';

@Component({
  selector: 'app-add-course-form',
  imports: [TitleCasePipe, ReactiveFormsModule],
  templateUrl: './add-course-form.html',
  styleUrl: './add-course-form.css',
})
export class AddCourseForm {
  categories = COURSE_CATEGORIES;
  levels = COURSE_LEVELS;

  courseService = inject(CoursesService);

  errorMessage = signal('');

  addCourseForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    instructor: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    level: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    duration: new FormControl('', Validators.required),
    rating: new FormControl(0, [Validators.min(0), Validators.max(5)]),
    students: new FormControl(0, Validators.min(0)),
    imageUrl: new FormControl<File | null>(null),
    description: new FormControl('', [Validators.maxLength(1000)]),
  });

  onSubmit() {
    this.errorMessage.set('');
    if (this.addCourseForm.invalid) {
      this.addCourseForm.markAllAsTouched();
      return;
    }

    console.log(this.addCourseForm.value);
    const formValues = this.addCourseForm.value;

    const formData = new FormData();

    Object.keys(formValues).forEach((key) => {
      const value = (formValues as any)[key];

      if (value) {
        formData.append(key, value);
      }
    });

    if (this.selectedFile) {
      formData.append('imageUrl', this.selectedFile, this.selectedFile.name);
    }

    this.courseService.addCourse(formData).subscribe({
      next: (course) => {
        this.addCourseForm.reset();
        console.log(`Course added: ${course._id}`);
      },
      error: (error) => {
        this.errorMessage.set('Failed to add course. Please try again later');
        console.error(error);
      },
    });
  }

  selectedFile: File | null = null;
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
}
