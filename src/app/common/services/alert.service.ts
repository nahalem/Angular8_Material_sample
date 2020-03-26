import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    // // clear alert message on route change
    // router.events.subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     if (this.keepAfterNavigationChange) {
    //       // only keep for a single location change
    //       this.keepAfterNavigationChange = false;
    //     } else {
    //       // clear alert
    //       this.subject.next();
    //     }
    //   }
    // });
  }

  success(message: string, keepAfterNavigationChange = false) {
    //this.keepAfterNavigationChange = keepAfterNavigationChange;
    console.log('Alert service success');
    this.subject.next({ type: 'success', text: message });
  }

  error(message: string, keepAfterNavigationChange = false) {
    //this.keepAfterNavigationChange = keepAfterNavigationChange;
    console.log('Alert service error');
    console.log(message);
    this.subject.next({ type: 'error', text: message });
  }

  warning(message: string, keepAfterNavigationChange = false) {
    //this.keepAfterNavigationChange = keepAfterNavigationChange;
    console.log('Alert service warning');
    console.log(message);
    this.subject.next({ type: 'warning', text: message });
  }

  info(message: string, keepAfterNavigationChange = false) {
    //this.keepAfterNavigationChange = keepAfterNavigationChange;
    console.log('Alert service info');
    console.log(message);
    this.subject.next({ type: 'info', text: message, timeout: 15000 });
  }

  getMessage(): Observable<any> {
    console.log('Alert service getMessage()');
    return this.subject.asObservable();
  }

  manageAlert(obj: any, message: string) {
    if (obj.result)
      this.success(message);
    else
      this.error(obj.message); 
  }
}
