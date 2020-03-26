import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from 'src/app/app.config';
import { ErrorHandlerService } from './error-handler.service';
import { CRUDUserService } from './helpers/crud-user.service';
import { Observable, BehaviorSubject } from 'rxjs';
// import { QritUser } from '../models/qrit-user';

@Injectable({
  providedIn: 'root'
})
export class UserService  extends CRUDUserService{
  // protected headers = null;
  // apiUrl: string = AppConfig.apiEndpoint;
  // userProfile$ = new BehaviorSubject<QritUser>(new QritUser());
  // userProfileClone$ = new BehaviorSubject<QritUser>(new QritUser());

  // constructor(
  //   public http: HttpClient,
  //   public errorHandlerService: ErrorHandlerService
  //   ) {
  //   super(http, errorHandlerService);
  //   console.log('Service PostService Constructor start');
  //   super.setApiUrl(this.apiUrl);
  //   this.headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });

  // }

  // loginUser(user: any): Observable<QritUser>{
  //   this.apiUrl = AppConfig.apiEndpointUserService;
  //   return super.getByCredentials(user);
  // };

  // getCurrentUser(): Observable<QritUser>{
  //   this.apiUrl = AppConfig.apiEndpoint + '/User/GetCurrentUser';

  //   return super.getOneAfterAuth();
  // };
}
