import { Component, OnInit } from '@angular/core';
import { ServerserviceService } from '../serverservice.service';

@Component({
  selector: 'app-score-display',
  templateUrl: './score-display.component.html',
  styleUrls: ['./score-display.component.css']
})
export class ScoreDisplayComponent implements OnInit {

  totalScore: any;
  courseName: any;
  allInfo: any;
  moduleScore: any;
  courseID: string;
  constructor(public serverservice: ServerserviceService) { }

  ngOnInit() {
    this.courseID = localStorage.getItem('courseId');
    console.log(this.courseID);
    this.serverservice.getAllScores(this.courseID).subscribe((response: any) => {
      console.log(response);
      this.moduleScore = response[0].moduleScores;
      this.courseName = response[0].courseName;
      this.totalScore = response[0].totalScore;
      for (let i = 0; i < this.moduleScore.length; i++) {
        if (this.moduleScore [i] < 0) {
          this.moduleScore[i] = 0;
        }
      }
      console.log(this.courseID);
    });
  }

}
