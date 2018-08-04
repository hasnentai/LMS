import { Http, Response, RequestOptions } from '@angular/http';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServerserviceService  implements OnInit {


  selectedCourseName;
  selectedCourseId;
  slectedCourseDes;
  selectedCourseImg;
  selectedCourseIntro;
  allmodulesarray;
  currentModuleCounter = 0;
  httpOptions;
  userToken;
  readonly _rootUrl = 'https://businesstoys.tech';
  constructor(private http: HttpClient ) { }
  getToken(): string {
    return localStorage.getItem('token');
}
  // currentModule () {
  //   this.currentModuleCounter ++;
  //   localStorage.setItem('currenModule', this.currentModuleCounter.toString());
  //   return this.currentModuleCounter;
  // }
  ngOnInit() {
    this.userToken = localStorage.getItem('userToken');
    this.currentModuleCounter = Number(localStorage.getItem('currentModuleCounter'));
    //  const option = new RequestOptions({ headers : headers });
  }
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
    console.log(this.userToken);
    return this.http.get(this._rootUrl + '/api/client/get-userInfo', );
  }

  putEditData(formdata) {
    return this.http.put(this._rootUrl + '/api/client/update', formdata);
  }
  getScore() {
    return this.http.get(this._rootUrl + '/api/client/get-score/');
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
    return this.http.get(this._rootUrl + '/api/client/course-status/' + coursename);
  }

  getallModuleDetails (token , courseID) {
     return this.http.get(this._rootUrl + '/api/client/get-course/' + courseID);
  }
  getAllState() {
    return this.http.get('../assets/stateandcity.json');
  }
}
