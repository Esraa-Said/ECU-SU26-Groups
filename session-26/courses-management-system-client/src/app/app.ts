import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SigninForm } from './signin-form/signin-form';
import { AddCourseForm } from './add-course-form/add-course-form';
import { SignupForm } from './signup-form/signup-form';
import { CourseManagement } from './course-management/course-management';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SigninForm, AddCourseForm, SignupForm, CourseManagement],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  authService = inject(AuthService);
  ngOnInit() {
    console.log(this.authService.isLoggedIn());
  }
}
