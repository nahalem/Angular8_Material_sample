import { Component, OnInit, OnDestroy, Type, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/common/services/alert.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;
  isVisible: boolean = true;
  public type: Type<any>;
  public notificationTemplate: TemplateRef<any>;
  @ViewChild('notificationApplendTo', { read: ViewContainerRef, static: false }) public notificationApplendTo: ViewContainerRef;

  constructor(
    private alertService: AlertService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      console.log('AlertComponent');
      console.log(message);
      this.message = message;
      switch (message.type) {
        case 'success':
        case 'error':
        case 'warning':
        case 'info':
        default:
          this.showNotification(message.text, message.type, 3000);
      }

    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showNotification(message: string, action: string, timeout: number = 3000) {
    this.snackBar.open(message, action, {
      duration: timeout,
    });
  }
}
