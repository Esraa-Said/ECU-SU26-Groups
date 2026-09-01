import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SigninForm } from './signin-form/signin-form';
import { AddCourseForm } from './add-course-form/add-course-form';
import { SignupForm } from './signup-form/signup-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,  SigninForm, AddCourseForm, SignupForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
 
}
