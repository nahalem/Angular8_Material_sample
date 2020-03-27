import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CRUDUserService {
  apiUrl: string;
  protected headers = null;

  constructor(
    public http: HttpClient,
    public errorHandlerService: ErrorHandlerService
  ) {
    console.log('Service CRUDUserService Constructor started');
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  setApiUrl(apiUrl: string): void {
    this.apiUrl = apiUrl;
  }

  loginUser(email: string, password: string): Observable<any[]> {
    let _url = this.apiUrl;
    _url = _url + '?email='+email+'&password='+password;

    return this.http
      .get(_url)
      .catch(this.errorHandlerService.handleErrorFromBackend)
      .map(responseData => {
        return responseData;
      });
  }
}
