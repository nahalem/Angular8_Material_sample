import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;

  constructor() { }

  ngOnInit() {
    this.user = new User();
    this.initializeForm();
  }

  initializeForm(): void {
    if (this.loginForm === undefined) {
      this.loginForm = new FormGroup({
        'loginFormData': new FormGroup({
          'login': new FormControl('', [Validators.required, Validators.email]),
          'password': new FormControl('', [Validators.required]),
        })
      });
    }
    //this.validateControls();
  }

  setFormValues(): void {
    this.loginForm.setValue({
      'loginFormData': {
        'login': this.user.login === undefined ? '' : this.user.login,
        'password': this.user.password === undefined ? '' : this.user.password,
      }
    });
  }

  resetForm(): void {
    if (this.loginForm !== undefined) {
      this.loginForm.reset();
    }
  }

  validateControls(): void {
    this.loginForm.get('loginFormData.login').markAsTouched();
    this.loginForm.get('loginFormData.password').markAsTouched();
    this.loginForm.get('loginFormData.login').updateValueAndValidity();
    this.loginForm.get('loginFormData.password').updateValueAndValidity();
  }

  // TODO:
  // Remove below method?
  onSubmit(): void {
    console.log('onSubmit()');
    this.validateControls();

    if(!this.loginForm.valid){
      return;
    }

    console.log('onSubmit() login process');
   }

}
