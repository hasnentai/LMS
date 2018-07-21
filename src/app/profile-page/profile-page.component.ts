import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerserviceService } from '../serverservice.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent  implements OnInit {
  scores = [];
  toppers = [];
  courseName;
  items = [];
  userToken = localStorage.getItem('userToken');
  enrollments = [];
  getCourses = [];
  i = 0;
  j: any;
  constructor(public router: Router, public serverservice: ServerserviceService) { }
  ngOnInit() {
    if (this.userToken === null) {
      this.router.navigateByUrl('/login');
    } else {
      this.serverservice.getScore().subscribe((response) => {
        this.scores = response[0].scores;
        this.toppers = response[0].toppers;
        console.log(this.scores);
       // console.log(response);
        // this.userName = response[0].fname + ' ' + response[0].lname;
        // this.score = response[0].totalScore;
        // this.courseName = response[0].courseName;
      });
      this.serverservice.getEditData().subscribe((response: any) => {
      console.log(response[0].course);
      this.j = response[0].course;

      // this.enrollments = response[0].course[0];
      // console.log(this.enrollments[0].courseName);
      });
      this.serverservice.getcoursecarddetails().subscribe((response: any) => {
        for (const course of response) {
          this.items.push(course);
        }
      });
    }
    }
}
