import * as moment from 'moment';

declare global {
    interface StringConstructor {
        createGUID(): string;
        dateToString(date: Date): string;
        timeToString(date: Date): string;
        dateToPrimeNGDateString(date: Date): string;
        isBlank(obj: any): boolean;
        isPresent(obj: any): boolean;
        emailRegex(): RegExp;
        getNumberForValue(value: any): Number;
        checkIsNumber(input: string): boolean;
        formatNumber(value: string): string;
        isSafariBrowser(): boolean;
        to2DigitNo(no: string): string;
        padStart(val:string, size:number, char: string): string;
        roundDecimal(value: any, toFixed: number);
        replaceMultipleWhiteSpaceIntoOne(value:String);
    }
}

String.to2DigitNo = function (no: string) {
    if (String.isBlank(no)) { return ''; }
    if (no.length > 1) { return no; }
    if (/[^0-9]/g.test(no)) { return no; }
    else { return "00".substring(no.length) + no; }
}

String.createGUID = function () {
    var lut: string[] = []; for (var i = 0; i < 256; i++) { lut[i] = (i < 16 ? '0' : '') + (i).toString(16); }
    var d0 = Math.random() * 0xffffffff | 0;
    var d1 = Math.random() * 0xffffffff | 0;
    var d2 = Math.random() * 0xffffffff | 0;
    var d3 = Math.random() * 0xffffffff | 0;
    return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
        lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
        lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
        lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
}

String.dateToString = function (date: Date) {
    if (date == undefined) { return ""; }
    var mm = moment(date).month() + 1;
    var dd = moment(date).date();

    return [moment(date).year(), ((mm > 9) ? '' : '0') + mm.toString(), ((dd > 9) ? '' : '0') + dd.toString()].join('-');
}

String.timeToString = function (date: Date) {
    if (date == undefined) { return ""; }
    var hh = moment(date).hours();
    var mm = moment(date).minutes();

    return [((hh > 9) ? '' : '0') + hh.toString(), ((mm > 9) ? '' : '0') + mm.toString(), '00'].join(':');
}

String.isBlank = function (obj) {
    return obj === undefined || obj === null || obj === "";
}

String.isPresent = function (obj) {
    return obj !== undefined && obj !== null && obj !== "";
}

String.emailRegex = function () {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
}

String.getNumberForValue = function (value: any) {
    if (!this.checkIsNumber(value)) { return 0; }

    var text = String(value);
    text = text.replace(/ /g, '');
    var indexOfComa = text.replace(".", ",").indexOf(",");
    if (indexOfComa != -1) { text = text.substring(0, indexOfComa); }
    if (parseInt(text) < 0) { return 0; }

    return Number(text);
}

String.checkIsNumber = function (input: string) {
    if (input == '' || input == null) { return false; }

    var text = String(input);
    var numberRegex = /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/;
    text = text.replace(/,/g, ".").replace(/ /g, "");

    if (!numberRegex.test(text)) { return false; }
    return true;
}

String.formatNumber = function (value: string) {
    var nStr = value + '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ' ' + '$2');
    }
    return x1 + x2;
}

String.isSafariBrowser = function () {
    let is_chrome: boolean = navigator.userAgent.indexOf('Chrome') > -1;
    let is_safari: boolean = navigator.userAgent.indexOf("Safari") > -1;
    if ((is_chrome) && (is_safari)) { is_safari = false; }

    return is_safari
}

String.padStart = function(val:string, size:number, char: string): string {
    let s = val;
    while (s.length < size) s = char + s;
    return s;
}

String.roundDecimal = function (value: any, toFixed?: number) {
  let currentValue = value.toString();
  if(String.isBlank(currentValue)){
    return currentValue;
  }
  return Number.parseFloat(currentValue).toFixed(toFixed);
}

String.replaceMultipleWhiteSpaceIntoOne = function(value: string){
  return value.replace(/\s/g,' ');
}
