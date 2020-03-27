import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from 'src/app/app.config';
import { ErrorHandlerService } from './error-handler.service';
import { CRUDUserService } from './helpers/crud-user.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class UserService  extends CRUDUserService{
  protected headers = null;
  apiUrl: string = AppConfig.apiEndpoint;
  userProfile$ = new BehaviorSubject<User>(new User());
  userProfileClone$ = new BehaviorSubject<User>(new User());

  constructor(
    public http: HttpClient,
    public errorHandlerService: ErrorHandlerService
    ) {
    super(http, errorHandlerService);
    console.log('Service UserService Constructor start');
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.apiUrl = AppConfig.applicationEndpoint + '/authorization';
    super.setApiUrl(this.apiUrl);
  }

}
