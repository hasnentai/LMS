import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServerserviceService {
  selectedCourseName;
  selectedCourseId;
  slectedCourseDes;
  selectedCourseImg;
  selectedCourseIntro;
  allmodulesarray;
  currentModule = 0;
  readonly _rootUrl = 'http://192.168.0.7:3000';
  constructor(private http: HttpClient) { }
  postRegisterData(formdata) {
    console.log(formdata);
    return this.http.post(this._rootUrl + '/api/client/register', formdata);

  }

  // tslint:disable-next-line:member-ordering
  CourseDetailsUrl = this._rootUrl + '/api/client/get-courses';
  getcoursecarddetails() {
    return this.http.get(this.CourseDetailsUrl);
  }
  postLoginData(formdata) {
    console.log(formdata);
    return this.http.post(this._rootUrl + '/api/client/login', formdata);

  }

  getEditData() {
    const headers = new HttpHeaders ();
    // headers.append('x-access-token', localStorage.getItem('userToken'));
    return this.http.get(this._rootUrl + '/api/client/get-userInfo/' + localStorage.getItem('userToken'));
  }

  putEditData(formdata) {
    return this.http.put(this._rootUrl + '/api/client/update', formdata);
  }
  getScore() {
    return this.http.get(this._rootUrl + '/api/client/get-score/' + localStorage.getItem('userToken'));
  }
  getCourses() {
     return this.http.get(this._rootUrl + '/api/client/get-courses');
  }

  getCourseDetails() {
    return this.http.get(this._rootUrl + '/api/client/');
  }

  getSpecificCourse(id) {
    console.log(id);
    return this.http.get(this._rootUrl + '/api/client/course-intro/' + id);
  }

  sendCoupenCode(paymenDetails) {
    console.log(paymenDetails);
    return this.http.post(this._rootUrl + '/api/client/pay-via-coupon', paymenDetails);
  }

  checkCompleted (token , coursename) {
    return this.http.get(this._rootUrl + '/api/client/course-status/' + token + '/' + coursename);
  }

  getallModuleDetails (token , courseID) {
     return this.http.get(this._rootUrl + '/api/client/get-course/' + token + '/' + courseID);
  }
}
