// Below logic is only for firebase !!!
export class HttpExtractData {
    public static extractData(responseData: any): any {
      const postsArray = new Array<any>();
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postsArray.push({ ...responseData[key], id: key });
        }
      }
      return postsArray;
    }
}
