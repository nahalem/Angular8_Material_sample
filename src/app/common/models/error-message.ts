export class ErrorMessage{
  type?: number;
  code?: string;
  message?: string;
  innerMessage?: string;
  statusText?: string;

  constructor(type, code, message, innerMessage, statusText){
      this.type = type;
      this.code = code;
      this.message = message;
      this.statusText = statusText;
      this.innerMessage = innerMessage;
  }
}

export const MSG_TYPES_ICONS = ['fa fa-frown-o','fa fa-exclamation-triangle','fa fa-info-circle'];
export const MSG_TYPES_TITLES = ['Error:','Warning:','Info:'];
export const ERROR = 0;
export const WARNING = 1;
export const INFO = 2;
