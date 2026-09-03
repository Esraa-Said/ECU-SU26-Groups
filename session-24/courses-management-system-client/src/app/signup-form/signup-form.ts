import { Component, effect, signal } from '@angular/core';
import {
  form,
  FormField,
  FormRoot,
  maxLength,
  minLength,
  pattern,
  required,
} from '@angular/forms/signals';

@Component({
  selector: 'app-signup-form',
  imports: [FormField, FormRoot],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.css',
})
export class SignupForm {
  signupModel = signal({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    imageUrl: null,
  });

  signupForm = form(this.signupModel, (schema) => {
    required(schema.firstName, { message: 'First name is required' }),
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
      });
  },


  {
    submission: {
      action: async (field)=>{
        console.log(field().value());
        
      }
    }
  }




);

  constructor() {
    effect(() => {
      console.log(this.signupForm().value());
    });
  }
}
