import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { ErrorHandlerService } from '../error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {
  apiUrl: string;
  protected headers = null;

  constructor(
    public http: HttpClient,
    public errorHandlerService: ErrorHandlerService
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  setApiUrl(apiUrl: string): void {
    this.apiUrl = apiUrl;
  }

  add(reqestData: any): Observable<any> {
    return this.http
      .post<any>(
        this.apiUrl,
        reqestData,
        {
          headers: this.headers
        }
      )
      .pipe(
        catchError(this.errorHandlerService.handleErrorFromBackend)
      );
  }

  // delete(): Observable<any> {
  //   return this.http
  //     .delete(this.apiUrl, {
  //       headers: this.headers
  //     })
  //     .pipe(
  //       retry(1),
  //       catchError(this.errorHandlerService.handleErrorFromBackend)
  //     );
  // }

  delete(): Observable<any> {
    return this.http
      .post(this.apiUrl, {
        headers: this.headers
      })
      .pipe(
        retry(1),
        catchError(this.errorHandlerService.handleErrorFromBackend)
      );
  }

  deleteByData(obj: Array<any>): Observable<any[]> {
    return this.http
      .post(this.apiUrl, obj, {
        headers: this.headers
      })
      .catch(this.errorHandlerService.handleErrorFromBackend)
      .map(responseData => {
        return responseData;
      });
  }

  getAll(): Observable<any> {
    return this.http
      .get<any>(this.apiUrl, {
        headers: this.headers
      })
      .catch(this.errorHandlerService.handleErrorFromBackend)
      .map(responseData => {
        return responseData.values;
      });
  }

  getOne(id: string): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id)
      .catch(this.errorHandlerService.handleErrorFromBackend)
      .map(responseData => {
        return responseData.values;
      });
  }

  getByRequestModel(data: any): Observable<any> {
    return this.http
    .post(this.apiUrl, data, {
      headers: this.headers
    })
    .catch(this.errorHandlerService.handleErrorFromBackend)
    .map(responseData => {
      return responseData.values;
    });
  }

  getManyById(id: string, by?: string, separator: string = '/'): Observable<any[]> {
    by = by || '';
    let _url = this.apiUrl + (by ? '?' + by : '');
    _url = _url + separator + id;

    return this.http
      .get(_url)
      .catch(this.errorHandlerService.handleErrorFromBackend)
      .map(responseData => {
        return responseData.values;
      });
  }

  getManyByIdList(ids:[], by?: string, separator: string = '/'): Observable<any[]> {
    by = by || '';
    let _url = this.apiUrl;
    ids.forEach(function(element, i){
      _url = _url + (by ? (i === 0 ? ('?' + by) : by) : '') + separator + element + '&';
    });

    return this.http
      .get(_url)
      .catch(this.errorHandlerService.handleErrorFromBackend)
      .map(responseData => {
        return responseData.values;
      });
  }

  getMany(ids:[], by?: string, separator: string = '/'): Observable<any[]> {
    by = by || '';
    let _url = this.apiUrl + '?';
    ids.forEach(element => {
      _url = _url + by + separator + element + '&';
    });

    return this.http
      .get(_url)
      .catch(this.errorHandlerService.handleErrorFromBackend)
      .map(responseData => {
        return responseData.values;
      });
  }

  getManyByIdListAndPaging(ids:any[], by?: string, currentPage?: number, separator: string = '/'): Observable<any[]> {
    by = by || '';
    //let _url = this.apiUrl;
    let _url = this.apiUrl + '?';
    ids.forEach(element => {
      //_url = _url + (by ? '?' + by : '') + separator + element + '&';
      _url = _url + by + separator + element + '&';
    });

    _url = _url + 'currentPage' + separator + currentPage + '&';
    console.log('getManyByIdListAndPaging');
    console.log(_url);
    return this.http
      .get(_url)
      .catch(this.errorHandlerService.handleErrorFromBackend)
      .map(responseData => {
        return responseData.values;
      });
  }

  save(obj: any, url: string = ''): Observable<any> {
    url = url ? url : this.apiUrl;
    if (obj.id) {
      return this.http
        .put(url, obj, {
          headers: this.headers
        })
        .pipe(catchError(this.errorHandlerService.handleErrorFromBackend));
    } else {
      return this.http
        .post(url, obj, {
          headers: this.headers
        })
        .pipe(
          catchError(this.errorHandlerService.handleErrorFromBackend)
        );
    }
  }

  updateMany(obj: Array<any>): Observable<any[]> {
    return this.http
      .put(this.apiUrl, obj, {
        headers: this.headers
      })
      .pipe(
        map(responseData => {
          return responseData;
        }),
        catchError(this.errorHandlerService.handleErrorFromBackend)
      );
  }

  saveOrUpdateMany(obj: Array<any>): Observable<any[]> {
    return this.http
      .post(this.apiUrl, obj, {
        headers: this.headers
      })
      .catch(this.errorHandlerService.handleErrorFromBackend)
      .map(responseData => {
        return responseData;
      });
  }


  update(obj: any): Observable<any[]> {
    return this.http
      .put(this.apiUrl, obj, {
        headers: this.headers
      })
      .catch(this.errorHandlerService.handleErrorFromBackend)
      .map(responseData => {
        return responseData;
      });
  }
}

