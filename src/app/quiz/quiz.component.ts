import { ServerserviceService } from './../serverservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { timer, Subject } from 'rxjs';

import {
  Component,
  OnInit,
  ElementRef,
  Renderer,
  Renderer2,
  HostListener
} from '@angular/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizdetails = [];
  userToken: string;
  selectedCourseId: any;
  subject = new Subject();

  constructor(public el: ElementRef, public renderer: Renderer2, public serverservice:
    ServerserviceService, public route: ActivatedRoute, public router: Router) { }
  imagepresent: any;
  qno = 0;
  currentQuestion;
  imagediv: any;
  optionsdiv: any;
  noofquestions: any;
  questionarray: any;
  timer: any;
  countDownValue = 4;
  counter: any;
  correctanswer;

  changequestion(index) {
    if (this.correctanswer === index + 1) {
      console.log('Correct ' + this.correctanswer);
      this.timer.unsubscribe();
      this.timerfunction();
    } else {
      console.log('Wrong ' + this.correctanswer);
      this.timer.unsubscribe();
      this.timerfunction();
    }
  }
  timerfunction() {
    this.timer = timer(1000, 1000);
    this.timer = this.timer.pipe(takeUntil(this.subject)).subscribe(x => {
      if (x <= this.countDownValue) {
       //  console.log(this.quizdetails[this.currentQuestion].question.qstn);
        this.counter = this.countDownValue - x;
        // console.log(this.counter);
        if (this.counter === 0) {
          this.currentQuestion++;
          this.correctanswer = this.quizdetails[this.currentQuestion].correctAns;
          if ( this.currentQuestion === this.noofquestions) {
            this.timer.unsubscribe();
          } else {
            this.timer.unsubscribe();
          this.imagepresent = this.quizdetails[this.currentQuestion].question.media;
          // console.log('Image is ' + this.imagepresent);
          if (this.imagepresent === null) {
            this.renderer.addClass(this.imagediv, 'imagedisplaynone');
            this.renderer.removeClass(this.optionsdiv, 'listclass');
            this.renderer.addClass(this.optionsdiv, 'optionsnoimage');
          } else {
            this.renderer.removeClass(this.imagediv, 'imagedisplaynone');
            this.renderer.addClass(this.optionsdiv, 'listclass');
            this.renderer.removeClass(this.optionsdiv, 'optionsnoimage');
          }
          this.timerfunction();
         //  console.log('inside');

          }
        }
      }
    });
  }
  ngOnInit() {
    this.currentQuestion = 0;
    this.userToken = localStorage.getItem('userToken');
    this.selectedCourseId = this.route.snapshot.params['id'];
    this.imagediv = this.el.nativeElement.getElementsByClassName('imagecontainer')[0];
    this.optionsdiv = this.el.nativeElement.getElementsByClassName('listclass')[0];
    // console.log(this.imagediv);
    this.serverservice.getallModuleDetails(this.userToken, this.selectedCourseId).subscribe((response: any) => {
      // console.log(response);
      this.serverservice.allmodulesarray = response[this.serverservice.currentModule];
      this.quizdetails = this.serverservice.allmodulesarray.quiz;
      // console.log(this.quizdetails);
      this.noofquestions = this.quizdetails.length;
      // console.log(this.noofquestions);
      this.imagepresent = this.quizdetails[this.currentQuestion].question.media;
      this.correctanswer = this.quizdetails[this.currentQuestion].correctAns;
      // console.log(this.imagepresent);
      if (this.imagepresent === null) {
        this.renderer.addClass(this.imagediv, 'imagedisplaynone');
        this.renderer.removeClass(this.optionsdiv, 'listclass');
        this.renderer.addClass(this.optionsdiv, 'optionsnoimage');
      }
    });
    this.timerfunction();
    this.qno = 0;
   //  console.log(this.imagepresent);

  }
}
