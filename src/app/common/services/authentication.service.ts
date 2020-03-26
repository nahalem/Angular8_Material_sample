import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError, take, retry } from 'rxjs/operators';
import { AppConfig } from 'src/app/app.config';
// import { QritUser } from '../models/qrit-user';
import { ErrorHandlerService } from './error-handler.service';
import { HttpExtractData } from './helpers/http-extract-data';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  protected headers = null;

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private userService: UserService
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // public get currentUserValue(): QritUser {
  //   return this.currentUserSubject.value;
  // }

  // login(user: any): Observable<any> {
  //   // let searchParams = new HttpParams();
  //   // searchParams = searchParams.append('username', username);
  //   // searchParams = searchParams.append('password', password);

  //   // return null;
  //   return this.userService.loginUser(user)
  //     .pipe(
  //       take(1),
  //       map(responseData => {
  //         console.log('AuthenticationService start');
  //         console.log(responseData);
  //         // login successful if there's a jwt token in the response
  //         if (responseData != null) {
  //           // store user details and jwt token in local storage to keep user logged in between page refreshes
  //           localStorage.setItem('currentUser', JSON.stringify(responseData));
  //           this.currentUserSubject.next(responseData);
  //           console.log('[ AuthenticationService => login() ]');
  //           console.log(responseData);
  //         }
  //         return responseData;
  //       }),
  //       retry(3),
  //       catchError(this.errorHandlerService.handleError)
  //     );
  // }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public authenticated() {
    // TODO

    return true;

}
}
