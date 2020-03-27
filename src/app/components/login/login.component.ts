import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/common/services/user.service';
import { AlertService } from 'src/app/common/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
  isLodaded: boolean;

  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.user = new User();
    this.initializeForm();
  }

  initializeForm(): void {
    if (this.loginForm === undefined) {
      this.loginForm = new FormGroup({
        'loginFormData': new FormGroup({
          'email': new FormControl('', [Validators.required, Validators.email]),
          'password': new FormControl('', [Validators.required, Validators.maxLength(5)]),
        })
      });
    }
  }

  setFormValues(): void {
    this.loginForm.setValue({
      'loginFormData': {
        'email': this.user.email === undefined ? '' : this.user.email,
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
    this.loginForm.get('loginFormData.email').markAsTouched();
    this.loginForm.get('loginFormData.password').markAsTouched();
    this.loginForm.get('loginFormData.email').updateValueAndValidity();
    this.loginForm.get('loginFormData.password').updateValueAndValidity();
  }

  onSubmit(): void {}

  login(): void {
    this.user = new User();
    this.validateControls();

    if(!this.loginForm.valid){
      return;
    }

    let userData = this.loginForm.value['loginFormData'];
    this.isLodaded = true;
    this.userService.loginUser(userData.email, userData.password).subscribe(res => {
      if(res.length === 0){
        this.alertService.warning('Login failed.');
        this.isLodaded = false;
        return;
      }

      this.user = res[0];
      this.alertService.info('You are logged sucessfully');
      this.isLodaded = false;
    },
    error => {
      this.isLodaded = false;
      this.alertService.error(error.error.Message);
    });
   }
}
