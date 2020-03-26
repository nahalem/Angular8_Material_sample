import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
    constructor(
      private http: HttpClient
      ) { }

     handleError(error: any): Observable<any> {
      if (error.error instanceof ErrorEvent) {
        // client-side error
        console.log('client-side error: ');
        return throwError(error.error);
      } else {
        // server-side error
        console.log('server-side error: ');
        return throwError(error);
      }
    }

    handleErrorFromBackend(error: HttpErrorResponse): Observable<any> {
      console.log('server-side error:');
      console.log(error);
      return throwError(error);
    }
}
