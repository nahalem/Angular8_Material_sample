import { Injectable } from '@angular/core';
import { ErrorMessage } from '../models/error-message';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class MessagesService {
  messages: ErrorMessage[];
  amount: number;
  msgsVisible: boolean;
  private message: Subject<ErrorMessage>;

  constructor() {
    console.log('MessagesService started');
    this.messages = [];
    this.msgsVisible = false;
    this.amount = 0;
    this.message = new Subject();
  }

  add(msg: ErrorMessage) {
    this.message.next(msg);
    this.amount += 1;
    this.msgsVisible = true;

  }

  delete(msgIdx) {
    this.messages.splice(msgIdx, 1);
    this.amount -= 1;

    if (this.amount === 0) {
      this.hide();
    }
  }

  registerSubject(sub: Subject<ErrorMessage>) {
    this.message = sub;
  }

  show() {
    this.msgsVisible = true;
  }

  hide() {
    this.msgsVisible = false;
  }

  toggle() {
    console.log('MessagesService toggle():');
    console.log(this.msgsVisible);

    this.msgsVisible = this.msgsVisible ? false : true;
  }

  getMessages(): Observable<ErrorMessage>{
    return this.message;
  }
}
