import { Component, effect, ElementRef, inject, signal, ViewChild } from '@angular/core';
import {
  form,
  FormField,
  FormRoot,
  maxLength,
  minLength,
  pattern,
  required,
} from '@angular/forms/signals';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-signup-form',
  imports: [FormField, FormRoot],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.css',
})
export class SignupForm {
  authService = inject(AuthService);
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  errorMessage = signal<string>('');

  signupModel = signal({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    imageUrl: null,
  });

  signupForm = form(
    this.signupModel,
    (schema) => {
      (required(schema.firstName, { message: 'First name is required' }),
        minLength(schema.firstName, 2, { message: 'First name minimum length is 2 character' }),
        maxLength(schema.firstName, 50, { message: 'First name maximum length is 50 character' }),
        required(schema.lastName, { message: 'Last name is required' }),
        minLength(schema.lastName, 2, { message: 'Last name minimum length is 2 character' }),
        maxLength(schema.lastName, 50, { message: 'Last name maximum length is 50 character' }),
        required(schema.email, { message: 'Email is required' }),
        pattern(schema.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Invalid Email' }),
        required(schema.password, { message: 'Password is required' }),
        minLength(schema.password, 8, { message: 'Password must be at least 8 characters long' }),
        pattern(schema.phone, /^\+?[0-9]{10,15}$/, {
          message: 'Please provide a valid phone number',
        }));
    },

    {
      submission: {
        action: async (field) => {
          this.errorMessage.set('');

          console.log(field().value());

          const formValues = field().value();

          const formData = new FormData();

          formData.append('firstName', formValues.firstName);
          formData.append('lastName', formValues.lastName);
          formData.append('email', formValues.email);
          formData.append('password', formValues.password);
          formData.append('phone', formValues.phone);

          if (this.fileSelected) {
            formData.append('imageUrl', this.fileSelected);
          }

          this.authService.signup(formData).subscribe({
            next: (res) => {
              console.log(res);

              this.signupModel.set({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                phone: '',
                imageUrl: null,
              });
              this.fileSelected = null;

              if (this.fileInput && this.fileInput.nativeElement) {
                this.fileInput.nativeElement.value = '';
              }
              field().reset();
            },
            error: (err) => {
              this.errorMessage.set('Failed to create account, Please try again later.');
              console.error(err);
            },
          });
        },
      },
    },
  );

  constructor() {
    effect(() => {
      console.log(this.signupForm().value());
    });
  }

  fileSelected: File | null = null;
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log(input);
    if (input && input.files && input.files.length > 0) {
      this.fileSelected = input.files[0];
    }
  }
}
