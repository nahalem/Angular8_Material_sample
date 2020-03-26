import { Component, OnInit } from '@angular/core';
import {
  MSG_TYPES_ICONS,
  ErrorMessage,
  MSG_TYPES_TITLES
} from 'src/app/common/models/error-message';
import { MessagesService } from 'src/app/common/services/message.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages: ErrorMessage[];
  msgTypes: string[];
  msgTypesTitles: string[];
  message: Subject<ErrorMessage>;
  isVisible: boolean;

  constructor(public msgService: MessagesService) {
    this.msgTypes = MSG_TYPES_ICONS;
    this.msgTypesTitles = MSG_TYPES_TITLES;
    this.messages = this.msgService.messages;
    this.message = new Subject();
    this.msgService.registerSubject(this.message);

    this.message.subscribe(v => {
      this.messages.push(v);
      this.msgService.show();
      console.log('MessagesComponent show: ');
      console.log(this.msgService.msgsVisible);
    });
  }

  ngOnInit() {}

  add(msg: ErrorMessage) {
    this.message.next(msg);
  }

  delete(msgIdx) {
    this.msgService.delete(msgIdx);
  }

  show() {
    this.msgService.show();
  }

  hide() {
    this.msgService.hide();
  }
}
