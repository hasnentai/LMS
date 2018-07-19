import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerserviceService {
  readonly _rootUrl = 'http://192.168.0.9:8080';
  constructor(private http: HttpClient) { }
  postRegisterData(formdata) {
    console.log(formdata);
    return this.http.post(this._rootUrl + '/api/client/register', formdata);

  }
  // tslint:disable-next-line:member-ordering
  CourseDetailsUrl = 'http://192.168.0.11:3000/api/client/get-courses';
  getcoursecarddetails() {
    return this.http.get(this.CourseDetailsUrl);
  }
}
