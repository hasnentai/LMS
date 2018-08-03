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
  cards = [];
  city = [];
  i = 0;
  j: any;
  constructor(public router: Router, public serverservice: ServerserviceService) { }
  ngOnInit() {
    if (this.userToken === null) {
      this.router.navigateByUrl('/login');
    } else {
      this.serverservice.getScore().subscribe((response) => {
        // console.log(response);
        this.scores = response[0].scores;
        this.toppers = response[0].toppers;
        // console.log(this.scores);
       // console.log(response);
        // this.userName = response[0].fname + ' ' + response[0].lname;
        // this.score = response[0].totalScore;
        // this.courseName = response[0].courseName;
      });

      this.serverservice.getcoursecarddetails().subscribe((response: any) => {
        for (const course of response) {
          this.items.push(course);
        }
        this.serverservice.getEditData().subscribe((newresponse: any) => {
          console.log(this.items);
          this.enrollments = newresponse[0].enrolments;
          console.log(newresponse);
          for (let i = 0; i < this.items.length; i++) {
            for (let j = 0; j < this.enrollments.length; j++) {
              if (this.enrollments[j].courseID === this.items[i]._id) {
                console.log(this.items[i].courseName);
              this.cards.push( {
                'title' : this.items[i].courseName,
                'imageURL' : this.items[i].imageURL
              });
                console.log(this.cards);
              }
            }
          }
        // console.log(response[0].enrolments);
        // console.log(this.items);
      //  for ( let i = 0; i < this.items.length; i++) {
      //    console.log(this.items[i].courseName);
      //    console.log(response[0].enrolments[i]);
      //    if (this.items[i].courseName === response[0].enrolments[i]) {
      //      console.log(this.items[i].imageURL);
      //     //  console.log(response[0].enrolments[i]);
      //      this.card.imageURL = this.items[i].imageURL;
      //      this.card.title = response[0].enrolments[i];
      //      this.cards.push(this.card);
      //      console.log(this.cards);
      //     //  this.cards.push(response[0].enrollments[i], this.items[i].imageURL);
      //     //  console.log(this.cards);
      //    }
      //   }
    //   this.enrollments = response[0].enrolments[0];
    // for (let i = 0; i < this.items.length; i++) {
    //   console.log(this.items);
    //   for (let j = 0 ; j < this.enrollments.length ; j++) {
    //     console.log('-->' + this.enrollments[0]);
    //     // if ( this.enrollments[j] === this.items[i].courseName) {
    //     //   console.log('its Same ' + j);
    //     // }
    //   }
        // this.enrollments = response[0].course[0];
        // console.log(this.enrollments[0].courseName);
        });
      });
    }
    }
}
