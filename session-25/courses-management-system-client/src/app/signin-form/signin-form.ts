import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-signin-form',
  imports: [FormsModule],
  templateUrl: './signin-form.html',
  styleUrl: './signin-form.css',
})
export class SigninForm {
  @ViewChild('loginForm') login!: NgForm;

  authService = inject(AuthService);

  errorMessage = signal<string>('');

  onSubmit() {
    this.errorMessage.set('');
    this.authService.signin(this.login.value).subscribe({
      next: (res) => {
        console.log(res);
        this.login.reset();
      },
      error: (err) => {
        this.errorMessage.set('Failed to login, Please try again later.');
        console.error(err);
      },
    });
  }
}
