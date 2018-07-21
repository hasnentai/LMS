import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerserviceService } from '../serverservice.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent  implements OnInit {
  userName ;
  score;
  courseName;
  userToken = localStorage.getItem('userToken');
  enrollments = [];
  getCourses = [];
  constructor(public router: Router, public serverservice: ServerserviceService) { }
  items = [
    {
      cardimg : '../../assets/cardimage.jpg',
      title : 'Title Here',
    },
    {
      cardimg : '../../assets/cardimage.jpg',
      title : 'Title Here',
    },
    {
      cardimg : '../../assets/cardimage.jpg',
      title : 'Title Here',
    },
    {
      cardimg : '../../assets/cardimage.jpg',
      title : 'Title Here',
    },
    {
      cardimg : '../../assets/cardimage.jpg',
      title : 'Title Here',
    },
    {
      cardimg : '../../assets/cardimage.jpg',
      title : 'Title Here',
    },
    {
      cardimg : '../../assets/cardimage.jpg',
      title : 'Title Here',
    },
    {
      cardimg : '../../assets/cardimage.jpg',
      title : 'Title Here',
    },
  ];
  ngOnInit() {
    if (this.userToken === null) {
      this.router.navigateByUrl('/login');
    } else {
      this.serverservice.getScore().subscribe((response) => {
      //  console.log(response);
        this.userName = response[0].fname + ' ' + response[0].lname;
        this.score = response[0].totalScore;
        this.courseName = response[0].courseName;
      });
      this.serverservice.getEditData().subscribe((response) => {
      // console.log(response[0].course);
      this.enrollments = response[0].course;
      console.log(this.enrollments[0].courseName);
      });
      this.serverservice.getCourses().subscribe((response) => {
       // console.log(response);
      });
    }
    }
}
