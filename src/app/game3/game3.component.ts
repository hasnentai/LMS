import {
  Component,
  OnInit,
  ElementRef, Renderer
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  Observable,
  Subject,
  timer
  // tslint:disable-next-line:import-blacklist
} from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
@Component({
  selector: 'app-game3',
  templateUrl: './game3.component.html',
  styleUrls: ['./game3.component.css']
})
export class Game3Component implements OnInit {
  elem = document.getElementsByTagName('button');
  title = 'app';
  second = true;
  third = false;
  nav = true;
  i = 0;
  score = 0;
  charCounter = 0;
  time;
  currentAnswer;
  currentAnswer1;
  currentQuestion;
  currentAnswerChar1 = [];
  currentAnswerChar = [];
  questionSize = 0;
  quesCounter = 0;
  fullheart = 'favorite';
  nullheart = 'favorite_border';
  currentheart1 = 'favorite';
  currentheart2 = 'favorite';
  currentheart3 = 'favorite';
  currentheart4 = 'favorite';
  flag = 0;
  heartcount = 4;
  alpha = [];
  InflationVal = [];
  disable = true;
  quesions = [
    {
      // tslint:disable-next-line:max-line-length
      quesion: 'Statistical tool which is frequently used for measuring performance of batsaman in game of cricket',
      name: 'Average'
    },
    {
      // tslint:disable-next-line:max-line-length
      quesion: 'growth data best represented on ________ graph',
      name: 'Line'
    },
    {
      quesion: 'Helps determining relationship between two variables',
      name: 'Correlation'
    },
    {
      quesion: 'is a mid-point of sorted data-set',
      name: 'Median'
    },
    {
      quesion: '________ defines the strength of relationship and dependency',
      name: 'Regression'
    },
    {
      quesion: 'graph is used for demonstrating correlation',
      name: 'Scatter'
    },
    {
      quesion: 'very low or very high data points which spoil the average are_______',
      name: 'Outliers'
    },
    {
      // tslint:disable-next-line:max-line-length
      quesion: '. __________ graph is used for demonstrating distribution of continuous data',
      name: 'Histogram'
    },
    {
      // tslint:disable-next-line:max-line-length
      quesion: '___________ answers most frequently repeated number',
      name: 'Mode'
    },
    {
      // tslint:disable-next-line:max-line-length
      quesion: 'is a measure of central tendency',
      name: 'Mean'
    },
  ];
  subject = new Subject();
  counter;
  countDownValue = 40;
  ngOnInit() {}
  constructor(public element: ElementRef, public renderer: Renderer, public router: Router) {
    for ( let i = 0 ; i < this.elem.length ; i++) {
      console.log(this.elem[i]);
    }
    this.questionSize = this.quesions.length;
    this.genCharArray();
    this.nextQuestion();
  }

  genCharArray() {
    this.alpha.push('q');
    this.alpha.push('w');
    this.alpha.push('e');
    this.alpha.push('r');
    this.alpha.push('t');
    this.alpha.push('y');
    this.alpha.push('u');
    this.alpha.push('i');
    this.alpha.push('o');
    this.alpha.push('p');
    this.alpha.push('a');
    this.alpha.push('s');
    this.alpha.push('d');
    this.alpha.push('f');
    this.alpha.push('g');
    this.alpha.push('h');
    this.alpha.push('j');
    this.alpha.push('k');
    this.alpha.push('l');
    this.alpha.push('z');
    this.alpha.push('x');
    this.alpha.push('c');
    this.alpha.push('v');
    this.alpha.push('b');
    this.alpha.push('n');
    this.alpha.push('m');
}
quizPage() {

  localStorage.setItem('moduleID', '4');
  this.router.navigate(['/quiz']);
}
  timerFunction() {
    this.time = timer(1, 1000);
    this.time = this.time.pipe(takeUntil(this.subject)).subscribe(x => {
        if (x <= this.countDownValue) {
          this.counter = this.countDownValue - x;
        } else {
          this.subject.next();
          this.time.unsubscribe();
          for ( let i = 0; i < this.elem.length; i++) {
             console.log(this.elem[i]);
             this.elem[i].classList.remove('btn-disabled');
             this.elem[i].setAttribute('class', 'light-blue');
             this.elem[i].classList.add('darken-1');
             this.elem[i].removeAttribute('disabled');
             // console.log(this.elem[i]);
           }
          setTimeout(() => {
            this.nextQuestion();
          }, 1000);
        }
      });
  }
  nextQuestion() {
    this.quesCounter ++;
   // this.time.unsubscribe();
    if (this.quesions[this.i] != null) {
      this.currentQuestion = this.quesions[this.i].quesion;
      this.currentAnswer = this.quesions[this.i].name;
      this.currentAnswer1 = this.quesions[this.i].name.replace(/\s/g, '');
      this.currentAnswerChar = this.currentAnswer1.split('');
      this.currentAnswerChar1 = this.currentAnswer.split('');
     // console.log(this.currentAnswer1);
      this.currentheart1 = this.fullheart;
      this.currentheart2 = this.fullheart;
      this.currentheart3 = this.fullheart;
      this.currentheart4 = this.fullheart;
      this.heartcount = 4;
      if ( this.quesCounter === this.questionSize) {
        this.second = false;
        this.nav = false;
        this.third = true;
      } else {
        this.timerFunction();
      }
    }
    this.InflationVal = [];
    this.i++;
  }
  check(char1, char2, index, event) {
    this.flag = 0;
    let i = 0;
    console.log(char1);
    const elem: Element = document.getElementById('dynamicButton:' + index);
    char2 = char2.toUpperCase();
    for (i = 0 ; i < this.currentAnswerChar.length ; i++) {
      if (char1 === this.currentAnswerChar[i] || char2 === this.currentAnswerChar[i]) {
        this.InflationVal[i] = char2;
        this.charCounter++;
        this.flag = 1;
        elem.setAttribute('disabled', 'true');
        elem.setAttribute('class', 'btn-disabled');
      }
    }
    if (this.charCounter === this.currentAnswer.length) {
      const htmlButtons = [];
      this.score += 10;
      this.time.unsubscribe();
      for (i = 0; i < this.elem.length; i++) {
        // console.log(this.elem[i]);
         this.elem[i].classList.remove('btn-disabled');
         this.elem[i].setAttribute('class', 'light-blue');
         this.elem[i].classList.add('darken-1');
         this.elem[i].removeAttribute('disabled');
         // console.log(this.elem[i]);
       }
      setTimeout(() => {
        this.nextQuestion();
      }, 1000);
      this.charCounter = 0;
    }
   // console.log(this.score);
    if (this.flag === 0) {
      if (this.heartcount === 4) {
        this.currentheart4 = this.nullheart;
      }
      if (this.heartcount === 3) {
        this.currentheart3 = this.nullheart;
      }
      if (this.heartcount === 2) {
        this.currentheart2 = this.nullheart;
      }
      if (this.heartcount === 1) {
        this.currentheart1 = this.nullheart;
       this.time.unsubscribe();
       for (i = 0; i < this.elem.length; i++) {
         // console.log(this.elem[i]);
          this.elem[i].classList.remove('btn-disabled');
          this.elem[i].setAttribute('class', 'light-blue');
          this.elem[i].classList.add('darken-1');
          this.elem[i].removeAttribute('disabled');
          // console.log(this.elem[i]);
        }
        setTimeout(() => {
          this.nextQuestion();
        }, 1000);
        this.heartcount++;
      }
      this.heartcount--;
    }
  }
  display() {
    this.nav = true;
    this.second = true;
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy(): void {
    this.time.unsubscribe();

  }
}
