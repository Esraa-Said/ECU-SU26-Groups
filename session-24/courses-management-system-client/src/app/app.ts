import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Test } from './test/test';
import { SigninForm } from './signin-form/signin-form';
import { AddCourseForm } from './add-course-form/add-course-form';
import { SignupForm } from './signup-form/signup-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Test, SigninForm, AddCourseForm, SignupForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  showCount = false;

  count = signal(5);

  message = computed(() => {
    if (this.showCount) {
      return this.count();
    }

    return 'Hidden';
  });
  toggleShow() {
    this.showCount = !this.showCount;
  }
}
