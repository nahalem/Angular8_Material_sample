import { Inject, Injectable } from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { Observable } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';

 //export const AppConfig = {
 //  apiEndpoint: 'https://localhost:44339/api',
 //  appName: 'Volvo app',
 //  region: 'POLAND'
 //};

  export const AppConfig = {
  applicationEndpoint: 'https://localhost:4200',
  apiEndpoint: 'https://localhost:44339/api',
  apiEndpointEmergencyForDemo: 'https://localhost:44339/api', //TODO
  apiEndpointUserService: 'https://localhost:44339/api/Auth/authenticate',//TODO
  appName: 'Volvo app',
  region: 'POLAND'
  };

// export const AppConfig = {
//   applicationEndpoint: 'https://segotn13224:81/ui',
//   apiEndpoint: 'https://segotn13224:81/api/api',//TODO
//   apiEndpointUserService: 'https://segotn13224:81/api/api/Auth/authenticate',//TODO
//   appName: 'Volvo app',
//   region: 'POLAND'
// };

//export const AppConfig = {
//  applicationEndpoint: 'https://qritv3.got.volvo.net/ui',
//  apiEndpoint: 'https://qritv3.got.volvo.net/api/api',//TODO
//  apiEndpointUserService: 'https://qritv3.got.volvo.net/api/api/Auth/authenticate',//TODO
//  appName: 'Volvo app',
//  region: 'POLAND'
//};

@Injectable()
export class Initialize {
    private apiProfileUrl: string = 'api/user/loggedin';
    private apiDictUrl: string = 'api/frameworkdictionary/getuserdictionary';
    _dictionary: Observable<any>;
    dictionary: any[];
    profile: any;
    _profile: Observable<any>;

    constructor(private http: InterceptorService) {

    }

    // public load() {
    //     return new Promise((resolve, reject) => {
    //         console.log('Initializer --- Started');

    //         this._profile = this.cacheRequest(this.apiProfileUrl);

    //         this._profile.subscribe(profile => {
    //             this.profile = profile;
    //             console.log('Initializer --- Profile loaded');
    //             this._dictionary = this.cacheRequest(this.apiDictUrl);

    //             this._dictionary.subscribe(dict => {
    //                 this.dictionary = dict;
    //                 console.log('Initializer --- Dictionary loaded');
    //                 resolve(true);
    //             });
    //         });
    //     })
    // }

    cacheRequest(apiUrl){
        return this.http.get(apiUrl)
                .map(res => res.json())
                .catch(error => {
                    console.error(error);
                    return Observable.throw(error);
                })
                .publishReplay()
                .refCount();
    }
}

// export function init(config: Initialize) {
//   return () => {
//     return config.load(); // add return
//   };
// }

