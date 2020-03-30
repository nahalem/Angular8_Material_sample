import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/common/services/user.service';
import { AlertService } from 'src/app/common/services/alert.service';
import { StorageHelper, StorageType } from 'src/app/common/helpers/storage-helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
  isLodaded: boolean;
  isUserLogged: boolean = false;
  storageHelper: StorageHelper;

  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    console.log('LoginComponent  ngOnInit()');
    this.user = new User();
    this.storageHelper = new StorageHelper(StorageType.local);
    this.initializeForm();
    this.getLoggedUser();
    this.setFormValues();
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
      this.isUserLogged = false;
      this.isLodaded = false;
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
        this.isUserLogged = false;
        return;
      }

      this.user = res[0];
      this.alertService.info('You are logged sucessfully');
      this.isLodaded = false;
      this.userService.createUser(this.user);
      this.isUserLogged = true;
      this.storageHelper.setStorage('loggedUser', this.user);
      this.userService.invokeEvent.emit();
    },
    error => {
      this.isLodaded = false;
      this.alertService.error(error.error.Message);
      this.isUserLogged = false;
    });
   }

   logout(): void{
    this.resetForm();
    this.storageHelper.removeStorage('loggedUser');
    this.initializeForm();
    this.userService.clearUser();
    this.userService.invokeEvent.emit();
   };

   getLoggedUser(): void{
    let user = this.storageHelper.getStorage('loggedUser');
    if(user === undefined || user === null){
      return;
    }
    console.log('getLoggedUser()', user);
    this.user = user;
    this.isLodaded = false;
    this.userService.createUser(this.user);
    this.isUserLogged = true;
   }
}
