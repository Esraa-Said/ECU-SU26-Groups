import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin-form',
  imports: [FormsModule],
  templateUrl: './signin-form.html',
  styleUrl: './signin-form.css',
})
export class SigninForm {

  @ViewChild("loginForm") login !: NgForm;


  onSubmit(){
    console.log(this.login.value);
    
  }

}
