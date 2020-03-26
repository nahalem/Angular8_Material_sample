import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../error-handler.service';
import { HttpExtractData } from './http-extract-data';

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

  register(reqestData: any): Observable<any> {
    console.log('add start: ');
    return this.http
      .post<any>(
        this.apiUrl, reqestData,
        {
          headers: this.headers
        }
     )
      .pipe(
        map(responseData => {
          return HttpExtractData.extractData(responseData);
        }),
        retry(1),
        // catchError(this.errorHandlerService.handleError)
        catchError(this.errorHandlerService.handleErrorFromBackend)
      );
  }

  deleteById(id: string): Observable<any> {
    console.log('delete start: ');
    return this.http
      .delete(this.apiUrl, {
        headers: this.headers,
        params : {
          id: id
        }
      })
      .pipe(
        map(responseData => {
          return responseData;
        }),
        retry(1),
        // catchError(this.errorHandlerService.handleError)
        catchError(this.errorHandlerService.handleErrorFromBackend)
      );
  }

  getAll(): Observable<any> {
    console.log('getAll start: ');
    return this.http
      .get<any>(this.apiUrl, {
        headers: this.headers
      })
      .pipe(
        map(responseData => {
          return HttpExtractData.extractData(responseData);
        }),
        retry(3),
        // catchError(this.errorHandlerService.handleError)
        catchError(this.errorHandlerService.handleErrorFromBackend)
      );
  }

  getById(id: string): Observable<any> {
    console.log('getOne start: ' + this.apiUrl);
    let searchParams = new HttpParams();
    searchParams = searchParams.append('id', id);

    return this.http.get(this.apiUrl, {
        headers: this.headers,
        params: searchParams
      })
      .pipe(
        map(responseData => {
          return responseData;
        }),
        retry(3),
        // catchError(this.errorHandlerService.handleError)
        catchError(this.errorHandlerService.handleErrorFromBackend)
      );
  }

  getByCredentials(obj: any): Observable<any> {
    console.log('getByCredentials');
    console.log(this.http);
    console.log(obj);

    return this.http
      .post(this.apiUrl, obj, {
        headers: this.headers
      })
      .catch(this.errorHandlerService.handleError)
      .map(responseData => {
        return responseData;
      });

    //console.log('getOne start: ' + this.apiUrl);
    //let searchParams = new HttpParams();
    //searchParams = searchParams.append('username', username);
    //searchParams = searchParams.append('password', password);

    //return this.http.get(this.apiUrl, {
    //    headers: this.headers,
    //    params: searchParams
    //  })
    //  .pipe(
    //    map(responseData => {
    //      return HttpExtractData.extractData(responseData);
    //    }),
    //    retry(3),
    //    catchError(this.errorHandlerService.handleError)
    //  );
  }

  getOne(id: string): Observable<any> {
    console.log('getOne(id: string)');
    console.log(this.apiUrl + '/' + id);
    return this.http.get(this.apiUrl + '/' + id)
      .catch(this.errorHandlerService.handleError)
      .map(responseData => {
        return responseData.values;
      });
  }

  getOneAfterAuth(): Observable<any> {
    return this.http.get(this.apiUrl)
      .catch(this.errorHandlerService.handleError)
      .map(responseData => {
        return responseData.values;
      });
  }

  saveOgUpdate(obj: any, url: string = ''): Observable<any> {
    url = url ? url : this.apiUrl;
    if (obj.id) {
      console.log('PUT ...started apiUrl:' + url);
      return this.http
        .put(url, obj, {
          headers: this.headers
        })
        .pipe(
          map(responseData => {
            return HttpExtractData.extractData(responseData);
          }),
        // catchError(this.errorHandlerService.handleError)
        catchError(this.errorHandlerService.handleErrorFromBackend)
        );
    } else {
      console.log('POST ...started apiUrl:' + url);
      return this.http
        .post(url, obj, {
          headers: this.headers
        })
        .pipe(
          map(responseData => {
            return HttpExtractData.extractData(responseData);
          }),
        // catchError(this.errorHandlerService.handleError)
        catchError(this.errorHandlerService.handleErrorFromBackend)
        );
    }
  }
}
