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
  quizdetails: any;
  userToken: string;
  selectedCourseId: any;
  subject = new Subject();

  constructor(public el: ElementRef, public renderer: Renderer2, public serverservice:
    ServerserviceService, public route: ActivatedRoute, public router: Router) { }
  imagepresent: any;
  qno = 0;
  imagediv: any;
  optionsdiv: any;
  noofquestions: any;
  questionarray: any;
  timer: any;
  countDownValue = 5;
  counter: any;
  changequestion() {
    this.qno = this.qno + 1;
    console.log(this.qno);
    this.timerfunction();
    if (this.qno = this.noofquestions) {
      this.navigatToNxt();
    }
  }
  timerfunction() {
    this.timer = timer(1000, 1000);
    this.timer = this.timer.pipe(takeUntil(this.subject)).subscribe(x => {
      if (x <= this.countDownValue) {
        this.counter = this.countDownValue - x;
        console.log(this.counter);
        if (this.counter === 0) {
          this.changequestion();
          // console.log(this.counter);
        }
      }
    });
  }

  ngOnInit() {
    this.userToken = localStorage.getItem('userToken');
    this.selectedCourseId = this.route.snapshot.params['id'];
    this.imagediv = this.el.nativeElement.getElementsByClassName('imagecontainer')[0];
    this.optionsdiv = this.el.nativeElement.getElementsByClassName('listclass')[0];
    console.log(this.imagediv);

    this.serverservice.getallModuleDetails(this.userToken, this.selectedCourseId).subscribe((response: any) => {
      // console.log(response);
      this.serverservice.allmodulesarray = response[this.serverservice.currentModule];
      this.quizdetails = this.serverservice.allmodulesarray.quiz;
      console.log(this.quizdetails);
      this.noofquestions = this.quizdetails.length;
      console.log(this.noofquestions);
      // for ( const questioninstance of this.quizdetails ) {
      this.imagepresent = this.quizdetails[this.qno].question.media;
      console.log(this.imagepresent);
      if (this.imagepresent === null) {
        this.renderer.addClass(this.imagediv, 'imagedisplaynone');
        this.renderer.removeClass(this.optionsdiv, 'listclass');
        this.renderer.addClass(this.optionsdiv, 'optionsnoimage');
      }
      // this.questionarray = questioninstance.question;
      // console.log(this.questionarray);
      // }
    });
    this.timerfunction();
    this.qno = 0;
    console.log(this.imagepresent);

  }
  navigatToNxt() {
    this.router.navigate(['/moduleIntro', { id: this.selectedCourseId }]);
  }
}
